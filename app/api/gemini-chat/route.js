import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "No message provided" }, { status: 400 });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: { text: message },
          temperature: 0.7,
          candidate_count: 1,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return NextResponse.json({ error: data.error.message || "Gemini error" }, { status: 500 });
    }

    const aiText = data?.candidates?.[0]?.content?.[0]?.text || "No response";

    return NextResponse.json({ aiText });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
