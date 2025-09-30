"use client";
import React, { useState } from "react";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";
import Navbar from "../../components/navbar";


function Settings({ onGoBack, onLanguageClick, onNotificationsClick }) {
  const { language, darkMode, toggleDarkMode } = useSettings();
  const t = translations[language];
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-200'}`}>
      <Navbar />
      <div className={`rounded-[2rem] w-full max-w-3xl shadow-md p-8 mt-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        {/* Header */}
  <div className={`flex items-center rounded-t-[2rem] px-8 py-4 mb-8 relative ${darkMode ? 'bg-blue-900' : 'bg-blue-600'}`}>
          <button
            onClick={onGoBack}
            className={`bg-[#091C36] text-white text-lg px-6 py-2 rounded-full font-semibold mr-8`}
          >
            {t.back}
          </button>
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
        </div>
        {/* Body */}
  <div className="space-y-6">
          {/* Language */}
          <div
            className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} rounded-xl shadow p-5 cursor-pointer`}
            onClick={onLanguageClick}
          >
            <div className="font-semibold text-lg mb-3">{t.language}</div>
            <div className="bg-black text-white py-2 px-4 rounded-lg text-center font-semibold">
              {t[language === "en-uk" ? "englishUK" : language === "en-us" ? "englishUS" : "sesotho"]}
            </div>
          </div>
          {/* Notifications & Dark Mode */}
          <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} rounded-xl shadow p-5`}>
            <div
              className="font-semibold text-lg mb-3 cursor-pointer"
              onClick={onNotificationsClick}
            >
              {t.notifications}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{t.darkMode}</span>
              <button className="border px-4 py-1 rounded hover:bg-gray-100" onClick={toggleDarkMode}>
                {darkMode ? t.on : t.off}
              </button>
            </div>
          </div>
          {/* About */}
          <div className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-white'} rounded-xl shadow p-5`}>
            <div className="font-semibold text-lg mb-3">{t.about}</div>
            <div className="mb-2">{t.privacy}</div>
            <div className="mb-2">{t.terms}</div>
            <hr className="my-4" />
            <div className="text-center text-gray-400">{t.version}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Language Screen
function LanguageScreen({ onGoBack }) {
  const { language, setLanguage, darkMode } = useSettings();
  const t = translations[language];
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-200'}`}>
      <div className={`rounded-[2rem] w-full max-w-2xl shadow-md p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
  <div className={`flex items-center rounded-t-[2rem] px-8 py-4 mb-8 relative ${darkMode ? 'bg-blue-900' : 'bg-blue-600'}`}>
          <button
            onClick={onGoBack}
            className="bg-[#091C36] text-white text-lg px-6 py-2 rounded-full font-semibold mr-8"
          >
            {t.back}
          </button>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white font-bold text-2xl">{t.language}</span>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <div className="border-4 border-blue-600 rounded-full p-3 mb-2">
              <img src="/MedAssist.png" alt="MedAssist logo" className="w-12 h-12" />
            </div>
            <div className="text-blue-700 font-bold text-xl">MedAssist</div>
          </div>
          <div className="text-center text-gray-700 mb-4">
            {t.chooseLanguage}
          </div>
          <button
            className={`w-full py-3 rounded-lg font-bold text-xl mb-2 ${language === "en-uk" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-black"}`}
            onClick={() => setLanguage("en-uk")}
          >
            <span className="text-sm font-semibold mr-2">UK</span> {t.englishUK}
          </button>
          <button
            className={`w-full py-3 rounded-lg font-bold text-xl mb-2 ${language === "en-us" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-black"}`}
            onClick={() => setLanguage("en-us")}
          >
            <span className="text-sm font-semibold mr-2">US</span> {t.englishUS}
          </button>
          <button
            className={`w-full py-3 rounded-lg font-bold text-xl ${language === "ls" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-black"}`}
            onClick={() => setLanguage("ls")}
          >
            <span className="text-sm font-semibold mr-2">LS</span> {t.sesotho}
          </button>
        </div>
      </div>
    </div>
  );
}

// Notifications Screen
function NotificationsScreen({ onGoBack }) {
  const { language, darkMode } = useSettings();
  const t = translations[language];
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-200'}`}>
      <div className={`rounded-[2rem] w-full max-w-2xl shadow-md p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
  <div className={`flex items-center rounded-t-[2rem] px-8 py-4 mb-8 relative ${darkMode ? 'bg-blue-900' : 'bg-blue-600'}`}>
          <button
            onClick={onGoBack}
            className="bg-[#091C36] text-white text-lg px-6 py-2 rounded-full font-semibold mr-8"
          >
            {t.back}
          </button>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white font-bold text-2xl">{t.notifications}</span>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <div className="border-4 border-blue-600 rounded-full p-3 mb-2">
              <img src="/MedAssist.png" alt="MedAssist logo" className="w-12 h-12" />
            </div>
            <div className="text-blue-700 font-bold text-xl">MedAssist</div>
          </div>
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-lg">{t.vibrate}</span>
              <label className="flex items-center cursor-pointer">
                <span className="mr-2 text-gray-500 text-sm">{t.off}</span>
                <input type="checkbox" className="toggle toggle-md" />
              </label>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-lg">{t.notificationSound}</span>
              <label className="flex items-center cursor-pointer">
                <span className="mr-2 text-gray-500 text-sm">{t.on}</span>
                <input type="checkbox" className="toggle toggle-md" checked readOnly />
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">{t.priorityNotifications}</span>
              <label className="flex items-center cursor-pointer">
                <span className="mr-2 text-gray-500 text-sm">{t.on}</span>
                <input type="checkbox" className="toggle toggle-md" checked readOnly />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("settings"); // default to settings for this page

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