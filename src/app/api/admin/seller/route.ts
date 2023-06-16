import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";
import { getSellers, getSellersBySearch } from "@/backend/services/admin/sellerService";
import getPaginationParams from "@/backend/utils/getPaginationParams";

export async function GET(request: Request) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    const { searchParams } = new URL(request.url);
    const { page, itemCount } = getPaginationParams(searchParams);
    const search = searchParams.get("search");

    if (search) {
      const accounts = await getSellersBySearch(search, { page, itemCount });

      return NextResponse.json({
        status: "success",
        data: {
          accounts
        },
      })
    }

    const accounts = await getSellers({ page, itemCount });

    return NextResponse.json({
      status: "success",
      data: {
        accounts
      },
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}