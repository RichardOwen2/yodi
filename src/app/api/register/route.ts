import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import { generateToken } from "@/backend/token/tokenManager";

import { addUser } from "@/backend/services/userService";
import { validatePostRegisterPayload } from "@/backend/validators/registerValidator";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    validatePostRegisterPayload(body);

    const id = await addUser(body);
    const token = generateToken(id);

    return NextResponse.json({
      status: "success",
      data: {
        token,
      }
    }, { status: 201 });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}
