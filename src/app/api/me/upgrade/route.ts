import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import { upgradeRoleSellerById } from "@/backend/services/userService";
import getTokenHandler from "@/backend/utils/getTokenHandler";

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);

    await upgradeRoleSellerById(userId);

    return NextResponse.json({
      status: "success",
      message: "Berhasil mengajukan akun seller"
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      data,
    }, { status });
  }
}