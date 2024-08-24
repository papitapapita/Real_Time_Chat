const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

socket.on('message', message => {
    console.log(message);
    outputMessage(message); 
});

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e);
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.className = "message";
    const divChild = `
    <p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    div.innerHTML = divChild;
    chatMessages.appendChild(div);
}