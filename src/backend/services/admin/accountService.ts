import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "../../libs/prismadb";

import type { PaginationParams } from "@/types";
import { AccountStatus } from "@prisma/client";

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
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
    orderBy: {
      createdAt: 'desc',
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
      status: true,
      email: true,
      image: true,
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
    orderBy: {
      createdAt: 'desc',
    },
  });

  return accounts;
}

export const getAccountById = async (id: string) => {
  const account = await prisma.user.findFirst({
    select: {
      seller: {
        select: {
          id: true,
          verifiedAt: true,
        },
      },
      id: true,
      username: true,
      status: true,
      email: true,
      image: true,
      phoneNumber: true,
      createdAt: true,
      updatedAt: true,
      password: false,
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

export const banAccountById = async (id: string) => {
  const account = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      status: true,
    },
  });

  if (!account) {
    throw new NotFoundError("Akun tidak ditemukan");
  }

  if (account.status === AccountStatus.BANNED) {
    throw new InvariantError("Akun telah dibanned, tidak bisa melakukan banned lagi");
  }

  const verify = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: AccountStatus.BANNED,
    },
    select: {
      id: true,
    },
  });

  if (!verify) {
    throw new InvariantError("Gagal melakukan ban akun")
  }
}

export const unbanAccountById = async (id: string) => {
  const account = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      status: true,
    },
  });

  if (!account) {
    throw new NotFoundError("Akun tidak ditemukan");
  }

  if (account.status === AccountStatus.ACTIVE) {
    throw new InvariantError("Tidak dapat melakukan unban terhadap akun aktif");
  }

  const verify = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: AccountStatus.ACTIVE,
    },
    select: {
      id: true,
    },
  });

  if (!verify) {
    throw new InvariantError("Gagal melakukan ban akun")
  }
}