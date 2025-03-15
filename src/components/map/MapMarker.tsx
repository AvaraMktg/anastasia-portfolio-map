
import React, { useEffect, useState } from 'react';
import { Property } from '@/lib/propertyData';
import { useNavigate } from 'react-router-dom';

type MapMarkerProps = {
  property: Property;
  map: google.maps.Map | null;
  isHighlighted: boolean;
  onMarkerClick: (propertyId: string) => void;
  markersRef: React.MutableRefObject<google.maps.Marker[]>;
};

const MapMarker: React.FC<MapMarkerProps> = ({ 
  property, 
  map, 
  isHighlighted,
  onMarkerClick,
  markersRef
}) => {
  const navigate = useNavigate();
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  
  const position = {
    lat: property.position.lat,
    lng: property.position.lng
  };

  const handleInfoWindowClose = () => {
    setInfoWindowOpen(false);
  };

  const toggleInfoWindow = () => {
    setInfoWindowOpen(!infoWindowOpen);
    onMarkerClick(property.id);
  };
  
  const handleViewDetails = () => {
    navigate(`/property/${property.id}`);
  };

  useEffect(() => {
    if (!map) return;

    // Create marker
    const newMarker = new google.maps.Marker({
      position,
      map,
      title: property.title,
      animation: isHighlighted ? google.maps.Animation.BOUNCE : undefined
    });

    // Create custom icon if highlighted
    if (isHighlighted) {
      newMarker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#DAA520', // Gold color
        fillOpacity: 1,
        strokeColor: '#DAA520',
        strokeWeight: 2,
      });
    }
    
    // Create info window
    const newInfoWindow = new google.maps.InfoWindow({
      content: `
        <div class="property-popup-content p-0" style="max-width: 250px;">
          <div class="relative">
            <img 
              src="${property.mainImage}" 
              alt="${property.title}" 
              style="width: 100%; height: 120px; object-fit: cover;"
            />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); padding: 8px;">
              <div style="color: white; font-weight: 500;">${property.price}</div>
            </div>
          </div>
          <div style="padding: 12px;">
            <h3 style="font-weight: 500; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px;">${property.title}</h3>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${property.address}</p>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
              <span>${property.beds} Beds</span>
              <span>•</span>
              <span>${property.baths} Baths</span>
              ${property.sqft ? `
                <span>•</span>
                <span>${property.sqft} Sq Ft</span>
              ` : ''}
            </div>
            <button 
              id="view-details-${property.id}"
              style="margin-top: 12px; width: 100%; background-color: #1a202c; color: white; padding: 6px 0; font-size: 12px; border-radius: 6px; cursor: pointer; border: none;"
            >
              View Details
            </button>
          </div>
        </div>
      `
    });
    
    // Add click event to marker
    newMarker.addListener('click', toggleInfoWindow);
    
    // Save marker reference
    setMarker(newMarker);
    setInfoWindow(newInfoWindow);
    markersRef.current.push(newMarker);
    
    return () => {
      if (newMarker) {
        newMarker.setMap(null);
        // Remove from markers array
        const index = markersRef.current.indexOf(newMarker);
        if (index > -1) {
          markersRef.current.splice(index, 1);
        }
      }
    };
  }, [map, isHighlighted]);

  // Handle info window open/close
  useEffect(() => {
    if (marker && infoWindow) {
      if (infoWindowOpen) {
        infoWindow.open({
          anchor: marker,
          map
        });
        
        // Add event listener to the view details button
        const viewDetailsButton = document.getElementById(`view-details-${property.id}`);
        if (viewDetailsButton) {
          viewDetailsButton.addEventListener('click', handleViewDetails);
        }
        
        // Add event listener to close info window
        google.maps.event.addListenerOnce(infoWindow, 'closeclick', handleInfoWindowClose);
      } else {
        infoWindow.close();
      }
    }
    
    return () => {
      // Clean up event listeners
      const viewDetailsButton = document.getElementById(`view-details-${property.id}`);
      if (viewDetailsButton) {
        viewDetailsButton.removeEventListener('click', handleViewDetails);
      }
    };
  }, [infoWindowOpen, marker, infoWindow, map]);

  return null; // Rendering is handled by the Google Maps API
};

export default MapMarker;
