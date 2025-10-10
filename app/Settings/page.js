"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";
import { motion } from "framer-motion";

// ⚙️ Main Settings Page
function Settings({ onGoBack, onLanguageClick, onNotificationsClick }) {
  const { language, darkMode, toggleDarkMode } = useSettings();
  const t = translations[language];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-200"
      }`}
    >
      <div
        className={`rounded-[2rem] w-full max-w-3xl shadow-md p-8 mt-8 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center rounded-t-[2rem] px-8 py-4 mb-8 relative ${
            darkMode ? "bg-blue-900" : "bg-blue-600"
          }`}
        >
          <Link href="/home">
            <button
              className={`px-6 py-2 rounded-full font-semibold mr-8 shadow transition ${
                darkMode
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {t.back}
            </button>
          </Link>

          {/* ⚙️ Centered Settings Icon + Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="flex items-center gap-2 font-bold text-2xl text-white">
              <span className="text-3xl">🛠️</span>
              {t.settings}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-6">
          {/* 🌍 Language */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-5 cursor-pointer shadow-md ${
              darkMode
                ? "bg-gradient-to-r from-gray-700 to-gray-600"
                : "bg-gradient-to-r from-white to-gray-100"
            }`}
            onClick={onLanguageClick}
          >
            <div className="font-semibold text-lg mb-2">{t.language}</div>
            <div className="bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-semibold">
              {t[
                language === "en-uk"
                  ? "englishUK"
                  : language === "en-us"
                  ? "englishUS"
                  : "sesotho"
              ]}
            </div>
          </motion.div>

          {/* 🔔 Notifications + Dark Mode */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-5 shadow-md ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div
              className="font-semibold text-lg mb-3 cursor-pointer"
              onClick={onNotificationsClick}
            >
              {t.notifications}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-semibold">{t.darkMode}</span>
              <button
                className={`border px-4 py-1 rounded-full font-medium transition ${
                  darkMode
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
                onClick={toggleDarkMode}
              >
                {darkMode ? t.on : t.off}
              </button>
            </div>
          </motion.div>

          {/* ℹ️ About Section */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-5 shadow-md ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <div className="font-semibold text-lg mb-3">{t.about}</div>
            <div className="mb-2">{t.privacy}</div>
            <div className="mb-2">{t.terms}</div>
            <hr className="my-4 border-gray-400" />
            <div className="text-center text-gray-400">{t.version}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 🌍 Language Screen
function LanguageScreen({ onGoBack }) {
  const { language, setLanguage, darkMode } = useSettings();
  const t = translations[language];

  const languageOptions = [
    { key: "en-uk", label: t.englishUK, code: "UK" },
    { key: "en-us", label: t.englishUS, code: "US" },
    { key: "ls", label: t.sesotho, code: "LS" },
  ];

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div
        className={`rounded-3xl w-full max-w-2xl p-8 shadow-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div className="flex items-center px-6 py-4 mb-8 relative rounded-t-3xl">
          <button
            onClick={onGoBack}
            className={`bg-opacity-90 px-6 py-2 rounded-full font-semibold shadow transition ${
              darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {t.back}
          </button>
          <h2
            className={`absolute inset-0 flex items-center justify-center font-bold text-2xl pointer-events-none ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            {t.language}
          </h2>
        </div>

        {/* Language Options */}
        <div className="flex flex-col items-center space-y-6">
          {languageOptions.map((opt) => (
            <motion.button
              key={opt.key}
              whileHover={{ scale: 1.03 }}
              className={`w-full py-3 rounded-xl font-bold text-lg transition ${
                language === opt.key
                  ? "bg-blue-600 text-white shadow-md"
                  : darkMode
                  ? "bg-gray-700 text-white border border-gray-600"
                  : "bg-gray-100 text-black border border-gray-300"
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

// 🔔 Notifications Screen
function NotificationsScreen({ onGoBack }) {
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const notificationOptions = [
    { label: t.vibrate, checked: false },
    { label: t.notificationSound, checked: true },
    { label: t.priorityNotifications, checked: true },
  ];

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div
        className={`rounded-3xl w-full max-w-2xl p-8 shadow-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div className="flex items-center px-6 py-4 mb-8 relative rounded-t-3xl">
          <button
            onClick={onGoBack}
            className={`bg-opacity-90 px-6 py-2 rounded-full font-semibold shadow transition ${
              darkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {t.back}
          </button>
          <h2 className="absolute inset-0 flex items-center justify-center font-bold text-2xl pointer-events-none text-white">
            {t.notifications}
          </h2>
        </div>

        {/* Notification Options */}
        <div className="flex flex-col space-y-6">
          {notificationOptions.map((opt, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between p-4 rounded-xl shadow-md transition ${
                darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
              }`}
            >
              <span className="font-semibold">{opt.label}</span>
              <input
                type="checkbox"
                checked={opt.checked}
                readOnly
                className="toggle toggle-md"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🧩 Wrapper Component
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
      {view === "language" && (
        <LanguageScreen onGoBack={() => setView("settings")} />
      )}
      {view === "notifications" && (
        <NotificationsScreen onGoBack={() => setView("settings")} />
      )}
    </div>
  );
}
