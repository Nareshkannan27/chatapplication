const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

let users = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('setUsername', (username) => {
    socket.username = username;
    users.push(username);
    io.emit('updateUserList', users);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    users = users.filter(user => user !== socket.username);
    io.emit('updateUserList', users);
  });

  socket.on('chatMessage', (data) => {
    io.emit('chatMessage', data); // Broadcast the message with username to all clients
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
