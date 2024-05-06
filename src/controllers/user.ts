import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { sign } from "jsonwebtoken";

import userModel from "../models/user";
import { config } from "../config/config";
import { User } from "../types/user";
import { encryptPassword, verifyPassword } from "../utils/password";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // database call
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(
        400,
        "user already exists with this email."
      );
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "error while getting user"));
  }

  const hashedPassword = await encryptPassword(password);
  let newUser: User;
  try {
    // new user
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user registered successfully please login to contiune",
    });
  } catch (error) {
    return next(createHttpError(500, "error in creating user\n " + error));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "all fields are required"));
  }
  let user: User | null;
  try {
    // finding user
    user = await userModel.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
  } catch (error) {
    return next(createHttpError(500, "error finding user from database"));
  }

  try {
    // comparing password
    const isMatch = verifyPassword(password, user.password);
    if (!isMatch) {
      return next(createHttpError(400, "email or password incorrect"));
    }
  } catch (error) {
    return next(createHttpError(500, "failed to compare password" + error));
  }
  try {
    // token generation JWT
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });

    // response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "error while signing jwt token"));
  }
};

export { createUser, loginUser };
