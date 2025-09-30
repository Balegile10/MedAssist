import { NextResponse } from "next/server";
import {GoogleGenAI} from '@google/genai';

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "No message provided" },
        { status: 400 }
      );
    }

    // Make sure to include the following import:

    const apiKey = process.env.GEMINI_API_KEY
    
    console.log("api key: ", apiKey)

    const ai = new GoogleGenAI({apiKey: apiKey});

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
    })
    console.log(response.text);
    const aiText = response.text;

    return NextResponse.json({ aiText });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error.message + "something" || "Something went wrong" },
      { status: 500 }
    );
  }
}
