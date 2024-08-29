const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e);
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    //clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.user} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    chatMessages.appendChild(div);
}