import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { sign } from "jsonwebtoken";

import userModel from "../models/user";
import { config } from "../config/config";
import { UserSchemaType } from "../types/user";
import { encryptPassword, verifyPassword } from "../utils/password";

const registerPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role,
  } = req.body;

  // validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    const error = createHttpError(400, "Please provide all details");
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
  let newUser: UserSchemaType;
  try {
    // new user
    newUser = await userModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      gender,
      dob: new Date(dob),
      nic,
      role,
    });

    res.status(201).json({
      message: "user registered successfully please login to contiune",
    });
  } catch (error) {
    return next(createHttpError(500, "error in creating user\n " + error));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(createHttpError(400, "Please provide all details"));
  }

  let user: UserSchemaType | null;

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
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return next(createHttpError(400, "Incorrect password for this email"));
    }
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }

  try {
    // comparing role
    if (role !== user.role) {
      return next(createHttpError(400, "Incorrect Role for this user"));
    }
  } catch (error: any) {
    return next(createHttpError(500, error.message));
  }

  try {
    // token generation JWT
    const token = sign({ sub: user._id }, config.jwtSecret as string, {
      expiresIn: config.jwtExpires,
    });

    // response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "error while signing jwt token"));
  }
};

export { registerPatient, loginUser };
