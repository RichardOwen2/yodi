import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import { getItemById } from "@/backend/services/itemService";

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const item = await getItemById(id);

    return NextResponse.json({
      status: "success",
      data: {
        item,
      },
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}
