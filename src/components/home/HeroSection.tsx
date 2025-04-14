
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect with top doctors in Vijayawada and Eluru or get instant advice from our AI health assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-healSmart-blue hover:bg-blue-700">
              <Link to="/doctors">Consult Doctors</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-healSmart-blue text-healSmart-blue hover:bg-healSmart-lightBlue">
              <Link to="/ai-nurse">AI Health Assistant</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
