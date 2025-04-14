
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  location: string;
  experience: number;
  consultationFee: number;
  availability: string;
}

const DoctorCard = ({ id, name, specialty, location, experience, consultationFee, availability }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="h-16 w-16 rounded-full bg-healSmart-lightBlue flex items-center justify-center">
              <User className="h-8 w-8 text-healSmart-blue" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-healSmart-blue mb-1">{specialty}</p>
            <p className="text-sm text-gray-500 mb-1">{location}</p>
            <p className="text-sm text-gray-500 mb-1">{experience} years experience</p>
            <p className="text-sm text-gray-500 mb-2">₹{consultationFee} consultation fee</p>
            <p className="text-sm font-medium text-healSmart-green mb-4">
              {availability}
            </p>
            <Link to={`/book-appointment/${id}`}>
              <Button size="sm" className="bg-healSmart-blue hover:bg-blue-700">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
