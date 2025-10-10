"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useSettings } from "../../components/SettingsContext";
import translations from "../../components/translations";

export default function AITherapist() {
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message") || "";
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const [userMessage, setUserMessage] = useState(initialMessage);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add AI greeting when the component mounts or language changes
  useEffect(() => {
    const greeting = t.aiGreeting || "How are you feeling today?";
    setConversation([{ role: "ai", content: greeting }]);
  }, [language]);

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
            Respond in ${language === "ls" ? "Sesotho" : "English"}.

            User's message: ${message}
          `,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setConversation((prev) => [
          ...prev,
          { role: "ai", content: `${t.aiError || "Error:"} ${data.error}` },
        ]);
      } else {
        setConversation((prev) => [
          ...prev,
          { role: "user", content: message },
          { role: "ai", content: data.aiText },
        ]);
      }
    } catch (err) {
      setConversation((prev) => [
        ...prev,
        { role: "ai", content: `${t.aiError || "Error:"} ${err.message}` },
      ]);
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
    <div
      className={`min-h-screen p-6 flex flex-col items-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 flex items-center gap-2"
      >
        💬 {t.aiTherapist || "AI Therapist"}
      </motion.h1>

      {/* Conversation */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
        {conversation.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === "ai" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 rounded-lg shadow-md break-words ${
              msg.role === "ai"
                ? darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
                : darkMode
                ? "bg-blue-700 text-white ml-auto"
                : "bg-blue-100 text-black ml-auto"
            }`}
          >
            <strong>
              {msg.role === "ai" ? t.aiLabel || "Therapist:" : t.userLabel || "You:"}
            </strong>{" "}
            {msg.content}
          </motion.div>
        ))}

        {loading && (
          <div
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            {t.typing || "Typing..."}
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="mt-6 flex w-full max-w-3xl gap-2">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder={t.typeMessage || "Type your message here..."}
          className={`flex-1 px-4 py-2 rounded-lg shadow focus:outline-none ${
            darkMode
              ? "bg-gray-800 text-white placeholder-gray-400"
              : "bg-white text-black placeholder-gray-500"
          }`}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {t.send || "Send"}
        </button>
      </div>
    </div>
  );
}
