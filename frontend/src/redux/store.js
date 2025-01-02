// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import socketReducer from './socketSlice'; // Ensure the path to socketSlice is correct

export const store = configureStore({
  reducer: {
    socket: socketReducer, // Add your slice reducer
  },
});
