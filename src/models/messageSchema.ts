import mongoose from "mongoose";
import validator from "validator";
import { MessageSchemaType } from "../types/messageTypes";

const messageSchema = new mongoose.Schema<MessageSchemaType>({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name must contain at least 3 characcters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name must contain at least 3 characcters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Email must be valid Email Address!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "phone must consist of 10 digits!"],
    maxLength: [10, "phone must consist of 10 digits!"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "message must contain at least 3 characcters!"],
  },
});

export const Message = mongoose.model<MessageSchemaType>(
  "Message",
  messageSchema
);
