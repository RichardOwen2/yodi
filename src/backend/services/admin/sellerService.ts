import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "../../libs/prismadb";

import type { PaginationParams } from "@/types";

const _checkIfSellerExist = async (id: string) => {
  const account = await prisma.seller.findUnique({
    where: {
      id,
    },
  });

  if (!account) {
    throw new NotFoundError("Akun tidak ditemukan");
  }
}

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
      verifiedAt: new Date(),
    }
  });

  if (!updated) {
    throw new InvariantError("Gagal memverifikasi seller");
  }
};

export const getSellers = async ({ page, itemCount }: PaginationParams) => {
  const accounts = await prisma.seller.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    select: {
      id: true,
      verifiedAt: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          status: true,
          email: true,
          image: true,
          address: true,
          phoneNumber: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        }
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return accounts;
}

export const getSellersBySearch = async (search: string, { page, itemCount }: PaginationParams) => {
  const accounts = await prisma.seller.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    select: {
      id: true,
      verifiedAt: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          username: true,
          status: true,
          email: true,
          image: true,
          address: true,
          phoneNumber: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        }
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return accounts;
}

export const getSellerById = async (id: string) => {
  const account = await prisma.seller.findFirst({
    select: {
      id: true,
      verifiedAt: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          status: true,
          username: true,
          email: true,
          image: true,
          address: true,
          phoneNumber: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        }
      },
    },
    where: {
      id
    },
  });

  if (!account) {
    throw new NotFoundError("Akun tidak ditemukan");
  }

  return account;
}
