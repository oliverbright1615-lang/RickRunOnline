const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Render needs to pick the port automatically
const PORT = process.env.PORT || 10000; 

app.use(express.static('public'));

let players = {};

io.on('connection', (socket) => {
  players[socket.id] = { x: 100, y: 400 };
  socket.emit('currentPlayers', players);
  socket.broadcast.emit('newPlayer', { id: socket.id, player: players[socket.id] });

  socket.on('playerMovement', (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      socket.broadcast.emit('playerMoved', { id: socket.id, x: data.x, y: data.y });
    }
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('playerDisconnected', socket.id);
  });
});

http.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});