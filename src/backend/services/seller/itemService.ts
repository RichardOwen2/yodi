import { nanoid } from "nanoid"

import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "@/backend/libs/prismadb"

import type { PaginationParams } from "@/types";

interface addItemParams {
  title: string;
  description: string;
  image: string;
  price: number;
  stock: number;
}

export const addItem = async (
  userId: string,
  {
    title,
    description,
    image,
    price,
    stock
  }: addItemParams
) => {
  const id = `item-${nanoid(16)}`

  const seller = await prisma.seller.findUnique({
    where: {
      userId
    },
    select: {
      id: true,
    },
  });

  if (!seller) {
    throw new InvariantError("Item gagal ditambahkan");
  }

  const item = await prisma.item.create({
    data: {
      id,
      owner: seller.id,
      title,
      description,
      image,
      price,
      stock,
    },
    select: {
      id: true,
    },
  });

  if (!item) {
    throw new InvariantError("Item gagal ditambahkan");
  }
}

export const getItemsBySeller = async (userId: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        user: {
          id: userId
        }
      }
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
    }
  });

  return items;
}

export const getVerifiedItemsBySeller = async (userId: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        user: {
          id: userId
        }
      },
      verifiedAt: {
        not: null,
      },
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
    }
  });

  return items;
}

export const getItemsByIdandSeller = async (userId: string, itemId: string) => {
  const item = await prisma.item.findFirst({
    where: {
      seller: {
        user: {
          id: userId
        }
      },
      id: itemId
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
    }
  });

  if (!item) {
    throw new NotFoundError("Item tidak ditemukan");
  }

  return item;
}