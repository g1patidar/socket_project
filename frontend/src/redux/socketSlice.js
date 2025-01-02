// src/redux/socketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

const initialState = {
  socket: null, // Holds the socket instance
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    initializeSocket: (state) => {
      if (!state.socket) {
        state.socket = io('http://localhost:5000'); // Replace with your backend URL
      }
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});

export const { initializeSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
