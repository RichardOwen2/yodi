import InvariantError from "@/backend/errors/InvariantError";

import prisma from "../../libs/prismadb";

import type { PaginationParams } from "@/types";

export const verifySellerById = async (id: string) => {
  const seller = await prisma.seller.findUnique({
    where: {
      id,
    },
  });

  if (!seller) {
    throw new InvariantError("Seller tidak ditemukan")
  }

  if (seller.verifiedAt) {
    throw new InvariantError("Seller sudah diverifikasi");
  }

  const updated = await prisma.seller.update({
    where: {
      id,
    },
    data: {
      verifiedAt: new Date()
    }
  });

  if (!updated) {
    throw new InvariantError("Gagal memverifikasi seller");
  }
};

export const getAccounts = async ({ page, itemCount }: PaginationParams) => {
  const accounts = await prisma.user.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    select: {
      seller: {
        select: {
          id: true,
          verifiedAt: true,
        },
      },
      id: true,
      username: true,
      email: true,
      image: true,
      address: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return accounts;
}

export const getAccountsBySearch = async (search: string, { page, itemCount }: PaginationParams) => {
  const accounts = await prisma.user.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    select: {
      seller: {
        select: {
          id: true,
          verifiedAt: true,
        },
      },
      id: true,
      username: true,
      email: true,
      image: true,
      address: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
    where: {
      OR: [
        { username: { contains: search } },
        { email: { contains: search } }
      ]
    },
  });

  return accounts;
}