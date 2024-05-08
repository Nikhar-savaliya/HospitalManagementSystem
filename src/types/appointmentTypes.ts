import mongoose from "mongoose";

export interface AppointmentSchemaType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nic: string;
  dob: Date;
  gender: string;
  appointment_date: string;
  department: string;
  doctor: {
    firstName: string;
    lastName: string;
  };
  hasVisited: boolean;
  doctorId: mongoose.Schema.Types.ObjectId;
  patientId: mongoose.Schema.Types.ObjectId;
  address: string;
  status: Status | "pending";
}

export enum Gender {
  Male = "male",
  Female = "female",
}
export enum Status {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum Role {
  Admin = "admin",
  Patient = "patient",
  Doctor = "doctor",
}
