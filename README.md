# Divorced Dads — 16-Week Personal Development Program

A 16-week guided personal development app for divorced dads. Daily tasks, AI-powered coaching chat, and optional hypnosis generation — organized across four phases: Power, Purpose, Protection, and Profit.

## Stack

- **Frontend:** React/Vite → Vercel
- **Backend:** Node.js/Express → Railway
- **Database:** Supabase (PostgreSQL)
- **AI:** Anthropic Claude (chat + hypnosis), ElevenLabs (audio)

## Program Structure

| Phase | Weeks | Focus |
|-------|-------|-------|
| Power | 1-4 | Gap awareness, inner child, daily routine, vessel expansion |
| Purpose | 5-8 | Body, being, balance, business |
| Protection | 9-12 | Protect self, kids, assets, peace |
| Profit | 13-16 | Relationships, money, time, kids |

Each week has 7 daily tasks. 112 tasks total.

## Development

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

## Database Setup

Run migrations in order from `backend/src/migrations/`.
