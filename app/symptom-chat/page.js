"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf"; // ✅ install with: npm install jspdf
import { saveAs } from "file-saver"; // ✅ install with: npm install file-saver

export default function SymptomChat() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get("symptoms");
  const notes = searchParams.get("message"); 

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

  // Download as Word (.docx)
  const handleDownloadWord = () => {
    const diagnosisText = `
    === AI Medical Diagnosis Report ===
    Symptoms: ${symptoms}
    Notes: ${notes}

    Doctor's Analysis:
    ${aiResponse}
    `;

    const blob = new Blob([diagnosisText], {
      type: "application/msword;charset=utf-8",
    });
    saveAs(blob, "diagnosis_report.docx");
  };

  // Download as PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    doc.text("AI Medical Diagnosis Report", 10, 20);
    doc.setFontSize(12);
    doc.text(`Symptoms: ${symptoms || "N/A"}`, 10, 35);
    doc.text(`Notes: ${notes || "N/A"}`, 10, 45);

    const analysis = aiResponse || "No analysis available.";
    const splitText = doc.splitTextToSize(analysis, 180);
    doc.text("Doctor's Analysis:", 10, 60);
    doc.text(splitText, 10, 70);

    doc.save("diagnosis_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">AI Symptom Analysis</h1>
      <div
        id="diagnosis-section"
        className="w-full max-w-2xl bg-white p-6 rounded shadow"
      >
        <p className="mb-4">
          <strong>Symptoms:</strong> {symptoms}
        </p>
        <p className="mb-4">
          <strong>Notes:</strong> {notes}
        </p>
        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <h2 className="font-semibold mb-2">AI's Analysis:</h2>
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
