
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoctorsList from '@/components/doctors/DoctorsList';

const DoctorsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Consult Doctors</h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Find and connect with qualified doctors in Vijayawada and Eluru for your healthcare needs.
            </p>
          </div>
          <DoctorsList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorsPage;
