import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import { validateNumberParams } from "@/backend/validators/numberParamsValidator";
import { getItemBySeller } from "@/backend/services/sellerService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    validateNumberParams(searchParams.get("sellerPage"));
    validateNumberParams(searchParams.get("sellerItemCount"));
    validateNumberParams(searchParams.get("itemItemCount"));

    const sellerPagination = {
      page: searchParams.get("sellerPage") !== null ? parseInt(searchParams.get("sellerPage") as string) : 1,
      itemCount: searchParams.get("sellerItemCount") !== null ? parseInt(searchParams.get("sellerItemCount") as string) : 10,
    };

    const itemCount = searchParams.get("itemItemCount") !== null ? parseInt(searchParams.get("itemItemCount") as string) : 3

    const sellers = await getItemBySeller(sellerPagination, itemCount);

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