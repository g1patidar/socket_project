import { io } from 'socket.io-client';

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000'); // Replace with your server URL
    console.log('Socket initialized');
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected');
  }
};

export const getSocket = () => {
  if (!socket) {
    console.error('Socket not initialized. Call initializeSocket first.');
  }
  return socket;
};
