import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "../../libs/prismadb";

export const getSellerProfileById = async (id: string) => {
  const user = await prisma.seller.findFirst({
    where: {
      user: {
        id,
      },
    },
  });

  if (!user) {
    throw new NotFoundError("Akun Seller tidak ditemukan");
  };

  return user;
}