import { nanoid } from "nanoid";

import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";

import prisma from "@/backend/libs/prismadb"
import type { PaginationParams } from "@/types";
import { ItemStatus } from "@prisma/client";
import type { itemVariantDataType } from "./itemService";

import { takeStocksFromItem } from "./itemService";
import { checkIfTheItemAvailable, getItemVariantStockById } from "../itemService";
import { checkUserPhoneNumber } from "./accountService";
import { getAddressById } from "./addressService";
import { getShipperById } from "../shipperService";

interface OrderParams {
  addressId: string;
  itemId: string;
  itemNote: string;
  shipperId: string;
  itemVariant: {
    id: string,
    amount: number,
  }[];
}

interface orderVariantDataType {
  id: string;
  label: string;
  price: number;
  amount: number;
}

export const orderItem = async (userId: string, { addressId, shipperId, itemId, itemVariant, itemNote }: OrderParams) => {
  await checkUserPhoneNumber(userId);

  const { city, address, note } = await getAddressById(userId, { addressId });
  const { name, price: shipperPrice } = await getShipperById(shipperId);

  const { title, sellerId, description, itemImage } = await checkIfTheItemAvailable(itemId);

  const itemVariantDatas: itemVariantDataType[] = [];
  const orderVariantDatas: orderVariantDataType[] = [];

  await Promise.all(itemVariant.map(async ({ id, amount }) => {
    const { stock, label, price } = await getItemVariantStockById(itemId, id);

    if (amount > stock) {
      throw new InvariantError(`Stock item variant ${label} tidak cukup`);
    }

    itemVariantDatas.push({
      where: {
        id,
      },
      data: {
        stock: {
          decrement: amount,
        },
      },
    });

    const orderId = `orderVariant-${nanoid(16)}`;

    orderVariantDatas.push({
      id: orderId,
      label,
      price,
      amount,
    });

    return;
  }));

  await takeStocksFromItem({ itemId, itemVariantDatas });

  const orderId = `itemOrder-${nanoid(16)}`;
  const statusId = `itemOrderStatus-${nanoid(16)}`;

  const orderAmount = orderVariantDatas.reduce((total, { amount }) => {
    return total + amount;
  }, 0);

  const orderPrice = orderVariantDatas.reduce((total, { price, amount }) => {
    return total + (price * amount);
  }, shipperPrice);

  const order = await prisma.itemOrder.create({
    data: {
      id: orderId,
      userId,
      sellerId,
      city,
      address,
      addressNote: note,
      shipper: name,
      shipperPrice,
      itemNote,
      title,
      description,
      amount: orderAmount,
      price: orderPrice,
      itemOrderStatus: {
        create: {
          id: statusId,
          status: ItemStatus.PAYMENT,
        }
      },
      itemOrderVariant: {
        createMany: {
          data: orderVariantDatas
        }
      },
      itemOrderImage: {
        createMany: {
          data: itemImage,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!order) {
    const giveBackItemData: itemVariantDataType[] = itemVariantDatas.map((item) => {
      return {
        ...item,
        data: {
          stock: {
            decrement: -item.data.stock.decrement,
          },
        },
      }
    });

    await takeStocksFromItem({ itemId, itemVariantDatas: giveBackItemData });

    throw new InvariantError("Gagal menambahkan orderan item");
  }

  return title;
}

export const getOrders = async (userId: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const orders = await prisma.itemOrder.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      userId
    },
    select: {
      title: true,
      price: true,
      amount: true,
      createdAt: true,
      itemOrderVariant: {
        select: {
          label: true,
          amount: true,
          price: true,
        },
      },
      itemOrderStatus: {
        select: {
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      itemOrderImage: {
        take: 1,
        select: {
          image: true,
        },
      },
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      },
    },
  });

  return orders;
}

export const getOrdersBySearch = async (userId: string, search: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const orders = await prisma.itemOrder.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      userId,
      title: {
        contains: search,
      },
    },
    select: {
      id: true,
      title: true,
      price: true,
      amount: true,
      itemOrderVariant: {
        select: {
          label: true,
          amount: true,
          price: true,
        },
      },
      itemOrderStatus: {
        take: 1,
        select: {
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      itemOrderImage: {
        take: 1,
        select: {
          image: true,
        },
      },
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  return orders;
}

export const getOrderById = async (userId: string, orderId: string) => {
  const order = await prisma.itemOrder.findFirst({
    where: {
      userId,
      id: orderId,
    },
    select: {
      id: true,
      title: true,
      price: true,
      amount: true,
      itemNote: true,
      city: true,
      address: true,
      addressNote: true,
      itemOrderVariant: {
        select: {
          label: true,
          amount: true,
          price: true,
        },
      },
      itemOrderStatus: {
        select: {
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      itemOrderImage: {
        select: {
          image: true,
        },
      },
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new NotFoundError("Item Order tidak ditemukan");
  }

  return order;
}