
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Property } from '@/lib/propertyData';
import MapMarker from './MapMarker';
import { MapLoading, MapLegend } from './MapLoadingStates';
import { 
  getMapOptions, 
  flyToLocation, 
  cleanupMapResources 
} from './MapUtils';

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
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!googleMapsApiKey);
  const [apiKey, setApiKey] = useState(googleMapsApiKey);

  // Initialize map callback
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    cleanupMapResources(mapRef.current, markersRef.current);
    mapRef.current = null;
    markersRef.current = [];
  }, []);

  // Handle center changes
  useEffect(() => {
    if (mapRef.current && centerOn) {
      flyToLocation(mapRef.current, centerOn, zoom);
    }
  }, [centerOn, zoom]);

  // In case of API key error
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
          <LoadScript
            googleMapsApiKey={apiKey}
            onError={() => setMapError("Failed to load Google Maps. Please check your API key.")}
          >
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={getMapOptions(zoom, centerOn)}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {mapLoaded && properties.map((property) => (
                <MapMarker
                  key={property.id}
                  property={property}
                  map={mapRef.current}
                  isHighlighted={property.id === highlightPropertyId || property.id === selectedProperty}
                  onMarkerClick={setSelectedProperty}
                  markersRef={markersRef}
                />
              ))}
            </GoogleMap>
          </LoadScript>
          
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
          
          <MapLoading isLoading={!mapLoaded && !mapError} error={mapError} />
          
          {mapLoaded && !mapError && <MapLegend propertiesCount={properties.length} />}
        </>
      )}
    </div>
  );
};

export default Map;
