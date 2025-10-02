"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useSettings } from "@/components/SettingsContext";
import translations from "@/components/translations";

export default function HomePage() {
  const { language, darkMode } = useSettings();
  const t = translations[language];
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}> 
      {/* Top Navbar */}
  <header className={`bg-blue-600 ${darkMode ? 'text-white' : 'text-white'} py-5 px-8 flex items-center justify-between`}>
        {/* Left side  */}
        <div className="flex-1"></div>

        {/* Center */}
  <h1 className="text-xl font-bold text-center flex-1 leading-tight">
          MedAssist
        </h1>

        {/* Right side - Menu & Logout */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <Navbar t={t} language={language} />
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
            {t.logout || (language === 'ls' ? 'Tsoa' : 'Logout')}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-20">
        <h2 className="text-3xl font-bold mb-2">{t.welcome || (language === 'ls' ? 'Rea u amohela ho MedAssist' : 'Welcome to MedAssist')}</h2>
        <p className="text-gray-600 mb-12">
          {t.companion || (language === 'ls' ? 'Motsoalle oa hau oa bophelo bo botle' : 'Your comprehensive health companion')}
        </p>

        <div className="flex gap-12">
          {/* Symptom Checker */}
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-4">🩺</span>
            <h3 className="mb-2 text-lg">{t.symptomChecker || 'Symptom Checker'}</h3>
            <Link
              href="/symptom-checker"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              {t.clickHere || (language === 'ls' ? 'Tobetsa Mona' : 'Click here')}
            </Link>
          </div>

          {/* AI Therapist */}
          <div className="flex flex-col items-center">
            <span className="text-4xl mb-4">💬</span>
            <h3 className="mb-2 text-lg">{t.aiTherapist || (language === 'ls' ? 'Motataisi oa AI' : 'AI Therapist')}</h3>
            <Link
              href="/AItherapist"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              {t.clickHere || (language === 'ls' ? 'Tobetsa Mona' : 'Click here')}
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}

