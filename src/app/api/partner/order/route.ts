import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";

import verifySellerAccess from "@/backend/services/seller";

import getPaginationParams from "@/backend/utils/getPaginationParams";
import { getOrders } from "@/backend/services/seller/orderService";


export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifySellerAccess(userId);

    const { searchParams } = new URL(request.url);

    const page = getPaginationParams(searchParams);

    const orders = await getOrders(userId, page);

    return NextResponse.json({
      status: "success",
      data: {
        orders,
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}
