import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Navigation, X } from 'lucide-react';
import { toast } from "sonner";

// Declare initMap function in the global scope
declare global {
  interface Window {
    initMap: () => void;
  }
}

// Initialize Google Maps
window.initMap = () => {
  console.log('Google Maps API loaded successfully');
};

interface HospitalInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  city: string;
  distance?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

// Mock data for real hospitals in Vijayawada
const mockHospitals: HospitalInfo[] = [
  {
    id: "1",
    name: "Apollo Hospitals",
    address: "NH-16, Governorpet, Vijayawada",
    city: "Vijayawada",
    phone: "0866 242 2222",
    location: {
      lat: 16.5062,
      lng: 80.6480
    }
  },
  {
    id: "2",
    name: "Kamineni Hospitals",
    address: "Auto Nagar, Vijayawada",
    city: "Vijayawada",
    phone: "0866 246 6666",
    location: {
      lat: 16.5204,
      lng: 80.6401
    }
  },
  {
    id: "3",
    name: "Krishna Institute of Medical Sciences",
    address: "1-8-31/1, Minister Road, Vijayawada",
    city: "Vijayawada",
    phone: "0866 242 3333",
    location: {
      lat: 16.5154,
      lng: 80.6301
    }
  },
  {
    id: "4",
    name: "Andhra Hospitals",
    address: "M.G. Road, Vijayawada",
    city: "Vijayawada",
    phone: "0866 242 4444",
    location: {
      lat: 16.5100,
      lng: 80.6400
    }
  },
  {
    id: "5",
    name: "Manipal Hospitals",
    address: "Gandhi Nagar, Vijayawada",
    city: "Vijayawada",
    phone: "0866 242 5555",
    location: {
      lat: 16.5250,
      lng: 80.6350
    }
  }
];

const NearbyHospitals = () => {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [nearbyHospitals, setNearbyHospitals] = useState<HospitalInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState<HospitalInfo | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const directionsService = useRef<google.maps.DirectionsService | null>(null);
  const directionsRenderer = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    // Initialize Google Maps services
    const initializeMaps = () => {
      if (window.google && window.google.maps) {
        try {
          directionsService.current = new google.maps.DirectionsService();
          directionsRenderer.current = new google.maps.DirectionsRenderer({
            suppressMarkers: false,
            polylineOptions: {
              strokeColor: '#0066cc',
              strokeWeight: 5
            }
          });
          setIsMapInitialized(true);
        } catch (error) {
          console.error('Error initializing Google Maps services:', error);
          toast.error('Failed to initialize Google Maps services. Please try again later.');
        }
      }
    };

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      initializeMaps();
    } else {
      // If not loaded, wait for the callback
      window.initMap = () => {
        initializeMaps();
      };
    }

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
          // Use mock data if location access is denied
          setNearbyHospitals(mockHospitals.map(hospital => ({
            ...hospital,
            distance: "Location access required"
          })));
          setIsLoading(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
      // Use mock data if geolocation is not supported
      setNearbyHospitals(mockHospitals.map(hospital => ({
        ...hospital,
        distance: "Location not available"
      })));
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
              city: 'Vijayawada',
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
          // Use mock data if Places API fails
          const hospitalsWithDistance = mockHospitals.map(hospital => {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
              new google.maps.LatLng(location.lat, location.lng),
              new google.maps.LatLng(hospital.location?.lat || 0, hospital.location?.lng || 0)
            );
            return {
              ...hospital,
              distance: `${(distance / 1000).toFixed(1)} km`
            };
          });
          setNearbyHospitals(hospitalsWithDistance);
          toast.info("Showing nearby hospitals from our database");
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error finding nearby hospitals:', error);
      // Use mock data if there's an error
      const hospitalsWithDistance = mockHospitals.map(hospital => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(location.lat, location.lng),
          new google.maps.LatLng(hospital.location?.lat || 0, hospital.location?.lng || 0)
        );
        return {
          ...hospital,
          distance: `${(distance / 1000).toFixed(1)} km`
        };
      });
      setNearbyHospitals(hospitalsWithDistance);
      toast.info("Showing nearby hospitals from our database");
      setIsLoading(false);
    }
  };

  const initializeMap = (center: { lat: number; lng: number }) => {
    if (!mapRef.current) return;

    try {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Add current location marker
      new google.maps.Marker({
        position: center,
        map: mapInstance.current,
        title: "Your Location",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2
        }
      });

      // Add hospital markers
      nearbyHospitals.forEach(hospital => {
        const marker = new google.maps.Marker({
          position: { lat: hospital.location?.lat || 0, lng: hospital.location?.lng || 0 },
          map: mapInstance.current,
          title: hospital.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: "#EA4335",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 2
          }
        });

        marker.addListener('click', () => {
          setSelectedHospital(hospital);
        });
      });

      setIsMapLoading(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to initialize map. Please try again later.');
      setIsMapLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Hospitals List */}
        <div className="w-full lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hospital className="h-5 w-5" />
                Nearby Hospitals
              </CardTitle>
              <CardDescription>
                {currentLocation ? (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Showing hospitals near your location</span>
                  </div>
                ) : (
                  "Loading your location..."
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : nearbyHospitals.length > 0 ? (
                <div className="space-y-4">
                  {nearbyHospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      className={`p-4 rounded-lg border ${
                        selectedHospital?.id === hospital.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{hospital.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {hospital.address}
                          </p>
                          {hospital.distance && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {hospital.distance} away
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedHospital(hospital);
                            setShowDirections(true);
                          }}
                        >
                          <Navigation className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No hospitals found nearby. Try adjusting your location or search radius.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Map Popup */}
        {showDirections && selectedHospital && (
          <div className="fixed right-0 top-0 h-screen w-full lg:w-1/2 bg-background shadow-lg z-50">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">Directions to {selectedHospital.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowDirections(false);
                    setSelectedHospital(null);
                    if (directionsRenderer.current) {
                      directionsRenderer.current.setMap(null);
                    }
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 relative">
                {isMapLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div
                    ref={mapRef}
                    className="w-full h-full"
                    style={{ minHeight: "400px" }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyHospitals;
