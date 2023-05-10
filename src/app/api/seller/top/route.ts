import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import { getTopSeller } from "@/backend/services/sellerService";

export async function GET() {
  try {
    const sellers = await getTopSeller();

    return NextResponse.json({
      message: "success",
      data: {
        sellers,
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