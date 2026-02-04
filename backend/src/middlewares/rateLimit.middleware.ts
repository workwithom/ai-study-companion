import { Request, Response, NextFunction } from "express";
import AiUsage from "../models/AiUsage.js";


const DAILY_LIMIT = 10; // 🔧 change anytime

export const aiRateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).userId;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  let usage = await AiUsage.findOne({ userId, date: today });

  if (!usage) {
    usage = await AiUsage.create({
      userId,
      date: today,
      count: 1,
    });
    return next();
  }

  if (usage.count >= DAILY_LIMIT) {
    return res.status(429).json({
      message: "Daily AI usage limit reached",
      limit: DAILY_LIMIT,
    });
  }

  usage.count += 1;
  await usage.save();

  next();
};
