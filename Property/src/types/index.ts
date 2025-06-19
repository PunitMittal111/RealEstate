export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'buyer' | 'seller' | 'agent';
  preferences: {
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
    bathrooms: number;
    propertyTypes: string[];
    locations: string[];
  };
  savedSearches: SavedSearch[];
  favoriteProperties: string[];
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: any;
  alertsEnabled: boolean;
  createdAt: string;
}

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
  agent: Agent;
  description: string;
  features: string[];
  yearBuilt: number;
  lotSize: string;
  parking: string;
  heating: string;
  cooling: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  virtualTour?: string;
  status: 'active' | 'pending' | 'sold';
  daysOnMarket: number;
  priceHistory: PriceHistory[];
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  company: string;
  rating: number;
  reviews: number;
  bio: string;
  specialties: string[];
  activeListings: number;
  soldProperties: number;
}

export interface PriceHistory {
  date: string;
  price: number;
  event: 'listed' | 'price_change' | 'sold';
}

export interface Appointment {
  id: string;
  propertyId: string;
  agentId: string;
  userId: string;
  date: string;
  time: string;
  type: 'viewing' | 'consultation';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}