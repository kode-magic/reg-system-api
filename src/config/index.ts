import { config } from "dotenv";

const { parsed } = config();

export const {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  SECRET,
  MESSAGE_URL,
  MESSAGE_AUTH,
  GCLOUD_STORAGE_BUCKET,
  GOOGLE_APPLICATION_CREDENTIALS,
  DATABASE_URL
} = parsed;