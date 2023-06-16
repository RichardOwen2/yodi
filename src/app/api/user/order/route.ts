import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";
import getPaginationParams from "@/backend/utils/getPaginationParams";

import { validatePostOrderPayload } from "@/backend/validators/user/orderValidator";

import { getOrders, getOrdersBySearch, orderItem } from "@/backend/services/user/orderService";


export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);
    verifyUserAccess(userId);

    const { searchParams } = new URL(request.url);
    const { page, itemCount } = getPaginationParams(searchParams);
    const search = searchParams.get("search");

    if (search) {
      const orders = await getOrdersBySearch(userId, search, { page, itemCount });

      return NextResponse.json({
        status: "success",
        data: {
          orders
        },
      });
    }

    const orders = await getOrders(userId, { page, itemCount });

    return NextResponse.json({
      status: "success",
      data: {
        orders
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
    verifyUserAccess(userId);

    const body = await request.json();
    validatePostOrderPayload(body);

    const title = await orderItem(userId, body);

    return NextResponse.json({
      status: "success",
      message: `Berhasil melakukan checkout ${title}`
    }, { status: 201 })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

