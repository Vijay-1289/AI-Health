import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Navigation } from 'lucide-react';
import { toast } from "sonner";

interface HospitalInfo {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  distance?: string;
}

const hospitals: HospitalInfo[] = [
  {
    id: "1",
    name: "Apollo Hospital",
    address: "Health City, Arilova, Chinagadili",
    city: "Visakhapatnam",
    phone: "0891 232 7777"
  },
  {
    id: "2",
    name: "Manipal Hospital",
    address: "Tadepalli, Guntur District",
    city: "Vijayawada",
    phone: "0866 245 6789"
  },
  {
    id: "3",
    name: "KIMS Hospital",
    address: "NH-16 Service Road, Chuttugunta",
    city: "Guntur",
    phone: "0863 239 0000"
  },
  {
    id: "4",
    name: "Andhra Hospitals",
    address: "Beside Ajit Singh Nagar Gate, Bund Road",
    city: "Vijayawada",
    phone: "0866 228 2334"
  },
  {
    id: "5",
    name: "Kamineni Hospitals",
    address: "Poranki, NH-5, Vijayawada, Krishna District",
    city: "Vijayawada", 
    phone: "0866 258 1717"
  },
  {
    id: "6",
    name: "NRI General Hospital",
    address: "Chinakakani, Guntur District",
    city: "Guntur",
    phone: "0863 235 4455"
  },
  {
    id: "7",
    name: "Ramesh Hospitals",
    address: "Guntur Main Road, Vijayawada",
    city: "Vijayawada",
    phone: "0866 245 6666"
  },
  {
    id: "8",
    name: "Rainbow Children's Hospital",
    address: "Benz Circle, Vijayawada",
    city: "Vijayawada",
    phone: "0866 257 6666"
  }
];

const NearbyHospitals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nearbyHospitals, setNearbyHospitals] = useState<HospitalInfo[]>([]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setNearbyHospitals(hospitals);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getDirections = (hospital: HospitalInfo) => {
    const address = encodeURIComponent(`${hospital.name}, ${hospital.address}, ${hospital.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  return (
    <div>
      <Card className="shadow-sm mb-6">
        <CardHeader className="bg-healSmart-blue text-white">
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-5 w-5" /> Nearby Hospitals
          </CardTitle>
          <CardDescription className="text-blue-100">
            Hospitals in Andhra Pradesh near your location
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-healSmart-blue border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {nearbyHospitals.map((hospital) => (
                <div key={hospital.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{hospital.address}, {hospital.city}</p>
                      <p className="text-sm text-gray-500 mt-1">☎️ {hospital.phone}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => getDirections(hospital)} 
                    className="mt-3 bg-healSmart-green hover:bg-green-600 w-full"
                  >
                    <Navigation className="h-4 w-4 mr-2" /> Get Directions
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NearbyHospitals;
