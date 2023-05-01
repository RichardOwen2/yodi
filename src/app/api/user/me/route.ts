import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";
import verifyUserAccess from "@/backend/services/user";

import { validatePutAccountPayload } from "@/backend/validators/user/accountValidator";

import { getUserProfileById } from "@/backend/services/userService";
import { editUserProfile } from "@/backend/services/user/accountService";

export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);

    const userData = await getUserProfileById(userId);

    return NextResponse.json({
      status: 'success',
      data: userData,
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePutAccountPayload(body);

    const user = await editUserProfile(userId, body);
    const message = Object.keys(user).map((key) => ` ${key}`).join()

    return NextResponse.json({
      status: "success",
      message: `Berhasil melakukan update${message}`
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}