import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getPropertyById } from "../features/propertySlice";
import { getUserById } from "../features/authSlice";
import { addFavorites, removeFavorite } from "../features/favoriteSlice";
import ContactAgent from "./ContactAgent";
import { Heart, X } from "lucide-react";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const { selectedProperty: property } = useSelector(
    (state: RootState) => state.property
  );

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPropertyById(id));
  }, [dispatch, id]);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.id) {
        dispatch(getUserById(parsedUser.id));
      }
    }
  }, [dispatch]);

  const handleToggleFavorite = async (propertyId: string) => {
    try {
      if (user?.favorites?.includes(propertyId)) {
        await dispatch(removeFavorite(propertyId)).unwrap();
        console.log("Property removed from favorites successfully");
      } else {
        await dispatch(addFavorites(propertyId)).unwrap();
        console.log("Property added to favorites successfully");
      }

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id) {
          dispatch(getUserById(parsedUser.id));
        }
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  if (!property) return null;

  const isSeller = user?.role === "seller";
  const mainContentClass = isSeller ? "lg:col-span-3" : "lg:col-span-2";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <X className="h-4 w-4 mr-1" /> Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={mainContentClass}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={property.images?.[0]}
                alt={property.title}
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      ${property.price.toLocaleString()}
                    </h1>
                    <h2 className="text-xl text-gray-600 mb-2">
                      {property.title}
                    </h2>
                    <p className="text-gray-600">{property.address}</p>
                  </div>
                  {!isSeller && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(property._id);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        user?.favorites?.includes(property._id)
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          property.isFavorited ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {property.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {property.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {property.sqft.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {property.yearBuilt}
                    </div>
                    <div className="text-sm text-gray-600">Year Built</div>
                  </div>
                </div>

                <div className="py-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                <div className="py-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="py-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Property Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lot Size:</span>
                      <span className="font-medium">{property.lotSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parking:</span>
                      <span className="font-medium">{property.parking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Heating:</span>
                      <span className="font-medium">{property.heating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cooling:</span>
                      <span className="font-medium">{property.cooling}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {user?.role === "buyer" && (
            <div className="lg:col-span-1">
              <ContactAgent agent={property} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
