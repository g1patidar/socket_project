// src/redux/socketMiddleware.js
import { initializeSocket, disconnectSocket } from '../socket';

export const socketMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === 'socket/connect') {
    const socket = initializeSocket();

    socket.on('message', (data) => {
      storeAPI.dispatch({ type: 'socket/message', payload: data });
    });
  } else if (action.type === 'socket/disconnect') {
    disconnectSocket();
  }
  return next(action);
};
