import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "./SettingsContext";
import translations from "./translations";

  const { language } = useSettings();
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side - Sign Up Form */}
      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">{language === "ls" ? "Ngolisa" : "Sign Up"}</h2>
          <input
            type="text"
            placeholder={language === "ls" ? "Lebitso le felletseng" : "Full Name"}
            className="w-full p-3 border rounded mb-4"
          />
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
            {language === "ls" ? "Ngolisa" : "Sign Up"}
          </button>
          <p className="mt-4 text-sm text-center">
            {language === "ls" ? "U se u ntse u e-na le ak'haonte?" : "Already have an account?"} {" "}
            <a href="/login" className="text-blue-600">
              {language === "ls" ? "Kena" : "Login"}
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
<<<<<<< HEAD
        
         {/* Already have account go to Login */}
=======
        {/* Already have account → Login */}
>>>>>>> ae26eff6c8070fd38cd9b7e1a95a2484d5dfbe3e
        <p className="mt-6 text-sm text-gray-600">
          {language === "ls" ? "U se u ntse u e-na le ak'haonte?" : "Already have an account?"} {" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            {language === "ls" ? "Kena" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );

