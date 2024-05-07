import mongoose from "mongoose";

import { Gender, Role, UserSchemaType } from "../types/user";
import validator from "validator";

const userSchema = new mongoose.Schema<UserSchemaType>(
  {
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
    password: {
      type: String,
      required: true,
      minlength: [6, "password must contain 6 characters!"],
    },
    phone: {
      type: String,
      required: true,
      minLength: [10, "phone must consist of 10 digits!"],
      maxLength: [10, "phone must consist of 10 digits!"],
    },
    dob: {
      type: Date,
      required: [true, "DOB is required"],
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(Gender),
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(Role),
    },
    doctorDepartment: {
      type: String,
    },
    doctorAvatarImage: {
      punblic_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserSchemaType>("User", userSchema);
