import React from 'react';
import Navbar from '@/components/Navbar';
import NearbyHospitals from '@/components/hospitals/NearbyHospitals';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NearbyHospitalsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Nearby Hospitals</h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Find hospitals near your location in Andhra Pradesh and get directions.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-md">
              <CardHeader className="bg-healSmart-blue text-white">
                <CardTitle>Hospitals Near You</CardTitle>
                <CardDescription className="text-blue-100">
                  Enable location services to find the closest medical facilities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <NearbyHospitals />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NearbyHospitalsPage;
