import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import { getUserProfileById } from "@/backend/services/userService";

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
