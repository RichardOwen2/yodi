import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";

import { verifySellerById } from "@/backend/services/admin/accountService";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params: { id } }: Params) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    await verifySellerById(id);

    return NextResponse.json({
      status: "success",
      message: "Seller berhasil diverifikasi"
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}
