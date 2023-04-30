import { nanoid } from "nanoid"

import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "@/backend/libs/prismadb"
import { PaginationParams } from "@/types";

export const verifyItemById = async (itemId: string) => {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      verifiedAt: true,
    }
  });

  if (!item) {
    throw new NotFoundError("Item tidak ditemukan");
  }

  if (item.verifiedAt) {
    throw new InvariantError("Item sudah diverifikasi");
  }

  const verify = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      verifiedAt: new Date(),
    },
  });

  if (!verify) {
    throw new InvariantError("Gagal memverifikasi item");
  }
}

export const getItems = async ({ page, itemCount }: PaginationParams) => {
  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    select: {
      id: true,
      title: true,
      price: true,
      stock: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
      seller: {
        select: {
          id: true,
          city: true,
          verifiedAt: true,
          user: {
            select: {
              username: true,
              email: true,
              status: true,
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return items;
}

export const getItemsBySearch = async (search: string, { page, itemCount }: PaginationParams) => {
  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      title: {
        contains: search,
      },
    },
    select: {
      id: true,
      title: true,
      price: true,
      stock: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
      seller: {
        select: {
          id: true,
          city: true,
          verifiedAt: true,
          user: {
            select: {
              username: true,
              email: true,
              status: true,
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return items;
}

export const getItemById = async (id: string) => {
  const item = await prisma.item.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
      price: true,
      stock: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
      seller: {
        select: {
          id: true,
          city: true,
          address: true,
          verifiedAt: true,
          user: {
            select: {
              username: true,
              email: true,
              image: true,
              status: true,
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!item) {
    throw new NotFoundError("Item tidak ditemukan");
  }

  return item;
}