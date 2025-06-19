export interface Property {
  id: string;
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
  coordinates: {
    lat: number;
    lng: number;
  };
  agent: {
    name: string;
    phone: string;
    email: string;
    photo: string;
    company: string;
    rating: number;
    reviews: number;
  };
  description: string;
  features: string[];
  yearBuilt: number;
  lotSize: string;
  parking: string;
  heating: string;
  cooling: string;
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Home with Stunning City Views",
    price: 875000,
    address: "1234 Hillside Drive, San Francisco, CA 94110",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    propertyType: "house",
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    isFavorited: false,
    listingDate: "3 days ago",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194,
    },
    agent: {
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.johnson@realty.com",
      photo:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
      company: "Premium Realty Group",
      rating: 4.9,
      reviews: 127,
    },
    description:
      "Stunning modern home featuring panoramic city views, gourmet kitchen with premium appliances, and spacious open-concept living areas. Perfect for entertaining with a large deck and beautifully landscaped yard.",
    features: [
      "Gourmet kitchen with granite countertops",
      "Hardwood floors throughout",
      "Master suite with walk-in closet",
      "Two-car garage",
      "Private deck with city views",
      "Updated HVAC system",
      "Smart home features",
    ],
    yearBuilt: 2018,
    lotSize: "0.25 acres",
    parking: "2-car garage + driveway",
    heating: "Forced air, natural gas",
    cooling: "Central air conditioning",
  },
  {
    id: "2",
    title: "Charming Victorian with Original Details",
    price: 650000,
    address: "567 Oak Street, Berkeley, CA 94702",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1950,
    propertyType: "house",
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    isFavorited: true,
    listingDate: "1 week ago",
    coordinates: {
      lat: 37.8715,
      lng: -122.273,
    },
    agent: {
      name: "Michael Chen",
      phone: "(555) 987-6543",
      email: "michael.chen@heritage.com",
      photo:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200",
      company: "Heritage Properties",
      rating: 4.8,
      reviews: 89,
    },
    description:
      "Beautiful Victorian home with original hardwood floors, bay windows, and period details. Recently updated kitchen and bathrooms while maintaining historic charm.",
    features: [
      "Original hardwood floors",
      "Bay windows with natural light",
      "Updated kitchen with modern appliances",
      "Clawfoot tub in master bath",
      "Private garden",
      "Period moldings and trim",
      "Refinished original doors",
    ],
    yearBuilt: 1895,
    lotSize: "0.15 acres",
    parking: "Street parking",
    heating: "Radiator, natural gas",
    cooling: "Window units",
  },
  {
    id: "3",
    title: "Contemporary Condo with Bay Views",
    price: 1200000,
    address: "890 Marina Boulevard, Unit 15B, San Francisco, CA 94123",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    propertyType: "condo",
    images: [
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2029541/pexels-photo-2029541.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2030768/pexels-photo-2030768.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    isFavorited: false,
    listingDate: "5 days ago",
    coordinates: {
      lat: 37.8044,
      lng: -122.4378,
    },
    agent: {
      name: "Lisa Rodriguez",
      phone: "(555) 456-7890",
      email: "lisa.rodriguez@luxurylivingsf.com",
      photo:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
      company: "Luxury Living SF",
      rating: 4.7,
      reviews: 156,
    },
    description:
      "Luxurious high-rise condo with breathtaking bay views, floor-to-ceiling windows, and premium finishes throughout. Building amenities include concierge, gym, and rooftop terrace.",
    features: [
      "Floor-to-ceiling windows",
      "Gourmet kitchen with island",
      "Master suite with bay views",
      "In-unit washer/dryer",
      "Building concierge",
      "Fitness center",
      "Rooftop terrace access",
    ],
    yearBuilt: 2015,
    lotSize: "N/A",
    parking: "1 assigned parking space",
    heating: "Radiant floor heating",
    cooling: "Central air conditioning",
  },
  {
    id: "4",
    title: "Spacious Family Home with Pool",
    price: 725000,
    address: "2345 Maple Avenue, Palo Alto, CA 94301",
    bedrooms: 5,
    bathrooms: 3,
    sqft: 3200,
    propertyType: "house",
    images: [
      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    isFavorited: false,
    listingDate: "2 days ago",
    coordinates: {
      lat: 37.4419,
      lng: -122.143,
    },
    agent: {
      name: "David Thompson",
      phone: "(555) 234-5678",
      email: "david.thompson@familyhomes.com",
      photo:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      company: "Family Homes Realty",
      rating: 4.9,
      reviews: 203,
    },
    description:
      "Perfect family home featuring 5 bedrooms, open floor plan, and a beautiful backyard with swimming pool. Located in excellent school district with easy access to tech companies.",
    features: [
      "Swimming pool and spa",
      "Large family room with fireplace",
      "Gourmet kitchen with breakfast nook",
      "Master suite with sitting area",
      "Three-car garage",
      "Landscaped backyard",
      "Solar panels installed",
    ],
    yearBuilt: 2008,
    lotSize: "0.35 acres",
    parking: "3-car garage",
    heating: "Forced air, natural gas",
    cooling: "Central air conditioning",
  },
  {
    id: "5",
    title: "Modern Townhouse in Prime Location",
    price: 950000,
    address: "456 Central Park Lane, Mountain View, CA 94041",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2100,
    propertyType: "townhouse",
    images: [
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    isFavorited: true,
    listingDate: "1 day ago",
    coordinates: {
      lat: 37.3861,
      lng: -122.0839,
    },
    agent: {
      name: "Jennifer Park",
      phone: "(555) 345-6789",
      email: "jennifer.park@modernliving.com",
      photo:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200",
      company: "Modern Living Properties",
      rating: 4.8,
      reviews: 142,
    },
    description:
      "Sleek modern townhouse with contemporary design, high ceilings, and private patio. Walking distance to parks, shopping, and public transportation.",
    features: [
      "High ceilings throughout",
      "Private patio and balcony",
      "Modern kitchen with quartz counters",
      "Master bedroom with ensuite",
      "Attached two-car garage",
      "Energy-efficient appliances",
      "Walking distance to Caltrain",
    ],
    yearBuilt: 2020,
    lotSize: "0.08 acres",
    parking: "2-car attached garage",
    heating: "Radiant floor heating",
    cooling: "Mini-split system",
  },
  {
    id: "6",
    title: "Cozy Starter Home with Garden",
    price: 485000,
    address: "789 Elm Street, San Jose, CA 95112",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1100,
    propertyType: "house",
    images: [
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2029654/pexels-photo-2029654.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    isFavorited: false,
    listingDate: "4 days ago",
    coordinates: {
      lat: 37.3382,
      lng: -121.8863,
    },
    agent: {
      name: "Robert Kim",
      phone: "(555) 567-8901",
      email: "robert.kim@starterhomes.com",
      photo:
        "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200",
      company: "Starter Homes Group",
      rating: 4.6,
      reviews: 78,
    },
    description:
      "Charming starter home perfect for first-time buyers. Features original hardwood floors, updated kitchen, and lovely garden. Great investment opportunity.",
    features: [
      "Original hardwood floors",
      "Updated kitchen appliances",
      "Large backyard garden",
      "Single-car garage",
      "Fruit trees in yard",
      "New roof installed",
      "Close to public transit",
    ],
    yearBuilt: 1955,
    lotSize: "0.12 acres",
    parking: "1-car garage + driveway",
    heating: "Wall heaters, natural gas",
    cooling: "Window units",
  },
];

export const getPropertiesByFilters = (filters: any) => {
  return mockProperties.filter((property) => {
    if (
      filters.propertyType &&
      property.propertyType !== filters.propertyType
    ) {
      return false;
    }
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
      return false;
    }
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
      return false;
    }
    if (filters.bathrooms && property.bathrooms < parseInt(filters.bathrooms)) {
      return false;
    }
    if (filters.minSqft && property.sqft < parseInt(filters.minSqft)) {
      return false;
    }
    if (filters.maxSqft && property.sqft > parseInt(filters.maxSqft)) {
      return false;
    }
    return true;
  });
};

export const searchProperties = (query: string) => {
  if (!query.trim()) return mockProperties;

  const searchTerm = query.toLowerCase();
  return mockProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchTerm) ||
      property.address.toLowerCase().includes(searchTerm) ||
      property.propertyType.toLowerCase().includes(searchTerm) ||
      property.agent.name.toLowerCase().includes(searchTerm)
  );
};

// import React, { useState, useMemo, useEffect } from "react";
// import { MapPin } from "lucide-react";
// import {
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   useLoadScript,
// } from "@react-google-maps/api";
// import { useAppDispatch, useAppSelector } from "../hooks/hook";
// import { getAllProperty } from "../features/propertySlice";

// const MapViewPage: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { properties, loading } = useAppSelector((state) => state.property);

//   useEffect(() => {
//     dispatch(getAllProperty());
//   }, [dispatch]);

//   const [viewMode, setViewMode] = useState<"map" | "list">("map");
//   const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
//   const [selectedPropertyIndex, setSelectedPropertyIndex] = useState<
//     number | null
//   >(null);
//   const [filters, setFilters] = useState({
//     minPrice: "",
//     maxPrice: "",
//     propertyType: "",
//     bedrooms: "",
//   });

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDB_E09wxF3VOYtUR1sG2fs_jjI3cwjJ28",
//     libraries: ["places"],
//   });

//   const formatPrice = (price: number): string => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   const filteredProperties = useMemo(() => {
//     return properties.filter((property) => {
//       const price = property.price;
//       const minPrice = filters.minPrice ? parseInt(filters.minPrice) : null;
//       const maxPrice = filters.maxPrice ? parseInt(filters.maxPrice) : null;
//       const bedrooms = property.bedrooms;
//       const filterBedrooms = filters.bedrooms
//         ? parseInt(filters.bedrooms.replace("+", ""))
//         : null;

//       return (
//         (!minPrice || price >= minPrice) &&
//         (!maxPrice || price <= maxPrice) &&
//         (!filters.propertyType ||
//           property.propertyType === filters.propertyType) &&
//         (!filterBedrooms || bedrooms >= filterBedrooms)
//       );
//     });
//   }, [filters, properties]);

//   const mapCenter = useMemo(() => {
//     const valid = filteredProperties.filter(
//       (p) =>
//         p.coordinates &&
//         typeof p.coordinates.lat === "number" &&
//         typeof p.coordinates.lng === "number"
//     );

//     if (valid.length === 0) return { lat: 37.7749, lng: -122.4194 };

//     const sum = valid.reduce(
//       (acc, p) => {
//         acc.lat += p.coordinates.lat;
//         acc.lng += p.coordinates.lng;
//         acc.count++;
//         return acc;
//       },
//       { lat: 0, lng: 0, count: 0 }
//     );

//     return {
//       lat: sum.lat / sum.count,
//       lng: sum.lng / sum.count,
//     };
//   }, [filteredProperties]);

//   const handlePropertySelect = (propertyId: string) => {
//     if (selectedProperty === propertyId) {
//       setSelectedProperty(null);
//       setSelectedPropertyIndex(null);
//     } else {
//       setSelectedProperty(propertyId);
//       const index = filteredProperties.findIndex((p) => p._id === propertyId);
//       setSelectedPropertyIndex(index >= 0 ? index : null);
//     }
//   };

//   const handleMapMarkerClick = (index: number) => {
//     setSelectedPropertyIndex(index);
//     setSelectedProperty(filteredProperties[index]._id);
//   };

//   if (!isLoaded || loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="text-xl font-semibold mb-2">Loading Map...</div>
//           <div className="text-gray-600">
//             Please wait while we load Google Maps
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex h-[calc(100vh-4rem)]">
//         <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
//           <div className="border-t border-gray-200">
//             <div className="p-4">
//               <h3 className="font-medium text-gray-900 mb-4">
//                 {filteredProperties.length}{" "}
//                 {filteredProperties.length === 1 ? "Property" : "Properties"}{" "}
//                 Found
//               </h3>
//               <div className="space-y-4">
//                 {filteredProperties.slice(0, 6).map((property, index) => (
//                   <div
//                     key={property._id}
//                     onClick={() => handlePropertySelect(property._id)}
//                     className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
//                       selectedProperty === property._id
//                         ? "border-blue-500 bg-blue-50"
//                         : "border-gray-200 bg-white"
//                     }`}
//                   >
//                     <div className="flex space-x-3">
//                       <img
//                         src={property.images[0]}
//                         alt={property.title}
//                         className="w-20 h-16 object-cover rounded-md"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="text-lg font-semibold text-gray-900">
//                           {formatPrice(property.price)}
//                         </p>
//                         <p className="text-sm text-gray-600 truncate">
//                           {property.title}
//                         </p>
//                         <div className="flex items-center text-xs text-gray-500 mt-1">
//                           <span>{property.bedrooms} bed</span>
//                           <span className="mx-1">•</span>
//                           <span>{property.bathrooms} bath</span>
//                           <span className="mx-1">•</span>
//                           <span>{property.sqft.toLocaleString()} sqft</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex-1 relative">
//           <GoogleMap
//             zoom={12}
//             center={mapCenter}
//             mapContainerClassName="w-full h-full"
//             options={{
//               streetViewControl: false,
//               mapTypeControl: false,
//               fullscreenControl: false,
//             }}
//           >
//             {filteredProperties.map((property, index) => {
//               const coords = property.coordinates;
//               if (
//                 !coords ||
//                 typeof coords.lat !== "number" ||
//                 typeof coords.lng !== "number" ||
//                 isNaN(coords.lat) ||
//                 isNaN(coords.lng)
//               ) {
//                 return null;
//               }

//               return (
//                 <Marker
//                   key={property._id}
//                   position={{ lat: coords.lat, lng: coords.lng }}
//                   onClick={() => handleMapMarkerClick(index)}
//                   icon={{
//                     url: `https://maps.google.com/mapfiles/ms/icons/${
//                       selectedProperty === property._id ? "red" : "blue"
//                     }-dot.png`,
//                   }}
//                 />
//               );
//             })}

//             {selectedPropertyIndex !== null &&
//               filteredProperties[selectedPropertyIndex]?.coordinates &&
//               typeof filteredProperties[selectedPropertyIndex].coordinates
//                 .lat === "number" &&
//               typeof filteredProperties[selectedPropertyIndex].coordinates
//                 .lng === "number" && (
//                 <InfoWindow
//                   position={{
//                     lat: filteredProperties[selectedPropertyIndex].coordinates
//                       .lat,
//                     lng: filteredProperties[selectedPropertyIndex].coordinates
//                       .lng,
//                   }}
//                   onCloseClick={() => {
//                     setSelectedPropertyIndex(null);
//                     setSelectedProperty(null);
//                   }}
//                 >
//                   <div className="max-w-xs">
//                     <img
//                       src={filteredProperties[selectedPropertyIndex].images[0]}
//                       alt={filteredProperties[selectedPropertyIndex].title}
//                       className="w-full h-32 object-cover mb-2 rounded"
//                     />
//                     <h3 className="font-bold text-lg">
//                       {formatPrice(
//                         filteredProperties[selectedPropertyIndex].price
//                       )}
//                     </h3>
//                     <p className="text-gray-700">
//                       {filteredProperties[selectedPropertyIndex].title}
//                     </p>
//                     <div className="flex items-center text-sm text-gray-600 mt-1">
//                       <span>
//                         {filteredProperties[selectedPropertyIndex].bedrooms}{" "}
//                         bedroom
//                       </span>
//                       <span className="mx-1">•</span>
//                       <span>
//                         {filteredProperties[selectedPropertyIndex].bathrooms}{" "}
//                         bathroom
//                       </span>
//                       <span className="mx-1">•</span>
//                       <span>
//                         {filteredProperties[
//                           selectedPropertyIndex
//                         ].sqft.toLocaleString()}{" "}
//                         sqft
//                       </span>
//                     </div>
//                     <div className="flex items-center text-xs text-gray-500 mt-1">
//                       <MapPin className="h-3 w-3 mr-1" />
//                       <span className="truncate">
//                         {filteredProperties[selectedPropertyIndex].address}
//                       </span>
//                     </div>
//                   </div>
//                 </InfoWindow>
//               )}
//           </GoogleMap>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MapViewPage;
