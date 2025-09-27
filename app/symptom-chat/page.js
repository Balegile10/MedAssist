"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";

export default function SymptomChat() {
  const searchParams = useSearchParams();
  const symptoms = searchParams.get("symptoms");
  const notes = searchParams.get("notes");
  const { language, darkMode } = useSettings();
  const t = translations[language];

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
            message: `Symptoms: ${symptoms}\nNotes: ${notes}`,
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
  }, [symptoms, notes, language]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-12 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className={`rounded-2xl shadow-lg p-8 w-full max-w-2xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>{language === 'ls' ? 'Puisano le AI ka Matšoao' : 'AI Symptom Chat'}</h1>
        <div className="mb-6">
          <div className="font-semibold mb-2">{language === 'ls' ? 'Matšoao a hau:' : 'Your Symptoms:'}</div>
          <div className="mb-2 text-gray-700">{symptoms || "-"}</div>
          <div className="font-semibold mb-2">{language === 'ls' ? 'Lintlha tse ling:' : 'Additional Notes:'}</div>
          <div className="mb-2 text-gray-700">{notes || "-"}</div>
        </div>
        <div className="mb-6">
          <div className="font-semibold mb-2">{language === 'ls' ? 'Karabo ea AI:' : 'AI Response:'}</div>
          <div className={`p-4 rounded min-h-[60px] ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {aiResponse}
          </div>
        </div>
      </div>
    </div>
  );
}
