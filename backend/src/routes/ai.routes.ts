import { Router } from "express";
import { askAI, getMySessions, getSessionById } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { deleteSession } from "../controllers/ai.controller.js";

const router = Router();

router.post("/ask", protect, askAI);
router.get("/sessions", protect, getMySessions);
router.get("/sessions/:id", protect, getSessionById);
router.delete("/sessions/:id", protect, deleteSession);
export default router;
