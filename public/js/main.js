const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const roomTitle = document.getElementById('room-name');
const usersList = document.getElementById('users');

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

outputRoomName(room);

socket.emit('joinRoom', {username, room});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('userJoined', usernamesList => {
    console.log(usernamesList);
    addUsersToRoomList(usernamesList);
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

function outputRoomName(room) {
    roomTitle.textContent = room;
}

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.user} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    chatMessages.appendChild(div);
}

function addUsersToRoomList(usernameList) {
    usersList.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (const username of usernameList) {
        const newUserListItem = document.createElement('li');
        newUserListItem.textContent = username;
        fragment.appendChild(newUserListItem);
    }

    usersList.appendChild(fragment);
}