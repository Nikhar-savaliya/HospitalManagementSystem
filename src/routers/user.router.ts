import express from "express";

import {
  registerPatient,
  loginUser,
  RegisterAdmin,
} from "../controllers/user.controller";

const userRouter = express.Router();

// routes
userRouter.post("/patient/register", registerPatient);
userRouter.post("/admin/register", RegisterAdmin);
userRouter.post("/login", loginUser);

export default userRouter;
