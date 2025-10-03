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

import React from 'react';
import { useSettings } from "../../../components/SettingsContext";
import translations from "../../../components/translations";

//ClinicCard Component
function ClinicCard({ name, distance, phone, mapsUrl, isOpen }) {
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
          onClick={() => (window.location.href = `tel:${phone}`)}
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


export default function  LocationPage(){
    const { language, darkMode } = useSettings();
    const t = translations[language];

    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
            <div className={`max-w-4xl mx-auto rounded-xl shadow-md p-8 space-y-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
                <h1 className={`text-2xl font-bold text-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    {language === 'ls' ? 'Litšebeletso tsa Sebaka' : 'Location Services'}
                </h1>
                {/*Emergency and clinic buttons*/}
                <div className="grid sm:grid-cols-2 gap-6">
                    <div className={`border p-4 rounded-lg space-y-2 ${darkMode ? 'border-gray-600' : ''}`}>
                        <h2 className="text-lg font-semibold">
                            {language === 'ls' ? 'Tšohanyetso' : 'Emergency'}
                        </h2>
                        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                            {language === 'ls' ? 'Letsetsa Ambulense' : 'Call Ambulance'}
                        </button>
                    </div>
                    <div className={`border p-4 rounded-lg space-y-2 ${darkMode ? 'border-gray-600' : ''}`}>
                        <h2 className="text-lg font-semibold">{language === 'ls' ? 'Fumana Sepetlele se Haufi' : 'Find Nearest Clinic'}</h2>
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            {language === 'ls' ? 'Fumana Sepetlele se Haufi' : 'Find Nearest Clinic'}
                        </button>
                    </div>
                </div>

                {/*Nearest Clinics List*/}
                <div>
                    <h2 className="text-lg font-semibold md-4">
                        {language === 'ls' ? 'Litsebeletso tse Haufi' : 'Nearest Clinics'}
                    </h2>
              </div>
                    <div className="space-y-4">
                        {/*Clinic Card*/}
                        <div className={`border p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center ${darkMode ? 'border-gray-600' : ''}`}>
                            <div>
                                <h3 className="font-bold">Better Health Clinic</h3>
                                <p className="text-sm text-gray-600">{language === 'ls' ? 'Sepetlele * 0.75 km' : 'Clinic * 0.75 km'}</p>
                                <span className="inline-block mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                    {language === 'ls' ? 'E koetsoe' : 'Closed'}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    {language === 'ls' ? 'Letsetsa' : 'Call'}
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                                    {language === 'ls' ? 'Litaelo' : 'Directions'}
                                </button>
                            </div>
                        </div>

                        {/*Hospital Card*/}
                        <div className={`border p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center ${darkMode ? 'border-gray-600' : ''}`}>
                            <div>
                                <h3 className="font-bold">Queen 2 Hospital</h3>
                                <p className="text-sm text-gray-600">{language === 'ls' ? 'Sepetlele * 1.1 km' : 'Hospital * 1.1 km'}</p>
                                <span className="inline-block mt-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                    {language === 'ls' ? 'E Bulehile Hona Joale' : 'Open Now'}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    {language === 'ls' ? 'Letsetsa' : 'Call'}
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                                    {language === 'ls' ? 'Litaelo' : 'Directions'}
                                </button>
                            </div>
                        </div>

                        {/*Pharmacy Card*/}
                        <div className={`border p-4 rounded-lg flex flex-col sm:flex-row justify-between item-start sm:items-center ${darkMode ? 'border-gray-600' : ''}`}>
                            <div>
                                <h3 className="font-bold">Batho Pele Pharmacy</h3>
                                <p className="text-sm text-gray-600">{language === 'ls' ? 'Pharmacy -1.25 km' : 'Pharmacy -1.25 km'}</p>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    {language === 'ls' ? 'Letsetsa' : 'Call'}
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                                    {language === 'ls' ? 'Litaelo' : 'Directions'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    
}
