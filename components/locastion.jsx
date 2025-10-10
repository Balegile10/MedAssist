"use client";
import React, { useState, useEffect } from "react";
import { useSettings } from "@/components/SettingsContext";
import translations from "@/components/translations";
import Navbar from "@/components/navbar";
import { motion } from "framer-motion";

export default function LocationPage() {
  const { language, darkMode } = useSettings();
  const t = translations[language];

  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  }, []);

  // Fetch nearby clinics/hospitals using Google Places API
  useEffect(() => {
    if (!coords.lat || !coords.lng) return;

    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
        const radius = 5000; // 5 km radius
        const type = "hospital|doctor|clinic"; // types of places

        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords.lat},${coords.lng}&radius=${radius}&type=hospital&key=${apiKey}`
        );

        const data = await res.json();
        setPlaces(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch nearby places");
      }
      setLoading(false);
    };

    fetchPlaces();
  }, [coords]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-8 px-4"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{t.nearbyHealth}</h1>

        {loading && <p className="text-gray-500">{t.loading || "Loading..."}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {places.map((place) => (
              <motion.div
                key={place.place_id}
                whileHover={{ scale: 1.03 }}
                className={`p-5 rounded-2xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
              >
                <h2 className="font-bold text-xl mb-2">{place.name}</h2>
                <p className="text-gray-400 text-sm mb-2">{place.vicinity}</p>
                <p className="text-sm mb-2">
                  {place.opening_hours
                    ? place.opening_hours.open_now
                      ? t.openNow || "Open Now"
                      : t.closed || "Closed"
                    : ""}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  {t.getDirections || "Get Directions"}
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
