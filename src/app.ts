import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import globalErrorHandler from "./middlewares/globalErrorHandler";
import { config } from "./config/config";
import userRouter from "./routers/user.router";
import messageRouter from "./routers/message.router";

const app = express();

app.use(
  cors({
    origin: [config.frontend_url, config.dashboard_url],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.json({ message: "hello world" });
});

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
