import { NextResponse } from "next/server";

import getTokenHandler from "@/backend/utils/getTokenHandler";
import errorHandler from "@/backend/utils/errorHandler";

import verifySellerAccess from "@/backend/services/seller";
import { getItemsBySeller, getVerifiedItemsBySeller } from "@/backend/services/seller/itemService";
import getPaginationParams from "@/backend/utils/getPaginationParams";

export async function GET(request: Request) {
  try {
    const sellerId = getTokenHandler(request);
    await verifySellerAccess(sellerId);

    const { searchParams } = new URL(request.url);

    const { page, itemCount } = getPaginationParams(searchParams);
    const verified = searchParams.get("verified");

    if (!verified) {
      const items = await getItemsBySeller(sellerId, { page, itemCount });

      return NextResponse.json({
        message: "success",
        data: {
          items,
        },
      });
    }

    const items = await getVerifiedItemsBySeller(sellerId, { page, itemCount });

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

