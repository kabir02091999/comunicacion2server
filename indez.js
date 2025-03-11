const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.set('port', process.env.PORT || 3000);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (data) => {
    console.log('message: ' + data.message + ' from ' + data.username);
    io.emit('chat message', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(app.get('port'), () => {
  console.log('listening on *:3000');
});