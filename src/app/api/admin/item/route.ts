import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";
import { getItems, getItemsBySearch } from "@/backend/services/admin/itemService";
import getPaginationParams from "@/backend/utils/getPaginationParams";

export async function GET(request: Request) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    const { searchParams } = new URL(request.url);
    const { page, itemCount } = getPaginationParams(searchParams);
    const search = searchParams.get("search");

    if (search) {
      const items = await getItemsBySearch(search, { page, itemCount });

      return NextResponse.json({
        status: "success",
        data: {
          items
        },
      });
    }

    const items = await getItems({ page, itemCount });

    return NextResponse.json({
      status: "success",
      data: {
        items
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}