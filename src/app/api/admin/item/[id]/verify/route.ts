import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";

import { verifyItemById } from "@/backend/services/admin/itemService";

interface Params {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params: { id } }: Params) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    await verifyItemById(id);

    return NextResponse.json({
      status: "success",
      message: "Item berhasil di verifikasi",
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}