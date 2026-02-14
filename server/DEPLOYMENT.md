# Deployment Guide — Pizza_Delight

This document covers deploying the backend (recommended: Render) and frontend (`client`) to Vercel, plus required environment variables and verification steps.

## Prerequisites
- Repository pushed to GitHub.
- Google account with 2FA and an App Password created for `GMAIL_APP_PASSWORD`.
- Accounts: Render (or Railway/Heroku) for backend, Vercel for frontend.
- Do NOT commit secrets to git; use host environment variables.

## Required Production Environment Variables
- `GMAIL_USER` — Gmail address used to send mail
- `GMAIL_APP_PASSWORD` — Google App Password (requires 2FA)
- `SENDER_EMAIL` — address used as the `from` field
- `MONGO_URI` — MongoDB connection string (Atlas recommended)
- `JWT_SECRET` — JWT secret
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` — payment keys

Optional fallback SMTP (only set if not using Gmail):
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

Client envs:
- `VITE_SERVER_URL` — public URL of your backend (set on Vercel)
- `VITE_RAZORPAY_KEY_ID` — (if using Razorpay client-side)


## Deploy Backend (Render — recommended)
1. Push your repo to GitHub.
2. Sign in to Render → New → Web Service → Connect GitHub repo.
3. Choose the `server` folder (or repo root if server is top-level) as the Root Directory.
4. Set build & start commands:
   - Build command: `npm install` (Render runs this automatically)
   - Start command: `node index.js` (or `npm run server` if configured)
5. Add Environment Variables in Render dashboard (Service → Environment):
   - `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `SENDER_EMAIL`, `MONGO_URI`, `JWT_SECRET`, etc.
6. Deploy and watch the service logs. The public backend URL will be available once healthy.

Notes: Render hosts persistent Node.js services and is simple to configure. Alternative hosts: Railway, Heroku.


## Deploy Frontend (Vercel)
1. Go to Vercel → New Project → Import GitHub repo.
2. Set Root Directory to `client`.
3. Framework: Vite (auto-detected). Build Command: `npm run build`. Output Dir: `dist`.
4. Add Environment Variables in Vercel:
   - `VITE_SERVER_URL` = `https://your-backend-url` (from Render)
   - `VITE_RAZORPAY_KEY_ID` (if needed)
   - Any client-only envs.
5. Deploy. Vercel will build and publish your site.


## Set Environment Variables via CLI (optional)
Vercel CLI example:
```bash
vercel login
vercel env add GMAIL_USER production
vercel env add GMAIL_APP_PASSWORD production
vercel env add SENDER_EMAIL production
vercel env add VITE_SERVER_URL production
```

Render: use the Render dashboard UI to set env vars for the service.


## Verify Email Sending
1. After backend is deployed and envs set, trigger an email from the app (e.g., registration flow) or use the test script:
```bash
# From your local machine (if you have a public backend URL)
curl -X POST https://your-backend-url/api/test-email
```
2. Check backend logs (Render dashboard → Logs) for `📩 Email sent` or errors.
3. If errors appear, inspect stack traces and verify `GMAIL_*` values.


## Security & Cleanup
- Rotate any keys that were exposed in `.env` (Brevo SMTP keys, `SENDER_PASSWORD`).
- Remove secrets from git history if they were committed (use BFG or git-filter-repo). This rewrites history — coordinate with collaborators.
- Keep secrets only in hosting environment variables.


## Optional: Create a protected test endpoint
If helpful, add a protected endpoint `/api/test-email` that only accepts requests from your IP or requires a temporary token. This makes verifying production mail easier without exposing email functions publicly.


## Need help?
If you want, I can:
- Connect the repo to Render and Vercel using CLI steps here.
- Produce sample `vercel.json` or Render `start` script adjustments.
- Create a small `/api/test-email` endpoint and a short health check route.

