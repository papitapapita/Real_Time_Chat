const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const { formatMessage } = require('./utils/messages');
const { userJoin, getCurrentUser, getRoomUsers, userExit } = require('./utils/user');

const BOT_NAME = "Chat"
const app = express();
const PORT = 3000 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('joinRoom', ( {username, room} ) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user?.room);

        socket.emit(
            'message',
            formatMessage(BOT_NAME, 'Welcome to ChatCord')
        );

        socket.broadcast
            .to(user.room)
            .emit('message',
                formatMessage(BOT_NAME, `${username} has joined the chat`));

        const users = getRoomUsers(user.room).map(user => user.username);
        io.to(user.room).emit('userJoined', users);
    });

    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        console.log(user);
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })

    socket.on('disconnect', () => {
        const user = userExit(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(BOT_NAME, `${user.username} left the chat`));
            const users = getRoomUsers(user.room).map(user => user.username);
            io.to(user.room).emit('userJoined', users);
        }
    });
});

server.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));