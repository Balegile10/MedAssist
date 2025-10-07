// components/EmergencyCallScreen.jsx

export default function EmergencyCallScreen({ phoneNumber }) {
  const handleCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-600 to-red-900 text-white">
      <div className="text-sm absolute top-4 left-4 opacity-70">Call Ambulance</div>

      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">{phoneNumber}</h1>
        <p className="text-lg mb-8 animate-pulse">Calling...</p>
      </div>

      <button
        onClick={handleCall}
        className="bg-white text-red-600 rounded-full p-4 shadow-lg hover:scale-105 transition"
        aria-label="Call now"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M6.225 4.811a1.5 1.5 0 012.121 0l1.414 1.414a1.5 1.5 0 010 2.121l-.707.707a1.5 1.5 0 000 2.121l4.95 4.95a1.5 1.5 0 002.121 0l.707-.707a1.5 1.5 0 012.121 0l1.414 1.414a1.5 1.5 0 010 2.121l-1.414 1.414a1.5 1.5 0 01-2.121 0l-9.9-9.9a1.5 1.5 0 010-2.121l1.414-1.414z" />
        </svg>
      </button>
    </div>
  );
}