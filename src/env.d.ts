/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_SERVER: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
