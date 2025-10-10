import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

 const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req) {
  try {
    const { user } = await req.json();

    const prompt = `
You are a mindful AI therapist.
Write a short (1–2 sentences) daily affirmation for this user:
Name: ${user.name}
Mood: ${user.mood}
Goal: ${user.goal}

Make it warm, motivational, and easy to remember.
Avoid repetition. Start with something uplifting like “Today” or “Remember”.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0" });
    const result = await model.generateContent(prompt);
    const affirmation = result.response.text();

    return NextResponse.json({ affirmation });
  } catch (error) {
    console.error("Affirmation API error:", error);
    return NextResponse.json({ error: "Could not generate affirmation." }, { status: 500 });
  }
}
