import React, { useEffect } from "react";
import { Heart, Bed, Bath, Square, MapPin, Calendar } from "lucide-react";
import { addFavorites, removeFavorite } from "../features/favoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../features/authSlice";
import { AppDispatch, RootState } from "../app/store";

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
}

interface PropertyCardProps {
  property: Property;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
}) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };
  return (
    <div
      onClick={() => onViewDetails(property._id)}
      className="bg-white cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggleFavorite(property._id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            user?.favorites?.includes(property._id)
              ? "bg-red-500 text-white shadow-lg"
              : "bg-white bg-opacity-80 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart
            className={`h-4 w-4 ${property.isFavorited ? "fill-current" : ""}`}
          />
        </button>

        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold uppercase">
          {property.propertyType}
        </div>
      </div>

      <div className="p-5">
        <div className="text-2xl font-bold text-slate-800 mb-2">
          {formatPrice(property.price)}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.address}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span className="text-sm">{formatNumber(property.sqft)} sqft</span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 text-xs mb-4">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Listed {property.listingDate}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
