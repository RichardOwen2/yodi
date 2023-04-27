import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";
import { validateUpgradeAccountPayload } from "@/backend/validators/admin/accountValidator";

import { verifySellerById } from "@/backend/services/admin/accountService";

export async function POST(request: Request) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    const body = await request.json();
    validateUpgradeAccountPayload(body);

    const { id: sellerId } = body;
    await verifySellerById(sellerId);

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
