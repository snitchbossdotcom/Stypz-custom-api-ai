// LocalStorage.js - Save and load chat history

const ChatStorage = {
  save: function(message, sender){
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chats.push({ message, sender, time: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(chats));
  },
  load: function(chatbox){
    const chats = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    chats.forEach(c => {
      const div = document.createElement('div');
      div.className = 'msg ' + c.sender;
      div.textContent = c.message;
      chatbox.appendChild(div);
    });
    chatbox.scrollTop = chatbox.scrollHeight;
  },
  clear: function(chatbox){
    localStorage.removeItem('chatHistory');
    chatbox.innerHTML = '';
  }
};
