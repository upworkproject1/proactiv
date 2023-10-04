import axios from "axios";
const { v4: uuidv4 } = require("uuid");
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = "AUTHORISE PAYMENT";
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { cardHolderName, cardNumber, month, year, cvc, amount } =
    await req.json();
  const convertedMonth = parseInt(month);
  const convertedYear = parseInt(year);

  // Convert amount to an integer
  const convertedAmount = Math.floor(amount*100);
  // return NextResponse.json({convertedAmount,convertedMonth,convertedYear});
  const transactionReference = uuidv4();

  const axiosInstance = axios.create({
    auth: {
      username: process.env.WORLDPAY_USERNAME,
      password: process.env.WORLDPAY_PASSWORD,
    },
    headers: {
      "Content-Type": "application/vnd.worldpay.payments-v6+json",
      Accept: "application/vnd.worldpay.payments-v6+json",
    },
  });

  const paymentData = {
    transactionReference: transactionReference,
    merchant: {
      entity: process.env.WORLDPAY_MERCHANT_ID,
      // entity: "PO4048954073",
    },
    instruction: {
      narrative: {
        line1: "Payment For Funnel",
      },
      value: {
        currency: "GBP",
        amount: 6049,
      },
      paymentInstrument: {
        type: "card/plain",
        cardHolderName,
        cardNumber,
        cardExpiryDate: {
          month: convertedMonth,
          year: convertedYear,
        },
        cvc,
      },
    },
  };

  // console.log(paymentData);
  // return NextResponse.json(paymentData);
  try {
    const response = await axiosInstance.post(
      process.env.WORLDPAY_ONETIME_URL,
      paymentData
    );
    // console.log(response.request);
    return NextResponse.json({ data: response.data }, { status: 200 });
  } catch (error) {
    // console.log(error.request);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
