const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = createServer(app);

// Express Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json()); // For JSON body parsing if needed

// Socket.IO Configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Express Route
app.get('/', (req, res) => {
  console.log(req.body); // Will be undefined for GET requests
  res.send('Hello, World!'); // Send a response to the client
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('User connected:');
  console.log('ID:', socket.id);

  // Listening for 'message' event
  socket.on('sendMessage', (data) => {
    console.log('Received message:', data);

    // Optionally, you can emit a response back
    socket.emit('messageResponse', { text: data });
  });

  // Example event
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
