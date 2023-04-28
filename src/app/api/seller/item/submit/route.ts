import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";

import verifySellerAccess from "@/backend/services/seller";
import { validatePostItemPayload } from "@/backend/validators/seller/itemValidator";
import { addItem } from "@/backend/services/seller/itemService";

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifySellerAccess(userId);

    const body = await request.json();
    validatePostItemPayload(body);

    const {
      title,
      description = "",
      image,
      price,
      stock,
    } = body;

    await addItem(userId, { title, description, image, price, stock });

    return NextResponse.json({
      status: "success",
      message: "Berhasil mengajukan item penjualan",
    }, { status: 201 });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}