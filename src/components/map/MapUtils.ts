
// Default map options
export const defaultMapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
};

// Convert coordinates from our existing format to Google Maps format
export const toGoogleLatLng = (coordinates: { lng: number; lat: number }) => {
  return {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };
};

// Get the map options for initialization
export const getMapOptions = (
  zoom: number = 8,
  centerCoordinates?: { lng: number; lat: number }
) => {
  return {
    ...defaultMapOptions,
    zoom: zoom,
    center: centerCoordinates 
      ? toGoogleLatLng(centerCoordinates) 
      : { lat: 26.2, lng: -80.2 }, // Default to South Florida
  };
};

// Function to handle map movement
export const flyToLocation = (
  map: google.maps.Map | null,
  coordinates: { lng: number; lat: number },
  zoom: number = 15
): void => {
  if (!map) return;
  
  try {
    map.panTo(toGoogleLatLng(coordinates));
    map.setZoom(zoom);
  } catch (error) {
    console.error('Error centering map:', error);
  }
};

// Clean up resources
export const cleanupMapResources = (
  map: google.maps.Map | null,
  markers: google.maps.Marker[]
): void => {
  if (markers && markers.length > 0) {
    markers.forEach(marker => marker.setMap(null));
  }
};
