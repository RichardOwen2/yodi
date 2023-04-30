import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";

import {
  addItemToCart,
  getCartItems,
  changeAmountItemCart,
  deleteItemOnCart
} from "@/backend/services/user/cartService";

import {
  validatePostCartPayload,
  validatePutCartPayload,
  validateDeleteCartPayload
} from "@/backend/validators/user/cartValidator";

export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const cart = await getCartItems(userId);

    return NextResponse.json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePostCartPayload(body);

    const { itemId, amount } = body;

    const title = await addItemToCart({ userId, itemId }, amount);

    return NextResponse.json({
      status: "success",
      message: `Berhasil menambahkan ${title} didalam cart`,
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePutCartPayload(body);

    const { itemId, amount } = body;

    const title = await changeAmountItemCart({ userId, itemId }, amount);

    return NextResponse.json({
      status: "success",
      message: `Berhasil melakukan edit jumlah ${title} didalam cart`
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validateDeleteCartPayload(body);

    const { itemId } = body;

    const title = await deleteItemOnCart({ userId, itemId });

    return NextResponse.json({
      status: "success",
      message: `Berhasil menghapus ${title} didalam cart`,
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}