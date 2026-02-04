import { Router } from "express";
import { askAI, getMySessions, getSessionById } from "../controllers/ai.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { deleteSession } from "../controllers/ai.controller.js";
import { aiRateLimit } from "../middlewares/rateLimit.middleware.js";
import { getAiQuota } from "../controllers/ai.controller.js";


const router = Router();

router.post("/ask", protect, aiRateLimit, askAI);
router.get("/sessions", protect, getMySessions);
router.get("/sessions/:id", protect, getSessionById);

router.get("/quota", protect, getAiQuota);
router.delete("/sessions/:id", protect, deleteSession);
export default router;
