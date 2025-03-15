
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '@/lib/propertyData';
import { MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const {
    id,
    title,
    address,
    price,
    priceDropInfo,
    status,
    beds,
    baths,
    sqft,
    mainImage,
    neighborhood
  } = property;

  // Status badge styling
  const getBadgeStyle = () => {
    switch (status) {
      case 'forSale':
        return 'bg-real-950 text-white';
      case 'forRent':
        return 'bg-blue-600 text-white';
      case 'sold':
        return 'bg-real-500 text-white';
      default:
        return 'bg-real-950 text-white';
    }
  };

  // Status text
  const getStatusText = () => {
    switch (status) {
      case 'forSale':
        return 'For Sale';
      case 'forRent':
        return 'For Rent';
      case 'sold':
        return 'Sold';
      default:
        return 'For Sale';
    }
  };

  if (featured) {
    return (
      <Link to={`/property/${id}`} className="featured-property-card group block">
        <div className="absolute top-4 left-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeStyle()}`}>
            {getStatusText()}
          </span>
        </div>
        
        {priceDropInfo && (
          <div className="property-badge">
            {priceDropInfo}
          </div>
        )}
        
        <div className="w-full h-[500px]">
          <img 
            src={mainImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <div className="property-details">
          <h3 className="text-white text-2xl md:text-3xl font-medium mb-1">{title}</h3>
          <div className="flex items-center text-white/80 mb-2">
            <MapPin size={16} className="mr-1" />
            <p className="text-sm">{address}</p>
          </div>
          <div className="flex items-center gap-6 text-white mb-3">
            <div className="flex items-center">
              <span className="text-lg font-medium">{beds}</span>
              <span className="ml-1 text-sm">Beds</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-medium">{baths}</span>
              <span className="ml-1 text-sm">Baths</span>
            </div>
            {sqft && (
              <div className="flex items-center">
                <span className="text-lg font-medium">{sqft}</span>
                <span className="ml-1 text-sm">Sq Ft</span>
              </div>
            )}
          </div>
          <p className="text-2xl font-semibold text-white">{price}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/property/${id}`} className="property-card group block card-hover">
      <div className="relative">
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeStyle()}`}>
            {getStatusText()}
          </span>
        </div>
        
        {priceDropInfo && (
          <div className="absolute top-3 right-3 z-10 bg-gold-400 text-white px-2 py-0.5 rounded-full text-xs font-medium">
            {priceDropInfo}
          </div>
        )}
        
        <div className="h-56 overflow-hidden">
          <img 
            src={mainImage} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg line-clamp-1 group-hover:text-gold-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-start mt-1 mb-3">
          <MapPin size={16} className="text-real-500 mt-0.5 mr-1 flex-shrink-0" />
          <p className="text-sm text-real-600 line-clamp-2">{address}</p>
        </div>
        
        {neighborhood && (
          <p className="text-xs text-real-500 mb-3">{neighborhood}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-real-700 mb-3">
          <div>
            <span className="font-medium">{beds}</span> Beds
          </div>
          <div>
            <span className="font-medium">{baths}</span> Baths
          </div>
          {sqft && (
            <div>
              <span className="font-medium">{sqft}</span> Sq Ft
            </div>
          )}
        </div>
        
        <div className="flex items-end justify-between">
          <p className="text-xl font-semibold">{price}</p>
          <span className="text-xs text-real-500">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
