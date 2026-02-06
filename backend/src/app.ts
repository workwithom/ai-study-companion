import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import aiRoutes from "./routes/ai.routes.js";
import healthRoutes from "./routes/health.routes.js";



const app = express();
app.use(cookieParser());
app.use(
  cors({
  origin: "https://ai-study-amber.vercel.app",
  credentials: true,
})

);

app.use(express.json());
app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);

app.get("/health", healthRoutes);

export default app;
