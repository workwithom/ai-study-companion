import { Request, Response } from "express";
import { buildPrompt, askLLM } from "../services/ai.service.js";

export const askAI = async (req: Request, res: Response) => {
  const { mode, content } = req.body;

  if (!mode || !content) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const prompt = buildPrompt(mode, content);
    const answer = await askLLM(prompt);

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI request failed" });
  }
};
