# GigFlow Task CRM Frontend

Modern React + Vite frontend for the GigFlow task management CRM.

## Stack

- React.js + Vite
- Redux Toolkit + React Redux
- React Router DOM
- Axios
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Lucide React
- Socket.io Client

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Configure API paths in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
VITE_USERS_ENDPOINT=/users
VITE_ADMIN_TASKS_ENDPOINT=/task/myTask
VITE_USER_TASKS_ENDPOINT=/task/myTask
```

The frontend uses the backend auth routes at `/api/auth/login` and `/api/auth/register`, task routes at `/api/task/myTask`, `/api/task/create`, `/api/task/:id`, and `/api/task/:id/status`, submission routes at `/api/submissions/create`, `/api/submissions`, and `/api/submissions/:id/review`, and notification routes at `/api/notifications` and `/api/notifications/read/:id`.

`VITE_USERS_ENDPOINT` should point to the backend route that returns all assignable users.

## Run

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Architecture

```text
src/
|-- app/                 Redux store
|-- routes/              Lazy routes and protected routing
|-- components/          Shared common and layout components
|-- features/            Feature-owned API, hooks, state, and UI
|-- services/            Axios instance and persistence helpers
|-- utils/               Date and task formatting helpers
|-- layouts/             Dashboard shell
|-- pages/               Route pages
```

## Redux Flow

Forms dispatch feature thunks such as `login`, `registerUser`, `fetchTasks`, `createTask`, `updateTask`, `createSubmission`, `reviewSubmission`, `fetchNotifications`, and `markNotificationsRead`.

Each thunk calls its feature API module, which uses the shared Axios instance in `src/services/api.js`. The Axios instance injects the saved token and sends cookies with `withCredentials`.

Slices store loading, success data, and error state. Toast notifications are triggered from async thunk outcomes and real-time Socket.io notification events.

## Socket Flow

The dashboard layout connects to `VITE_SERVER_URL` with the logged-in user ID. The backend emits `notification:new`; the frontend pushes it into `notificationSlice`, updates the unread badge, and shows a toast.
