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

const NearbyHospitals = () => {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HospitalInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          findNearbyHospitals(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to get your location. Please enable location services.");
          setIsLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  const findNearbyHospitals = async (location: {lat: number, lng: number}) => {
    try {
      const service = new google.maps.places.PlacesService(document.createElement('div'));
      
      const request = {
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: 5000, // 5km radius
        type: 'hospital',
        keyword: 'hospital'
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const hospitals = results.map((place, index) => {
            // Calculate distance
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(location.lat, location.lng),
              place.geometry?.location || new google.maps.LatLng(0, 0)
            );

            return {
              id: place.place_id || String(index),
              name: place.name || 'Unknown Hospital',
              address: place.vicinity || 'Address not available',
              city: 'Andhra Pradesh',
              phone: 'Contact for details',
              location: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0
              },
              distance: `${(distance / 1000).toFixed(1)} km`
            };
          });

          setNearbyHospitals(hospitals);
        } else {
          console.error('Places API error:', status);
          toast.error('No hospitals found nearby. Please try again later.');
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error finding nearby hospitals:', error);
      toast.error('Error finding nearby hospitals. Please try again.');
      setIsLoading(false);
    }
  };

  const getDirections = (hospital: HospitalInfo) => {
    if (!currentLocation || !hospital.location) {
      toast.error("Location information is not available.");
      return;
    }

    setSelectedHospital(hospital);
    setShowDirections(true);

    if (mapRef.current) {
      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: currentLocation,
          zoom: 14
        });
      }

      if (directionsRenderer.current) {
        directionsRenderer.current.setMap(mapInstance.current);
      }

      const request = {
        origin: new google.maps.LatLng(currentLocation.lat, currentLocation.lng),
        destination: new google.maps.LatLng(hospital.location.lat, hospital.location.lng),
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.current?.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.current?.setDirections(result);
        } else {
          toast.error("Could not calculate directions. Please try again.");
        }
      });
    }
  };

  const closeDirections = () => {
    setShowDirections(false);
    setSelectedHospital(null);
    if (directionsRenderer.current) {
      directionsRenderer.current.setMap(null);
    }
  };

  return (
    <div>
      <Card className="shadow-sm mb-6">
        <CardHeader className="bg-healSmart-blue text-white">
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-5 w-5" /> Nearby Hospitals
          </CardTitle>
          <CardDescription className="text-blue-100">
            Hospitals near your location
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-healSmart-blue border-t-transparent rounded-full"></div>
            </div>
          ) : nearbyHospitals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No hospitals found nearby. Please try again later.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {nearbyHospitals.map((hospital) => (
                <div key={hospital.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{hospital.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
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
                    <Navigation className="h-4 w-4 mr-2" /> Get Directions
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
                {selectedHospital.address}
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
