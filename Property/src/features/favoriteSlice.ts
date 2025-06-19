import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/favorites";

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
  propertyType: "House" | "Condo" | "Townhouse";
  isFavorited?: boolean;
}

interface FavoriteState {
  favorites: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  favorites: [],
  loading: false,
  error: null,
};

export const addFavorites = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("favorite/add", async (propertyId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(`${API_URL}/add/${propertyId}`, {}, config);

    return propertyId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add favorite"
    );
  }
});

export const getFavorites = createAsyncThunk<
  Property[],
  void,
  { rejectValue: string }
>("favorite/getAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API_URL}/get`, config);
    return res.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch favorites"
    );
  }
});

export const removeFavorite = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("favorite/remove", async (propertyId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`${API_URL}/remove/${propertyId}`, config);

    return propertyId;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to remove favorite"
    );
  }
});

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getFavorites.fulfilled,
        (state, action: PayloadAction<Property[]>) => {
          state.loading = false;
          state.favorites = action.payload;
        }
      )
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });

    builder
      .addCase(addFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });

    builder
      .addCase(removeFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(
          (property) => property._id !== action.payload
        );
      })
      .addCase(removeFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export default favoriteSlice.reducer;
