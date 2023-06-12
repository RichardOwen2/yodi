import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";

import { finishOrderById } from "@/backend/services/user/orderService";

interface Params {
  params: {
    id: string
  }
}

export async function POST(request: Request, { params: { id } }: Params) {
  try {
    const userId = getTokenHandler(request);
    verifyUserAccess(userId);

    const title = await finishOrderById(userId, id);

    return NextResponse.json({
      status: "success",
      message: `Berhasil menyelesaikan orderan ${title}`
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}
