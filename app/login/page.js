
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className={`min-h-screen flex ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <form
          onSubmit={handleLogin}
          className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md ${darkMode ? "dark:bg-gray-800 dark:text-white" : ""}`}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-6">{language === "ls" ? "Kena" : t.login || "Login"}</h2>
          <input
            type="email"
            placeholder={language === "ls" ? "Imeile" : t.email || "Email"}
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            placeholder={language === "ls" ? "Lentsoe la sephiri" : t.password || "Password"}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {language === "ls" ? "Kena" : t.login || "Login"}
          </button>
          <p className="mt-4 text-sm text-center">
            {language === "ls" ? "Ha u na ak'haonte?" : t.noAccount || "Don’t have an account?"} {" "}
            <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
              {language === "ls" ? "Ngolisa" : t.signup || "Sign Up"}
            </Link>
          </p>
        </form>
      </div>

      {/* Right side - Image */}
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src="/login.png"
          alt="Medical Assistant"
          width={600}
          height={600}
          className="object-cover rounded-lg shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
