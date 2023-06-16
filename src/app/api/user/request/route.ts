import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";

import { validatePostItemRequestPayload } from "@/backend/validators/user/requestValidator";
import { addItemRequestByItemId, getItemRequestByUser } from "@/backend/services/user/itemService";


export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);
    verifyUserAccess(userId);

    const itemRequest = await getItemRequestByUser(userId);

    return NextResponse.json({
      status: "success",
      data: {
        itemRequest,
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    verifyUserAccess(userId);

    const body = await request.json();
    validatePostItemRequestPayload(body);

    const itemName = await addItemRequestByItemId(userId, body);

    return NextResponse.json({
      status: "success",
      message: `Berhasil melakukan request ${itemName}`,
    }, { status: 201 });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}