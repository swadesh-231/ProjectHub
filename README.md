# Project Camp

A full-stack **MERN** project-management application. It lets teams organize
projects, manage tasks with subtasks and file attachments, keep project notes,
and handle members with role-based access control — all behind JWT
authentication.

The repository is a monorepo with two packages:

- **[`Backend/`](#backend)** — REST API (Node.js, Express 5, MongoDB/Mongoose 9)
- **[`Frontend/`](#frontend)** — premium SaaS-grade web client (React 19, Vite,
  Tailwind CSS v4)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Quick start](#quick-start)
- [Backend](#backend)
  - [Environment variables](#environment-variables)
  - [API reference](#api-reference)
  - [Roles & permissions](#roles--permissions)
  - [Response format](#response-format)
  - [Data models](#data-models)
- [Frontend](#frontend)
  - [Configuration](#configuration)
  - [Architecture](#architecture)
- [Scripts](#scripts)

---

## Features

- **Authentication** — register, login, logout, JWT access/refresh tokens, email
  verification, forgot/reset password, change password.
- **Projects** — full CRUD; the creator automatically becomes an `admin` member.
- **Team members** — invite by email, list, change roles, remove.
- **Tasks** — CRUD with assignees, three-state status (`todo`, `in_progress`,
  `done`) and multiple file attachments.
- **Subtasks** — add/update/delete; members can toggle completion.
- **Notes** — project-level notes (admin-managed).
- **Role-based access control** — `admin`, `project_admin`, `member`, enforced
  per project.
- **Dashboard** — stat cards, charts (task distribution, project completion) and
  a recent-activity feed.
- **Kanban board** — drag-and-drop across columns with optimistic updates, plus a
  slide-over task drawer (subtasks, attachments, timeline).
- **Polish** — light/dark theme, skeleton/empty/error states, toasts and subtle
  animations.

---

## Tech stack

**Backend**

| Area         | Library                          |
| ------------ | -------------------------------- |
| Runtime      | Node.js (ES modules)             |
| Framework    | Express `^5`                     |
| Database     | MongoDB + Mongoose `^9`          |
| Auth         | jsonwebtoken, bcrypt             |
| Validation   | express-validator                |
| File uploads | multer                           |
| Email        | nodemailer + mailgen             |

**Frontend**

| Area               | Library                                   |
| ------------------ | ----------------------------------------- |
| Framework          | React `^19` + Vite                        |
| Styling            | Tailwind CSS `^4` (class-based dark mode) |
| Routing            | react-router `^7`                         |
| Server state       | TanStack Query `^5`                       |
| Client state       | Zustand `^5`                              |
| Forms & validation | React Hook Form + Zod                     |
| HTTP               | Axios (interceptors + token refresh)      |
| Animation / charts | Framer Motion, Recharts                   |
| Uploads / icons    | react-dropzone, lucide-react              |

---

## Repository structure

```
ProjectHub/
├── Backend/
│   ├── public/images/        # uploaded task attachments
│   ├── src/
│   │   ├── controller/       # auth, project, task, note, healthcheck handlers
│   │   ├── db/               # mongoose connection
│   │   ├── error/            # ApiError + ApiResponse classes
│   │   ├── middlewares/      # JWT/permission, validator, multer, error handler
│   │   ├── models/           # User, Project, ProjectMember, Task, SubTask, ProjectNote
│   │   ├── routes/           # express routers mounted under /api/v1
│   │   ├── utils/            # asyncHandler, mail helper
│   │   ├── validators/       # express-validator chains
│   │   ├── constants.js      # DB name + role/status enums
│   │   ├── app.js            # express app: middleware, routes, error handler
│   │   └── index.js          # entrypoint: load env → connect DB → listen
│   └── .env.example
└── Frontend/
    └── src/
        ├── api/              # axios client + resource modules
        ├── components/       # common, layout, dashboard, projects, tasks, notes, team
        ├── constants/        # nav items, enums, query keys, motion variants
        ├── hooks/            # TanStack Query hooks + useAuth, useProjectRole, utilities
        ├── pages/            # route pages (auth/, dashboard, projects, tasks, …)
        ├── routes/           # ProtectedRoute / PublicRoute guards
        ├── services/         # queryClient, token service
        ├── store/            # Zustand stores (auth, theme, ui)
        ├── utils/            # cn(), formatters, zod schemas
        ├── App.jsx           # route tree (lazy-loaded)
        ├── main.jsx          # providers + theme init
        └── index.css         # Tailwind v4 theme tokens (light/dark) + base styles
```

---

## Quick start

**Prerequisites:** Node.js 18+ and a MongoDB connection string (e.g. MongoDB Atlas).

**1. Backend**

```bash
cd Backend
npm install
cp .env.example .env          # then edit with your Mongo URI, JWT secrets, SMTP creds
npm run dev                   # http://localhost:8080
```

Verify: `curl http://localhost:8080/api/v1/healthcheck`

**2. Frontend** (in a second terminal)

```bash
cd Frontend
npm install
npm run dev                   # http://localhost:5173
```

The frontend defaults to the API at `http://localhost:8080/api/v1`, so no extra
config is needed for local development.

---

## Backend

### Environment variables

| Variable                       | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| `PORT`                         | Port to listen on (default `3000`)                    |
| `CORS_ORIGIN`                  | Allowed origin(s); `*` reflects any origin            |
| `MONGO_URI`                    | MongoDB connection string (DB name is appended)       |
| `ACCESS_TOKEN_SECRET`          | Secret for signing access tokens                      |
| `ACCESS_TOKEN_EXPIRY`          | Access token lifetime (e.g. `1d`)                     |
| `REFRESH_TOKEN_SECRET`         | Secret for signing refresh tokens                     |
| `REFRESH_TOKEN_EXPIRY`         | Refresh token lifetime (e.g. `10d`)                   |
| `MAILTRAP_SMTP_HOST/PORT`      | SMTP host and port                                    |
| `MAILTRAP_SMTP_USER/PASS`      | SMTP credentials (leave empty to disable email in dev)|
| `MAIL_FROM`                    | "From" address for outgoing email                     |
| `FORGOT_PASSWORD_REDIRECT_URL` | Frontend base URL used in reset-password email links  |

> `.env` is gitignored — never commit real secrets; share config via `.env.example`.
> Email failures are caught and logged, so auth flows still work without SMTP creds.

### API reference

Base URL: `http://localhost:8080/api/v1`. Secured routes require an
`Authorization: Bearer <accessToken>` header.

**Auth — `/auth`**

| Method | Endpoint                           | Access  | Description                  |
| ------ | ---------------------------------- | ------- | ---------------------------- |
| POST   | `/register`                        | Public  | Create an account            |
| POST   | `/login`                           | Public  | Authenticate, returns tokens |
| POST   | `/refresh-token`                   | Public  | Rotate access/refresh tokens |
| GET    | `/verify-email/:verificationToken` | Public  | Verify email address         |
| POST   | `/forgot-password`                 | Public  | Request a reset link         |
| POST   | `/reset-password/:resetToken`      | Public  | Set a new password           |
| POST   | `/logout`                          | Secured | Invalidate refresh token     |
| GET    | `/current-user`                    | Secured | Get the logged-in user       |
| POST   | `/change-password`                 | Secured | Change current password      |
| POST   | `/resend-email-verification`       | Secured | Resend the verification email|

**Projects — `/projects`**

| Method | Endpoint                      | Access  | Description            |
| ------ | ----------------------------- | ------- | ---------------------- |
| GET    | `/`                           | Secured | List user's projects   |
| POST   | `/`                           | Secured | Create a project       |
| GET    | `/:projectId`                 | Member  | Project details        |
| PUT    | `/:projectId`                 | Admin   | Update a project       |
| DELETE | `/:projectId`                 | Admin   | Delete a project       |
| GET    | `/:projectId/members`         | Member  | List members           |
| POST   | `/:projectId/members`         | Admin   | Add a member           |
| PUT    | `/:projectId/members/:userId` | Admin   | Update a member's role |
| DELETE | `/:projectId/members/:userId` | Admin   | Remove a member        |

**Tasks — `/tasks`**

| Method | Endpoint                         | Access                | Description      |
| ------ | -------------------------------- | --------------------- | ---------------- |
| GET    | `/:projectId`                    | Member                | List tasks       |
| POST   | `/:projectId`                    | Admin / Project Admin | Create a task    |
| GET    | `/:projectId/t/:taskId`          | Member                | Task + subtasks  |
| PUT    | `/:projectId/t/:taskId`          | Admin / Project Admin | Update a task    |
| DELETE | `/:projectId/t/:taskId`          | Admin / Project Admin | Delete a task    |
| POST   | `/:projectId/t/:taskId/subtasks` | Admin / Project Admin | Create a subtask |
| PUT    | `/:projectId/st/:subTaskId`      | Member                | Update a subtask |
| DELETE | `/:projectId/st/:subTaskId`      | Admin / Project Admin | Delete a subtask |

> Task create/update accept `multipart/form-data` with an `attachments` field
> (up to 10 files, 5 MB each).

**Notes — `/notes`**

| Method | Endpoint                | Access | Description   |
| ------ | ----------------------- | ------ | ------------- |
| GET    | `/:projectId`           | Member | List notes    |
| POST   | `/:projectId`           | Admin  | Create a note |
| GET    | `/:projectId/n/:noteId` | Member | Note details  |
| PUT    | `/:projectId/n/:noteId` | Admin  | Update a note |
| DELETE | `/:projectId/n/:noteId` | Admin  | Delete a note |

**Health — `/healthcheck`** · `GET /` → service status (public).

### Roles & permissions

| Action                            | Admin | Project Admin | Member |
| --------------------------------- | :---: | :-----------: | :----: |
| Create / update / delete project  |   ✓   |       ✗       |   ✗    |
| Manage project members            |   ✓   |       ✗       |   ✗    |
| Create / update / delete tasks    |   ✓   |       ✓       |   ✗    |
| View tasks                        |   ✓   |       ✓       |   ✓    |
| Toggle subtask completion         |   ✓   |       ✓       |   ✓    |
| Create / delete subtasks          |   ✓   |       ✓       |   ✗    |
| Create / update / delete notes    |   ✓   |       ✗       |   ✗    |
| View notes                        |   ✓   |       ✓       |   ✓    |

### Response format

All responses share a consistent envelope.

```jsonc
// success
{ "statusCode": 200, "data": { }, "message": "Success", "success": true }

// error
{ "statusCode": 422, "success": false, "message": "Received data is not valid",
  "errors": [{ "email": "Email is invalid" }] }
```

### Data models

- **User** — `username`, `email`, `password` (hashed), `fullName`, `avatar`,
  `isEmailVerified`, token fields.
- **Project** — `name`, `description`, `createdBy`.
- **ProjectMember** — links `user` + `project` with a `role` (unique per pair).
- **Task** — `title`, `description`, `project`, `assignedTo`, `assignedBy`,
  `status`, `attachments[]`.
- **SubTask** — `title`, `task`, `isCompleted`, `createdBy`.
- **ProjectNote** — `project`, `createdBy`, `content`.

---

## Frontend

### Configuration

The app works with **no configuration** locally — it defaults to
`http://localhost:8080/api/v1`. Create `Frontend/.env` only if your API lives
elsewhere:

```env
VITE_API_URL=https://your-api.com/api/v1
```

> Vite only exposes `VITE_`-prefixed variables to the browser and reads `.env` at
> startup (restart after changes). Never put secrets in a frontend env file.

### Architecture

- **API layer (`src/api`)** — one Axios instance attaches the access token,
  transparently refreshes it on `401` (queuing concurrent requests), and logs out
  if refresh fails. Resource modules are consumed through TanStack Query hooks in
  `src/hooks` for caching, invalidation and mutations.
- **State** — Zustand owns auth/session, theme and UI state (sidebar, active
  project); server data is owned by TanStack Query.
- **Auth flow** — access & refresh tokens live in `localStorage`. On boot the app
  validates the token via `/auth/current-user`; `ProtectedRoute` / `PublicRoute`
  guard navigation.
- **Theming** — semantic CSS-variable design tokens in `index.css`; dark mode
  toggles a `.dark` class on `<html>` and is persisted to `localStorage`.
- **Project-scoped pages** — Tasks, Notes and Team operate on a selected project;
  `ProjectScopedView` resolves the active project and renders the section.
- **Connecting to the backend** — the client calls the API directly (no dev
  proxy), so the backend's `CORS_ORIGIN` must allow the frontend origin (`*` or
  `http://localhost:5173`).

---

## Scripts

**Backend** (`cd Backend`)

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start with nodemon (auto-reload) |
| `node src/index.js` | Start without a watcher          |

**Frontend** (`cd Frontend`)

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start the dev server with HMR      |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint                         |
