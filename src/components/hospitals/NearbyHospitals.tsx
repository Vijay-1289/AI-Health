import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Navigation, X } from 'lucide-react';
import { toast } from "sonner";

interface HospitalInfo {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  distance?: string;
  location?: {
    lat: number;
    lng: number;
  };
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
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HospitalInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    // Initialize Google Maps services
    directionsService.current = new google.maps.DirectionsService();
    directionsRenderer.current = new google.maps.DirectionsRenderer();

    // Get current location when component mounts
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          findNearbyHospitals(location);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location. Please enable location services.");
          setIsLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const findNearbyHospitals = (location: {lat: number, lng: number}) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    
    const request = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: '5000',
      type: ['hospital']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const hospitals = results.map((place, index) => ({
          id: place.place_id || index.toString(),
          name: place.name || 'Unknown Hospital',
          address: place.vicinity || 'Address not available',
          city: 'Andhra Pradesh',
          phone: 'Phone number not available',
          location: {
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0
          }
        }));

        // Calculate distances
        const hospitalsWithDistance = hospitals.map(hospital => {
          if (hospital.location) {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(location.lat, location.lng),
              new google.maps.LatLng(hospital.location.lat, hospital.location.lng)
            );
            return {
              ...hospital,
              distance: `${(distance / 1000).toFixed(1)} km`
            };
          }
          return hospital;
        });

        // Sort by distance
        hospitalsWithDistance.sort((a, b) => {
          return parseFloat(a.distance?.split(' ')[0] || "0") - parseFloat(b.distance?.split(' ')[0] || "0");
        });

        setNearbyHospitals(hospitalsWithDistance);
      }
    });
  };

  const getDirections = (hospital: HospitalInfo) => {
    if (!currentLocation || !hospital.location) {
      toast.error("Location information is not available.");
      return;
    }

    setSelectedHospital(hospital);
    setShowDirections(true);

    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: currentLocation,
        zoom: 12
      });
      directionsRenderer.current?.setMap(mapInstance.current);
    }

    const request = {
      origin: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
      destination: new google.maps.LatLng(hospital.location.lat, hospital.location.lng),
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.current?.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.current?.setDirections(result);
      } else {
        toast.error("Could not get directions. Please try again.");
      }
    });
  };

  const closeDirections = () => {
    setShowDirections(false);
    setSelectedHospital(null);
    directionsRenderer.current?.setMap(null);
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
                    {hospital.distance && (
                      <span className="text-sm font-medium text-healSmart-blue">
                        {hospital.distance}
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={() => getDirections(hospital)} 
                    className="mt-3 bg-healSmart-green hover:bg-green-600 w-full"
                  >
                    <Navigation className="h-4 w-4 mr-2" /> View Directions
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showDirections && selectedHospital && (
        <Card className="shadow-md">
          <CardHeader className="bg-healSmart-green text-white flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Directions to {selectedHospital.name}
              </CardTitle>
              <CardDescription className="text-green-100">
                {selectedHospital.address}, {selectedHospital.city}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-600"
              onClick={closeDirections}
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div ref={mapRef} className="w-full h-96 rounded-lg"></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NearbyHospitals;
