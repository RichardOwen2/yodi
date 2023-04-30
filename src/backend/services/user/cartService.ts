import { nanoid } from "nanoid";

import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

import { AccountStatus } from "@prisma/client";
import { getItemById } from "../itemService";

interface CartParams {
  userId: string;
  itemId: string;
}

const _checkIfCartExist = async ({ userId, itemId }: CartParams) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
    select: {
      item: {
        select: {
          title: true,
          stock: true,
        },
      },
      amount: true,
    },
  });

  if (!cart) {
    throw new NotFoundError("Gagal melakukan update, item tidak ditemukan");
  }

  return cart;
}

export const addItemToCart = async ({ userId, itemId }: CartParams, amount: number) => {
  const item = await getItemById(itemId);

  if (amount > item.stock) {
    throw new InvariantError("Stock item tidak cukup");
  }

  const id = `cart-${nanoid(16)}`;

  const cart = await prisma.cart.create({
    data: {
      id,
      userId,
      itemId,
      amount
    },
  });

  if (!cart) {
    throw new InvariantError("Gagal menambahkan item di keranjang");
  }

  return item.title;
}

export const getCartItems = async (userId: string) => {
  const items = await prisma.cart.findMany({
    where: {
      userId,
      item: {
        seller: {
          verifiedAt: {
            not: null,
          },
          user: {
            status: AccountStatus.ACTIVE,
          }
        }
      }
    },
    select: {
      amount: true,
      item: {
        select: {
          seller: {
            select: {
              user: {
                select: {
                  username: true,
                  image: true,
                }
              }
            },
          },
          id: true,
          title: true,
          description: true,
          image: true,
          price: true,
          stock: true,
        },
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return items;
}

export const changeAmountItemCart = async ({ userId, itemId }: CartParams, amount: number) => {
  const { amount: cartAmount, item } = await _checkIfCartExist({ userId, itemId });

  if (amount > item.stock) {
    throw new InvariantError("Stock item tidak cukup");
  }

  if (cartAmount === amount) {
    return item.title;
  }

  const verify = await prisma.cart.update({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
    data: {
      amount
    },
    select: {
      id: true,
    },
  });

  if (!verify) {
    throw new InvariantError("Gagal melakukan update jumlah barang");
  }

  return item.title;
}

export const deleteItemOnCart = async ({ userId, itemId }: CartParams) => {
  const cart = await _checkIfCartExist({ userId, itemId });

  if (!cart) {
    throw new NotFoundError("Item cart tidak ditemukan");
  }

  const verify = await prisma.cart.delete({
    where: {
      userId_itemId: {
        userId,
        itemId,
      },
    },
    select: {
      id: true,
    },
  });

  if (!verify) {
    throw new InvariantError("Gagal menghapus item dalam cart");
  }

  return cart.item.title;
}