import cloudinary from "cloudinary";
import { config } from "./config";

cloudinary.v2.config({
  cloud_name: config.coludinaryCloudName,
  api_key: config.coludinaryApiKey,
  api_secret: config.coludinaryApiSecret,
});

export default cloudinary;
