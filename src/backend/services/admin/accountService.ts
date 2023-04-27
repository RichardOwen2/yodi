import InvariantError from "@/backend/errors/InvariantError";

import prisma from "../../libs/prismadb";

export const verifySellerById = async (id: string) => {
  const seller = await prisma.seller.findUnique({
    where: {
      id,
    },
    select: {
      verifiedAt: true,
    }
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

