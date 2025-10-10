"use client";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    // Validate input
    if (!message || !message.trim()) {
      return NextResponse.json(
        { reply: "Please provide a message for the AI therapist." },
        { status: 400 }
      );
    }

    // Check API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "AI service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenerativeAI({ apiKey });

  
    const prompt = `
You are a compassionate AI therapist.
- Respond empathetically and with encouragement.
- If the user mentions distress, self-harm, abuse, or danger, refer them to Lesotho resources (e.g., Lifeline: 126, Police: 999).
- Write your response in clear, coherent paragraphs.
User said: "${message}"`;

  
    const response = await ai.responses.generate({
      model: "gemini-2.0-flash",
      input: prompt,
    });

  
    const aiText = response.output_text?.trim() || "I’m here to listen and support you.";

    return NextResponse.json({ reply: aiText });
  } catch (err) {
    console.error("AI Generation error:", err);

    return NextResponse.json(
      { reply: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
