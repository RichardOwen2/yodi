import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";
import getTokenHandler from "@/backend/utils/getTokenHandler";

import verifyUserAccess from "@/backend/services/user";

import { createTransaction } from "@/backend/libs/midtransPayment";

import { validatePostPaymentPayload } from "@/backend/validators/user/paymentValidator";
import { addPayment, createTransactionData, verifyAbleToCreatePayment } from "@/backend/services/user/orderPaymentService";


export async function POST(request: Request) {
  try {
    const userId = getTokenHandler(request);
    await verifyUserAccess(userId);

    const body = await request.json();
    validatePostPaymentPayload(body);

    const { orderId } = body;
    
    await verifyAbleToCreatePayment(orderId);

    const transactionData = await createTransactionData(userId, orderId);
    const midtransResponse = await createTransaction(transactionData);

    const { token, redirect_url } = midtransResponse.data;

    await addPayment(orderId, { token, redirect_url });

    return NextResponse.json({
      status: "success",
      data: {
        token,
        redirect_url,
      },
    }, { status: 201 })
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      status: data.status,
      message: data.message,
    }, { status });
  }
}