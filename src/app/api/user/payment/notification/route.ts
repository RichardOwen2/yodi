import { NextResponse } from "next/server";

import errorHandler from "@/backend/utils/errorHandler";

import { savePaymentNotification } from "@/backend/services/user/paymentService";

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      order_id: string;
      transaction_id: string;
      payment_type: string;
      gross_amount: number;
      transaction_time: Date;
      currency: string;
      signature_key: string;
    };

    await savePaymentNotification({
      transactionTime: body.transaction_time,
      grossAmount: body.gross_amount,
      currency: body.currency,
      signatureKey: body.signature_key,
      orderId: body.order_id,
      paymentType: body.payment_type,
    });

    return NextResponse.json({
      status: "success",
      message: `${body.order_id} payment verified`
    });
  } catch (error) {
    const { data, status } = errorHandler(error);

    return NextResponse.json({
      ...data
    }, { status });
  }
}
