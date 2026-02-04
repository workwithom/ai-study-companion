import { llm } from "../config/llm.js";
import { buildPrompt, PromptMode } from "./prompt.builder.js";

export const askLLM = async (
  mode: PromptMode,
  content: string
) => {
  const prompt = buildPrompt(mode, content);

  const response = await llm.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });

  return response.choices[0].message.content;
};
