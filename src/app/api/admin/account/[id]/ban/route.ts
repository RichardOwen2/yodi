import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";
import { banAccountById } from "@/backend/services/admin/accountService";

interface Params {
  params: {
    id: string
  }
}

export async function POST(request: Request, { params: { id } }: Params) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    await banAccountById(id);

    return NextResponse.json({
      status: "success",
      message: "Berhasil melakukan ban terhadap akun"
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}