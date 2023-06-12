import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import getPaginationParams from "@/backend/utils/getPaginationParams";
import { getItemBySellerId } from "@/backend/services/sellerService";

interface Params {
  params: {
    id: string
  }
}


export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const { searchParams } = new URL(request.url);

    const { page, itemCount } = getPaginationParams(searchParams);

    const items = await getItemBySellerId(id, { page, itemCount });

    return NextResponse.json({
      status: "success",
      data: {
        items,
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}