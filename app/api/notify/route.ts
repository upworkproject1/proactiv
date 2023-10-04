import { NextResponse } from "next/server";
import { sendMail } from "../../../service/mailService";

export async function POST(req: Request) {
  const data = await req.json();

  const subject = "New Registration";
  const toEmail = process.env.NOTIFICATION_RECEIVER_EMAIL;
  const templateName = "registration";

  sendMail(subject, toEmail, templateName, { data: data })
    .then((response) => {
      console.log("Email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Email sending failed:", error);
    });

  return NextResponse.json({ data });
}
