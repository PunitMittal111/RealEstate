import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import FilterBar from "./FilterBar";
import PropertyGrid from "./PropertyGrid";
import { getFavorites } from "../features/favoriteSlice";
import { useEffect } from "react";

const FavoriteManager = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { favorites, loading, error } = useSelector(
    (state: RootState) => state.favorites
  );

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <FilterBar onFiltersChange={() => {}} />

      {loading && <p className="text-center mt-4">Loading favorites...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {!loading && !error && favorites.length > 0 && (
        <PropertyGrid properties={favorites} />
      )}

      {!loading && !error && favorites.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters to find more
              properties.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteManager;
