import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Plus, Calculator } from "lucide-react";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import PropertyGrid from "../components/PropertyGrid";
import MortgageCalculator from "../components/MortgageCalculator";
import CreateProperty from "../components/CreateProperty";
import PropertyDetail from "../components/PropertyDetail";
import { getAllProperty } from "../features/propertySlice";
import { RootState, AppDispatch } from "../app/store";

const HomePage: React.FC = ({ showFavorites, setShowFavorites }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading } = useSelector(
    (state: RootState) => state.property
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showCreateProperty, setShowCreateProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  const handleToggleFavorite = (propertyId: string) => {
    setFavorites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const displayedProperties = showFavorites
    ? properties.filter((p) => favorites.includes(p.id))
    : properties;

  const handleCreateProperty = (newProperty: any) => {
    const processedProperty = {
      ...newProperty,
      price: parseFloat(newProperty.price),
      bedrooms: parseInt(newProperty.bedrooms),
      bathrooms: parseInt(newProperty.bathrooms),
      sqft: parseInt(newProperty.sqft),
      yearBuilt: newProperty.yearBuilt ? parseInt(newProperty.yearBuilt) : 0,
    };
    setSelectedProperty(null);
    setShowCreateProperty(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedProperty && <Hero />}
      <FilterBar onFiltersChange={() => {}} />

      {selectedProperty ? (
        <PropertyDetail
          property={selectedProperty}
          onBack={() => setSelectedProperty(null)}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
        />
      ) : (
        <PropertyGrid
          properties={displayedProperties}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={(id) => {
            const property = properties.find((p) => p.id === id);
            if (property) setSelectedProperty(property);
          }}
          loading={loading}
        />
      )}

      {user?.role === "seller" && (
        <>
          <button
            onClick={() => setShowCreateProperty(true)}
            className="fixed bottom-24 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          >
            <Plus className="h-6 w-6" />
          </button>

          {showCreateProperty && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
                <button
                  onClick={() => setShowCreateProperty(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
                >
                  <X className="h-6 w-6" />
                </button>
                <div className="p-6">
                  <CreateProperty
                    onClose={() => setShowCreateProperty(false)}
                    onCreate={handleCreateProperty}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowCalculator(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-6">
              <MortgageCalculator />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowCalculator(true)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      >
        <Calculator className="h-6 w-6" />
      </button>
    </div>
  );
};

export default HomePage;
