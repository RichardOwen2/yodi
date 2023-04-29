import { nanoid } from "nanoid"

import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "@/backend/libs/prismadb"

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