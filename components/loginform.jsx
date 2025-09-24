import React from "react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left side - Login Form */}
      <div className="flex flex-col justify-center items-center w-1/2 p-8">
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-4"
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Login
          </button>
          <p className="mt-4 text-sm text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600">
              Sign Up
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
