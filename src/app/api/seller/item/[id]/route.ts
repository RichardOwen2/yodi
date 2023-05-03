import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";

import verifySellerAccess from "@/backend/services/seller";
import { getItemByIdandSeller } from "@/backend/services/seller/itemService";

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const userId = getTokenHandler(request);
    await verifySellerAccess(userId);

    const item = await getItemByIdandSeller(userId, id);

    return NextResponse.json({
      status: "success",
      data: {
        item,
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