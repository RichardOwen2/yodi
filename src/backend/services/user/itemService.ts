import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

import { getItemVariantStockById } from "../itemService";

export interface itemVariantDataType {
  where: {
    id: string;
  };
  data: {
    stock: {
      decrement: number;
    };
  };
}

interface takeStockParams {
  itemId: string;
  itemVariantDatas: itemVariantDataType[];
}

export const takeStocksFromItem = async ({ itemId, itemVariantDatas } : takeStockParams) => {
  const item = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      itemVariant: {
        updateMany: itemVariantDatas
      }
    }
  })

  if (!item) {
    throw new InvariantError("Gagal mengambil stock item");
  }
}