import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not set in environment variables" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          type: "text",
          text: `You are a professional therapist. Respond empathetically, professionally, and thoughtfully. 
          Make your response clear, supportive, and easy to understand. Encourage reflection and emotional well being. 
          ${message}`,
        },
      ],
    });


    return NextResponse.json({ response });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
