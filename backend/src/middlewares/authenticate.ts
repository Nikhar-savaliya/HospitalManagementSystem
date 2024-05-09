import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { decodePassword } from "../utils/password";
import userModel from "../models/user";
import { JwtPayload } from "jsonwebtoken";
import { UserSchemaType } from "../types/user";

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserSchemaType;
    }
  }
}

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(createHttpError(400, "Admin not authenticated!"));
  }

  const decoded = decodePassword(token);
  const isFound = await userModel.findById(decoded.id);
  isFound
    ? (req.user = isFound)
    : next(createHttpError(404, "user not found!"));
  if (req.user.role !== "admin") {
    return createHttpError(
      403,
      `${req.user.role} not authenticated for this resources!`
    );
  }
  next();
};

export const authenticatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(createHttpError(400, "patient not authenticated!"));
  }

  const decoded = decodePassword(token);
  const isFound = await userModel.findById(decoded.id);
  isFound
    ? (req.user = isFound)
    : next(createHttpError(404, "user not found!"));
  if (req.user.role !== "patient") {
    return next(
      createHttpError(
        403,
        `${req.user.role} not authenticated for this resources!`
      )
    );
  }
  next();
};
