// components/LocationMap.tsx
export default function LocationMap() {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow">
        <button className="text-blue-600 font-medium hover:underline">Back</button>
        <h1 className="text-lg font-semibold text-gray-800">Location Services</h1>
        <div className="w-16" /> {/* Spacer for symmetry */}
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2 bg-white shadow-sm flex items-center gap-2">
        <div className="flex items-center w-full bg-gray-200 rounded-md px-3 py-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            placeholder="Find Nearest Clinic"
            className="bg-transparent outline-none px-2 w-full text-sm"
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
          Search this area
        </button>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        {/* Replace this with actual map embed or component */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-700">
          [Map Placeholder]
        </div>
      </div>
    </div>
  );
}