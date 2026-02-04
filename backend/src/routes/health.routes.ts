import { Router } from "express";

const router = Router();

router.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "ai-study-companion-backend",
    version: "1.0.0",
  });
});

export default router;
