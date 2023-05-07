import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import { getShippers } from "@/backend/services/shipperService";

export async function GET() {
  try {
    const shippers = await getShippers();

    return NextResponse.json({
      status: "success",
      data: {
        shippers,
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