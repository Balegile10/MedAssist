"use client"
import React from 'react';
import Link from "next/link";

export default function LocationPage() {
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
                    <div className="space-y-4">
                        {/*Clinic Card*/}
                        <div className="border p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                            <div>
                                <h3 className="font-bold">Better Health Clinic</h3>
                                <p className="text-sm text-gray-600">Clinic * 0.75 km</p>
                                <span className="inline-block  mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                    Closed
                                </span>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Call
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                                    Directions
                                </button>
                            </div>
                        </div>

                        {/*Hospital Card*/}
                        <div className="border p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                            <div>
                                <h3 className="font-bold">Queen 2 Hospital</h3>
                                <p className="text-sm text-gray-600">Hospital * 1.1 km</p>
                                <span className="inline-block  mt-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                    Open Now
                                </span>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Call
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                                    Directions
                                </button>
                            </div>
                        </div>


                        {/*Pharmacy Card*/}
                        <div className="border p-4 rounded-lg flex flex-col sm:flex-row justify-between item-start sm:items-center">
                            <div>
                                <h3 className=" font-bold"> Batho Pele Pharmacy</h3>
                                <p className="text-sm text-gray-600"> Pharmacy -1.25 km</p>
                            </div>
                            <div className="flex gap-2 mt-4 sm:mt-0">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Call
                                </button>
                                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
                                    Directions
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}