const socket = io();

const usernameContainer = document.getElementById('username-container');
const usernameInput = document.getElementById('username-input');
const setUsernameButton = document.getElementById('set-username');
const chatContainer = document.getElementById('chat-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages');
const userList = document.getElementById('user-list');

let username = '';

setUsernameButton.addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (username) {
    socket.emit('setUsername', username);
    usernameContainer.style.display = 'none';
    chatContainer.style.display = 'flex';
  }
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message) {
    socket.emit('chatMessage', { username, message });
    messageInput.value = '';
  }
});

socket.on('chatMessage', (data) => {
  const div = document.createElement('div');
  div.textContent = `${data.username}: ${data.message}`;
  messagesContainer.appendChild(div);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('updateUserList', (users) => {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = `https://i.pravatar.cc/150?u=${user}`; // Use a random avatar service
    const span = document.createElement('span');
    span.textContent = user;
    li.appendChild(img);
    li.appendChild(span);
    userList.appendChild(li);
  });
});
