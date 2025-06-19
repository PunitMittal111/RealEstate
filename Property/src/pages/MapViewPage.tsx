import React, { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { getAllProperty } from "../features/propertySlice";
import { MapPin } from "lucide-react";

const GOOGLE_MAPS_API_KEY = "AIzaSyDB_E09wxF3VOYtUR1sG2fs_jjI3cwjJ28";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

const PropertyCard = ({ property, selected, onClick }: any) => (
  <div
    onClick={onClick}
    className={`cursor-pointer border p-4 rounded-lg transition-all hover:shadow-md  ${
      selected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
    }`}
  >
    <div className="flex space-x-3">
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-20 h-16 object-cover rounded-md"
      />
      <div>
        <p className="text-lg font-semibold">{formatPrice(property.price)}</p>
        <p className="text-sm text-gray-600 truncate w-40">{property.title}</p>
        <p className="text-xs text-gray-500 mt-1">
          {property.bedrooms} bed • {property.bathrooms} bath •{" "}
          {property.sqft.toLocaleString()} sqft
        </p>
      </div>
    </div>
  </div>
);

const MapViewPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { properties, loading } = useAppSelector((state) => state.property);
  const { isLoaded } = useLoadScript({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllProperty());
  }, [dispatch]);

  const filteredProperties = useMemo(() => properties, [properties]);

  const mapCenter = useMemo(() => {
    const valid = filteredProperties.filter((p) =>
      Array.isArray(p.coordinates)
    );
    if (!valid.length) return { lat: 37.7749, lng: -122.4194 };
    const sum = valid.reduce(
      (acc, p) => ({
        lat: acc.lat + p.coordinates[0],
        lng: acc.lng + p.coordinates[1],
      }),
      { lat: 0, lng: 0 }
    );
    return { lat: sum.lat / valid.length, lng: sum.lng / valid.length };
  }, [filteredProperties]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-xl font-semibold mb-2">Loading Map...</div>
          <p className="text-gray-600">Please wait while we load Google Maps</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto p-4">
          <h3 className="font-medium mb-4">
            {filteredProperties.length} Properties Found
          </h3>
          <div className="space-y-4">
            {filteredProperties.slice(0, 6).map((p) => (
              <PropertyCard
                key={p._id}
                property={p}
                selected={selectedId === p._id}
                onClick={() =>
                  setSelectedId(p._id === selectedId ? null : p._id)
                }
              />
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <GoogleMap
            zoom={12}
            center={mapCenter}
            mapContainerClassName="w-full h-full"
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {filteredProperties.map((p) => {
              const [lat, lng] = p.coordinates || [];
              if (typeof lat !== "number" || typeof lng !== "number")
                return null;
              return (
                <Marker
                  key={p._id}
                  position={{ lat, lng }}
                  onClick={() => setSelectedId(p._id)}
                  icon={{
                    url: `https://maps.google.com/mapfiles/ms/icons/${
                      selectedId === p._id ? "red" : "blue"
                    }-dot.png`,
                  }}
                />
              );
            })}

            {selectedId &&
              (() => {
                const property = filteredProperties.find(
                  (p) => p._id === selectedId
                );
                if (!property) return null;
                const [lat, lng] = property.coordinates;
                return (
                  <InfoWindow
                    position={{ lat, lng }}
                    onCloseClick={() => setSelectedId(null)}
                  >
                    <div className="max-w-xs">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover mb-2 rounded"
                      />
                      <h3 className="font-bold text-lg">
                        {formatPrice(property.price)}
                      </h3>
                      <p className="text-gray-700">{property.title}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {property.bedrooms} bedroom • {property.bathrooms}{" "}
                        bathroom • {property.sqft.toLocaleString()} sqft
                      </p>
                      <p className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.address}
                      </p>
                    </div>
                  </InfoWindow>
                );
              })()}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;
