import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ t, language }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-end">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400"
        >
          {t?.menu || (language === 'ls' ? 'Lenane' : 'Menu')} ≡
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <Link href="/settings">{t?.settings || (language === 'ls' ? 'Litlhophiso' : 'Settings')}</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                <Link href="/location">{t?.location || (language === 'ls' ? 'Sebaka' : 'Location')}</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

