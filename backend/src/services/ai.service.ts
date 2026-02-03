import { llm } from "../config/llm.js";
import { GROQ_MODEL } from "../config/models.js"; 

export const askLLM = async (prompt: string) => {
  const response = await llm.chat.completions.create({
    model: GROQ_MODEL, // ✅ WORKING GROQ MODEL
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};


export const buildPrompt = (
  mode: "summary" | "explain" | "questions",
  content: string
) => {
  switch (mode) {
    case "summary":
      return `Summarize the following content in clear bullet points:\n\n${content}`;

    case "explain":
      return `Explain the following content in simple terms as if teaching a beginner:\n\n${content}`;

    case "questions":
      return `Generate 5 important exam-style questions from the following content:\n\n${content}`;

    default:
      return content;
  }
}; 
