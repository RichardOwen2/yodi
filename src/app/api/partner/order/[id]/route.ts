import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";

import verifySellerAccess from "@/backend/services/seller";

import { getOrderById } from "@/backend/services/seller/orderService";

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const userId = getTokenHandler(request);
    await verifySellerAccess(userId);

    const order = await getOrderById(userId, id);

    return NextResponse.json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}
