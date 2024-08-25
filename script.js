// Toggle sidebar visibility
document.getElementById('menu-toggle').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hidden');
});

// Handle search functionality
document.getElementById('search-input').addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const chatItems = document.querySelectorAll('.chat-item');

    chatItems.forEach(item => {
        const name = item.querySelector('.chat-info h3').textContent.toLowerCase();
        item.style.display = name.includes(searchQuery) ? 'flex' : 'none';
    });
});

// Handle sending messages
document.getElementById('send-btn').addEventListener('click', () => {
    const textarea = document.querySelector('textarea');
    const messageText = textarea.value.trim();

    if (messageText) {
        const messageContainer = document.getElementById('chat-messages');

        // Create new message element
        const newMessage = document.createElement('div');
        newMessage.className = 'message sent';
        newMessage.innerHTML = `
            <p>${messageText}</p>
            <span class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;

        // Append new message and clear input
        messageContainer.appendChild(newMessage);
        textarea.value = '';
        messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to latest message
    }
});

// Handle chat selection
document.querySelectorAll('.chat-item').forEach(item => {
    item.addEventListener('click', () => {
        const chatName = item.querySelector('.chat-info h3').textContent;
        const chatAvatar = item.querySelector('img').src;

        document.getElementById('chat-name').textContent = chatName;
        document.getElementById('chat-avatar').src = chatAvatar;
        document.getElementById('chat-window').classList.remove('hidden');
    });
});

// Handle video call
document.getElementById('video-call-btn').addEventListener('click', () => {
    alert('Initiating video call...');
    // Implement video call functionality here
});

// Handle audio call
document.getElementById('audio-call-btn').addEventListener('click', () => {
    alert('Initiating audio call...');
    // Implement audio call functionality here
});

// Handle more options
document.getElementById('more-options-btn').addEventListener('click', () => {
    alert('More options...');
    // Implement more options functionality here
});
const socket = io();

// When the chat history is received
socket.on('chat history', (messages) => {
  const chatMessages = document.getElementById('chat-messages');
  messages.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.sender}: ${message.message}`;
    chatMessages.appendChild(messageElement);
  });
});

// When a new message is received
socket.on('new message', (data) => {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = `${data.sender}: ${data.message}`;
  chatMessages.appendChild(messageElement);
});

// Send a new message
const sendBtn = document.getElementById('send-btn');
const messageInput = document.querySelector('.message-input textarea');

sendBtn.addEventListener('click', () => {
  const message = messageInput.value;
  const sender = 'Your Name';  // Replace this with the actual sender's name
  socket.emit('new message', { sender, message });
  messageInput.value = '';
});
