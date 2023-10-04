import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
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

    // If you want to redirect, you should use NextResponse.redirect as follows:
    // NextResponse.redirect("/funnel/order");

    // If you want to send JSON response, you should use response.json as follows:
    response.json({ output });
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
