# GlobeTrotter (Odoo-Hackathon)

Multi-city trip planning app — React (Vite) frontend, Node/Express backend, PostgreSQL.

**Scope:** Collaborative trips with `trip_members` roles (owner / editor).

## Local development

Run these in **two separate terminal tabs**:

```bash
# Tab 1 — API server (http://localhost:3001)
cd server
npm run dev
```

```bash
# Tab 2 — Vite dev server (http://localhost:5173)
cd client
npm run dev
```

Open http://localhost:5173 in your browser. The home screen calls `GET /api/ping` and should display `{ "status": "ok" }`.

## Environment setup

```bash
cd server
cp .env.example .env   # Windows: copy .env.example .env
```

Edit `server/.env` with your Neon/Supabase `DATABASE_URL` when ready. The database pool in `db.js` is wired up but not used until schema migration.
