"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";
<<<<<<< HEAD
import Navbar from "../../components/navbar";
import { motion } from "framer-motion";

// Main Settings Page
=======

>>>>>>> 7842da6466ab544afedd70d2d8e5946b8b66ff97
function Settings({ onGoBack, onLanguageClick, onNotificationsClick }) {
  const { language, darkMode, toggleDarkMode } = useSettings();
  const t = translations[language];

  return (
<<<<<<< HEAD
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-3xl w-full max-w-3xl mx-auto mt-12 p-8 shadow-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
      >
        {/* Header */}
        <div className="flex items-center rounded-t-3xl px-6 py-4 mb-8 bg-gradient-to-r from-blue-500 to-blue-700 relative">
          <button
            onClick={onGoBack}
            className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            {t.back}
          </button>
          <h2 className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white pointer-events-none">
            {t.settings}
          </h2>
=======
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-200'}`}>
      
      <div className={`rounded-[2rem] w-full max-w-3xl shadow-md p-8 mt-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        {/* Header */}
  <div className={`flex items-center rounded-t-[2rem] px-8 py-4 mb-8 relative ${darkMode ? 'bg-blue-900' : 'bg-blue-600'}`}>
          <Link href="/home">
            <button
              className={`bg-[#091C36] text-white text-lg px-6 py-2 rounded-full font-semibold mr-8`}
            >
              {t.back}
            </button>
          </Link>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="flex items-center gap-2 text-white font-bold text-2xl">
              <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7ZM19.43 12.98c.04-.32.07-.65.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 0 0 .12-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.12 7.12 0 0 0-1.7-.98l-.38-2.65A.486.486 0 0 0 14 2h-4a.5.5 0 0 0-.5.42l-.38 2.65a7.12 7.12 0 0 0-1.7.98l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 0 0-.12.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.52.38 1.08.71 1.7.98l.38 2.65c.05.26.26.42.5.42h4c.26 0 .46-.16.5-.42l.38-2.65a7.12 7.12 0 0 0 1.7-.98l2.49 1c.23.09.5 0 .6-.22l2-3.46a.5.5 0 0 0-.12-.64l-2.11-1.65Z"
                  fill="currentColor"
                />
              </svg>
              {t.settings}
            </span>
          </div>
>>>>>>> 7842da6466ab544afedd70d2d8e5946b8b66ff97
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* Language */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-5 cursor-pointer shadow-md ${darkMode ? "bg-gradient-to-r from-gray-700 to-gray-600" : "bg-gradient-to-r from-white to-gray-100"}`}
            onClick={onLanguageClick}
          >
            <div className="font-semibold text-lg mb-2">{t.language}</div>
            <div className="bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold">
              {t[language === "en-uk" ? "englishUK" : language === "en-us" ? "englishUS" : "sesotho"]}
            </div>
          </motion.div>

          {/* Notifications & Dark Mode */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-5 shadow-md ${darkMode ? "bg-gray-700" : "bg-white"}`}
          >
            <div className="font-semibold text-lg mb-3 cursor-pointer" onClick={onNotificationsClick}>
              {t.notifications}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold">{t.darkMode}</span>
              <button
                className={`border px-4 py-1 rounded-full font-medium transition ${
                  darkMode ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={toggleDarkMode}
              >
                {darkMode ? t.on : t.off}
              </button>
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-5 shadow-md ${darkMode ? "bg-gray-700" : "bg-white"}`}
          >
            <div className="font-semibold text-lg mb-3">{t.about}</div>
            <div className="mb-2">{t.privacy}</div>
            <div className="mb-2">{t.terms}</div>
            <hr className="my-4 border-gray-400" />
            <div className="text-center text-gray-400">{t.version}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Language Screen
function LanguageScreen({ onGoBack }) {
  const { language, setLanguage, darkMode } = useSettings();
  const t = translations[language];

  const languageOptions = [
    { key: "en-uk", label: t.englishUK, code: "UK" },
    { key: "en-us", label: t.englishUS, code: "US" },
    { key: "ls", label: t.sesotho, code: "LS" },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200"}`}>
      <div className={`rounded-3xl w-full max-w-2xl p-8 shadow-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        <div className="flex items-center px-6 py-4 mb-8 bg-gradient-to-r from-blue-500 to-blue-700 relative rounded-t-3xl">
          <button
            onClick={onGoBack}
            className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            {t.back}
          </button>
          <h2 className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white pointer-events-none">
            {t.language}
          </h2>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {languageOptions.map((opt) => (
            <motion.button
              key={opt.key}
              whileHover={{ scale: 1.03 }}
              className={`w-full py-3 rounded-xl font-bold text-lg transition ${
                language === opt.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300"
              }`}
              onClick={() => setLanguage(opt.key)}
            >
              <span className="font-semibold mr-2">{opt.code}</span> {opt.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Notifications Screen
function NotificationsScreen({ onGoBack }) {
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const notificationOptions = [
    { label: t.vibrate, checked: false },
    { label: t.notificationSound, checked: true },
    { label: t.priorityNotifications, checked: true },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200"}`}>
      <div className={`rounded-3xl w-full max-w-2xl p-8 shadow-xl ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        <div className="flex items-center px-6 py-4 mb-8 bg-gradient-to-r from-blue-500 to-blue-700 relative rounded-t-3xl">
          <button
            onClick={onGoBack}
            className="bg-white text-blue-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            {t.back}
          </button>
          <h2 className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white pointer-events-none">
            {t.notifications}
          </h2>
        </div>

        <div className="flex flex-col space-y-6">
          {notificationOptions.map((opt, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 rounded-xl shadow-md bg-gray-100 dark:bg-gray-700 transition"
            >
              <span className="font-semibold">{opt.label}</span>
              <input type="checkbox" checked={opt.checked} readOnly className="toggle toggle-md" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// App Wrapper
export default function App() {
  const [view, setView] = useState("settings");

  return (
    <div>
      {view === "settings" && (
        <Settings
          onGoBack={() => setView("home")}
          onLanguageClick={() => setView("language")}
          onNotificationsClick={() => setView("notifications")}
        />
      )}
      {view === "language" && <LanguageScreen onGoBack={() => setView("settings")} />}
      {view === "notifications" && <NotificationsScreen onGoBack={() => setView("settings")} />}
    </div>
  );
}
