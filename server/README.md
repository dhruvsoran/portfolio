# Portfolio Server

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Get a free OpenAI API key at https://platform.openai.com/api-keys
   (New accounts get $5 free credit.)

3. Paste the key into `server/.env`:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. Start the server:
   ```bash
   node index.js
   ```

The first request to `/api/intro-audio` will generate the audio file (takes ~5s)
and cache it in `server/cache/intro.mp3`. Subsequent loads will play the cached file instantly.

## Voice Options

| Voice   | Style                                |
|---------|--------------------------------------|
| onyx    | Deep, warm male — best for dev intro |
| echo    | Male, slightly conversational         |
| fable   | British-accented male                |
| alloy   | Neutral, gender-ambiguous            |
| nova    | Female, friendly                     |
| shimmer | Female, expressive                   |

Change in `server/.env` with `TTS_VOICE=echo` etc.
