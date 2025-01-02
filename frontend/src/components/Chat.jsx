import { useState } from 'react';
import { getSocket } from '../redux/socket';
import { Button, TextField } from '@mui/material';

export const Chat = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const socket = getSocket();
    if (socket && message.trim()) {
      socket.emit('sendMessage', { text: message });
      console.log('Message sent:', message);
      setMessage(''); // Clear the input
    } else {
      console.error('Socket not initialized or message is empty');
    }
  };

  return (
    <div>
      Chat Component:
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        variant="outlined"
        size="small"
      />
      <Button onClick={sendMessage} variant="contained" color="primary">
        Send Message
      </Button>
    </div>
  );
};
