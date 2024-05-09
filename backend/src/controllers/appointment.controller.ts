import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "../models/user";
import AppointmentModel from "../models/appointment.schema";

const bookAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      hasVisited,
      address,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !address
    ) {
      return next(
        createHttpError(
          400,
          "please fill all the details to book an appointment."
        )
      );
    }

    // check doctor conflict
    const isConflict = await userModel.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "doctor",
      doctorDepartment: department,
    });
    if (isConflict.length === 0) {
      return next(createHttpError(404, "No doctor found with this details!"));
    }
    if (isConflict.length > 1) {
      return next(
        createHttpError(
          400,
          "more then 1 doctor found with this details! please contact via phone or email"
        )
      );
    }

    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await AppointmentModel.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });
    appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

const getAllAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allAppointment = await AppointmentModel.find();
    res.status(200).json({
      success: true,
      allAppointment,
    });
  } catch (error) {}
};

const updateAppointmentStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return next(createHttpError(404, "appointment not found with this id"));
    }
    appointment = await AppointmentModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "server error"));
  }
};

const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    let appointment = await AppointmentModel.findById(id);
    if (!appointment) {
      return next(createHttpError(404, "appointment not found with this id"));
    }
    await appointment.deleteOne();

    res.status(200).json({
      sucess: true,
      message: "Appointment Deleted Successfully!",
    });
  } catch (error) {
    return next(createHttpError(500, "server error"));
  }
};

export {
  bookAppointment,
  getAllAppointment,
  updateAppointmentStatus,
  deleteAppointment,
};
