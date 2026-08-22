# GlobeTrotter

Multi-city collaborative trip planning app. Built for the Odoo Hackathon.

Plan trips across multiple cities with a team — invite collaborators, assign roles, and manage itineraries together.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js / Express
- **Database:** PostgreSQL
- **Hosting (DB):** Neon or Supabase (Postgres-compatible)

## Features

- Multi-city trip itineraries
- Collaborative trips via `trip_members` — each member has a role of `owner` or `editor`
- REST API backend with a health-check endpoint (`/api/ping`)

> Add/remove bullets here to match what's actually implemented — this list is a starting point, not verified against the codebase.

## Project Structure

```
globetrotter/
├── client/          # React (Vite) frontend
├── server/          # Node/Express API
│   ├── .env.example
│   └── db.js        # Postgres connection pool (unused until schema migration)
└── README.md
```

## Prerequisites

- Node.js (LTS recommended)
- npm
- A PostgreSQL database (Neon or Supabase recommended for quick setup)

## Environment Setup

1. Copy the example environment file:

   ```bash
   cd server
   cp .env.example .env   # Windows: copy .env.example .env
   ```

2. Edit `server/.env` and set `DATABASE_URL` to your Neon/Supabase connection string.

   > The Postgres pool in `db.js` is initialized but not yet wired into any routes — it activates once schema migrations are run. If migrations don't exist yet in this repo, that's the next thing to add before the DB is actually usable.

## Local Development

Run the frontend and backend in two separate terminal tabs.

**Tab 1 — API server** (`http://localhost:3001`)

```bash
cd server
npm run dev
```

**Tab 2 — Vite dev server** (`http://localhost:5173`)

```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The home screen calls `GET /api/ping` and should return:

```json
{ "status": "ok" }
```

If it doesn't, check that the API server is actually running on port 3001 and that no firewall/port conflict is blocking it.

## API Contract

- `GET /api/ping` — health check, returns `{ "status": "ok" }`

> This is the only documented endpoint so far. As routes are added (trips, trip_members, cities, itinerary items), document them here with method, path, request body, and response shape — this is where frontend/backend drift usually starts on a team build like this.

## Team

4-person hackathon team. (Add names/roles here.)

## License

Not yet specified. Add a license file (MIT is the common default for hackathon repos) if this is meant to be public.
