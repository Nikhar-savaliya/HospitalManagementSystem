import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.controller";
import { authenticateAdmin } from "../middlewares/authenticate";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getAllMessages", authenticateAdmin, getAllMessages);

export default router;
