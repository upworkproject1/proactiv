"use client"
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("status");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen md:w-[55%]">
      <div className="flex flex-col mx-5 my-4 pb-2 items-center bg-white rounded-lg shadow-md relative pt-2">
        {paymentStatus == "success" ? <p className="text-green-800">Payment Received</p> : ""}
        <p
          className="fontTitle"
          style={{ fontWeight: "700", textAlign: "center" }}
        >
          Thank you for your order. We will contact you shortly to arrange
          everything with you.
        </p>

        <p className="fontSubTitle" style={{ color: "blue" }}>
          Proactiv Marketing Ltd. <br />
          admin@proactivmarketing.co.uk <br />
          0800 6124438
        </p>
      </div>
    </div>
  );
};

export default Page;
