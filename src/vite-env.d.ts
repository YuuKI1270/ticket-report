/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_API_VERSION: string;
  readonly VITE_SECRET_KEY: string;
  readonly VITE_PORT: string;
  readonly VITE_API_BASE_PATH: string;
  readonly VITE_APP_PERSIST_AUTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
