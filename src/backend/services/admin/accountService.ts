import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "../../libs/prismadb";

import type { PaginationParams } from "@/types";

const _checkIfAccountExist = async (id: string) => {
  const account = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!account) {
    throw new NotFoundError("Akun tidak ditemukan");
  }
}

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
      status: true,
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
      address: true,
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
