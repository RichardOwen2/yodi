import NotFoundError from "@/backend/errors/NotFoundError";
import InvariantError from "@/backend/errors/InvariantError";

import prisma from "@/backend/libs/prismadb"

import { getItemVariantStockById } from "../itemService";
import { getAddressById } from "./addressService";
import { getShipperById } from "../shipperService";
import { nanoid } from "nanoid";
import { RequestStatus } from "@prisma/client";

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

interface addItemRequestParams {
  itemId: string;
  image: string[];
  itemNote: string;
  variant: {
    id: string;
    amount: number;
  }[];
  shipperId: string;
  addressId: string;
}

export const takeStocksFromItem = async ({ itemId, itemVariantDatas }: takeStockParams) => {
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

export const addItemRequestByItemId = async (userId: string, { itemId, image, itemNote, variant, shipperId, addressId }: addItemRequestParams) => {
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
    select: {
      title: true,
      description: true,
      seller: {
        select: {
          id: true,
        }
      },
      itemVariant: {
        where: {
          id: {
            in: variant.map(({ id }) => id)
          }
        },
        select: {
          id: true,
          label: true,
          price: true,
        },
      },
      itemImage: {
        select: {
          image: true,
        },
      },
    },
  });

  if (!item) {
    throw new NotFoundError("Item tidak ditemukan");
  }

  const { city, address, postalCode, note } = await getAddressById(userId, { addressId });
  const { name, price: shipperPrice } = await getShipperById(shipperId);

  const itemRequestId = `itemRequest-${nanoid(16)}`;
  const itemRequestStatusId = `itemRequestStatus-${nanoid(16)}`;

  const itemRequestVariantData = variant.map(({ id, amount }) => {
    const itemData = item.itemVariant.find(({ id: itemId }) => itemId === id);

    if (!itemData) {
      throw new InvariantError("Terjadi Kesalahan");
    }

    const itemRequestVariantId = `requestVariant-${nanoid(16)}`;

    return {
      id: itemRequestVariantId,
      label: itemData.label,
      price: itemData.price,
      amount,
    }
  });

  const itemRequestAmount = itemRequestVariantData.reduce((total, { amount }) => {
    return total + amount;
  }, 0);

  const itemRequestPrice = itemRequestVariantData.reduce((total, { price, amount }) => {
    return total + (price * amount);
  }, shipperPrice);

  const itemRequest = await prisma.itemRequest.create({
    data: {
      id: itemRequestId,
      userId,
      sellerId: item.seller.id,
      itemName: `${item.title}-custom`,
      image: item.itemImage[0].image,
      description: item.description,
      itemNote,
      price: itemRequestPrice,
      amount: itemRequestAmount,
      city,
      address,
      addressNote: note,
      postalCode,
      shipper: name,
      itemRequestImage: {
        createMany: {
          data: image.map((image) => { return { image } }),
        },
      },
      ItemRequestVariant: {
        createMany: {
          data: itemRequestVariantData
        }
      },
      itemRequestStatus: {
        create: {
          id: itemRequestStatusId,
          status: RequestStatus.SELLER_VERIFICATION,
        },
      },
    },
    select: {
      itemName: true,
    },
  });

  if (!itemRequest) {
    throw new InvariantError("Terjadi Kesalahan");
  }

  return itemRequest.itemName;
}

export const getItemRequestByUser = async (userId: string) => {
  const itemRequest = await prisma.itemRequest.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      itemName: true,
    }
  });

  return itemRequest;
}
