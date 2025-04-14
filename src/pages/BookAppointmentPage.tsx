
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AppointmentCalendar from '@/components/appointment/AppointmentCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Calendar } from 'lucide-react';

const doctors = [
  { id: '1', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', location: 'Vijayawada', image: '/placeholder.svg' },
  { id: '2', name: 'Dr. Priya Sharma', specialty: 'Pediatrician', location: 'Vijayawada', image: '/placeholder.svg' },
  { id: '3', name: 'Dr. Vikram Reddy', specialty: 'Neurologist', location: 'Eluru', image: '/placeholder.svg' },
  { id: '4', name: 'Dr. Ananya Singh', specialty: 'Dermatologist', location: 'Vijayawada', image: '/placeholder.svg' },
  { id: '5', name: 'Dr. Suresh Patel', specialty: 'Orthopedic Surgeon', location: 'Eluru', image: '/placeholder.svg' },
  { id: '6', name: 'Dr. Meenakshi Venkat', specialty: 'Gynecologist', location: 'Vijayawada', image: '/placeholder.svg' },
];

const BookAppointmentPage = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<{ id: string; name: string; specialty: string; location: string; image: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the doctor data from the backend
    const selectedDoctor = doctors.find(doc => doc.id === doctorId);
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
    } else {
      toast.error('Doctor not found');
      navigate('/doctors');
    }
  }, [doctorId, navigate]);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleBookAppointment = (date: Date, time: string) => {
    if (!date || !time) {
      toast.error('Please select a date and time slot');
      return;
    }

    setIsBooking(true);

    // In a real app, we would make an API call to book the appointment
    setTimeout(() => {
      setIsBooking(false);
      toast.success('Appointment booked successfully');
      navigate('/doctors');
    }, 1500);
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-healSmart-blue border-t-transparent rounded-full"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="mb-6 text-healSmart-blue"
            onClick={() => navigate('/doctors')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Doctors
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardHeader className="bg-healSmart-blue text-white">
                  <CardTitle>Doctor Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm">{doctor.location}</p>
                    
                    <div className="mt-6 w-full">
                      <h4 className="font-medium mb-2">About Doctor</h4>
                      <p className="text-sm text-gray-600">
                        Experienced healthcare professional with expertise in {doctor.specialty.toLowerCase()} 
                        care. Provides compassionate patient care with a focus on preventive health.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader className="bg-healSmart-blue text-white">
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Book Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <AppointmentCalendar 
                    doctorId={doctor.id}
                    doctorName={doctor.name}
                    specialty={doctor.specialty}
                    onAppointmentBooked={handleBookAppointment}
                    onDateSelect={handleDateSelect}
                    onSlotSelect={handleSlotSelect}
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookAppointmentPage;
