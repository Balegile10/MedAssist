"use client";
import { useState } from "react";

export default function TherapistPage() {
  const [user, setUser] = useState({ name: "", mood: "", goal: "" });
  const [setupDone, setSetupDone] = useState(false);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetup = (e) => {
    e.preventDefault();
    if (user.name && user.mood && user.goal) setSetupDone(true);
    else alert("Please fill in all fields.");
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setChat([...chat, { role: "user", text: message }]);
    setMessage("");

    const res = await fetch("/api/therapist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, user }),
    });

    const data = await res.json();
    setChat((prev) => [...prev, { role: "ai", text: data.response }]);
    setLoading(false);
  };

  const getAffirmation = async () => {
    const res = await fetch("/api/affirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });
    const data = await res.json();
    alert(`🌞 Daily Affirmation:\n${data.affirmation}`);
  };

  if (!setupDone) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">🌿 Welcome to Luna</h1>
        <form onSubmit={handleSetup} className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="How do you feel today?"
            value={user.mood}
            onChange={(e) => setUser({ ...user, mood: e.target.value })}
            className="w-full border rounded p-2"
          />
          <input
            type="text"
            placeholder="What’s your personal goal?"
            value={user.goal}
            onChange={(e) => setUser({ ...user, goal: e.target.value })}
            className="w-full border rounded p-2"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Start Session</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-3">
        💬 Luna, Your AI Therapist
      </h1>
      <button
        onClick={getAffirmation}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        🌞 Daily Affirmation
      </button>

      <div className="w-full max-w-lg bg-white border rounded-2xl shadow-md p-4 flex flex-col">
        <div className="h-96 overflow-y-auto p-3 mb-3">
          {chat.map((c, i) => (
            <div
              key={i}
              className={`my-2 p-2 rounded ${
                c.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
              }`}
            >
              {c.text}
            </div>
          ))}
          {loading && <p className="text-center text-gray-400">Luna is thinking...</p>}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your thoughts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow border rounded p-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
