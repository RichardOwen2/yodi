import NotFoundError from "../errors/NotFoundError";
import InvariantError from "../errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

import { AccountStatus } from "@prisma/client";
import type { PaginationParams } from "@/types";

export const getItems = async ({ page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
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
  });

  return items;
}

export const getItemsBySearch = async (search: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
        }
      },
      title: {
        contains: search,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
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
  });

  return items;
}

export const getItemById = async (itemId: string) => {
  const item = await prisma.item.findFirst({
    where: {
      id: itemId,
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
        }
      },
    },
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
  });

  if (!item) {
    throw new NotFoundError("Item Tidak ditemukan")
  }

  return item;
}