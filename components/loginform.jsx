
import React from "react";
import Image from "next/image";
import { useSettings } from "./SettingsContext";
import translations from "./translations";

export default function LoginPage() {
  const { language } = useSettings();
  const t = translations[language];
  return (

    <div className="min-h-screen flex bg-gray-100">
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">{language === "ls" ? "Kena" : "Login"}</h2>
          <input
            type="email"
            placeholder={language === "ls" ? "Imeile" : "Email"}
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            placeholder={language === "ls" ? "Lentsoe la sephiri" : "Password"}
            className="w-full p-3 border rounded mb-4"
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            {language === "ls" ? "Kena" : "Login"}
          </button>
          <p className="mt-4 text-sm text-center">
            {language === "ls" ? "Ha u na ak'haonte?" : "Don’t have an account?"} {" "}
            <a href="/signup" className="text-blue-600">
              {language === "ls" ? "Ngolisa" : "Sign Up"}
            </a>
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

