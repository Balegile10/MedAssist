import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch(
     "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"  + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json({ result: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
