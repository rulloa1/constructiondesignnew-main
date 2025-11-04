## Quick context — what this repo is

- Vite + React + TypeScript single-page app scaffolded with shadcn-ui & Tailwind.
- App entry: `src/main.tsx` → `App.tsx`. Components live under `src/components/`, pages under `src/pages/`.
- There are two almost-identical copies of the project at the repo root and in `constructiondesignnew/`. Confirm which folder your CI / deploys use before editing both.

## How to run (developer workflow)

- Install deps and start dev server in the project root (or the folder used by your deploy):
  - `npm i` then `npm run dev` — Vite serves on port 8080 by default (see `vite.config.ts`).
  - Build: `npm run build` (production), `npm run build:dev` (dev-mode build). Preview: `npm run preview`.
- Linting: `npm run lint` (ESLint configured).

## Important project conventions


## Integration points & environment variables

  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
  - `LOVABLE_API_KEY` (used to call the AI gateway)
  - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (service role for DB writes)

## Key files to inspect when changing behavior


## Practical examples for an AI agent

  - Create `src/components/MyThing.tsx` (TSX + props typed). Import `Button`/`Input` from `src/components/ui/` for design consistency.
  - Use import path `@/components/MyThing`.
  - Add a Deno handler under `supabase/functions/<name>/index.ts` and call it from the client with `supabase.functions.invoke('<name>', { body })`.
  - Ensure server env vars are available to the function (`SUPABASE_SERVICE_ROLE_KEY` for DB writes; secret keys must not go in the client).

## Small gotchas / tips


If anything here is incorrect or you'd like the instructions tuned for a specific CI/deploy target (Netlify/Vercel/Supabase Deploy), tell me which and I will iterate.  
— End of instructions

## How to run the chatbot locally (env example)

- The client uses Vite env vars (prefix with `VITE_`). The serverless function (Deno under `supabase/functions/`) expects plain env vars when deployed.
- Create a local `.env` from the provided `.env.example` and DO NOT commit secrets.
- Minimal `.env.example` (see repo root):

```
# Vite (client) - prefix with VITE_
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=public-anon-key

# Server (Supabase function / Deno) - used by supabase/functions/chatbot
LOVABLE_API_KEY=sk-REPLACE_ME
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service-role-key
```

- Quick local tips:
  - Start the client: `npm i` then `npm run dev` and open the app on port 8080.
  - The chat UI (`src/components/Chatbot.tsx`) calls `supabase.functions.invoke('chatbot', { body })`. To fully test conversation + DB writes you must deploy the function (or run it locally with the Supabase/Deno tooling and provide the server env vars).

## PR checklist (quick smoke checks)

- Run `npm run dev` and check the app loads on port 8080.
- Verify imports using the `@/` alias compile (e.g., `@/components/Chatbot`).
- If you changed integrations, update `.env` from `.env.example` and verify the Chatbot flow: open the chat widget and send a test message (expect a JSON-like `message` response and optional `leadData`).
- Run `npm run lint` and address any ESLint errors for changed files.
- If editing serverless functions under `supabase/functions/`, confirm required server env vars are set in your deployment (do not commit secrets in repo).

If you'd like, I can also copy this file into `constructiondesignnew/.github/` and add a short `How to run` in that folder specifically — tell me which folder your deploy uses and I'll mirror the file there.
