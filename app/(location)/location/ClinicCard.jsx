"use client"
 export default function ClinicCard({ name, distance, phone, mapsUrl, isOpen }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center mb-4">
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{distance} km away</p>
        <span
          className={`text-sm font-medium ${
            isOpen ? "text-green-600" : "text-red-600"
          }`}
        >
          {isOpen ? "Open Now" : "Closed"}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => window.location.href = `tel:${phone}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Call
        </button>
        <button
          onClick={() => window.open(mapsUrl)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
        >
          Directions
        </button>
      </div>
    </div>
  );
}
