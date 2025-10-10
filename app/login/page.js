"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";

export default function LoginPage() {
  const router = useRouter();
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add real login/authentication logic here
    router.push("/home");
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-200"
      }`}
    >
      {/* Left side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-16"
      >
        <motion.form
          onSubmit={handleLogin}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={`p-10 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md ${
            darkMode
              ? "bg-gray-800/60 text-white border border-gray-700"
              : "bg-white/80 border border-blue-200"
          }`}
        >
          <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-8 drop-shadow-md">
            {language === "ls" ? "Kena" : t.login || "Welcome Back"}
          </h2>

          <div className="space-y-5">
            <input
              type="email"
              placeholder={language === "ls" ? "Imeile" : t.email || "Email"}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              type="password"
              placeholder={
                language === "ls"
                  ? "Lentsoe la sephiri"
                  : t.password || "Password"
              }
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div className="flex justify-end mt-2">
            <Link
              href="forgot-password"
              className="text-sm text-blue-500 hover:underline transition"
            >
              {language === "ls" ? "Lebala lentsoe la sephiri?" : "Forgot password?"}
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-blue-500/40 transition"
          >
            {language === "ls" ? "Kena" : t.login || "Login"}
          </motion.button>

          <p className="mt-6 text-sm text-center">
            {language === "ls"
              ? "Ha u na ak'haonte?"
              : t.noAccount || "Don’t have an account?"}{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              {language === "ls" ? "Ngolisa" : t.signup || "Sign Up"}
            </Link>
          </p>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xs text-gray-400"
        >
          © 2025 MedAssist. Caring through connection.
        </motion.div>
      </motion.div>

      {/* Right side - Image */}
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src="/login.png"
          alt="Medical Assistant"
          width={725}
          height={500}
          className="object-cover rounded-lg shadow-lg"
          priority
        />
      </div>
    </div>
  );
}

