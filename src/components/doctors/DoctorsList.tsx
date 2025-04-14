
import React, { useState } from 'react';
import DoctorCard from './DoctorCard';
import { Input } from "@/components/ui/input";
import { MapPin, Search } from 'lucide-react';

// Sample data for doctors in Vijayawada and Eluru
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

const DoctorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredDoctors = doctorsData.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || doctor.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search by doctor name or specialty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-healSmart-blue"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="Vijayawada">Vijayawada</option>
                <option value="Eluru">Eluru</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              id={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              location={doctor.location}
              experience={doctor.experience}
              consultationFee={doctor.consultationFee}
              availability={doctor.availability}
            />
          ))
        ) : (
          <div className="col-span-full py-8 text-center">
            <p className="text-gray-500">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
