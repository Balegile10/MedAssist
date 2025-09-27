"use client";
import React, { createContext, useContext, useState } from "react";

// Supported languages



const SettingsContext = createContext({
  language: "en-uk",
  setLanguage: () => {},
});

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState("en-uk");

  return (
    <SettingsContext.Provider value={{ language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
