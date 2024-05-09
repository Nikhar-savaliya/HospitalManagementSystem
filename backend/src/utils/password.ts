import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import { config } from "../config/config";

const saltRounds = 10;

const encryptPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "password encryption failed"
    );
  }
};

const verifyPassword = async (userPassword: string, hashedPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("password comparison failed with error:", error);
    throw new Error(
      error instanceof Error ? error.message : "password comparison failed"
    );
  }
};

const decodePassword = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error("Token decoding failed with error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Token decoding failed"
    );
  }
};

export { encryptPassword, verifyPassword, decodePassword };
