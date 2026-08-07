# Dhruv Soran — Portfolio

A full-stack personal portfolio showcasing projects, skills, and experience. Built with React + Vite on the frontend and Express.js on the backend. Features a 3D interactive hero section, AI-powered text-to-speech, dark/light theme, and a contact form with email notifications.

**Live:** [https://portfolio-5zq3.onrender.com/](https://portfolio-5zq3.onrender.com/)

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Vite 5, Tailwind CSS, Framer Motion, Three.js (@react-three/fiber, @react-three/drei) |
| **Backend** | Node.js, Express 4, Nodemailer |
| **AI / TTS** | OpenAI API, ElevenLabs API, StreamElements (fallback) |
| **Storage** | JSON file (contact submissions), filesystem (achievement photos, TTS cache) |
| **Deployment** | Render |

---

## Features

- **3D Hero Section** — Interactive particle field with Three.js and post-processing bloom effects
- **AI Voice Intro** — Text-to-speech with automatic provider fallback (ElevenLabs → OpenAI → StreamElements) and server-side caching
- **Dark/Light Theme** — Persistent theme toggle with system preference detection and no-flash initialization
- **Contact Form** — Saves submissions to JSON store, forwards via Gmail SMTP, with authenticated inbox viewer
- **SEO Optimized** — JSON-LD structured data, Open Graph, Twitter Cards, robots.txt, sitemap.xml
- **Responsive Design** — Mobile-first with adaptive 3D (disabled on mobile for performance)
- **Smooth Animations** — Scroll-triggered animations via Framer Motion and react-intersection-observer

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/dhruvsoran/portfolio.git
cd portfolio

# Install dependencies
npm install
cd client && npm install && cd ../server && npm install && cd ..

# Configure environment
cp server/.env.example server/.env
# Edit server/.env with your values (optional for local dev)
```

### Development

```bash
npm run dev
```

This starts both servers concurrently:
- **Frontend:** http://localhost:5173
- **API:** http://localhost:5000

Vite proxies `/api` and `/uploads` requests to the backend automatically.

### Production Build

```bash
npm run build      # builds client/ to client/dist/
NODE_ENV=production npm start   # serves static files + API
```

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Set to `production` for static file serving | No |
| `PUBLIC_URL` | Canonical URL used in emails | No |
| `INBOX_KEY` | Secret key to protect inbox API endpoints | Recommended |
| `MAIL_USER` | Gmail address for SMTP | For email |
| `MAIL_PASS` | Gmail App Password (16 chars) | For email |
| `MAIL_TO` | Email address to receive notifications | No (defaults to MAIL_USER) |
| `MAIL_FROM` | Display name in sent emails | No |
| `OPENAI_API_KEY` | OpenAI API key for TTS | For OpenAI TTS |
| `TTS_VOICE` | OpenAI voice (alloy, echo, fable, onyx, nova, shimmer) | No (default: onyx) |
| `TTS_MODEL` | OpenAI TTS model | No (default: tts-1-hd) |
| `TTS_SPEED` | Speech speed multiplier | No (default: 0.95) |
| `ELEVENLABS_API_KEY` | ElevenLabs API key (premium TTS) | For ElevenLabs |
| `ELEVENLABS_VOICE` | ElevenLabs voice ID | No |

### Client (`client/.env`)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | API base URL (leave empty for same-origin) | No |

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/contact` | Submit contact form |
| `GET` | `/api/contact` | View inbox (requires `INBOX_KEY`) |
| `PATCH` | `/api/contact/:id` | Update read status |
| `DELETE` | `/api/contact/:id` | Delete submission |
| `GET` | `/api/intro-audio` | Stream AI voice intro (cached) |
| `GET` | `/api/tts-status` | Check TTS provider status |
| `GET` | `/api/achievements/photos` | List achievement gallery photos |

---

## Project Structure

```
portfolio/
├── client/                     # React + Vite frontend
│   ├── public/                 # Static assets (favicon, OG image, robots.txt, sitemap.xml)
│   ├── src/
│   │   ├── components/         # 26 React components
│   │   ├── context/            # ThemeContext, InboxContext
│   │   ├── App.jsx             # Main app with all sections
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles + Tailwind
│   ├── index.html              # HTML shell with SEO meta tags
│   ├── vite.config.js          # Dev proxy config
│   ├── tailwind.config.js      # Tailwind configuration
│   └── package.json
├── server/                     # Express backend
│   ├── index.js                # All routes, TTS logic, email
│   ├── data/                   # inbox.json (gitignored)
│   ├── uploads/achievements/   # Achievement photos
│   ├── cache/                  # TTS audio cache (gitignored)
│   └── package.json
├── package.json                # Root scripts (concurrently)
└── README.md
```

---

## Page Sections

1. **Hero** — 3D particle animation with name, title, and CTA
2. **About** — Brief introduction and background
3. **Journey** — Timeline of education and experience
4. **Projects** — Featured projects (Prithv-E, KalaConnect, Prayaas)
5. **Skills** — Technical skills with categories
6. **GitHub Stats** — Activity and contribution data
7. **Achievements** — Awards and highlights with photo gallery
8. **Certifications** — Professional certifications
9. **Testimonials** — Recommendations from others
10. **Contact** — Contact form and social links

---

## SEO & Structured Data

- **Person Schema** — Name, job title, contact info, skills, social profiles
- **WebSite Schema** — Search action for site-specific search
- **Open Graph** — Full meta tags for social sharing
- **Twitter Cards** — Large image card format
- **robots.txt** — Crawler directives with sitemap reference
- **sitemap.xml** — Homepage with image metadata
- **Bing Webmaster** — Meta verification tag
- **Google Search Console** — HTML file verification

---

## Deployment

The app is deployed on [Render](https://render.com) as a Node.js service.

```bash
# Build command
npm install && npm run build

# Start command
NODE_ENV=production npm start
```

The Express server automatically serves `client/dist` as static files when `NODE_ENV=production` is set.

---

## License

This project is open source. Feel free to use it as a template for your own portfolio.
