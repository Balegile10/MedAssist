import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

 const apiKey = process.env.GEMINI_API_KEY;
 
export async function POST(req) {
  try {
    const { message, user } = await req.json();

    const prompt = `
You are a professional and compassionate AI therapist named "Luna".
Speak gently, empathetically, and clearly.
Help the user understand their emotions and offer comforting advice.

User details:
Name: ${user.name}
Mood: ${user.mood}
Goal: ${user.goal}

User says: "${message}"

Your reply should sound human, warm, and supportive.
Avoid robotic tone, and keep responses under 150 words.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    return NextResponse.json({ response: aiText });
  } catch (error) {
    console.error("Therapist API error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
