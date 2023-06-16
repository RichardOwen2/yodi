import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";

import verifySellerAccess from "@/backend/services/seller";

import { updateOrderStatus } from "@/backend/services/seller/orderService";
import { OrderStatus } from "@prisma/client";

interface Params {
  params: {
    id: string
  }
}

export async function POST(request: Request, { params: { id } }: Params) {
  try {
    const userId = getTokenHandler(request);
    await verifySellerAccess(userId);

    const item = await updateOrderStatus(userId, id, OrderStatus.ARRIVE);

    return NextResponse.json({
      status: "success",
      message: `Berhasil mengubah status ${item}`
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}
