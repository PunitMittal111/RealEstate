import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Property {
  _id?: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt?: number;
  lotSize?: string;
  parking?: string;
  heating?: string;
  cooling?: string;
  description: string;
  features: string[];
  images?: string[];
  propertyType: "House" | "Condo" | "Townhouse" | "Apartment";
  isFavorited?: boolean;

  coordinates: [number, number];
}

interface PropertyState {
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

const API_URL = "http://localhost:5000";

export const createProperty = createAsyncThunk(
  "property/create",
  async (newProperty: Property, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/properties/createproperty`,
        { ...newProperty },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create property"
      );
    }
  }
);

export const getAllProperty = createAsyncThunk(
  "property/getAll",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/api/properties/property`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch properties"
      );
    }
  }
);

export const getPropertyById = createAsyncThunk<
  Property,
  string,
  { rejectValue: string }
>("property/getById", async (id, { rejectWithValue }) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${API_URL}/api/properties/property/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch property"
    );
  }
});

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProperty.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.loading = false;
          state.properties.push(action.payload);
        }
      )
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProperty.fulfilled,
        (state, action: PayloadAction<Property[]>) => {
          state.loading = false;
          state.properties = action.payload;
        }
      )
      .addCase(getAllProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProperty = null;
      })
      .addCase(
        getPropertyById.fulfilled,
        (state, action: PayloadAction<Property>) => {
          state.loading = false;
          state.selectedProperty = action.payload;
        }
      )
      .addCase(getPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertySlice.reducer;
