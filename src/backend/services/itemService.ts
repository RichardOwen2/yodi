import NotFoundError from "../errors/NotFoundError";
import InvariantError from "../errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

import { AccountStatus } from "@prisma/client";
import type { PaginationParams } from "@/types";

export const getItems = async ({ page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
        }
      },
      verifiedAt: {
        not: null,
      },
    },
    orderBy: {
      sold: 'desc',
    },
    select: {
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
              image: true,
            }
          }
        },
      },
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
  });

  return items;
}

export const getItemsBySearch = async (search: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
        }
      },
      verifiedAt: {
        not: null,
      },
      title: {
        contains: search,
      },
    },
    orderBy: {
      sold: 'desc',
    },
    select: {
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
              image: true,
            }
          }
        },
      },
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
      },
      _count: {
        select: {
          itemVariant: true,
        },
      },
    },
  });

  return items;
}

export const getItemsBySeller = async (seller: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
          username: {
            contains: seller,
          },
        },
      },
      verifiedAt: {
        not: null,
      },
    },
    orderBy: {
      sold: 'desc',
    },
    select: {
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
              image: true,
            }
          }
        },
      },
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
      },
      _count: {
        select: {
          itemVariant: true,
        },
      },
    },
  });

  return items;
}

export const getItemsBySellerAndSearch = async (search: string, seller: string, { page, itemCount }: PaginationParams) => {
  if (page < 1 || itemCount < 1) {
    throw new InvariantError("Page dan itemcount tidak boleh kurang dari 1");
  }

  const items = await prisma.item.findMany({
    skip: itemCount * (page - 1),
    take: itemCount,
    where: {
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
          username: {
            contains: seller,
          },
        },
      },
      verifiedAt: {
        not: null,
      },
      title: {
        contains: search,
      },
    },
    orderBy: {
      sold: 'desc',
    },
    select: {
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
              image: true,
            }
          }
        },
      },
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
  });

  return items;
}

export const getItemById = async (itemId: string) => {
  const item = await prisma.item.findFirst({
    where: {
      id: itemId,
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
        }
      },
    },
    select: {
      seller: {
        select: {
          city: true,
          user: {
            select: {
              username: true,
              image: true,
            }
          }
        },
      },
      id: true,
      title: true,
      description: true,
      sold: true,
      itemImage: {
        select: {
          image: true,
        },
      },
      itemVariant: {
        select: {
          id: true,
          label: true,
          price: true,
          stock: true,
        },
      },
    },
  });

  if (!item) {
    throw new NotFoundError("Item Tidak ditemukan")
  }

  return item;
}

export const checkIfTheItemAvailable = async (itemId: string) => {
  const item = await prisma.item.findFirst({
    where: {
      id: itemId,
      seller: {
        verifiedAt: {
          not: null,
        },
        user: {
          status: AccountStatus.ACTIVE,
        },
      },
      verifiedAt: {
        not: null,
      },
    },
    select: {
      itemImage: {
        select: {
          image: true,
        }
      },
      seller: {
        select: {
          id: true,
        }
      },
      title: true,
      description: true,
    },
  });

  if (!item) {
    throw new InvariantError("Item tidak ditemukan/tersedia");
  }

  return {
    itemImage: item.itemImage,
    title: item.title,
    description: item.description,
    sellerId: item.seller.id,
  };
}

export const getItemVariantStockById = async (itemId: string, itemVariantId: string) => {
  const stock = await prisma.itemVariant.findFirst({
    where: {
      id: itemVariantId,
      item: {
        id: itemId,
      },
    },
    select: {
      label: true,
      stock: true,
      price: true,
    },
  });

  if (!stock) {
    throw new NotFoundError("Item tidak ditemukan");
  }

  return stock;
}
