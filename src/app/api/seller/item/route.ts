import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";

import verifySellerAccess from "@/backend/services/seller";
import { validatePostItemPayload } from "@/backend/validators/seller/itemValidator";

import getPaginationParams from "@/backend/utils/getPaginationParams";

import { getItemsBySeller, getVerifiedItemsBySeller } from "@/backend/services/seller/itemService";
import { addItem } from "@/backend/services/seller/itemService";

export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifySellerAccess(userId);

    const { searchParams } = new URL(request.url);

    const { page, itemCount } = getPaginationParams(searchParams);
    const verified = searchParams.get("verified");

    if (!verified) {
      const items = await getItemsBySeller(userId, { page, itemCount });

      return NextResponse.json({
        message: "success",
        data: {
          items,
        },
      });
    }

    const items = await getVerifiedItemsBySeller(userId, { page, itemCount });

    return NextResponse.json({
      message: "success",
      data: {
        items,
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
