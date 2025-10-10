"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSettings } from "./SettingsContext";
import translations from "./translations";

export default function HeroSection() {
  const { language, darkMode } = useSettings();
  const t = translations[language];

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center 
        ${darkMode 
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white"
        } overflow-hidden`}
    >
      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center space-x-4 mb-10"
      >
        <Image
          src="/MedAssist.png"
          alt="MedAssist Logo"
          width={100}
          height={100}
          className="drop-shadow-lg rounded-full"
          priority
        />
        <motion.h1
          className="text-5xl font-bold"
          animate={{
            color: ["#00e6ff", "#00ff88", "#ffe600", "#ff00c8", "#00e6ff"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        >
          MedAssist
        </motion.h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg max-w-lg text-center text-blue-100 mb-10"
      >
        {t.welcomeText ||
          (language === "ls"
            ? "Sebaka sa hau sa polokeho bakeng sa bophelo bo botle ba kelello le tšehetso ea maikutlo."
            : "Your safe space for mental health and emotional support. Talk, heal, and grow with your AI therapist and companion.")}
      </motion.p>

      {/* Get Started Button */}
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link
          href="/signup"
          className="bg-white text-blue-800 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-200 transition-all duration-300"
        >
          {language === "ls" ? "Qala" : "Get Started"}
        </Link>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 text-sm text-blue-200"
      >
        © 2025 MedAssist. All Rights Reserved.
      </motion.div>
    </div>
  );
}
