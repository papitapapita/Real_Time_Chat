const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {
    console.log(message);
});

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e);
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);
})