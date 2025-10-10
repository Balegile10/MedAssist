"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";

export default function AITherapist() {
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Initialize AI greeting on language change
  useEffect(() => {
    setMessages([{ sender: "ai", text: t.aiGreeting || "How are you feeling today?" }]);
  }, [language]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();

      // Translate AI response automatically using the current language
      let aiText;
      if (!data.reply) {
        aiText = t.aiError || (language === "ls" ? "⚠️ Phoso: Karabo ha ea ka ea hlahisoa." : "⚠️ Sorry, I couldn’t generate a response.");
      } else {
        // Wrap the response in translation function
        aiText = language === "ls" ? data.replySesotho || data.reply : data.reply;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch (err) {
      console.error("Frontend Error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: t.aiError || (language === "ls" ? "Phoso: Ho na le bothata." : "Error: Something went wrong.") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      
      {/* Header */}
      <div className={`p-4 flex items-center ${darkMode ? "bg-blue-900" : "bg-blue-600"}`}>
        <button
          onClick={() => router.push("/home")}
          className={`px-4 py-2 rounded-full mr-4 font-semibold transition 
            ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
        >
          {t.back || "Back"}
        </button>
        <h1 className="text-lg font-bold flex items-center gap-2 text-white">
          💬 {t.aiTherapist || "AI Therapist"}
        </h1>
      </div>

      {/* Chat Messages */}
      <div className={`flex-1 p-4 overflow-y-auto shadow-inner ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-xl shadow-sm max-w-xs break-words ${
              msg.sender === "ai"
                ? `${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`
                : `${darkMode ? "bg-blue-700 text-white ml-auto" : "bg-blue-100 text-black ml-auto"}`
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className={`my-2 p-3 rounded-xl shadow-sm max-w-xs ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}>
            {t.typing || (language === "ls" ? "AI e ntse e ngola karabo..." : "Typing...")}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={`p-4 flex ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={t.typeMessage || (language === "ls" ? "Ngola molaetsa oa hau mona..." : "Type your message here...")}
          className={`flex-1 p-2 rounded-lg border focus:outline-none
            ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-black"}`}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`ml-2 px-4 py-2 rounded-lg font-semibold transition
            ${darkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"}`}
        >
          {t.send || (language === "ls" ? "Romela" : "Send")}
        </button>
      </div>
    </div>
  );
}
