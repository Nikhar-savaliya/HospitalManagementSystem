import mongoose from "mongoose";
import validator from "validator";
import {
  AppointmentSchemaType,
  Gender,
  Status,
} from "../types/appointmentTypes";

const appointmentSchema = new mongoose.Schema<AppointmentSchemaType>(
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

    phone: {
      type: String,
      required: true,
      minLength: [10, "phone must consist of 10 digits!"],
      maxLength: [10, "phone must consist of 10 digits!"],
    },
    nic: {
      type: String,
      required: true,
      minLength: [13, "NIC must consist of 13 digits!"],
      maxLength: [13, "NIC must consist of 13 digits!"],
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
    appointment_date: {
      type: String,
      required: true,
    },
    department: { type: String, required: true },
    doctor: {
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
    },
    hasVisited: {
      type: Boolean,
      default: false,
    },
    doctorId: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    patientId: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model("appointments", appointmentSchema);

export default AppointmentModel;
