import { nanoid } from "nanoid";

import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";
import AuthorizationError from "@/backend/errors/AuthorizationError";

import prisma from "@/backend/libs/prismadb"

import { AccountStatus } from "@prisma/client";
import { checkIfTheItemAvailable, getItemVariantStockById } from "../itemService";

interface CartParams {
  itemId: string;
  itemVariant: {
    id: string,
    amount: number,
  }[];
}

interface CartData {
  cartVariant: {
    itemVariant: {
      id: string;
      label: string;
      stock: number;
    };
    amount: number;
  }[];
  id: string;
}

interface CartUpdatedVariantData {
  where: {
    itemVariantId: string;
  };
  data: {
    amount: number;
  };
}

interface CartNewVariantData {
  id: string;
  itemVariantId: string;
  amount: number;
}

interface ChangeCartParams {
  cartId: string;
  itemVariant: {
    id: string;
    amount: number;
  }[];
}

interface DeleteCartParams {
  cartId: string;
  cartVariantId: string;
}

const _verifyCartAccess = async ({ userId, cartId }: { userId: string, cartId: string }) => {
  const cart = await prisma.cart.findFirst({
    where: {
      id: cartId,
    },
    select: {
      userId: true,
      item: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!cart) {
    throw new NotFoundError("Cart tidak ditemukan");
  }

  if (cart.userId !== userId) {
    throw new AuthorizationError("Anda tidak berhak mengakses resource ini");
  }

  return cart.item.id;
}

const _checkIfVariantExist = async (cartId: string) => {
  const variant = await prisma.cartVariant.findFirst({
    where: {
      cartId,
    },
  });

  if (!variant) {
    await prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
  }
}

const _checkIfItemAlreadyInCart = async (userId: string, itemId: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      itemId,
      userId,
    },
    select: {
      id: true,
      cartVariant: {
        select: {
          amount: true,
          itemVariant: {
            select: {
              id: true,
              label: true,
              stock: true,
            },
          },
        },
      },
    },
  });

  return cart;
}

const _addNewVariantItemToCart = async (cartData: CartData, { itemId, itemVariant }: CartParams) => {
  const cartNewVariantData: CartNewVariantData[] = [];

  const cartUpdatedVariantData: CartUpdatedVariantData[] = [];

  await Promise.all(itemVariant.map(async ({ id, amount }) => {
    const { stock, label } = await getItemVariantStockById(itemId, id);

    const existingVariant = cartData.cartVariant.find(
      ({ itemVariant }) => itemVariant.id === id
    );

    if (existingVariant) {
      const variantAmount = amount + existingVariant.amount;

      if (variantAmount > stock) {
        throw new InvariantError(`Stock item variant ${label} tidak cukup`);
      }

      cartUpdatedVariantData.push({
        where: {
          itemVariantId: id,
        },
        data: {
          amount: variantAmount,
        },
      });

      return;
    }

    if (amount > stock) {
      throw new InvariantError(`Stock item variant ${label} tidak cukup`);
    }

    const cartVariantId = `cartVariant-${nanoid(16)}`;

    cartNewVariantData.push({
      id: cartVariantId,
      itemVariantId: id,
      amount,
    });

    return;
  }));


  const cart = await prisma.cart.update({
    where: {
      id: cartData.id,
    },
    data: {
      cartVariant: {
        updateMany: cartUpdatedVariantData,
        createMany: {
          data: cartNewVariantData,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!cart) {
    throw new InvariantError("Gagal menambahkan variasi item");
  }
}

export const addItemToCart = async (userId: string, { itemId, itemVariant }: CartParams) => {
  const { title } = await checkIfTheItemAvailable(itemId);

  const cartData = await _checkIfItemAlreadyInCart(userId, itemId);

  if (cartData) {
    await _addNewVariantItemToCart(cartData, { itemId, itemVariant });
    return title;
  }

  const cartId = `cart-${nanoid(16)}`;

  const cartVariantData = await Promise.all(itemVariant.map(async ({ id, amount }) => {
    const { stock, label } = await getItemVariantStockById(itemId, id);

    if (amount > stock) {
      throw new InvariantError(`Stock item variant ${label} tidak cukup`);
    }

    const cartVariantId = `cartVariant-${nanoid(16)}`;

    return {
      id: cartVariantId,
      itemVariantId: id,
      amount,
    };
  }));

  const cart = await prisma.cart.create({
    data: {
      id: cartId,
      userId,
      itemId,
      cartVariant: {
        createMany: {
          data: cartVariantData,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!cart) {
    throw new InvariantError("Gagal menambahkan item di keranjang");
  }

  return title;
}

export const getCartItems = async (userId: string) => {
  const items = await prisma.cart.findMany({
    where: {
      userId,
      item: {
        seller: {
          verifiedAt: {
            not: null,
          },
          user: {
            status: AccountStatus.ACTIVE,
          }
        }
      }
    },
    select: {
      id: true,
      item: {
        select: {
          id: true,
          title: true,
          seller: {
            select: {
              city: true,
              user: {
                select: {
                  image: true,
                },
              },
            },
          },
          itemImage: {
            take: 1,
            select: {
              image: true,
            },
          },
        },
      },
      cartVariant: {
        select: {
          id: true,
          amount: true,
          itemVariant: {
            select: {
              label: true,
              price: true
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return items;
}

export const changeAmountItemCartVariant = async (userId: string, { cartId, itemVariant }: ChangeCartParams) => {
  const itemId = await _verifyCartAccess({ userId, cartId });

  const cartVariantData = await Promise.all(itemVariant.map(async ({ id, amount }) => {
    const { stock, label } = await getItemVariantStockById(itemId, id);

    if (amount > stock) {
      throw new InvariantError(`Stock item variant ${label} tidak cukup`);
    }

    return {
      where: {
        itemVariantId: id,
      },
      data: {
        amount,
      },
    };
  }));

  const cart = await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: {
      cartVariant: {
        updateMany: cartVariantData,
      },
    },
  });

  if (!cart) {
    throw new InvariantError("Gagal melakukan update cart");
  }
}

export const deleteItemVariantOnCart = async (userId: string, { cartId, cartVariantId }: DeleteCartParams) => {
  await _verifyCartAccess({ userId, cartId });

  const cart = await prisma.cartVariant.delete({
    where: {
      id: cartVariantId,
    },
    select: {
      itemVariant: {
        select: {
          label: true,
        }
      }
    },
  });

  if (!cart) {
    throw new InvariantError("Gagal menghapus item dalam cart");
  }

  await _checkIfVariantExist(cartId);

  return cart.itemVariant.label;
}