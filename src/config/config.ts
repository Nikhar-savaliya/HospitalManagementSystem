import { config as envConfig } from "dotenv";

envConfig();

const _config = {
  env: process.env.NODE_ENV as string,
  port: process.env.PORT as string,
  mongodbURL: process.env.MONGO_CONNECTION_STRING as string,
  frontend_url: process.env.FRONTEND_URL as string,
  dashboard_url: process.env.DASHBOARD_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpires: process.env.JWT_EXPIRES as string,
  cookieExpires: process.env.COOKIE_EXPIRES as string,
  coludinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  coludinaryApiSecret: process.env.CLOUDINARY_API_SECRET as string,
  coludinaryApiKey: process.env.CLOUDINARY_API_KEY as string,
};

export const config = Object.freeze(_config);
