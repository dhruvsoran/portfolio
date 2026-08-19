const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const envPath = fs.existsSync(path.join(__dirname, '.env'))
  ? path.join(__dirname, '.env')
  : fs.existsSync(path.join(__dirname, '.env.txt'))
  ? path.join(__dirname, '.env.txt')
  : '.env';
dotenv.config({ path: envPath });

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Email (Gmail SMTP) ────────────────────────────────────────────────────
// To enable contact-form email forwarding to dhruvsoran@gmail.com:
//   1. Enable 2-Step Verification on the Gmail account.
//   2. Create an App Password: https://myaccount.google.com/apppasswords
//   3. Add to server/.env:
//        MAIL_USER=dhruvsoran@gmail.com
//        MAIL_PASS=your-16-char-app-password
//        MAIL_TO=dhruvsoran@gmail.com   (defaults to MAIL_USER if unset)
//        MAIL_FROM="Dhruv Soran Site <dhruvsoran@gmail.com>"  (optional)
const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASS = process.env.MAIL_PASS || '';
const MAIL_TO = process.env.MAIL_TO || process.env.MAIL_USER || '';
const MAIL_FROM = process.env.MAIL_FROM || (MAIL_USER ? `"Dhruv Soran Site" <${MAIL_USER}>` : '');

let mailer = null;
if (MAIL_USER && MAIL_PASS) {
  mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: MAIL_USER, pass: MAIL_PASS },
  });
  console.log(`  Mail: forwarding contact submissions → ${MAIL_TO || MAIL_USER}`);
} else {
  console.log('  Mail: disabled (set MAIL_USER + MAIL_PASS in server/.env to enable)');
}

async function sendContactNotification(entry) {
  if (!mailer) return { sent: false, reason: 'mail-not-configured' };
  const subject = `📬 New contact form: ${entry.name}`;
  const text =
`New message from your portfolio site

Name:    ${entry.name}
Email:   ${entry.email}
Time:    ${new Date(entry.receivedAt).toLocaleString()}

Message:
${entry.message}

---
Reply directly to this email to respond to ${entry.name}.
Stored in your inbox: ${(process.env.PUBLIC_URL || 'http://localhost:5000')}/api/contact
`;
  const html =
`<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a23;color:#eaeaf5;border-radius:16px;">
  <div style="text-align:center;margin-bottom:20px;">
    <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:linear-gradient(90deg,rgba(0,212,255,0.18),rgba(122,92,255,0.18));border:1px solid rgba(0,212,255,0.3);color:#00d4ff;font-size:12px;font-weight:600;letter-spacing:0.5px;">
      📬 NEW CONTACT FORM SUBMISSION
    </div>
  </div>
  <h2 style="margin:0 0 6px 0;color:#fff;font-size:22px;">${escapeHtml(entry.name)}</h2>
  <p style="margin:0 0 20px 0;color:#7a7a9a;font-size:13px;">
    <a href="mailto:${escapeHtml(entry.email)}" style="color:#00d4ff;text-decoration:none;">${escapeHtml(entry.email)}</a>
    &nbsp;·&nbsp; ${new Date(entry.receivedAt).toLocaleString()}
  </p>
  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px;color:#dadaee;font-size:15px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(entry.message)}</div>
  <div style="margin-top:24px;text-align:center;">
    <a href="mailto:${escapeHtml(entry.email)}?subject=${encodeURIComponent(`Re: Your message on dhruvsoran.com`)}"
       style="display:inline-block;padding:10px 22px;border-radius:999px;background:linear-gradient(90deg,#00d4ff,#7a5cff);color:#000;font-weight:600;text-decoration:none;font-size:14px;">
      Reply to ${escapeHtml(entry.name)} →
    </a>
  </div>
  <p style="margin-top:24px;text-align:center;color:#5a5a7a;font-size:11px;">
    Stored in <code style="color:#7a7a9a;">server/data/inbox.json</code>
  </p>
</div>`;

  await mailer.sendMail({
    from: MAIL_FROM,
    to: MAIL_TO,
    replyTo: entry.email,
    subject,
    text,
    html,
  });
  return { sent: true };
}

function escapeHtml(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const INBOX_FILE = path.join(DATA_DIR, 'inbox.json');
const INBOX_KEY = process.env.INBOX_KEY || '';

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(INBOX_FILE)) fs.writeFileSync(INBOX_FILE, '[]', 'utf8');

// ─── Achievement photos folder ─────────────────────────────────────────────
// Drop JPEGs/PNGs/WebPs into server/uploads/achievements/ and they appear in
// the in-app "Highlights" carousel automatically. Newest first.
const ACHIEVEMENTS_DIR = path.join(__dirname, 'uploads', 'achievements');
if (!fs.existsSync(ACHIEVEMENTS_DIR)) fs.mkdirSync(ACHIEVEMENTS_DIR, { recursive: true });

app.use('/uploads/achievements', express.static(ACHIEVEMENTS_DIR, {
  maxAge: '1d',
  setHeaders: (res) => res.set('X-Content-Type-Options', 'nosniff'),
}));

app.get('/api/achievements/photos', (req, res) => {
  try {
    const items = fs.readdirSync(ACHIEVEMENTS_DIR)
      .filter(f => /\.(jpe?g|png|webp|gif|avif|heic|heif|svg)$/i.test(f) && !f.startsWith('.'))
      .map(filename => {
        const full = path.join(ACHIEVEMENTS_DIR, filename);
        const stat = fs.statSync(full);
        return {
          filename,
          url: `/uploads/achievements/${encodeURIComponent(filename)}`,
          size: stat.size,
          modified: stat.mtime.toISOString(),
        };
      })
      .sort((a, b) => b.modified.localeCompare(a.modified));
    res.json({ count: items.length, items, folder: 'server/uploads/achievements' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function readInbox() {
  try {
    return JSON.parse(fs.readFileSync(INBOX_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeInbox(items) {
  fs.writeFileSync(INBOX_FILE, JSON.stringify(items, null, 2), 'utf8');
}

function isAuthorized(req) {
  if (!INBOX_KEY) return true;
  const headerKey = req.headers['x-inbox-key'];
  const queryKey = req.query.key;
  return headerKey === INBOX_KEY || queryKey === INBOX_KEY;
}

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: String(name).trim().slice(0, 200),
    email: String(email).trim().slice(0, 200),
    message: String(message).trim().slice(0, 5000),
    receivedAt: new Date().toISOString(),
    read: false,
  };

  const inbox = readInbox();
  inbox.unshift(entry);
  writeInbox(inbox);

  console.log(`\n📬  New contact form submission (#${entry.id})`);
  console.log(`    Name:    ${entry.name}`);
  console.log(`    Email:   ${entry.email}`);
  console.log(`    Message: ${entry.message.slice(0, 80)}${entry.message.length > 80 ? '…' : ''}`);
  console.log(`    Total in inbox: ${inbox.length}`);

  sendContactNotification(entry)
    .then(r => {
      if (r.sent) console.log(`    ✉  Email sent to ${MAIL_TO}`);
    })
    .catch(err => {
      console.log(`    ⚠  Email failed: ${err.message}`);
    });

  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});

app.get('/api/contact', (req, res) => {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized. Provide ?key=YOUR_INBOX_KEY or x-inbox-key header.' });
  }
  const inbox = readInbox();
  res.json({ count: inbox.length, items: inbox });
});

app.patch('/api/contact/:id', express.json(), (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  const inbox = readInbox();
  const idx = inbox.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (typeof req.body.read === 'boolean') inbox[idx].read = req.body.read;
  writeInbox(inbox);
  res.json({ success: true, item: inbox[idx] });
});

app.delete('/api/contact/:id', (req, res) => {
  if (!isAuthorized(req)) return res.status(401).json({ error: 'Unauthorized' });
  const inbox = readInbox();
  const next = inbox.filter(i => i.id !== req.params.id);
  if (next.length === inbox.length) return res.status(404).json({ error: 'Not found' });
  writeInbox(next);
  res.json({ success: true, remaining: next.length });
});

const INTRO_SCRIPT = `Hey there! I'm Dhruv Soran, an AI-focused computer science undergraduate who loves building things that actually work in the real world.

I work across AI application development, generative AI, and full-stack engineering. I recently built Prithv-E, an AI-enabled smart bin, and even secured fifteen lakh in MSME funding to take it forward.

I've also built KalaConnect, an artist marketplace, Prayaas, an AI-driven internship matching platform, and Nexora, an AI-powered project management SaaS with real-time voice conversations via Agora AI. Currently, I'm interning at Emerald AI as an AI App Developer, where I work on products like Nexus AI and Eden.

I think the best way to learn is to ship. So that's exactly what I do. If you're working on something interesting, let's connect!`;

const OPENAI_VOICE = process.env.TTS_VOICE || 'onyx';
const OPENAI_MODEL = process.env.TTS_MODEL || 'tts-1-hd';
const OPENAI_SPEED = parseFloat(process.env.TTS_SPEED || '0.95');
const SE_VOICE = process.env.SE_VOICE || 'Brian';
const ELEVENLABS_VOICE = process.env.ELEVENLABS_VOICE || 'pNInz6obpgDQGcFmaJgB';

const CACHE_DIR = path.join(__dirname, 'cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

async function generateWithElevenLabs() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error('No ElevenLabs key');
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text: INTRO_SCRIPT,
        model_id: 'eleven_turbo_v2_5',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs ${response.status}: ${err}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function generateWithOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('No OpenAI key');
  const openai = new OpenAI({ apiKey });
  const mp3 = await openai.audio.speech.create({
    model: OPENAI_MODEL,
    voice: OPENAI_VOICE,
    input: INTRO_SCRIPT,
    speed: OPENAI_SPEED,
  });
  return Buffer.from(await mp3.arrayBuffer());
}

async function generateWithStreamElements() {
  const url = `https://api.streamelements.com/kappa/v2/speech?voice=${SE_VOICE}&text=${encodeURIComponent(INTRO_SCRIPT)}`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!response.ok) throw new Error(`StreamElements ${response.status}`);
  const ab = await response.arrayBuffer();
  if (!ab.byteLength) throw new Error('StreamElements returned empty');
  return Buffer.from(ab);
}

async function generateAudio() {
  if (process.env.ELEVENLABS_API_KEY) {
    try {
      console.log('  [TTS] Trying ElevenLabs...');
      const buf = await generateWithElevenLabs();
      console.log('  [TTS] ElevenLabs audio generated');
      return { buffer: buf, provider: 'elevenlabs' };
    } catch (err) {
      console.log(`  [TTS] ElevenLabs failed: ${err.message}`);
    }
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      console.log('  [TTS] Trying OpenAI TTS...');
      const buf = await generateWithOpenAI();
      console.log('  [TTS] OpenAI audio generated');
      return { buffer: buf, provider: 'openai' };
    } catch (err) {
      console.log(`  [TTS] OpenAI failed: ${err.message || err.status}`);
    }
  }

  console.log(`  [TTS] Generating with StreamElements...`);
  const buf = await generateWithStreamElements();
  return { buffer: buf, provider: 'streamelements' };
}

function getCachedAudio() {
  const possibleFiles = ['intro.mp3', 'intro.wav', 'intro.m4a', 'intro.ogg'];
  for (const f of possibleFiles) {
    const p = path.join(CACHE_DIR, f);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

app.get('/api/intro-audio', async (req, res) => {
  try {
    const cached = getCachedAudio();
    const metaFile = path.join(CACHE_DIR, 'intro.meta.json');

    if (cached && fs.existsSync(metaFile)) {
      const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
      const ext = path.extname(cached).slice(1);
      res.set('Content-Type', `audio/${ext === 'mp3' ? 'mpeg' : ext}`);
      res.set('X-TTS-Provider', meta.provider);
      res.set('Cache-Control', 'public, max-age=86400');
      return fs.createReadStream(cached).pipe(res);
    }

    const { buffer, provider } = await generateAudio();
    const outPath = path.join(CACHE_DIR, 'intro.mp3');
    fs.writeFileSync(outPath, buffer);
    fs.writeFileSync(metaFile, JSON.stringify({ provider, ts: Date.now() }));

    res.set('Content-Type', 'audio/mpeg');
    res.set('X-TTS-Provider', provider);
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(buffer);
  } catch (err) {
    console.error('TTS error:', err.message);
    res.status(500).json({ error: 'TTS failed', detail: err.message });
  }
});

app.get('/api/tts-status', (req, res) => {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasElevenLabs = !!process.env.ELEVENLABS_API_KEY;
  const metaFile = path.join(CACHE_DIR, 'intro.meta.json');
  let activeProvider = hasElevenLabs ? 'elevenlabs' : hasOpenAI ? 'openai' : 'streamelements';
  if (fs.existsSync(metaFile)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaFile, 'utf8'));
      activeProvider = meta.provider;
    } catch (e) {}
  }
  res.json({
    enabled: true,
    openaiConfigured: hasOpenAI,
    elevenLabsConfigured: hasElevenLabs,
    activeProvider,
    openaiVoice: OPENAI_VOICE,
    openaiModel: OPENAI_MODEL,
    streamElementsVoice: SE_VOICE,
    elevenLabsVoice: ELEVENLABS_VOICE,
    introScript: INTRO_SCRIPT,
  });
});

app.get('/api/clear-tts-cache', (req, res) => {
  try {
    for (const f of fs.readdirSync(CACHE_DIR)) {
      if (f.startsWith('intro.')) fs.unlinkSync(path.join(CACHE_DIR, f));
    }
    if (fs.existsSync(path.join(CACHE_DIR, 'intro.meta.json'))) {
      fs.unlinkSync(path.join(CACHE_DIR, 'intro.meta.json'));
    }
    res.json({ success: true, message: 'Cache cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'sitemap.xml'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasElevenLabs = !!process.env.ELEVENLABS_API_KEY;
  console.log(`\n  Server running on http://localhost:${PORT}`);
  if (hasElevenLabs) console.log('  TTS: ElevenLabs (premium) -> OpenAI -> StreamElements');
  else if (hasOpenAI) console.log('  TTS: OpenAI -> StreamElements');
  else console.log('  TTS: StreamElements (free)');
  if (hasElevenLabs) console.log(`  ElevenLabs voice: ${ELEVENLABS_VOICE}`);
  if (hasOpenAI) console.log(`  OpenAI voice: ${OPENAI_VOICE} (${OPENAI_MODEL})`);
  console.log('');
});