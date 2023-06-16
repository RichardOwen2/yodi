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
      status: "success",
      data: {
        seller,
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}