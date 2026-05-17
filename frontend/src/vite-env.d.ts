/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_SERVER_URL?: string
  readonly VITE_USERS_ENDPOINT?: string
  readonly VITE_ADMIN_TASKS_ENDPOINT?: string
  readonly VITE_USER_TASKS_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
