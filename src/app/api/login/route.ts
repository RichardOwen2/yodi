import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import { generateToken } from "@/backend/token/tokenManager";

import { verifyUserCrendential } from "@/backend/services/userService";
import { validatePostLoginPayload } from "@/backend/validators/loginValidator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    validatePostLoginPayload(body);

    const id = await verifyUserCrendential(body);
    const token = generateToken(id);

    return NextResponse.json({
      status: "success",
      data: {
        token,
      }
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}