"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSettings } from "../../components/SettingsContext";
import { motion } from "framer-motion";

export default function AITherapist() {
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message") || "";
  const { language, darkMode } = useSettings();

  const [userMessage, setUserMessage] = useState(initialMessage);
  const [conversation, setConversation] = useState([]);
  const [aiResponse, setAiResponse] = useState(
    language === "ls" ? "AI e ntse e ngola karabo ea hau..." : "AI is generating a response..."
  );
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async (message) => {
    if (!message) return;
    setLoading(true);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `
            You are a professional therapist. Respond empathetically, professionally, and thoughtfully to the user's concerns. 
            Make your response clear, supportive, and easy to understand. 
            Encourage reflection, emotional well-being, and constructive coping strategies. 
            Keep the response concise but meaningful.
            ${language === "ls" ? "Respond in Sesotho." : "Respond in English."}

            User's message: ${message}
          `,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setAiResponse((language === "ls" ? "Phoso: " : "Error: ") + data.error);
      } else {
        setAiResponse(data.aiText);
        setConversation((prev) => [...prev, { role: "user", content: message }, { role: "ai", content: data.aiText }]);
      }
    } catch (err) {
      setAiResponse((language === "ls" ? "Phoso: " : "Error: ") + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!userMessage.trim()) return;
    fetchAIResponse(userMessage);
    setUserMessage("");
  };

  return (
    <div className={`min-h-screen p-6 flex flex-col items-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        {language === "ls" ? "Therapist ea AI" : "AI Therapist"}
      </motion.h1>

      <div className={`w-full max-w-3xl flex flex-col gap-4`}>
        {conversation.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === "ai" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg shadow-md ${msg.role === "ai" ? (darkMode ? "bg-blue-700 text-white" : "bg-blue-100 text-gray-800") : (darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800")}`}
          >
            <strong>{msg.role === "ai" ? (language === "ls" ? "AI:" : "Therapist:") : (language === "ls" ? "U:" : "You:")}</strong> {msg.content}
          </motion.div>
        ))}

        {loading && (
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"}`}>
            {language === "ls" ? "AI e ntse e ngola karabo..." : "AI is generating a response..."}
          </div>
        )}
      </div>

      {/* Input section */}
      <div className="mt-6 flex w-full max-w-3xl gap-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder={language === "ls" ? "Ngola molaetsa oa hau mona..." : "Type your message here..."}
          className={`flex-1 px-4 py-2 rounded-lg shadow focus:outline-none ${
            darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-white text-gray-800 placeholder-gray-500"
          }`}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {language === "ls" ? "Romela" : "Send"}
        </button>
      </div>
    </div>
  );
}
