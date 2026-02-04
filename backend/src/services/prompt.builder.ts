import { PROMPT_MODES } from "../config/constants.js";

export type PromptMode = typeof PROMPT_MODES[number];

export const buildPrompt = (mode: PromptMode, content: string) => {
  switch (mode) {
    case "explain":
      return `
Explain the following topic in simple, beginner-friendly language.
Use clear headings and examples.

Topic:
${content}
`;

    case "summary":
      return `
Summarize the following content into short, clear bullet points.
Focus on key ideas only.

Content:
${content}
`;

    case "exam":
      return `
You are an exam-oriented tutor.
Explain the topic strictly for exams:
- Definition
- Key points
- Diagrams (describe if needed)
- 5-mark and 10-mark answers

Topic:
${content}
`;

    case "revision":
      return `
Create revision notes for the following topic:
- Very concise
- Bullet points
- Easy to memorize
- Avoid unnecessary explanation

Topic:
${content}
`;

    case "interview":
      return `
Prepare interview-ready notes for the following topic:
- Short explanation
- Common interview questions
- Crisp answers
- Practical examples if applicable

Topic:
${content}
`;

    default:
      return content;
  }
};
