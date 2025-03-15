
import React, { useEffect, useRef, useState } from 'react';
import { Property } from '@/lib/propertyData';
import MapMarker from './MapMarker';
import { MapLoading, MapLegend } from './MapLoadingStates';
import { getMapOptions } from './MapUtils';

type MapProps = {
  centerOn?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  height?: string;
  highlightPropertyId?: string;
  properties?: Property[];
  selectedProperty?: string | null;
  setSelectedProperty?: (id: string | null) => void;
  googleMapsApiKey?: string;
};

const Map: React.FC<MapProps> = ({ 
  centerOn, 
  zoom = 8, 
  height = 'h-[600px]',
  highlightPropertyId,
  properties = [],
  selectedProperty = null,
  setSelectedProperty = () => {},
  googleMapsApiKey = ''
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const scriptLoadedRef = useRef(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!googleMapsApiKey);
  const [apiKey, setApiKey] = useState(googleMapsApiKey);

  // Load Google Maps script
  const loadGoogleMapsScript = (apiKey: string) => {
    if (scriptLoadedRef.current) return;
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap&libraries=marker&v=beta`;
    script.defer = true;
    script.async = true;
    script.onerror = () => {
      setMapError('Failed to load Google Maps. Please check your API key.');
      scriptLoadedRef.current = false;
    };
    
    // Define the callback function
    window.initMap = () => {
      if (mapContainerRef.current) {
        try {
          const mapOptions = getMapOptions(zoom, centerOn);
          const map = new google.maps.Map(mapContainerRef.current, mapOptions);
          mapRef.current = map;
          setMapLoaded(true);
          scriptLoadedRef.current = true;
        } catch (error) {
          console.error('Error initializing map:', error);
          setMapError('Error initializing Google Maps.');
        }
      }
    };
    
    document.head.appendChild(script);
  };

  // Initialize map when API key is available
  useEffect(() => {
    if (!apiKey || showApiKeyInput) return;
    
    setMapLoaded(false);
    loadGoogleMapsScript(apiKey);
    
    return () => {
      // Clean up
      if (mapRef.current) {
        // Clean up markers
        markersRef.current.forEach(marker => {
          if (marker) marker.setMap(null);
        });
        markersRef.current = [];
      }
      
      // Remove the global callback
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [apiKey, showApiKeyInput]);
  
  // Handle center changes
  useEffect(() => {
    if (mapRef.current && centerOn && mapLoaded) {
      mapRef.current.panTo({ lat: centerOn.lat, lng: centerOn.lng });
      mapRef.current.setZoom(zoom);
    }
  }, [centerOn, zoom, mapLoaded]);

  // Function to handle API key input
  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    setShowApiKeyInput(false);
  };

  return (
    <div className={`relative w-full ${height} rounded-lg overflow-hidden shadow-md`}>
      {showApiKeyInput ? (
        <div className="h-full flex flex-col items-center justify-center p-6 bg-real-50">
          <p className="text-real-700 mb-4 text-center">
            Please enter your Google Maps API key to load the map:
          </p>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Google Maps API key here"
            className="w-full p-2 border border-real-200 rounded mb-4"
          />
          <button
            onClick={() => handleSetApiKey(apiKey)}
            className="px-4 py-2 bg-real-900 text-white rounded hover:bg-real-800 transition-colors"
          >
            Load Map
          </button>
          <p className="text-xs text-real-500 text-center mt-4">
            To get an API key, create an account at <a href="https://cloud.google.com/maps-platform/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Google Cloud Platform</a> and enable the Maps JavaScript API.
          </p>
        </div>
      ) : (
        <>
          <div 
            ref={mapContainerRef} 
            className="w-full h-full"
            data-testid="google-map"
          ></div>
          
          {mapLoaded && mapRef.current && properties.map((property) => (
            <MapMarker
              key={property.id}
              property={property}
              map={mapRef.current}
              isHighlighted={property.id === highlightPropertyId || property.id === selectedProperty}
              onMarkerClick={setSelectedProperty}
              markersRef={markersRef}
            />
          ))}
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
          
          <MapLoading isLoading={!mapLoaded && !mapError} error={mapError} />
          
          {mapLoaded && !mapError && <MapLegend propertiesCount={properties.length} />}
        </>
      )}
    </div>
  );
};

// Required for TypeScript and the Google Maps callback
declare global {
  interface Window {
    initMap: () => void;
  }
}

export default Map;
