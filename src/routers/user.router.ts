import express from "express";

import { registerPatient, loginUser } from "../controllers/user.controller";

const userRouter = express.Router();

// routes
userRouter.post("/patient/register", registerPatient);
userRouter.post("/login", loginUser);

export default userRouter;
