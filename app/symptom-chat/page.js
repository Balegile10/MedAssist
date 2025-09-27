"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SymptomChat() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get("symptoms");
  const notes = searchParams.get("notes");

  const [aiResponse, setAiResponse] = useState("Loading AI response...");

  useEffect(() => {
    if (!symptoms && !notes) return;

    const fetchAIResponse = async () => {
      try {
        const res = await fetch("/api/gemini-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `Symptoms: ${symptoms}\nNotes: ${notes}`,
          }),
        });

        const data = await res.json();

        if (data.error) {
          setAiResponse(`Error: ${data.error}`);
        } else {
          setAiResponse(data.aiText);
        }
      } catch (err) {
        setAiResponse(`Error: ${err.message}`);
      }
    };

    fetchAIResponse();
  }, [symptoms, notes]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">AI Symptom Analysis</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <p className="mb-4"><strong>Symptoms:</strong> {symptoms}</p>
        <p className="mb-4"><strong>Notes:</strong> {notes}</p>
        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <h2 className="font-semibold mb-2">AI Response:</h2>
          <p>{aiResponse}</p>
        </div>
      </div>
    </div>
  );
}
