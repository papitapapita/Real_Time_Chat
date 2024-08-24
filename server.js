const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => console.log('New Connection WS'));

server.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));