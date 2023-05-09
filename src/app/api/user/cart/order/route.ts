import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";
import { validatePostCartOrderPayload } from "@/backend/validators/user/cartValidator";
import { deleteOrderedCartById, deleteOrderedItemVariantCartById, getOrderDataCart, verifyCartAccess } from "@/backend/services/user/cartService";
import { orderItem } from "@/backend/services/user/orderService";

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePostCartOrderPayload(body);

    const { cartId, cartVariant, itemNote, addressId, shipperId } = body;

    await verifyCartAccess({ userId, cartId });
    const { itemId, itemVariant } = await getOrderDataCart(cartId, cartVariant);
    const title = await orderItem(userId, { addressId, shipperId, itemId, itemVariant, itemNote });

    if (cartVariant) {
      await deleteOrderedItemVariantCartById(cartVariant);
    } else {
      await deleteOrderedCartById(cartId);
    }

    return NextResponse.json({
      status: "success",
      message: `Berhasil melakukan order ${title}`,
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}