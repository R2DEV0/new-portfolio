# Terminal Assistant Setup Guide

## Overview

The portfolio's signature feature is an **interactive terminal** (`kevin@kevtech:~`) that lets visitors
explore Kevin's background. It runs typed commands instantly and offline (`help`, `about`, `experience`,
`projects`, `skills`, `stats`, `neofetch`, `contact`, `resume`, plus easter eggs). Free-form questions are
answered by OpenAI **when an API key is configured**, and by a built-in local knowledge base when it isn't —
so the terminal is never broken, even with no key.

> **The `OPENAI_API_KEY` below is optional.** Without it, the terminal still answers questions from the
> local knowledge base in `components/Terminal.tsx` (`localAnswer`). Add the key only to enable GPT-powered
> free-form responses via `app/api/chat/route.ts`.

## Features

- 🖥️ **Interactive Terminal** - Real keyboard-driven CLI with command history (↑/↓) and Tab autocomplete
- ⚡ **Offline-First** - Typed commands and Q&A fallback work with zero configuration
- 💬 **AI-Enhanced** - Optional OpenAI integration for natural-language answers, with conversation context
- 📱 **Fully Responsive** - Full-screen on mobile, floating window on desktop
- 🔒 **Secure** - API key stored server-side only, never exposed to the client

## Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy your API key (you'll only see it once!)

### 2. Local Development

1. Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

2. Install dependencies (if you haven't already):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The AI chat will appear as a floating button in the bottom-right corner!

### 3. Production Deployment (Netlify)

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add variable**
5. Add:
   - **Key**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
6. Redeploy your site

## How It Works

- The chat assistant has context about Kevin's experience, skills, education, and achievements
- Visitors can ask questions like:
  - "What technologies does Kevin use?"
  - "Tell me about Kevin's projects"
  - "What's Kevin's experience with AWS?"
  - "How can I contact Kevin?"
- The AI responds in a friendly, professional manner
- Conversation history is maintained during the session

## Customization

### Update AI Context

Edit `app/api/chat/route.ts` to update the `kevinContext` string with any additional information you want the AI to know about.

### Change AI Model

In `app/api/chat/route.ts`, you can change the model:
- `gpt-4o-mini` (current - cost-effective)
- `gpt-4o` (more capable, higher cost)
- `gpt-3.5-turbo` (older, cheaper)

### Adjust Response Length

Change `max_tokens` in the API call (currently 300) to allow longer or shorter responses.

## Cost Considerations

- Using `gpt-4o-mini` is very cost-effective (~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens)
- Average conversation uses ~500-1000 tokens
- Set up usage limits in your OpenAI account dashboard if needed

## Troubleshooting

**Chat not working?**
- Check that `OPENAI_API_KEY` is set in `.env.local` (local) or Netlify environment variables (production)
- Check browser console for errors
- Verify your OpenAI API key is valid and has credits

**API errors?**
- Check your OpenAI account has available credits
- Verify the API key has proper permissions
- Check Netlify function logs for detailed error messages

## Security Notes

- ✅ API key is stored server-side only (never exposed to client)
- ✅ API route validates requests
- ✅ Environment variables are not committed to git
- ⚠️ Consider setting up rate limiting for production use

