"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AITherapistPage() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSend = async () => {
    if (!input.trim()) return;

  
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `You are a compassionate AI therapist. 
- Always respond with empathy, understanding, and encouragement. 
- If the user expresses distress, thoughts of self-harm, abuse, or any dangerous situation, refer them to professional resources in Lesotho.
- Examples: 
   * "If you are in immediate danger, please contact the Lesotho Mounted Police Service at 123."
   * "You can also reach out to Queen 'Mamohato Memorial Hospital or your nearest clinic for support."
   * "For emergencies, dial 112 for an ambulance."
- Otherwise, continue as a supportive therapist.
The user just said: "${input}". 
Offer supportive reflections and gentle guidance.`,

        }),
      });

      const data = await res.json();

  
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || data.aiText || "I'm here with you. Tell me more." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Please try again." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top bar */}
      <div className="flex items-center justify-between bg-blue-600 p-4">
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => router.push("/")}
        >
          Back
        </button>
        <h1 className="text-white font-bold text-lg">AI Therapist</h1>
        <div className="w-16" /> {/* spacer */}
      </div>

    
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-xs ${
              msg.from === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

    
      <div className="flex items-center p-4 bg-white border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-lg p-2 mr-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
