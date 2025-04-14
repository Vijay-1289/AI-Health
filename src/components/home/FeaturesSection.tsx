
import React from 'react';
import { Calendar, Users, Headphones } from 'lucide-react';

const features = [
  {
    title: 'Find Local Doctors',
    description: 'Connect with qualified doctors in Vijayawada and Eluru for in-person or virtual consultations.',
    icon: <Users className="h-10 w-10 text-healSmart-blue mb-4" />
  },
  {
    title: 'Book Appointments',
    description: 'Schedule appointments with your preferred doctors at convenient times.',
    icon: <Calendar className="h-10 w-10 text-healSmart-green mb-4" />
  },
  {
    title: 'AI Health Assistant',
    description: 'Get instant health advice, medication information, and preventive tips from our AI assistant.',
    icon: <Headphones className="h-10 w-10 text-healSmart-red mb-4" />
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            We provide comprehensive healthcare solutions to ensure you get the care you need, when you need it.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
