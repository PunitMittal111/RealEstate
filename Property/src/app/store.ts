import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import propertyReducer from "../features/propertySlice";
import favoriteReducer from "../features/favoriteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    favorites: favoriteReducer,
  },
});

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
