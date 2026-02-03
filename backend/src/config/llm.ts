import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

export const llm = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});
