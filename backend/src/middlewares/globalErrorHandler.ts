import { HttpError } from "http-errors";
import { config } from "../config/config";
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    message = `Duplicate key Entered`;
  }

  if (err.name === "JsonWebTokenError") {
    message = "json web token is invalid, try again!";
  }

  if (err.name === "TokenExpiredError") {
    message = "json web token is expired, try again!";
  }

  return res.status(statusCode).json({
    status: false,
    message: message,
    errorStack: config.env === "development" ? err.stack : "",
  });
};

export default globalErrorHandler;
