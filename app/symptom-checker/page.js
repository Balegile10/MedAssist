"use client";


import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";

const symptomsList = [
  "fever",
  "cough",
  "headache",
  "fatigue",
  "soreThroat",
  "nausea",
  "shortnessOfBreath",
  "dizziness",
];


export default function SymptomChecker() {
  const router = useRouter();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [userInput, setUserInput] = useState("");
  const { language, darkMode } = useSettings();
  const t = translations[language];

  // Toggle symptom selection
  const handleSymptomChange = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Navigate to chat page with selected symptoms and notes
  const handleSubmit = () => {
    if (selectedSymptoms.length === 0 && !userInput.trim()) {
      alert(
        language === "ls"
          ? "Ka kopo khetha matšoao kapa ngola ho hong!"
          : "Please select symptoms or type something!"
      );
      return;
    }

    // Encode query parameters to avoid URL issues
    const query = new URLSearchParams({
      symptoms: selectedSymptoms.join(","),
      notes: userInput,
    }).toString();

    router.push(`/symptom-chat?${query}`);
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${darkMode ? 'dark bg-gray-900 text-white' : ''}`}>
      {/* Header */}
      <header className={`bg-blue-600 px-6 py-4 flex items-center ${darkMode ? 'dark:bg-blue-800' : ''}`}>
        <Link
          href="/home"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {t.back || (language === 'ls' ? 'Khutlela' : 'Back')}
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-white">
          {t.symptomChecker || (language === 'ls' ? 'Mohlahlobi oa Matšoao' : 'Symptom Checker')} 🩺
        </h1>
        <div className="w-16" /> {/* Empty div to balance flex */}
      </header>

      {/* Main Content */}
      <main className="p-8 flex gap-8">
        {/* Left: Symptoms List */}
  <div className={`w-1/3 p-4 rounded shadow h-fit ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}> 
          <h2 className="text-xl font-semibold mb-4">{t.selectSymptoms || (language === 'ls' ? 'Khetha matšoao' : 'Select Symptoms')}</h2>
          <ul className="flex flex-col gap-2">
            {symptomsList.map((symptom) => (
              <li key={symptom}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomChange(symptom)}
                    className="accent-blue-600"
                  />
                  {t[symptom] || t[symptom.toLowerCase()] || symptom}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: User Input */}
        <div className="w-2/3 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{t.describeSymptoms || (language === 'ls' ? 'Hlalosa Matšoao a Hao' : 'Describe Your Symptoms')}</h2>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={t.notesPlaceholder || (language === 'ls' ? 'Ngola kapa rekota matšoao a hau mona...' : 'Type or record your symptoms here...')}
            className="w-full h-40 p-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>

          <div className="flex justify-center w-full">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              🩺 {t.analyseSymptoms || (language === 'ls' ? 'Hlahloba Matšoao' : 'Analyse Symptoms')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
