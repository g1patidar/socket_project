import { useEffect } from "react";
import { initializeSocket, disconnectSocket } from "./redux/socket";
import { Chat } from "./components/chat";

const App = () => {
  useEffect(() => {
    const socket = initializeSocket();

    // Handle global socket events
    socket.on('connect', () => {
      console.log('Connected to server');
      console.log('Socket ID:', socket.id); // Logs the connection ID
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('messageResponse', (msg) => {
      console.log('New message received globally:', msg);
    });

    return () => {
      // Cleanup listeners and disconnect socket
      socket.off('messageResponse');
      disconnectSocket();
    };
  }, []); // Dependency array ensures this runs only once

  return (
    <div>
      App
      <Chat />
    </div>
  );
};

export default App;
