import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: Request, rez: NextRequest) {
//   console.log(rez.url);
//   const response = "NextRequest";
//   return NextResponse.json({ response });
// }

import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const { url } = request;
    const parameters = new URLSearchParams(url);

    let output = "";

    // Iterate through the query parameters and build the output string
    for (const [key, value] of parameters.entries()) {
      if (output !== "") {
        output += " ";
      }
      output += value;
    }
    // return NextResponse.json({ output });
    NextResponse.redirect("/funnel/order");
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
