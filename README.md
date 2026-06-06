# Dhruv Soran — Portfolio

A full-stack personal portfolio built with **Vite + React** on the frontend and a small **Express** server for the contact form, TTS audio, and an in-app inbox.

## Stack

- **Frontend:** Vite 5, React 18, Tailwind CSS, Framer Motion, Three.js (3D particles), react-intersection-observer
- **Backend:** Node.js, Express, Nodemailer (Gmail SMTP), OpenAI / ElevenLabs TTS
- **Storage:** JSON file (`server/data/inbox.json`) for contact submissions; the `server/uploads/achievements/` folder for gallery photos

## Local development

```bash
# from the repo root
npm install          # installs root + concurrently
cd client && npm install
cd ../server && npm install

# copy env templates
cp server/.env.example server/.env
cp client/.env.example client/.env

# start both servers (client on :5173, API on :5000)
cd ..
npm run dev
```

## Production build

```bash
npm run build        # builds client/ to client/dist
NODE_ENV=production npm start  # starts the server (also serves client/dist)
```

## Project layout

```
portfolio/
├── client/                # React app (Vite)
│   ├── public/            # static assets served at /
│   ├── src/               # components, contexts, hooks
│   └── vite.config.js     # dev proxy → :5000 for /api and /uploads
└── server/                # Express API
    ├── index.js           # all routes
    ├── data/              # inbox.json (gitignored)
    ├── uploads/           # achievement photos (gitignored except _placeholder)
    └── cache/             # TTS audio cache (gitignored)
```

## Environment variables

See `server/.env.example` and `client/.env.example`. The server is the source of truth for SMTP, TTS, and inbox protection; the client only needs `VITE_API_URL` if the API is hosted on a different domain.

## Contact form

Submissions are saved to `server/data/inbox.json` and (if `MAIL_PASS` is set) forwarded to the inbox in `MAIL_TO`. You can browse them inside the site via the mail icon in the navbar, or at `GET /api/contact?key=YOUR_INBOX_KEY`.
