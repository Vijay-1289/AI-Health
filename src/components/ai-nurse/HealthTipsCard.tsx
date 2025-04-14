
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HealthTip {
  title: string;
  description: string;
}

const healthTips: HealthTip[] = [
  {
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily to maintain proper bodily functions and prevent dehydration."
  },
  {
    title: "Get Adequate Sleep",
    description: "Aim for 7-9 hours of quality sleep each night to support immune function and overall health."
  },
  {
    title: "Balanced Diet",
    description: "Include fruits, vegetables, whole grains, lean proteins, and healthy fats in your daily meals."
  },
  {
    title: "Regular Exercise",
    description: "Engage in at least 150 minutes of moderate physical activity each week for cardiovascular health."
  },
  {
    title: "Stress Management",
    description: "Practice mindfulness, meditation, or deep breathing exercises to reduce stress levels."
  }
];

const HealthTipsCard = () => {
  return (
    <Card>
      <CardHeader className="bg-healSmart-green/10 border-b pb-3">
        <CardTitle className="text-healSmart-green">Daily Health Tips</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {healthTips.map((tip, index) => (
            <div key={index} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <h4 className="font-medium text-gray-900 mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTipsCard;
