import { Request, Response, NextFunction } from "express";
import { Message } from "../models/messageSchema";
import { MessageSchemaType } from "../types/messageTypes";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return res.json({ success: false, message: "please fill full form" });
  }

  const newMessage = await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  newMessage.save();
  res.status(200).json({ success: true, message: "message send successfully" });
};
