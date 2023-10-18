import axios from "axios";
const { v4: uuidv4 } = require("uuid");
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const data = "AUTHORISE PAYMENT";
  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { amount, dueAmount, userData, custom } = await req.json();
  
  // Convert amount to an integer
  // const transactionReference = uuidv4();
  const transactionReference = `${new Date().toISOString().replace(/[^0-9]/g, '')}-${userData.fullname.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '')}`;

  const axiosInstance = axios.create({
    auth: {
      username: process.env.WORLDPAY_USERNAME,
      password: process.env.WORLDPAY_PASSWORD,
    },
    headers: {
      "Content-Type": "application/vnd.worldpay.payment_pages-v1.hal+json",
      Accept: "application/vnd.worldpay.payment_pages-v1.hal+json",
    },
  });

  const paymentData = {
    transactionReference: transactionReference,
    merchant: {
      entity: process.env.WORLDPAY_MERCHANT_ID,
    },
    narrative: {
      line1: "Order Description",
    },
    value: {
      currency: "GBP",
      amount: amount*100,
    },
    description: "Take off funnel",
    billingAddressName: userData.fullname,
    billingAddress: {
      address1: "Proactiv House, Park Street",
      postalCode: "S73 OHF",
      city: "Wombwell",
      countryCode: "GB",
    },

    resultURLs: {
      successURL: `${process.env.APP_URL}/funnel/thanks?status=success`,
      pendingURL: `${process.env.APP_URL}/funnel/order?status=pending`,
      failureURL: `${process.env.APP_URL}/funnel/order?status=failure`,
      errorURL: `${process.env.APP_URL}/funnel/order?status=error`,
      cancelURL: `${process.env.APP_URL}/funnel/thanks?status=cancel`,
      expiryURL: `${process.env.APP_URL}/funnel/order?status=expiry`,
    },
    riskData: {
      custom,
    },
  };
  // return NextResponse.json(paymentData,
  //   { status: 200 }
  // );
  try {
    const response = await axiosInstance.post(
      process.env.WORLDPAY_HOSTED_PAGES,
      paymentData
    );
    return NextResponse.json(
      { data: response.data, transactionReference },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.response.data);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
