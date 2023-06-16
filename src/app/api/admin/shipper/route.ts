import { NextResponse } from "next/server";

import verifyAdminAccess from "@/backend/services/admin";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import errorHandler from "@/backend/utils/errorHandler";

import { 
  addShipper, 
  editShipper, 
  deleteShipper 
} from "@/backend/services/admin/shipperService";

import { 
  validatePostShipperPayload,
  validatePutShipperPayload,
  validateDeleteShipperPayload
} from "@/backend/validators/admin/shipperValidator";


export async function POST(request: Request) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId);

    const body = await request.json();
    validatePostShipperPayload(body);

    await addShipper(body);

    return NextResponse.json({
      status: "success",
      message: "Berhasil menambahkan shipper",
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId);

    const body = await request.json();
    validatePutShipperPayload(body);

    await editShipper(body);

    return NextResponse.json({
      status: "success",
      message: "Berhasil mengedit shipper",
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const adminId = getTokenHandler(request);
    await verifyAdminAccess(adminId);

    const body = await request.json();
    validateDeleteShipperPayload(body);

    await deleteShipper(body);

    return NextResponse.json({
      status: "success",
      message: "Berhasil menghapus shipper",
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}