import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import { getSellerDetailById } from "@/backend/services/sellerService";

interface Params {
  params: {
    id: string
  }
}


export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const seller = await getSellerDetailById(id);

    return NextResponse.json({
      message: "success",
      data: {
        seller,
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