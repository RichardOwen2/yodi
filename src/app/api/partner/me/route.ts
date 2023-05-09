import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";
import { getSellerProfileById } from "@/backend/services/seller/accountService";

export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);

    const user = await getSellerProfileById(userId);

    return NextResponse.json({
      message: "success",
      data: {
        user,
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