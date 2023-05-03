import { nanoid } from "nanoid"

import InvariantError from "@/backend/errors/InvariantError";
import NotFoundError from "@/backend/errors/NotFoundError";

import prisma from "@/backend/libs/prismadb"

import type { PaginationParams } from "@/types";

// export const getOrders = async (sellerId: string, { page, itemCount }: PaginationParams) => {
//   if (page < 1 || itemCount < 1) {
//     throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
//   }

//   const orders = await prisma.itemOrder.findMany({
//     skip: itemCount * (page - 1),
//     take: itemCount,
//     where: {
//       item: {
//         seller: {
//           id: sellerId,
//         },
//       },
//     },
//   });
// } 