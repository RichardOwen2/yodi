import NotFoundError from "../errors/NotFoundError";
import InvariantError from "../errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

import { AccountStatus } from "@prisma/client";
import type { PaginationParams } from "@/types";


export const getTopSeller = async () => {
  const sellers = await prisma.seller.findMany({
    take: 6,
    where: {
      user: {
        status: AccountStatus.ACTIVE,
      },
    },
    select: {
      id: true,
      city: true,
      user: {
        select: {
          username: true,
          image: true,
        }
      },
    },
    orderBy: {
      soldCount: 'desc',
    },
  });

  return sellers;
}