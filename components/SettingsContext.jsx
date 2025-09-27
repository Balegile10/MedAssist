"use client";
import React, { createContext, useContext, useState } from "react";

// Supported languages



const SettingsContext = createContext({
  language: "en-uk",
  setLanguage: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
});

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState("en-uk");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, darkMode, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
