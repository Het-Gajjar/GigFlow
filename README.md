# GigFlow - Internship Task Management System

GigFlow is a full-stack TypeScript MERN task management system designed for internship and team workflow management. It provides role-based dashboards for admins and users, task assignment, task submissions, file uploads, submission reviews, and real-time notifications.

## Features

### Authentication

- User registration and login
- JWT-based authentication
- HTTP-only cookie support
- Role-based access control
- Admin and user dashboard redirects

### Admin

- View all tasks
- Create tasks and assign them to users
- Update task title, description, status, priority, due date, and assigned user
- Delete tasks with confirmation
- View all users in assignment dropdown
- View and review task submissions
- Approve or reject submissions with feedback
- Receive real-time notifications

### User

- View only assigned tasks
- Update assigned task status
- Submit work with description, comments, file upload, or file URL
- Receive real-time task and submission notifications

### Notifications

- Socket.io real-time notifications
- Notification dropdown
- Unread badge count
- Mark notifications as read

### File Uploads

- Multer-based upload system
- Unique filenames
- File validation
- Supports `pdf`, `doc`, `docx`, `png`, `jpg`, `jpeg`, and `zip`

## Tech Stack

### Frontend

- React.js
- TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Lucide React
- Framer Motion
- Socket.io Client

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Multer
- Socket.io
- Bcrypt
- Cookie Parser
- CORS

## Project Structure

```text
GigFlow/
|-- Backend/
|   |-- src/
|   |   |-- config/
|   |   |-- feature/
|   |   |   |-- Auth/
|   |   |   |-- Notification/
|   |   |   |-- Submission/
|   |   |   |-- Task/
|   |   |   |-- user/
|   |   |-- middleware/
|   |   |-- model/
|   |   |-- socket/
|   |   |-- utils/
|   |   |-- app.ts
|   |-- server.ts
|   |-- package.json
|
|-- frontend/
|   |-- src/
|   |   |-- app/
|   |   |-- components/
|   |   |-- features/
|   |   |   |-- auth/
|   |   |   |-- notification/
|   |   |   |-- submission/
|   |   |   |-- task/
|   |   |   |-- user/
|   |   |-- layouts/
|   |   |-- pages/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- types/
|   |   |-- utils/
|   |-- tsconfig.json
|   |-- vite.config.ts
|   |-- package.json
```

## TypeScript Architecture

- Frontend source uses `.ts` and `.tsx` files only.
- Backend source uses `.ts` files.
- Frontend shared interfaces live in `frontend/src/types`.
- Redux store types are exported from `frontend/src/app/store.ts`.
- Typed Redux hooks live in `frontend/src/app/hooks.ts`.
- Frontend build runs `tsc -b` before Vite production build.
- Backend build compiles TypeScript into `Backend/dist`.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB local instance or MongoDB Atlas URI

## Backend Setup

```bash
cd Backend
npm install
cp .env.example .env
```

Update `Backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/gigflow
JWT_SECRET=replace-with-a-strong-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

Build backend:

```bash
npm run build
```

Start compiled backend:

```bash
npm run start
```

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Update `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SERVER_URL=http://localhost:5000
VITE_USERS_ENDPOINT=/users
VITE_ADMIN_TASKS_ENDPOINT=/task/myTask
VITE_USER_TASKS_ENDPOINT=/task/myTask
```

Run frontend:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

Lint frontend:

```bash
npm run lint
```

## API Endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/users` | Get all assignable users, admin only |

### Tasks

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/task/myTask` | Admin gets all tasks, user gets assigned tasks |
| POST | `/api/task/create` | Create task, admin only |
| PUT | `/api/task/:id` | Update task, admin only |
| DELETE | `/api/task/:id` | Delete task, admin only |
| PATCH | `/api/task/:id/status` | Update task status |

### Submissions

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/submissions/create` | Submit task work, user only |
| GET | `/api/submissions` | View all submissions, admin only |
| PATCH | `/api/submissions/:id/review` | Approve or reject submission, admin only |

### Notifications

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/notifications` | Get logged-in user's notifications |
| PATCH | `/api/notifications/read/:id` | Mark notification as read |

## Redux Flow

- Auth state is managed in `authSlice`
- Tasks are managed in `taskSlice`
- Users are managed in `userSlice`
- Submissions are managed in `submissionSlice`
- Notifications are managed in `notificationSlice`
- API requests are handled with `createAsyncThunk`
- Axios instance automatically attaches the auth token and sends credentials

## Socket.io Flow

1. User logs in.
2. Frontend connects to Socket.io using the logged-in user ID.
3. Backend maps the user ID to a socket room.
4. When a task is assigned, updated, deleted, or a submission is reviewed, backend creates a notification.
5. Backend emits `notification:new`.
6. Frontend updates notification state and shows a toast.

## Upload Flow

1. User opens an assigned task.
2. User submits work with description and either file upload or file URL.
3. Multer validates and stores uploaded files.
4. File path is saved in the submission document.
5. Admin can preview or download the submitted file.

## Security

- Passwords are hashed with bcrypt
- JWT authentication is used for protected routes
- Role-based middleware protects admin and user actions
- Users can only view and submit their assigned tasks
- Admin-only routes are protected
- MongoDB ObjectIds are not shown in frontend task/user cards

## Scripts

### Backend

```bash
npm run dev
npm run build
npm run start
```

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Deployment Notes

### Render Backend

- Root directory: `Backend`
- Build command: `npm install && npm run build`
- Start command: `npm run start`
- Add environment variables:
  - `PORT`
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLIENT_URL`
  - `NODE_ENV=production`

### Vercel Frontend

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add environment variables:
  - `VITE_API_BASE_URL=https://your-backend-url/api`
  - `VITE_SERVER_URL=https://your-backend-url`
  - `VITE_USERS_ENDPOINT=/users`
  - `VITE_ADMIN_TASKS_ENDPOINT=/task/myTask`
  - `VITE_USER_TASKS_ENDPOINT=/task/myTask`

Make sure MongoDB Atlas network access and database credentials are configured before deploying.

## Author

Built by Het Gajjar.
