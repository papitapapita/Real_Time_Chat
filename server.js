const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.emit('message', 'Welcome to ChatCord');

    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('disconnect', () => {
        io.emit('message', 'User disconnected');
    });

    socket.on('chatMessage', msg => {
        socket.broadcast.emit('message', msg);
    })
});

server.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));