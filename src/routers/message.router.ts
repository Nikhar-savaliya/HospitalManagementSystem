import express from "express";
import { sendMessage } from "../controllers/message.controller";

const router = express.Router();

router.post("/send", sendMessage);

export default router;
