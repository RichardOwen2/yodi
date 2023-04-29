import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";
import { getSellerById } from "@/backend/services/admin/sellerService";

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    const account = await getSellerById(id);

    return NextResponse.json({
      status: "success",
      data: {
        account
      },
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}

