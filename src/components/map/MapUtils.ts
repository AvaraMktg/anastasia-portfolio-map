
import mapboxgl from 'mapbox-gl';

export const initializeMap = (
  mapContainer: HTMLDivElement,
  mapboxToken: string,
  centerCoordinates?: { lng: number; lat: number },
  zoom: number = 8
): mapboxgl.Map => {
  mapboxgl.accessToken = mapboxToken;

  return new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/mapbox/light-v11',
    center: centerCoordinates ? [centerCoordinates.lng, centerCoordinates.lat] : [-80.2, 26.2], // Default to South Florida
    zoom: zoom,
    projection: 'mercator',
  });
};

export const addNavigationControl = (map: mapboxgl.Map): void => {
  map.addControl(
    new mapboxgl.NavigationControl({
      visualizePitch: true,
    }),
    'top-right'
  );
};

export const flyToLocation = (
  map: mapboxgl.Map,
  coordinates: { lng: number; lat: number },
  zoom: number = 15
): void => {
  try {
    map.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: zoom,
      essential: true,
      duration: 1000
    });
  } catch (error) {
    console.error('Error centering map:', error);
  }
};

export const cleanupMapResources = (
  map: mapboxgl.Map | null,
  markers: mapboxgl.Marker[],
  popups: {[key: string]: mapboxgl.Popup}
): void => {
  if (map) {
    map.remove();
  }
  
  markers.forEach(marker => marker.remove());
  
  Object.values(popups).forEach(popup => popup.remove());
};
