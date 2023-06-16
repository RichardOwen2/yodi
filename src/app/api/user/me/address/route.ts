import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";

import {
  addAddress,
  editAddress,
  deleteAddress,
  getAddress
} from "@/backend/services/user/addressService";

import {
  validatePostAddressPayload,
  validateDeleteAddressPayload,
  validatePutAddressPayload
} from "@/backend/validators/user/addressValidator";


export async function GET(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const address = await getAddress(userId);

    return NextResponse.json({
      status: "success",
      data: {
        address,
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
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePostAddressPayload(body);

    await addAddress(userId, body);

    return NextResponse.json({
      status: "success",
      message: "Berhasil menambahkan alamat",
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePutAddressPayload(body);

    await editAddress(userId, body);

    return NextResponse.json({
      status: "success",
      message: "Berhasil mengedit alamat",
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validateDeleteAddressPayload(body);

    await deleteAddress(userId, body);

    return NextResponse.json({
      status: "success",
      message: "Berhasil menghapus alamat",
    })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}