"use client";

import React, { useEffect, useState } from "react";
import { useSettings } from "../../../components/SettingsContext";
import translations from "../../../components/translations";

function ClinicCard({ name, distance, isOpen, mapsUrl }) {
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
          onClick={() => window.open(mapsUrl)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Directions
        </button>
      </div>
    </div>
  );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
}

export default function LocationPage() {
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const [clinics, setClinics] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=YOUR_API_KEY`
          );
          const data = await response.json();

          const formatted = data.results.map((clinic) => ({
            name: clinic.name,
            lat: clinic.geometry.location.lat,
            lng: clinic.geometry.location.lng,
            isOpen: clinic.opening_hours?.open_now || false,
            mapsUrl: `https://www.google.com/maps/search/?api=1&query=${clinic.geometry.location.lat},${clinic.geometry.location.lng}`,
            distance: calculateDistance(latitude, longitude, clinic.geometry.location.lat, clinic.geometry.location.lng),
          }));

          setClinics(formatted);
        },
        (error) => {
          console.error("Location error:", error);
        }
      );
    }
  }, []);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}`}>
      <div className={`max-w-4xl mx-auto rounded-xl shadow-md p-8 space-y-8 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
        <h1 className={`text-2xl font-bold text-center ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
          {language === "ls" ? "Litšebeletso tsa Sebaka" : "Location Services"}
        </h1>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className={`border p-4 rounded-lg space-y-2 ${darkMode ? "border-gray-600" : ""}`}>
            <h2 className="text-lg font-semibold">{language === "ls" ? "Tšohanyetso" : "Emergency"}</h2>
            <button
              onClick={() => window.location.href = "tel:112"}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              {language === "ls" ? "Letsetsa Ambulense" : "Call Ambulance"}
            </button>
          </div>
          <div className={`border p-4 rounded-lg space-y-2 ${darkMode ? "border-gray-600" : ""}`}>
            <h2 className="text-lg font-semibold">{language === "ls" ? "Fumana Sepetlele se Haufi" : "Find Nearest Clinic"}</h2>
            <button
              onClick={() => alert("Clinics are shown below")}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {language === "ls" ? "Fumana Sepetlele se Haufi" : "Find Nearest Clinic"}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">{language === "ls" ? "Litsebeletso tse Haufi" : "Nearest Clinics"}</h2>
          {clinics.length === 0 ? (
            <p className="text-gray-500">Loading nearby clinics...</p>
          ) : (
            clinics.map((clinic, index) => (
              <ClinicCard key={index} {...clinic} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
const Header = () => (
  <div className="flex items-center justify-between bg-blue-500 p-4">
    <button
      onClick={() => window.history.back()}
      className="text-white bg-blue-900 px-3 py-1 rounded hover:bg-blue-800"
    >
      Back
    </button>
    <h1 className="text-white text-lg font-semibold flex items-center">
      <MapPinIcon className="h-5 w-5 mr-2" />
      Location Services
    </h1>
  </div>
);