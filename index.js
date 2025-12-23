const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 10000;

// This line tells Render to look inside the "public" folder for your game
app.use(express.static(path.join(__dirname, 'public')));

// This makes sure that if someone goes to your link, they see index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A player joined!');
});

http.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on port ' + PORT);
});
