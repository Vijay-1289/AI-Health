
import React from 'react';
import Navbar from '@/components/Navbar';
import DoctorsList from '@/components/doctors/DoctorsList';

const DoctorsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Consult Top Doctors</h1>
            <p className="mt-4 text-xl text-gray-600">Choose from our panel of experienced healthcare professionals</p>
          </div>
          <DoctorsList />
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;
