import express from 'express';
import { fetch } from 'undici';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// 可配置：支援多種提供者（OpenAI、第三方），預設為 OpenAI
const API_BASE_URL = (process.env.API_BASE_URL || 'https://api.openai.com').replace(/\/+$/,'');
const API_CHAT_PATH = process.env.API_CHAT_PATH || '/v1/chat/completions';
const API_KEY = process.env.OPENAI_API_KEY || process.env.API_KEY;
const API_KEY_HEADER = process.env.API_KEY_HEADER || 'Authorization';
const API_KEY_PREFIX = process.env.API_KEY_PREFIX || 'Bearer ';

if (!API_KEY) {
  console.warn('API key not set — proxy will fail until set in environment');
}

app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// 健康檢查
app.get('/api/health', (req, res) => {
  res.json({ ok: true, provider: API_BASE_URL });
});

// POST /api/chat -> 將 OpenAI chat-format 轉換並轉發到目標 API（支援 Gemini）
app.post('/api/chat', async (req, res) => {
  try {
    const target = `${API_BASE_URL}${API_CHAT_PATH}`;
    const headers = { 'Content-Type': 'application/json' };
    if (API_KEY) {
      // Ensure prefix spacing and trim key/header to avoid hidden whitespace issues
      let prefix = (API_KEY_PREFIX || '').toString();
      if (prefix && !prefix.endsWith(' ')) prefix = prefix + ' ';
      const key = API_KEY.toString().trim();
      const headerName = (API_KEY_HEADER || 'Authorization').toString().trim();
      headers[headerName] = `${prefix}${key}`;
    }

    // If provider looks like Google's Generative Language API, convert OpenAI chat -> Gemini generate payload
    let outboundBody = req.body;
    const isGenerativeLanguage = API_BASE_URL.includes('generativelanguage.googleapis.com') || API_CHAT_PATH.includes('text-bison') || API_CHAT_PATH.includes('generate');
    const isHuggingFace = API_BASE_URL.includes('api-inference.huggingface.co') || API_CHAT_PATH.includes('/models/');

    if ((isGenerativeLanguage || isHuggingFace) && Array.isArray(req.body.messages)) {
      // Combine chat messages into a single prompt
      const combined = req.body.messages.map((m) => {
        const role = (m.role || 'user').toString();
        const content = (m.content || m.text || '').toString();
        return `${role.toUpperCase()}: ${content}`;
      }).join('\n');

      // Construct a permissive Gemini payload with several common field names
      const maxTokens = req.body.max_tokens || req.body.maxOutputTokens || req.body.maxOutputTokens || 512;
      const temperature = req.body.temperature ?? 0.7;

      // For Gemini generateContent endpoint, use 'contents' shape
      if (API_CHAT_PATH.includes('generateContent')) {
        outboundBody = {
          contents: [ { parts: [ { text: combined } ] } ],
          temperature,
          maxOutputTokens: maxTokens,
        };
      } else if (isHuggingFace) {
        // Hugging Face inference API expects { inputs: string, parameters: {...} }
        outboundBody = {
          inputs: combined,
          parameters: {
            max_new_tokens: maxTokens,
            temperature
          }
        };
      } else {
        // multiple shapes to improve compatibility with different endpoints
        outboundBody = {
          prompt: { text: combined },
          input: combined,
          instances: [{ content: combined }],
          maxOutputTokens: maxTokens,
          max_output_tokens: maxTokens,
          temperature,
        };
      }
    }

    console.log('Proxy debug: target=', target);
    console.log('Proxy debug: headers=', Object.keys(headers));
    console.log('Proxy debug: outboundBodyPreview=', (JSON.stringify(outboundBody) || '').slice(0,2000));

    const resp = await fetch(target, {
      method: 'POST',
      headers,
      body: JSON.stringify(outboundBody),
    });

    const status = resp.status;
    const contentType = resp.headers.get('content-type') || '';
    console.log('Proxy debug: upstream status=', status, 'content-type=', contentType);

    let rawText = await resp.text();
    console.log('Proxy debug: upstream rawTextPreview=', rawText ? rawText.slice(0,4000) : '');

    let data = null;
    if (contentType.includes('application/json')) {
      try { data = JSON.parse(rawText); } catch (e) { data = rawText; }

      // If response came from Generative Language API, try to extract text and map to OpenAI-style response
      if (isGenerativeLanguage) {
        // Try common locations for generated text
        let text = null;
        if (data && data.candidates && data.candidates[0]) {
          text = data.candidates[0].output || data.candidates[0].content || data.candidates[0].text;
        }
        if (!text && data && data.output && Array.isArray(data.output) && data.output[0]) {
          const block = data.output[0];
          if (typeof block === 'string') text = block;
          else if (block.content && Array.isArray(block.content) && block.content[0]) {
            text = block.content.map(c => c.text || c).join('\n');
          } else if (block.text) text = block.text;
        }
        if (!text && data && data.result) {
          text = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
        }
        if (!text && data && data.outputText) text = data.outputText;
        if (!text) {
          const findString = (obj) => {
            if (!obj) return null;
            if (typeof obj === 'string') return obj;
            if (Array.isArray(obj)) { for (const item of obj) { const r = findString(item); if (r) return r; } }
            else if (typeof obj === 'object') { for (const k of Object.keys(obj)) { const r = findString(obj[k]); if (r) return r; } }
            return null;
          };
          text = findString(data);
        }

        console.log('Proxy debug: extracted_text_preview=', (text || '').slice(0,1000));
        const openaiStyle = { choices: [ { message: { role: 'assistant', content: text || '' } } ] };
        return res.status(status).json(openaiStyle);
      }

      return res.status(status).json(data);
    }

    res.status(status).send(rawText);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'proxy_error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy listening on http://localhost:${PORT} -> ${API_BASE_URL}${API_CHAT_PATH}`);
});
