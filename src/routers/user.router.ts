import express from "express";

import {
  registerPatient,
  loginUser,
  RegisterAdmin,
  fetchAllDoctors,
  getLoggedInUserDetail,
} from "../controllers/user.controller";
import {
  authenticateAdmin,
  authenticatePatient,
} from "../middlewares/authenticate";

const userRouter = express.Router();

// routes
userRouter.post("/patient/register", registerPatient);
userRouter.post("/admin/register", authenticateAdmin, RegisterAdmin);
userRouter.post("/login", loginUser);
userRouter.get("/doctors", fetchAllDoctors);
userRouter.get("/admin/profile", authenticateAdmin, getLoggedInUserDetail);
userRouter.get("/patient/profile", authenticatePatient, getLoggedInUserDetail);

export default userRouter;
