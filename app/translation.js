"use client";
import React, { useState, useEffect } from "react";
import { t } from "./i18n";

export default function SettingsPage() {
  const [lang, setLang] = useState("en-uk");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en-uk";
    setLang(savedLang);
  }, []);

  const handleChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <div>
      <h1>{t(lang, "settings")}</h1>
      <label>{t(lang, "chooseLanguage")}:</label>
      <select value={lang} onChange={handleChange}>
        <option value="en-uk">{t(lang, "englishUK")}</option>
        <option value="en-us">{t(lang, "englishUS")}</option>
        <option value="ls">{t(lang, "sesotho")}</option>
      </select>

      <p>{t(lang, "welcome")}</p>
      <button>{t(lang, "logout")}</button>
    </div>
  );
}
