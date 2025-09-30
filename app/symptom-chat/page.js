"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SymptomChat() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get("symptoms");
  const notes = searchParams.get("notes");

  const [aiResponse, setAiResponse] = useState(language === "ls" ? "E jarolla karabo ea AI..." : "Loading AI response...");

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
            message: `You are a professional medical doctor. 
            Analyze the following symptoms and notes thoroughly. 
            Write your response in a way that is **clear, simple, and easy to understand** for someone without medical training. 
            Provide:
            1. A possible diagnosis (in plain words),
            2. Likely causes,
            3. Recommended next steps (e.g., home care, lifestyle changes, or seeing a doctor). 
            
            Symptoms: ${symptoms}
            Notes: ${notes}`,
          }),
        });

        const data = await res.json();

        if (data.error) {
          setAiResponse((language === "ls" ? "Phoso: " : "Error: ") + data.error);
        } else {
          setAiResponse(data.aiText);
        }
      } catch (err) {
        setAiResponse((language === "ls" ? "Phoso: " : "Error: ") + err.message);
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

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleDownloadWord}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download Word
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
