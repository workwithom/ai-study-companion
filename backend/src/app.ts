import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import aiRoutes from "./routes/ai.routes.js";
import healthRoutes from "./routes/health.routes.js";



const app = express();
app.set("trust proxy", 1);
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
export default app;
