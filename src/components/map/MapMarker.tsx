
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { Property } from '@/lib/propertyData';
import { useNavigate } from 'react-router-dom';

type MapMarkerProps = {
  property: Property;
  map: mapboxgl.Map;
  isHighlighted: boolean;
  onMarkerClick: (propertyId: string) => void;
  popupsRef: React.MutableRefObject<{[key: string]: mapboxgl.Popup}>;
  markersRef: React.MutableRefObject<mapboxgl.Marker[]>;
};

const MapMarker: React.FC<MapMarkerProps> = ({ 
  property, 
  map, 
  isHighlighted,
  onMarkerClick,
  popupsRef,
  markersRef
}) => {
  const navigate = useNavigate();
  const { lat, lng } = property.position;
  
  // Create marker element
  const markerEl = document.createElement('div');
  markerEl.className = 'cursor-pointer';
  
  // Style based on highlight status
  if (isHighlighted) {
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

  // Create popup for this marker
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

  try {
    // Create marker and add to map
    const marker = new mapboxgl.Marker(markerEl)
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map);

    // Store marker in ref
    markersRef.current.push(marker);
    
    // Store popup in ref
    popupsRef.current[property.id] = popup;

    // Add click event
    markerEl.addEventListener('click', () => {
      Object.values(popupsRef.current).forEach(p => {
        if (p !== popup) p.remove();
      });

      popup.addTo(map);
      onMarkerClick(property.id);
    });

    // Add details button event
    popup._content.querySelector('button')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(`/property/${property.id}`);
    });
  } catch (error) {
    console.error('Error adding marker:', error);
  }

  return null; // This is a utility component that directly manipulates the DOM
};

export default MapMarker;
