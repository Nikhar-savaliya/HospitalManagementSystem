import { Request, Response, NextFunction } from "express";
import { Message } from "../models/messageSchema";
import { MessageSchemaType } from "../types/messageTypes";
import createHttpError from "http-errors";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(createHttpError(400, "please fill all details"));
  }

  try {
    const newMessage = await Message.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    newMessage.save();
    res
      .status(200)
      .json({ success: true, message: "message send successfully" });
  } catch (error: any) {
    next(createHttpError(error.statusCode || 400, error.message));
  }
};
