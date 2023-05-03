import { nanoid } from "nanoid"

import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "@/backend/libs/prismadb"

import type { PaginationParams } from "@/types";

interface addItemParams {
  title: string;
  description: string;
  images: string[];
  price: number;
  itemVariant: {
    label: string,
    price: number,
    stock: number,
  }[];
}

export const addItem = async (
  userId: string,
  {
    title,
    description,
    images,
    itemVariant,
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

  const imageData = images.map((image) => {
    return {
      image
    };
  });

  const itemVariantData = itemVariant.map((item) => {
    const id = `itemVariant-${nanoid(16)}`;

    return {
      ...item,
      id,
    }
  });

  const item = await prisma.item.create({
    data: {
      id,
      owner: seller.id,
      title,
      description,
      itemImage: {
        createMany: {
          data: imageData,
        },
      },
      itemVariant: {
        createMany: {
          data: itemVariantData,
        },
      },
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
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
      itemImage: {
        take: 1,
        select: {
          image: true,
        },
      },
      _count: {
        select: {
          itemVariant: true,
          cart: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
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
        },
      },
      verifiedAt: {
        not: null,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
      itemImage: {
        take: 1,
        select: {
          image: true,
        },
      },
      _count: {
        select: {
          itemVariant: true,
          cart: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return items;
}

export const getItemByIdandSeller = async (userId: string, itemId: string) => {
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
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
      itemImage: {
        select: {
          image: true,
        },
      },
      itemVariant: {
        select: {
          label: true,
          price: true,
          stock: true,
        },
      },
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