import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

export const takeStockFromItem = async (itemId: string, amount: number) => {
  const item = await prisma.item.update({
    where: {
      id: itemId
    },
    data: {
      stock: {
        decrement: amount
      }
    },
    select: {
      id: true,
    },
  });

  if (!item) {
    throw new InvariantError("Gagal mengambil stock item");
  }
}