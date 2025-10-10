"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AITherapist() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "How are you feeling today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!userInput.trim()) return;

    
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      console.log("API Response:", data); 

      if (data.reply) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: "⚠️ Sorry, I couldn’t generate a response." },
        ]);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      <div className="bg-blue-600 text-white p-4 flex items-center">
        <button
          onClick={() => router.push("/")}
          className="bg-black text-white px-4 py-2 rounded-lg mr-4"
        >
          Back
        </button>
        <h1 className="text-lg font-bold">💬 AI Therapist</h1>
      </div>

      
      <div className="flex-1 p-4 overflow-y-auto bg-white shadow-inner">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-xl shadow-sm max-w-xs ${
              msg.sender === "ai"
                ? "bg-gray-200 text-left"
                : "bg-blue-500 text-white ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="my-2 p-3 rounded-xl shadow-sm max-w-xs bg-gray-200 text-left">
            Typing...
          </div>
        )}
      </div>

      
      <div className="p-4 bg-gray-200 flex">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 p-2 rounded-lg border border-gray-300"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
