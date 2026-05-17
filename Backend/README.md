# GigFlow Backend

Express + MongoDB API for the GigFlow Task CRM.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Validate TypeScript:

```bash
npm run build
```

## Main APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/task/myTask`
- `POST /api/task/create`
- `PUT /api/task/:id`
- `DELETE /api/task/:id`
- `PATCH /api/task/:id/status`
- `POST /api/submissions/create`
- `GET /api/submissions`
- `PATCH /api/submissions/:id/review`
- `GET /api/notifications`
- `PATCH /api/notifications/read/:id`

## Security Flow

JWT is read from the HTTP-only cookie or `Authorization: Bearer <token>`. Admin-only routes use `authorize("admin")`; user-only submission routes use `authorize("user")`.

Users can only fetch and update tasks assigned to their authenticated user ID. Admins can fetch all tasks, view assignable users, and review all submissions.

## Upload Flow

Submissions accept multipart form data with field name `file`. Multer stores validated files in `src/uploads` and serves them from `/uploads/<filename>`.

Allowed file types: `pdf`, `doc`, `docx`, `png`, `jpg`, `jpeg`, and `zip`.

## Socket Flow

`server.ts` creates a Socket.io server. Clients connect with their user ID in socket auth. When tasks are assigned, statuses change, or submissions are reviewed, the API creates a notification document and emits `notification:new` to that user room.
