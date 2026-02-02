import { Request, Response } from "express";
import { registerSchema } from "../validators/auth.schema.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import { loginSchema } from "../validators/auth.schema.js";

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten(),
    });
  }

  const { name, email, password } = parsed.data;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = signToken(user._id.toString());

res.cookie("token", token, {
  httpOnly: true,
  sameSite: "strict",
  secure: false, // set true in production (HTTPS)
});

res.status(201).json({
  id: user._id,
  name: user.name,
  email: user.email,
});
};


export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten(),
    });
  }

  const { email, password } = parsed.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id.toString());

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // true in production
  });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};


export const logout = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false, // true in production
  });

  res.json({ message: "Logged out successfully" });
};


export const me = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
