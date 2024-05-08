import express from "express";
import bookAppointment from "../controllers/appointment.controller";
import { authenticatePatient } from "../middlewares/authenticate";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", authenticatePatient, bookAppointment);

export default appointmentRouter;
