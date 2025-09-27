import React from 'react';
import Image from 'next/image';
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-white min-h-screen flex items-center justify-center">
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

        <h1 className="text-4xl mb-4 font-extraboldp text-blue-600">
          Welcome to MedAssist
        </h1>

       {/* Get Started button goes to signup */}
        <Link href="/signup">
          <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg font-bold hover:bg-blue-700 transition">
            Get Started
          </button>
        </Link>
      
     
       
      </div>
    </section>
  );
}
