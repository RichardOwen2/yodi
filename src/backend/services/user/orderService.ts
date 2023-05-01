import { nanoid } from "nanoid";

import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";

import prisma from "@/backend/libs/prismadb"
import { PaginationParams } from "@/types";
import { ItemStatus } from "@prisma/client";

import { getItemStockById } from "../itemService";
import { takeStockFromItem } from "./itemService";

interface OrderParams {
  userId: string;
  itemId: string;
}

export const orderItem = async ({ userId, itemId }: OrderParams, amount: number) => {
  const { price, stock, title } = await getItemStockById(itemId);

  if (amount > stock) {
    throw new InvariantError("Stock barang tidak cukup!");
  }

  await takeStockFromItem(itemId, amount);

  const orderId = `itemOrder-${nanoid(16)}`;
  const statusId = `itemOrderStatus-${nanoid(16)}`

  const order = await prisma.itemOrder.create({
    data: {
      id: orderId,
      userId,
      itemId,
      amount,
      price,
      ItemOrderStatus: {
        create: {
          id: statusId,
          status: ItemStatus.PAYMENT,
        }
      }
    },
    select: {
      id: true,
    },
  });

  if (!order) {
    await takeStockFromItem(itemId, -amount);

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
      price: true,
      amount: true,
      ItemOrderStatus: {
        select: {
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      item: {
        select: {
          title: true,
          image: true,
          seller: {
            select: {
              city: true,
              user: {
                select: {
                  username: true,
                  phoneNumber: true,
                },
              },
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
      item: {
        title: {
          contains: search
        }
      }
    },
    select: {
      price: true,
      amount: true,
      ItemOrderStatus: {
        select: {
          status: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      item: {
        select: {
          title: true,
          image: true,
          seller: {
            select: {
              city: true,
              user: {
                select: {
                  username: true,
                  phoneNumber: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return orders;
}