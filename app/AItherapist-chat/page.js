"use client";

import { useState } from "react";

export default function AItherapistChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello, I’m your AI therapist. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;


    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([...newMessages, { sender: "ai", text: `Error: ${data.error}` }]);
      } else {
        setMessages([...newMessages, { sender: "ai", text: data.aiText }]);
      }
    } catch (err) {
      setMessages([...newMessages, { sender: "ai", text: `Error: ${err.message}` }]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Top Bar */}
      <div className="w-full max-w-2xl bg-blue-600 text-white py-3 px-4 flex items-center justify-between rounded-t-lg">
        <button
          className="text-white font-bold"
          onClick={() => (window.location.href = "/")}
        >
          Back
        </button>
        <h1 className="text-lg font-semibold">AI Therapist</h1>
        <div></div>
      </div>

      {/* Chat Box */}
      <div className="w-full max-w-2xl bg-white flex-1 overflow-y-auto p-4 border-x border-b rounded-b-lg">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "ml-auto bg-blue-500 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="w-full max-w-2xl flex mt-3">
        <input
          type="text"
          className="flex-1 border rounded-l-lg p-3 focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-5 rounded-r-lg font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
