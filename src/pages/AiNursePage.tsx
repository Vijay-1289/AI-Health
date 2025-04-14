
import React from 'react';
import Navbar from '@/components/Navbar';
import AiNurseChat from '@/components/ai-nurse/AiNurseChat';
import HealthTipsCard from '@/components/ai-nurse/HealthTipsCard';
import { Headphones } from 'lucide-react';

const AiNursePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
              <Headphones className="h-8 w-8 text-healSmart-red" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Health Assistant</h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Get instant health advice, medication information, and preventive tips from our AI assistant.
              You can talk to the assistant by voice or text.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AiNurseChat />
            </div>
            <div className="space-y-8">
              <HealthTipsCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiNursePage;
