// api.js - Handles AI API requests

async function fetchAIResponse(message, provider, apiKey, customUrl){
  let url = '', headers = {'Content-Type':'application/json'}, payload = {};

  if(provider === 'openai'){
    url = 'https://api.openai.com/v1/chat/completions';
    headers['Authorization'] = 'Bearer ' + apiKey;
    payload = { model:'gpt-4o-mini', messages:[{role:'user', content:message}] };
  } else if(provider === 'anthropic'){
    url = 'https://api.anthropic.com/v1/messages';
    headers['x-api-key'] = apiKey;
    headers['anthropic-version'] = '2023-06-01';
    payload = { model:'claude-3-haiku-20240307', max_tokens:300, messages:[{role:'user', content:message}] };
  } else if(provider === 'google'){
    url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    payload = { contents:[{ parts:[{ text: message }] }] };
  } else if(provider === 'custom'){
    url = customUrl;
    if(!url) throw new Error('Custom API URL is required');
    headers['Authorization'] = apiKey ? apiKey : undefined;
    payload = { message: message };
  }

  const response = await fetch(url, { method:'POST', headers, body: JSON.stringify(payload) });
  const data = await response.json();

  if(provider === 'openai') return data.choices?.[0]?.message?.content || JSON.stringify(data);
  if(provider === 'anthropic') return data.content?.[0]?.text || JSON.stringify(data);
  if(provider === 'google') return data.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);
  return JSON.stringify(data);
                                                                           }
