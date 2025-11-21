// app.js - main chat logic

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const openSettings = document.getElementById('openSettings');
  const closeSettings = document.getElementById('closeSettings');
  const sendBtn = document.getElementById('sendBtn');
  const userInput = document.getElementById('userInput');
  const chatbox = document.getElementById('chatbox');

  openSettings.addEventListener('click', () => sidebar.classList.add('open'));
  closeSettings.addEventListener('click', () => sidebar.classList.remove('open'));

  sendBtn.addEventListener('click', sendMessage);
  userInput.addEventListener('keydown', e => { if(e.key==='Enter') sendMessage(); });

  function addMessage(text, sender){
    const div = document.createElement('div');
    div.className = 'msg ' + sender;
    div.textContent = text;
    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  async function sendMessage(){
    const msg = userInput.value.trim();
    if(!msg) return;
    addMessage(msg, 'user');
    userInput.value = '';

    const apiKey = document.getElementById('apikey').value.trim();
    const provider = document.getElementById('provider').value;
    const customUrl = document.getElementById('customUrl').value.trim();

    // Placeholder typing message
    const placeholder = document.createElement('div');
    placeholder.className = 'msg ai';
    placeholder.textContent = 'Stypz AI is typing...';
    chatbox.appendChild(placeholder);
    chatbox.scrollTop = chatbox.scrollHeight;

    try{
      const reply = await fetchAIResponse(msg, provider, apiKey, customUrl);
      placeholder.textContent = reply;
    }catch(err){
      placeholder.textContent = 'Error: ' + err.message;
    }
  }
});
        
