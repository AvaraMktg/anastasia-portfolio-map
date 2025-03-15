
import React from 'react';

type MapLoadingProps = {
  isLoading: boolean;
  error: string | null;
};

export const MapLoading: React.FC<MapLoadingProps> = ({ isLoading, error }) => {
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-real-100/50 backdrop-blur-sm">
        <div className="flex flex-col items-center p-6 max-w-md text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-real-950 font-medium mb-2">Unable to Load Map</p>
          <p className="text-real-600 text-sm mb-4">{error}</p>
          <p className="text-real-600 text-xs">Please check your Mapbox token and try again. If this issue persists, please contact support.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-real-100/50 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-real-200 border-t-gold-400 rounded-full animate-spin"></div>
          <p className="mt-2 text-sm text-real-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return null;
};

export const MapLegend: React.FC<{ propertiesCount: number }> = ({ propertiesCount }) => {
  return (
    <>
      <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-md text-sm">
        <span className="font-medium">{propertiesCount}</span>
        <span className="text-real-600 ml-1">Properties</span>
      </div>

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
    </>
  );
};
