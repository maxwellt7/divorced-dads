# Development Workflow

Sacred Heart runs with a strict separation between production and development. This document explains how to work on the codebase without touching the live app at heart.sovereignty.app.

---

## Architecture overview

| Layer | Production | Staging / Dev |
|---|---|---|
| Frontend | Vercel (from `main`) | Vercel preview URL (from any PR) |
| Backend | Railway — `production` service | Railway — `staging` service |
| Database | Production Supabase project | Staging Supabase project |
| MongoDB | Production Atlas cluster | Staging Atlas cluster / DB name |
| Pinecone | Production indexes | `-staging` suffixed indexes |
| n8n | Production workflows | Staging / test webhook URLs |

---

## Branching strategy

```
main            ← production-only. Never commit directly here.
  └── feature/your-feature   ← all development work
  └── fix/your-fix
```

Rules:
- **All changes go through pull requests.** `main` should only advance via PR merges.
- Name branches `feature/<slug>`, `fix/<slug>`, or `chore/<slug>`.
- The `staging` branch tracks the last staging-tested code. Merge `main` into `staging` after a production deploy when you want to reset the staging baseline.

---

## Vercel preview deployments (frontend)

Vercel is connected to the `maxwellt7/ai-hypnosis-generator` repo. Every pull request automatically gets a preview URL — no manual steps needed.

- **Production**: deploys from `main` automatically after merge.
- **Preview**: every PR branch gets its own URL (e.g. `ai-hypnosis-generator-git-feature-xyz-<team>.vercel.app`).

To use the preview frontend against the staging backend, set `VITE_API_URL` in Vercel's Preview environment to the Railway staging service URL.

### Vercel environment variables to configure

In the Vercel project dashboard → Settings → Environment Variables:

| Variable | Production | Preview (staging) |
|---|---|---|
| `VITE_API_URL` | `https://your-prod-railway-url` | `https://your-staging-railway-url` |
| `VITE_SUPABASE_URL` | prod Supabase URL | staging Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | prod anon key | staging anon key |
| `VITE_N8N_WEBHOOK_URL` | prod n8n webhook | staging n8n webhook |
| `VITE_POSTHOG_KEY` | prod PostHog key | staging PostHog key (or same) |

---

## Railway staging environment (backend)

### One-time setup (board action required)

1. Open the Railway project for Sacred Heart.
2. Click **+ New Service → Deploy from repo**.
3. Select `maxwellt7/ai-hypnosis-generator`, branch: **`staging`**.
4. Name the service `backend-staging`.
5. In the service settings, set the start command (Railway auto-reads `railway.toml` so this may already work).
6. Add all environment variables from `backend/.env.staging.example` — use separate Supabase/MongoDB/Pinecone values (see below).
7. Note the service's public URL (e.g. `https://backend-staging-xxxx.up.railway.app`).

### Keeping staging in sync

```bash
# After merging a PR to main, update staging:
git checkout staging
git merge main
git push origin staging
# Railway will auto-redeploy the staging service.
```

---

## Environment variable differences: staging vs production

These vars **must** differ between staging and production to prevent dev work from touching production data:

| Variable | Why it differs |
|---|---|
| `NODE_ENV` | `staging` vs `production` |
| `FRONTEND_URL` | Vercel preview URL vs heart.sovereignty.app |
| `SUPABASE_URL` | Separate Supabase project |
| `SUPABASE_SERVICE_KEY` | Separate service key |
| `SUPABASE_ANON_KEY` | Separate anon key |
| `MONGODB_SCRIPTS_URI` | Separate cluster or DB name suffix |
| `PINECONE_INDEX_*` | `-staging` suffixed index names |
| `N8N_WEBHOOK_URL` | Staging/test n8n workflow webhook |
| `JWT_SECRET` | Different secret (no session crossover) |

These vars **can be shared** safely:

| Variable | Notes |
|---|---|
| `OPENAI_API_KEY` | API calls are stateless — safe to share |
| `ANTHROPIC_API_KEY` | Same |
| `DEEPSEEK_API_KEY` | Same |
| `COHERE_API_KEY` | Same |
| `ELEVENLABS_API_KEY` | Same |
| `GOOGLE_CREDENTIALS_JSON` | Same service account is fine |

---

## Local development setup

### Prerequisites

- Node.js 20+ (`node -v` should show `v20.x.x`)
- A `.env` file in `backend/` (copy `backend/.env.staging.example` → `backend/.env`, fill in staging values)
- A `.env.local` file in `frontend/` (copy `frontend/.env.example` → `frontend/.env.local`, set `VITE_API_URL=http://localhost:3000`)

### Running locally

**Terminal 1 — Backend:**

```bash
cd backend
cp .env.staging.example .env   # first time only — fill in your staging values
npm install                    # first time only
npm run dev                    # starts on http://localhost:3000 with nodemon
```

**Terminal 2 — Frontend:**

```bash
cd frontend
cp .env.example .env.local     # first time only
npm install                    # first time only
npm run dev                    # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:3000`, so the frontend talks directly to your local backend.

### Health check

```bash
curl http://localhost:3000/health
```

---

## CI (GitHub Actions)

Every PR triggers two checks (`.github/workflows/ci.yml`):

1. **Backend lint** — ESLint on the `backend/` directory.
2. **Frontend build** — `npm run build` in `frontend/` with placeholder env vars.

Both must pass before a PR can be merged. Fix lint errors locally with:

```bash
cd backend && npm run lint
cd frontend && npm run lint
```

---

## Quick reference: working on a feature

```bash
# 1. Start from main
git checkout main && git pull

# 2. Create your branch
git checkout -b feature/my-feature

# 3. Work and commit
git add <files>
git commit -m "feat: add my feature"

# 4. Push and open PR
git push -u origin feature/my-feature
# Open PR on GitHub — Vercel preview URL appears automatically

# 5. Test with staging backend
# Point your .env.local VITE_API_URL to the staging Railway URL for end-to-end testing

# 6. Get PR approved and merge to main
# Production auto-deploys from main via Vercel + Railway
```

---

## What to do if you accidentally touch production

1. **Stop immediately** — do not make more changes.
2. Check Railway logs for the production service to assess impact.
3. If data was written: notify the team and roll back via Supabase/MongoDB backups.
4. If only code was deployed: Railway supports instant rollbacks from the Deployments tab.
