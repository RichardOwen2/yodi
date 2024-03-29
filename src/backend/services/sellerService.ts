import NotFoundError from "../errors/NotFoundError";
import InvariantError from "../errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

import { AccountStatus } from "@prisma/client";
import type { PaginationParams } from "@/types";


export const getItemBySeller = async (sellerPagination: PaginationParams, itemItemCount: number) => {
  if (
    sellerPagination.page < 1 ||
    sellerPagination.itemCount < 1 ||
    itemItemCount < 1
  ) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const sellers = await prisma.seller.findMany({
    skip: sellerPagination.page * (sellerPagination.page - 1),
    take: sellerPagination.itemCount,
    where: {
      verifiedAt: {
        not: null,
      },
      user: {
        status: AccountStatus.ACTIVE,
      },
    },
    orderBy: {
      soldCount: 'desc',
    },
    select: {
      id: true,
      city: true,
      user: {
        select: {
          image: true,
          username: true,
        },
      },
      item: {
        take: itemItemCount,
        where: {
          verifiedAt: {
            not: null,
          },
        },
        orderBy: {
          sold: 'desc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          sold: true,
          itemImage: {
            take: 1,
            select: {
              image: true,
            },
          },
          itemVariant: {
            select: {
              price: true,
            },
            orderBy: {
              price: 'asc'
            },
          },
          _count: {
            select: {
              itemVariant: true,
            },
          },
        },
      },
    },
  });

  return sellers;
}

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
      soldCount: true,
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

export const getSellerDetailById = async (id: string) => {
  const seller = await prisma.seller.findFirst({
    where: {
      id,
      verifiedAt: {
        not: null,
      },
    },
    select: {
      id: true,
      city: true,
      soldCount: true,
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });

  if (!seller) {
    throw new NotFoundError("Seller tidak ditemukan");
  }

  return seller;
}

export const getItemBySellerId = async (id: string, { page, itemCount }: PaginationParams) => {
  const items = await prisma.seller.findFirst({
    where: {
      id,
      verifiedAt: {
        not: null,
      },
    },
    select: {
      item: {
        skip: itemCount * (page - 1),
        take: itemCount,
        where: {
          verifiedAt: {
            not: null,
          },
        },
        select: {
          id: true,
          title: true,
          itemImage: {
            take: 1,
            select: {
              image: true,
            },
          },
          itemVariant: {
            orderBy: {
              price: 'asc',
            },
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  return items;
}
