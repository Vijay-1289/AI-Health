
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentCalendar from '@/components/appointment/AppointmentCalendar';
import { User } from 'lucide-react';
import { toast } from "sonner";

// Sample doctor data (this would come from an API in a real app)
const doctorsData = [
  {
    id: "1",
    name: "Dr. Ramesh Kumar",
    specialty: "Cardiologist",
    location: "Vijayawada",
    experience: 15,
    consultationFee: 800,
    availability: "Available Today"
  },
  {
    id: "2",
    name: "Dr. Priya Reddy",
    specialty: "Pediatrician",
    location: "Vijayawada",
    experience: 12,
    consultationFee: 600,
    availability: "Available Today"
  },
  {
    id: "3",
    name: "Dr. Suresh Varma",
    specialty: "Orthopedic Surgeon",
    location: "Vijayawada",
    experience: 20,
    consultationFee: 1000,
    availability: "Available Tomorrow"
  },
  {
    id: "4",
    name: "Dr. Lakshmi Devi",
    specialty: "Gynecologist",
    location: "Vijayawada",
    experience: 18,
    consultationFee: 900,
    availability: "Available Today"
  },
  {
    id: "5",
    name: "Dr. Venkat Rao",
    specialty: "Dermatologist",
    location: "Eluru",
    experience: 10,
    consultationFee: 700,
    availability: "Available Today"
  },
  {
    id: "6",
    name: "Dr. Anusha Sharma",
    specialty: "Neurologist",
    location: "Eluru",
    experience: 14,
    consultationFee: 950,
    availability: "Available Tomorrow"
  },
  {
    id: "7",
    name: "Dr. Ravi Chandra",
    specialty: "ENT Specialist",
    location: "Eluru",
    experience: 9,
    consultationFee: 650,
    availability: "Available Today"
  },
  {
    id: "8",
    name: "Dr. Meena Kumari",
    specialty: "Psychiatrist",
    location: "Vijayawada",
    experience: 16,
    consultationFee: 850,
    availability: "Available in 2 days"
  }
];

const BookAppointmentPage = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would be an API call to get doctor info
    const foundDoctor = doctorsData.find(doc => doc.id === doctorId);
    if (foundDoctor) {
      setDoctor(foundDoctor);
    } else {
      // Doctor not found, redirect to doctors page
      toast.error("Doctor not found");
      navigate('/doctors');
    }
  }, [doctorId, navigate]);

  const handleAppointmentBooked = (date: Date, time: string) => {
    // In a real app, this would make an API call to book the appointment
    console.log('Booking appointment for:', { doctor, date, time });
    
    // Show success message
    toast.success("Appointment booked successfully!");
    
    // Redirect to confirmation or home page
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (!doctor) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Appointment</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-24 w-24 rounded-full bg-healSmart-lightBlue flex items-center justify-center">
                    <User className="h-12 w-12 text-healSmart-blue" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center text-gray-900 mb-1">{doctor.name}</h2>
                <p className="text-healSmart-blue text-center mb-4">{doctor.specialty}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span>{doctor.experience} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee:</span>
                    <span>₹{doctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="text-healSmart-green">{doctor.availability}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <AppointmentCalendar 
                doctorId={doctor.id}
                doctorName={doctor.name}
                specialty={doctor.specialty}
                onAppointmentBooked={handleAppointmentBooked}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookAppointmentPage;
