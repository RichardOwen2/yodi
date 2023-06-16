import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";

import {
  addItemToCart,
  getCartItems,
  changeAmountItemCartVariant,
  deleteItemVariantOnCart,
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
      ...data
    }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePostCartPayload(body);

    const title = await addItemToCart(userId, body);

    return NextResponse.json({
      status: "success",
      message: `Berhasil menambahkan ${title} didalam cart`,
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePutCartPayload(body);

    const title = await changeAmountItemCartVariant(userId, body);

    return NextResponse.json({
      status: "success",
      message: `Berhasil melakukan edit jumlah ${title} didalam cart`
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validateDeleteCartPayload(body);

    const title = await deleteItemVariantOnCart(userId, body);

    return NextResponse.json({
      status: "success",
      message: `Berhasil menghapus ${title} didalam cart`,
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}