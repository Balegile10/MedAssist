"use client"
import React from 'react';
import Link from "next/link";
import ClinicCard from "..components/ClinicCard";

export default function  ClinicCard(name, distamce, phone, mapUrl, isOpen) {
    return (
        <div className=" bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
                <h1 className="text-2xl font-bold text-center text-blue-700">
                    Location Services
                </h1>
                {/*Emergency and clinic buttons*/}
                <div className=" grid sm:grid-cols-2 gap-6">
                    <div  className="border p-4 rounded-lg space-y-2">
                        <h2 className="text-lg font-semibold">
                            Emergency
                        </h2>
                        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                            Call Ambulance
                         </button>
                         
                    </div>
                    <div className="border p-4 rounded-lg space-y-2">
                        <h2 className="text-lg font-semibold">Find Nearest Clinic</h2>
                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            Find Nearest Clinic
                        </button>
                    </div>
                </div>
                {/*Nearest Clinics List*/}
                <div>
                    <h2 className="text-lg font-semibold md-4">
                        Nearest Clinics
                    </h2>
                      <div className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
                        {/*ClinicCard */}
                          <div>
                             <h3 className="font-bold">{name}</h3>
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
                                 onClick={() => window.open(`tel:${phone}`)}
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
                </div>
            </div>
        </div>
    );
}
