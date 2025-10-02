"use client";
import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useSettings } from "./SettingsContext";
import translations from "./translations";

export default function HeroSection() {
  const { language, darkMode } = useSettings();
  const t = translations[language];
  return (
    <section className={`relative min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="relative z-10 text-center px-6 md:px-12 lg:px-24">
        <div className="flex justify-center mb-6">
          <Image
            src="/MedAssist.png"
            alt="MedAssist Logo"
            width={64}
            height={64}
            className="rounded-full shadow-lg"
            priority
          />
        </div>

        <h1 className="text-4xl mb-4 font-extrabold text-blue-600">
          {t.welcome || (language === 'ls' ? 'Rea u amohela ho MedAssist' : 'Welcome to MedAssist')}
        </h1>

       {/* Get Started button → goes to signup */}
        <Link href="/signup">
          <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg font-bold hover:bg-blue-700 transition">
            {language === "ls" ? "Qala" : "Get Started"}
          </button>
        </Link>
      </div>
    </section>
  );
}
