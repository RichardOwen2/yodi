import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";
import { getAccounts, getAccountsBySearch } from "@/backend/services/admin/accountService";
import getPaginationParams from "@/backend/utils/getPaginationParams";

export async function GET(request: Request) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId)

    const { searchParams } = new URL(request.url);
    const { page, itemCount } = getPaginationParams(searchParams);
    const search = searchParams.get("search");

    if (search) {
      const accounts = await getAccountsBySearch(search, { page, itemCount });

      return NextResponse.json({
        status: "success",
        data: {
          accounts
        },
      })
    }

    const accounts = await getAccounts({ page, itemCount });

    return NextResponse.json({
      status: "success",
      data: {
        accounts
      },
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}