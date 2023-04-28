import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import verifyUserAccess from "@/backend/services/user";
import { upgradeRoleSellerById } from "@/backend/services/userService";
import getTokenHandler from "@/backend/utils/getTokenHandler";

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    verifyUserAccess(userId);
    
    await upgradeRoleSellerById(userId);

    return NextResponse.json({
      status: "success",
      message: "Berhasil mengajukan akun seller"
    }, { status: 201 })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}