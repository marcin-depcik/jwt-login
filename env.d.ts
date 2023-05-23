declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    PORT: string
    DB_URI: string
    SECRET: string
  }
}