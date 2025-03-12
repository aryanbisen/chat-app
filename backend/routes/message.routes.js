import express from "express"
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../security/protectRoute.js";
 
const router = express.Router();

// The req and res get automatically send from the middle ware to the next route by express js
router.post("/chat/:userId", protectRoute, sendMessage)
router.get("/chat/:userId", protectRoute, getMessage);

export default router; 