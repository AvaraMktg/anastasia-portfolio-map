
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Property } from '@/lib/propertyData';
import MapMarker from './MapMarker';
import { MapLoading, MapLegend } from './MapLoadingStates';
import { 
  initializeMap, 
  addNavigationControl, 
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
  mapboxToken?: string;
};

const Map: React.FC<MapProps> = ({ 
  centerOn, 
  zoom = 8, 
  height = 'h-[600px]',
  highlightPropertyId,
  properties = [],
  selectedProperty = null,
  setSelectedProperty = () => {},
  mapboxToken = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupsRef = useRef<{[key: string]: mapboxgl.Popup}>({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    try {
      map.current = initializeMap(
        mapContainer.current,
        mapboxToken,
        centerOn,
        zoom
      );

      addNavigationControl(map.current);

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapLoaded(true);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map. Please check your Mapbox token and try again.');
      });

      return () => {
        cleanupMapResources(map.current, markersRef.current, popupsRef.current);
        map.current = null;
        markersRef.current = [];
        popupsRef.current = {};
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please check your connection and try again.');
    }
  }, [mapboxToken]);

  // Handle markers and property selection
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers and popups
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    Object.values(popupsRef.current).forEach(popup => popup.remove());
    popupsRef.current = {};

    // Add new markers
    properties.forEach(property => {
      <MapMarker
        property={property}
        map={map.current!}
        isHighlighted={property.id === highlightPropertyId || property.id === selectedProperty}
        onMarkerClick={setSelectedProperty}
        popupsRef={popupsRef}
        markersRef={markersRef}
      />
    });

    // Show popup for selected property
    if (selectedProperty && popupsRef.current[selectedProperty]) {
      try {
        popupsRef.current[selectedProperty].addTo(map.current);
      } catch (error) {
        console.error('Error showing popup:', error);
      }
    }

    // Center map if coordinates provided
    if (centerOn && map.current) {
      flyToLocation(map.current, centerOn);
    }
  }, [mapLoaded, highlightPropertyId, selectedProperty, centerOn, properties, setSelectedProperty]);

  return (
    <div className={`relative w-full ${height} rounded-lg overflow-hidden shadow-md`}>
      <div ref={mapContainer} className="absolute inset-0" />
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      <MapLoading isLoading={!mapLoaded && !mapError} error={mapError} />
      
      {mapLoaded && !mapError && <MapLegend propertiesCount={properties.length} />}
    </div>
  );
};

export default Map;
