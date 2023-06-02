import { nanoid } from "nanoid";

import AuthorizationError from "@/backend/errors/AuthorizationError";
import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "@/backend/libs/prismadb"

import { ALLOWED_PAYMENT } from "@/backend/libs/midtransPayment";
import type { MidtransTransactionPayload } from "@/types";
import { OrderStatus } from "@prisma/client";

interface savePaymentNotificationParams {
  transactionTime: Date;
  grossAmount: number;
  currency: string;
  signatureKey: string;
  orderId: string;
  paymentType: string;
}

const _verifyOrderAccess = async (userId: string, orderId: string) => {
  const order = await prisma.itemOrder.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new NotFoundError("Order tidak ditemukan");
  }

  if (order.userId !== userId) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }
}

export const verifyAbleToCreatePayment = async (orderId: string) => {
  const expiredDate = Date.now() - 24 * 60 * 60 * 1000;

  const payment = await prisma.itemOrderPayment.findFirst({
    where: {
      itemOrderId: orderId,
      createdAt: {
        gte: new Date(expiredDate).toISOString(),
      },
    },
    select: {
      paymentStatus: true,
    },
  });

  if (payment) {
    if (payment.paymentStatus === "SUCCESS") {
      throw new InvariantError("Anda sudah melakukan pembayaran");
    }
    throw new InvariantError("Tidak dapat membuat payment baru, Pembayaran anda belum expired");
  }

  await prisma.itemOrderPayment.delete({
    where: {
      itemOrderId: orderId,
    },
  });
}

export const createTransactionData = async (userId: string, orderId: string): Promise<MidtransTransactionPayload> => {
  await _verifyOrderAccess(userId, orderId);

  const orderData = await prisma.itemOrder.findUnique({
    where: {
      id: orderId,
    },
    select: {
      price: true,
      city: true,
      address: true,
      postalCode: true,
      createdAt: true,
      itemOrderVariant: {
        select: {
          id: true,
          price: true,
          amount: true,
          label: true,
        },
      },
      seller: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      user: {
        select: {
          username: true,
          email: true,
          phoneNumber: true,
        }
      }
    },
  });

  if (!orderData) {
    throw new InvariantError("Gagal melakukan proses transaksi");
  }

  const itemDetails = orderData.itemOrderVariant.map(({ id, price, amount, label }) => {
    return {
      id,
      price,
      quantity: amount,
      name: label,
      merchant_name: orderData.seller.user.username,
    };
  });

  return {
    transaction_details: {
      order_id: orderId,
      gross_amount: orderData.price,
    },
    item_details: itemDetails,
    customer_details: {
      first_name: orderData.user.username,
      email: orderData.user.email,
      phone: orderData.user.phoneNumber as string,
      billing_address: {
        first_name: orderData.user.username,
        email: orderData.user.email,
        phone: orderData.user.phoneNumber as string,
        address: orderData.address,
        city: orderData.city,
        postal_code: orderData.postalCode,
        country_code: "IDN"
      },
      shipping_address: {
        first_name: orderData.user.username,
        email: orderData.user.email,
        phone: orderData.user.phoneNumber as string,
        address: orderData.address,
        city: orderData.city,
        postal_code: orderData.postalCode,
        country_code: "IDN"
      }
    },
    enabled_payments: ALLOWED_PAYMENT,
    callbacks: {
      finish: "https://demo.midtrans.com"
    },
    expiry: {
      start_time: orderData.createdAt,
      unit: "hour",
      duration: 24
    },
  };
}

export const addPayment = async (orderId: string, { token, redirect_url }: { token: string, redirect_url: string }) => {
  const id = `payment-${nanoid(16)}`;

  const payment = await prisma.itemOrderPayment.create({
    data: {
      id,
      itemOrderId: orderId,
      token,
      redirectUrl: redirect_url,
    },
    select: {
      id: true,
    },
  });

  if (!payment) {
    throw new InvariantError("Gagal menambah payment");
  }
}

// export const getPayment = async (userId: string, orderId: string) => {
//   await _verifyOrderAccess(userId, orderId);

//   const payment = await prisma.itemOrderPayment.findUnique({
//     where: {
//       itemOrderId: orderId,
//     },
//     select: {
//       token: true,
//       redirectUrl: true,
//     },
//   });
// }

export const savePaymentNotification = async ({
  orderId,
  transactionTime,
  grossAmount,
  currency,
  signatureKey,
  paymentType
}: savePaymentNotificationParams) => {
  const payment = await prisma.itemOrder.findUnique({
    where: {
      id: orderId,
    },
    select: {
      itemOrderPayment: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!payment?.itemOrderPayment?.id) {
    throw new InvariantError("orderId Invalid");
  }

  const verify = await prisma.$transaction([
    prisma.itemOrderPaymentDetail.create({
      data: {
        itemOrderPaymentId: payment.itemOrderPayment.id,
        transactionTime,
        grossAmount,
        currency,
        signatureKey,
        paymentType
      },
      select: {
        itemOrderPaymentId: true,
      },
    }),
    prisma.itemOrderStatus.create({
      data: {
        id: `itemOrderStatus-${nanoid(16)}`,
        itemOrderId: payment.itemOrderPayment.id,
        status: OrderStatus.SELLER_VERIFICATION,
      },
    }),
  ]);

  if (!verify) {
    throw new InvariantError("Terjadi kesalahan")
  }
}
