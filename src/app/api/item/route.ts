import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import { getItems, getItemsBySearch } from "@/backend/services/itemService";
import getPaginationParams from "@/backend/utils/getPaginationParams";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const { page, itemCount } =  getPaginationParams(searchParams);
    const search = searchParams.get("search");

    if (search) {
      const items = await getItemsBySearch(search, { page, itemCount });

      return NextResponse.json({
        message: "success",
        data: {
          items,
        },
      });
    }

    const items = await getItems({ page, itemCount });

    return NextResponse.json({
      message: "success",
      data: {
        items,
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