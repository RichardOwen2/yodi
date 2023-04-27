import { nanoid } from "nanoid";

import InvariantError from "@/backend/errors/InvariantError";

import prisma from "../../libs/prismadb";

export const verifySellerById = async (id: string) => {
  const seller = await prisma.seller.findUnique({
    where: {
      id,
    }
  });

  if (!seller) {
    throw new InvariantError("Seller tidak ditemukan")
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

