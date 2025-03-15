
import React, { useEffect, useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
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
  
  const position = {
    lat: property.position.lat,
    lng: property.position.lng
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

    // Create the marker
    const newMarker = new google.maps.Marker({
      position,
      map,
      title: property.title,
      icon: isHighlighted ? {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: '#DAA520', // Gold color
        fillOpacity: 1,
        strokeColor: '#DAA520',
        strokeWeight: 2,
      } : undefined,
      animation: isHighlighted ? google.maps.Animation.BOUNCE : undefined
    });
    
    // Add click event
    newMarker.addListener('click', toggleInfoWindow);
    
    // Save marker reference
    setMarker(newMarker);
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

  return (
    <>
      {marker && infoWindowOpen && (
        <InfoWindow
          position={position}
          onCloseClick={() => setInfoWindowOpen(false)}
          anchor={marker}
        >
          <div className="property-popup-content p-0" style={{ maxWidth: '250px' }}>
            <div className="relative">
              <img 
                src={property.mainImage} 
                alt={property.title} 
                className="w-full h-32 object-cover"
                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <div className="text-white font-medium">{property.price}</div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-1 mb-1">{property.title}</h3>
              <p className="text-xs text-real-600 mb-2">{property.address}</p>
              <div className="flex items-center gap-2 text-xs">
                <span>{property.beds} Beds</span>
                <span>•</span>
                <span>{property.baths} Baths</span>
                {property.sqft && (
                  <>
                    <span>•</span>
                    <span>{property.sqft} Sq Ft</span>
                  </>
                )}
              </div>
              <button 
                onClick={handleViewDetails}
                className="mt-3 w-full bg-real-900 text-white py-1.5 text-xs rounded-md hover:bg-real-800 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default MapMarker;
