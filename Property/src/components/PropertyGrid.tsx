import React from "react";
import PropertyCard from "./PropertyCard";
import { useNavigate } from "react-router-dom";

interface Property {
  _id: string;
  title: string;
  price: number;
  address: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  images: string[];
  isFavorited: boolean;
  listingDate: string;
  agent: {
    name: string;
    phone: string;
  };
}

interface PropertyGridProps {
  properties: Property[];
  onToggleFavorite: (id: string) => void;
  loading?: boolean;
}
const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onToggleFavorite,
  loading = false,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/properties/${id}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg h-96 animate-pulse"
            >
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
              <div className="p-5 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            No properties found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or filters to find more
            properties.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            property={{ ...property, id: property._id }}
            onToggleFavorite={onToggleFavorite}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;
