const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});


app.get('/', (req, res) => {
  res.send('Socket.IO Server Running');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send_message', (data) => {
    console.log('Message received:', data);
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
