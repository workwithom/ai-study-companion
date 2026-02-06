import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app = express();

/* 1️⃣ Trust proxy (Render / HTTPS cookies) */
app.set("trust proxy", 1);

/* 2️⃣ CORS — ONLY ONCE */
const allowedOrigins = [
  "http://localhost:3000",
  "https://ai-study-amber.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* 3️⃣ Parsers */
app.use(express.json());
app.use(cookieParser());

/* 4️⃣ Routes */
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/health", healthRoutes);

export default app;
