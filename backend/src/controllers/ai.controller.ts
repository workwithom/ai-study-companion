import { Request, Response } from "express";
import { buildPrompt, askLLM } from "../services/ai.service.js";
import StudySession from "../models/StudySession.js";

export const askAI = async (req: Request, res: Response) => {
  const { mode, content } = req.body;
  const userId = (req as any).userId;

  if (!mode || !content) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const prompt = buildPrompt(mode, content);
    const answer = await askLLM(prompt);

    // ✅ Save to DB
    const session = await StudySession.create({
      userId,
      mode,
      content,
      answer,
    });

    res.json({
      answer,
      sessionId: session._id,
    });
  } catch (err: any) {
    console.error("AI ERROR:", err?.message || err);
    res.status(500).json({ message: "AI request failed" });
  }
};

export const getMySessions = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const sessions = await StudySession.find({ userId })
    .sort({ createdAt: -1 })
    .select("-content"); // optional: hide long input

  res.json(sessions);
};

export const getSessionById = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const session = await StudySession.findOne({
    _id: id,
    userId,
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  res.json(session);
};

export const deleteSession = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { id } = req.params;

  const session = await StudySession.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  res.json({ message: "Session deleted successfully" });
};
