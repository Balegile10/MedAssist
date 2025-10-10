"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useSettings } from "@/components/SettingsContext";
import translations from "@/components/translations";
import { motion } from "framer-motion";

export default function HomePage() {
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const [affirmation, setAffirmation] = useState(t.loadingAffirmation || "Loading affirmation...");
  const [conversation, setConversation] = useState([
    { role: "user", content: t.greeting || "Hello, I want to start my day positively." },
  ]);

  // Track selected mood
  const [mood, setMood] = useState(null);

  // Define moods dynamically with translation keys
  const getMoods = () => [
    { emoji: "😄", key: "happy" },
    { emoji: "🙂", key: "calm" },
    { emoji: "😐", key: "okay" },
    { emoji: "😔", key: "sad" },
    { emoji: "😣", key: "stressed" },
  ];

  const [moods, setMoods] = useState(getMoods());

  // Update moods when language changes
  useEffect(() => {
    setMoods(getMoods());
  }, [language]);

  // Update selected mood label when language changes
  const translatedMood = mood ? t[mood.toLowerCase()] || mood : "";

  // Fetch daily affirmation
  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const res = await fetch("/api/affirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversation, language }),
        });
        const data = await res.json();
        setAffirmation(data.affirmation || t.defaultAffirmation || (language === "ls" ? "U matla, u na le bokhoni, 'me u rata kajeno." : "You are strong, capable, and loved today."));
      } catch (err) {
        console.error(err);
        setAffirmation(t.defaultAffirmation || (language === "ls" ? "U matla, u na le bokhoni, 'me u rata kajeno." : "You are strong, capable, and loved today."));
      }
    };
    fetchAffirmation();
  }, [conversation, language]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      
      {/* Header */}
      <header className={`py-5 px-8 flex items-center justify-between shadow-md ${darkMode ? "bg-blue-900" : "bg-blue-600"}`}>
        <div className="flex-1"></div>
        <h1 className="text-2xl font-bold text-center flex-1 text-white">MedAssist</h1>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <Navbar t={t} language={language} />
          <Link href="/signup">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition
                ${darkMode ? "bg-black text-white hover:bg-gray-800" : "bg-white text-black hover:bg-gray-200"}`}
            >
              {t.logout || (language === "ls" ? 'Tsoaha' : 'Logout')}
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-16 px-6 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {t.welcome || (language === "ls" ? "Rea u amohela ho MedAssist" : "Welcome to MedAssist")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-400 max-w-2xl text-lg"
          >
            {t.companion || (language === "ls" ? "Motsoalle oa hau oa bophelo bo botle" : "Your daily mental wellness companion")}
          </motion.p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* Daily Affirmation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-3xl shadow-xl ${darkMode ? "bg-gray-700" : "bg-white"} flex flex-col items-center text-center`}
          >
            <h3 className="text-2xl font-bold mb-2">{t.dailyAffirmation || "Daily Affirmation"}</h3>
            <p className="text-gray-400 italic">{affirmation}</p>
          </motion.div>

          {/* AI Therapist */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-3xl shadow-xl ${darkMode ? "bg-gray-700" : "bg-white"} flex flex-col items-center text-center`}
          >
            <h3 className="text-2xl font-bold mb-2">{t.aiTherapist || "AI Therapist"}</h3>
            <p className="text-gray-400 mb-4">{t.aiDescription || (language === "ls" ? "Buisana le moqoqi oa rona oa AI ho hlalosa hore na o ikutloa joang." : "Talk to our friendly AI therapist to express how you feel.")}</p>
            <Link
              href="/AItherapist"
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              {t.start || (language === "ls" ? "Qala" : "Start")}
            </Link>
          </motion.div>

          {/* Mood Tracker Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-3xl shadow-xl ${
              darkMode ? "bg-gray-700" : "bg-white"
            } flex flex-col items-center text-center`}
          >
            <h3 className="text-2xl font-bold mb-4">
              {t.moodTracker || (language === "ls" ? "Tatelamohaho ea Maikutlo" : "Mood Tracker")}
            </h3>

            <div className="flex gap-4 justify-center flex-wrap mb-4">
              {[
                { emoji: "😄", key: "happy" },
                { emoji: "🙂", key: "calm" },
                { emoji: "😐", key: "okay" },
                { emoji: "😔", key: "sad" },
                { emoji: "😣", key: "stressed" },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMood(m.key)}
                  className={`flex flex-col items-center transition-transform transform hover:scale-110 ${
                    mood === m.key ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <span className="text-4xl">{m.emoji}</span>
                  <span className="text-sm mt-1">{t[m.key] || m.key}</span>
                </button>
              ))}
            </div>

            {mood && (
              <p className="text-sm text-gray-400">
                {language === "ls"
                  ? `U ikutloa u le ${(t[mood] || mood)} kajeno 💙`
                  : `You’re feeling ${(t[mood] || mood)} today 💙`}
              </p>
            )}
          </motion.div>

        </div>
      </section>

      {/* Footer */}
      <footer className={`py-6 text-center text-sm ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
        © {new Date().getFullYear()} MedAssist {t.footer || (language === "ls" ? "Ho matlafatsa bophelo ba hau ba kelello" : "Empowering Your Mental Wellness")}
      </footer>
    </div>
  );
}
