import express from "express";
import {
  bookAppointment,
  deleteAppointment,
  getAllAppointment,
  updateAppointmentStatus,
} from "../controllers/appointment.controller";
import {
  authenticateAdmin,
  authenticatePatient,
} from "../middlewares/authenticate";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", authenticatePatient, bookAppointment);
appointmentRouter.get("/getAll", authenticateAdmin, getAllAppointment);
appointmentRouter.get(
  "/update/:id",
  authenticateAdmin,
  updateAppointmentStatus
);
appointmentRouter.delete("/update/:id", authenticateAdmin, deleteAppointment);

export default appointmentRouter;
