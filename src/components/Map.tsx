
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import propertyData, { Property } from '@/lib/propertyData';
import { useNavigate } from 'react-router-dom';

// In a real production app, this would be stored securely
// For demo purposes, we're using a temporary public token
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZWFwcCIsImEiOiJjbHpuMmx4NXUwMHdiMmxtcHo3Z2t4ZHFhIn0.A8TlrN5YLElAAZB_D0E7tw';

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
};

const Map: React.FC<MapProps> = ({ 
  centerOn, 
  zoom = 8, 
  height = 'h-[600px]',
  highlightPropertyId,
  properties = propertyData,
  selectedProperty = null,
  setSelectedProperty = () => {}
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupsRef = useRef<{[key: string]: mapboxgl.Popup}>({});
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Create and setup the map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: centerOn ? [centerOn.lng, centerOn.lat] : [-80.2, 26.2], // Default to South Florida
      zoom: zoom,
      projection: 'mercator',
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Map load event
    map.current.on('load', () => {
      setMapLoaded(true);
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      // Clear all markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      // Clear all popups
      Object.values(popupsRef.current).forEach(popup => popup.remove());
      popupsRef.current = {};
    };
  }, []);

  // Handle property data and markers
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Clear existing popups
    Object.values(popupsRef.current).forEach(popup => popup.remove());
    popupsRef.current = {};

    // Create new markers
    properties.forEach(property => {
      const { lat, lng } = property.position;
      
      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'cursor-pointer';
      
      // Style marker based on status and highlight
      if (property.id === highlightPropertyId || property.id === selectedProperty) {
        markerEl.innerHTML = `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-gold-400 rounded-full animate-ping opacity-75"></div>
            <div class="relative z-10 w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center shadow-lg">
              <span class="text-white text-xs font-bold">$</span>
            </div>
          </div>
        `;
      } else {
        let bgColor = 'bg-real-800';
        if (property.status === 'forRent') bgColor = 'bg-blue-600';
        if (property.status === 'sold') bgColor = 'bg-real-500';
        
        markerEl.innerHTML = `
          <div class="w-6 h-6 ${bgColor} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <span class="text-white text-xs font-bold">$</span>
          </div>
        `;
      }

      // Create the popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px',
        className: 'property-popup'
      }).setHTML(`
        <div class="property-popup-content p-0">
          <div class="relative">
            <img src="${property.mainImage}" alt="${property.title}" class="w-full h-32 object-cover"/>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <div class="text-white font-medium">${property.price}</div>
            </div>
          </div>
          <div class="p-3">
            <h3 class="font-medium text-sm line-clamp-1 mb-1">${property.title}</h3>
            <p class="text-xs text-real-600 mb-2">${property.address}</p>
            <div class="flex items-center gap-2 text-xs">
              <span>${property.beds} Beds</span>
              <span>•</span>
              <span>${property.baths} Baths</span>
              ${property.sqft ? `<span>•</span><span>${property.sqft} Sq Ft</span>` : ''}
            </div>
            <button class="mt-3 w-full bg-real-900 text-white py-1.5 text-xs rounded-md hover:bg-real-800 transition-colors">
              View Details
            </button>
          </div>
        </div>
      `);

      // Create marker
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current!);

      // Add marker to the ref array
      markersRef.current.push(marker);
      
      // Save popup reference
      popupsRef.current[property.id] = popup;

      // Add event listeners
      markerEl.addEventListener('click', () => {
        // Close all other popups
        Object.values(popupsRef.current).forEach(p => {
          if (p !== popup) p.remove();
        });

        popup.addTo(map.current!);
        setSelectedProperty(property.id);
      });

      // Navigate to property detail page when clicking the button in popup
      popup._content.querySelector('button')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(`/property/${property.id}`);
      });
    });

    // If a property is highlighted, show its popup
    if (selectedProperty && popupsRef.current[selectedProperty]) {
      popupsRef.current[selectedProperty].addTo(map.current);
    }

    // Center the map on the highlighted property
    if (centerOn) {
      map.current.flyTo({
        center: [centerOn.lng, centerOn.lat],
        zoom: 15,
        essential: true,
        duration: 1000
      });
    }
  }, [mapLoaded, highlightPropertyId, selectedProperty, centerOn, navigate, properties, setSelectedProperty]);

  return (
    <div className={`relative w-full ${height} rounded-lg overflow-hidden shadow-md`}>
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Subtle gradient overlay to soften the map appearance */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
      
      {/* Map loading indicator */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-real-100/50 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-real-200 border-t-gold-400 rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-real-600">Loading map...</p>
          </div>
        </div>
      )}

      {/* Property count badge */}
      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-md text-sm">
        <span className="font-medium">{properties.length}</span>
        <span className="text-real-600 ml-1">Properties</span>
      </div>

      {/* Map legend */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-real-800 rounded-full"></div>
          <span>For Sale</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>For Rent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-real-500 rounded-full"></div>
          <span>Sold</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
