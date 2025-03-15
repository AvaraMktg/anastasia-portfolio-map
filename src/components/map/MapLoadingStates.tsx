
import React from 'react';

type MapLoadingProps = {
  isLoading: boolean;
  error: string | null;
};

export const MapLoading: React.FC<MapLoadingProps> = ({ isLoading, error }) => {
  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-real-50/80 rounded-lg">
        <div className="bg-white p-4 rounded-lg shadow-md max-w-md text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <p className="text-sm text-real-600">
            Please check your Google Maps API key and try again.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-real-50/80 rounded-lg">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-real-200 border-t-gold-400 rounded-full animate-spin"></div>
          <p className="mt-4 text-real-700 font-medium">Loading map...</p>
        </div>
      </div>
    );
  }

  return null;
};

export const MapLegend: React.FC<{ propertiesCount: number }> = ({ propertiesCount }) => {
  return (
    <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-md shadow-md text-sm text-real-700">
      {propertiesCount} {propertiesCount === 1 ? 'property' : 'properties'} shown
    </div>
  );
};
