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

  // AI-generated daily affirmation
  const [affirmation, setAffirmation] = useState("Loading affirmation...");

  // Conversation history with AI therapist
  const [conversation, setConversation] = useState([
    { role: "user", content: "Hello, I want to start my day positively." },
  ]);

  
  const [mood, setMood] = useState(null);
  const moods = [
    { emoji: "😄", label: "Happy" },
    { emoji: "🙂", label: "Calm" },
    { emoji: "😐", label: "Okay" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😣", label: "Stressed" },
  ];


  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const res = await fetch("/api/daily-affirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversation }),
        });
        const data = await res.json();
        setAffirmation(data.affirmation);
      } catch (err) {
        console.error(err);
        setAffirmation("You are strong, capable, and loved today.");
      }
    };
    fetchAffirmation();
  }, [conversation]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      
      <header className="bg-blue-600 text-white py-5 px-8 flex items-center justify-between shadow-md">
        <div className="flex-1"></div>
        <h1 className="text-2xl font-bold text-center flex-1">MedAssist</h1>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <Navbar t={t} language={language} />
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
            {t.logout || (language === "ls" ? "Tsoa" : "Logout")}
          </button>
        </div>
      </header>

      
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
            className="text-gray-500 max-w-2xl text-lg"
          >
            {t.companion || (language === "ls" ? "Motsoalle oa hau oa bophelo bo botle" : "Your daily mental wellness companion")}
          </motion.p>
        </div>

        
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-3xl shadow-xl ${darkMode ? "bg-gray-700" : "bg-white"} flex flex-col items-center text-center`}
          >
          
            <h3 className="text-2xl font-bold mb-2">Daily Affirmation</h3>
            <p className="text-gray-400 italic">{affirmation}</p>
          </motion.div>

        
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-3xl shadow-xl ${darkMode ? "bg-gray-700" : "bg-white"} flex flex-col items-center text-center`}
          >
          
            <h3 className="text-2xl font-bold mb-2">{t.aiTherapist || "AI Therapist"}</h3>
            <p className="text-gray-400 mb-4">Talk to our friendly AI therapist to express how you feel.</p>
            <Link
              href="/AItherapist"
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              {t.start || "Start"}
            </Link>
          </motion.div>

      
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-3xl shadow-xl ${darkMode ? "bg-gray-700" : "bg-white"} flex flex-col items-center text-center`}
          >
        
            <h3 className="text-2xl font-bold mb-4">Mood Tracker</h3>
            <div className="flex gap-4 justify-center flex-wrap mb-4">
              {moods.map((m) => (
                <button
                  key={m.label}
                  onClick={() => setMood(m.label)}
                  className={`text-4xl transition-transform transform hover:scale-125 ${mood === m.label ? "opacity-100" : "opacity-60"}`}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
            {mood && <p className="text-sm text-gray-400">You’re feeling <span className="font-semibold text-blue-500">{mood}</span> today 💙</p>}
          </motion.div>
        </div>
      </section>

      
      <footer className={`py-6 text-center text-sm ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
        © {new Date().getFullYear()} MedAssist Empowering Your Mental Wellness 
      </footer>
    </div>
  );
}
