# Social Media App

A simple full‑stack social app that shows a current user profile and a list of other users fetched from RandomUser. Built using a React frontend with a Express backend.

## Architectural approach and design decisions

- Separation of concerns
  - Backend (Express, TypeScript) under `server/` handles calls to https://randomuser.me, normalizes fields to a consistent `User` shape, and does simple in‑memory caching. It exposes:
    - `GET /api/profile` — returns a single normalized user ("current user").
    - `GET /api/users?page&results` — returns a deterministic list (using `seed=takehome`) of normalized users.
  - Frontend (Vite + React, TypeScript) under `client/` renders the Profile page and a Users list.
- State ownership
  - The "current profile" is fetched once when the app loads (in `client/src/App.tsx`) and passed down as props. This keeps the current profile stable until a full page reload.
- Normalized data model
  - The backend normalizes RandomUser responses into a simple shape (`id, name, email, phone, picture, location, address`) to keep the UI clean and decoupled from upstream response details.
- Deterministic pagination
  - The backend uses `seed=takehome` for `/api/users` so pagination is repeatable and consistent across reloads.
- Testing strategy
  - Frontend tests: Vitest + React Testing Library. Tests verify Profile render states and Users list behavior (inline detail + back).
  - Backend tests: Vitest + Supertest. Tests mock the service layer to avoid real network calls and verify route behavior and response shapes.

## Trade‑offs and limitations

- Client routing: The Users list currently opens an inline detail view, not a dedicated routed page. Adding React Router for `/profile`, `/users`, `/users/:id` would enable deep links and native back-button behavior.
- Direct user detail by ID: RandomUser doesn’t provide a stable fetch-by-id endpoint. A potential `/api/user/:id` can be backed by the server’s in‑memory cache (after a list has been fetched) but won’t work cold on arbitrary IDs. This is a documented limitation if URL-based detail pages are added.
- Environment variables: The client API base URL is currently hardcoded to `http://localhost:4000/api`. This can be moved to `VITE_API_BASE_URL` and a `.env` for better portability.
- Production build scripts: The server’s production `start` script is a placeholder; the dev workflow is the primary mode here. If production builds are needed, add `rootDir/outDir` in `server/tsconfig.json` and adjust the start script accordingly.

## Local development: install, run, and test

### 1) Install dependencies


# From the repo root
npm --prefix .\social-app\client i
npm --prefix .\social-app\server i


### 2) Run the backend (Express)

# From the repo root
npm --prefix .\social-app\server run dev
# Server will listen on http://localhost:4000


### 3) Run the frontend (Vite + React)

# From the repo root (in a second terminal)
npm --prefix .\social-app\client run dev
# Vite dev server will print the local URL (typically http://localhost:5173)

The client expects the API at `http://localhost:4000/api` (currently hardcoded).

### 4) Run tests

- Frontend tests

npm --prefix .\social-app\client run test


- Backend tests

npm --prefix .\social-app\server run test

## Environment variables

This project reads env files in both the server and client. Copy the examples to `.env`:
- Server (`server/.env.example` → `server/.env`):
  - `PORT=4000` — Express server port
  - `RANDOMUSER_SEED=takehome` — deterministic RandomUser pagination
  - `RANDOMUSER_API_URL=https://randomuser.me` (optional override)
- Client (`client/.env.example` → `client/.env`):
  - `VITE_API_BASE_URL=http://localhost:4000` — base URL for the API (without /api)

The frontend reads `import.meta.env.VITE_API_BASE_URL` and builds requests to `${VITE_API_BASE_URL}/api/...`.

## Possible extensions (nice to have)

- React Router for `/profile`, `/users`, `/users/:id` with proper deep linking.
- Users pagination controls with URL sync (`?page=N`).
- `/api/user/:id` backed by server cache (document cold-start limitations).
- Prettier config at the repo root and format scripts; optional Husky pre-commit hook.

