"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function StudyPage() {
  const [content, setContent] = useState("");
  const [mode, setMode] = useState("summary");
  const [result, setResult] = useState("");

  const handleAsk = async () => {
    const res = await api("/api/ai/ask", {
      method: "POST",
      body: JSON.stringify({ mode, content }),
    });
    setResult(res.answer);
  };

  return (
    <div>
      <h1>AI Study Companion</h1>

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="summary">Summary</option>
        <option value="explain">Explain</option>
        <option value="questions">Questions</option>
      </select>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Paste your study material..."
      />

      <button onClick={handleAsk}>Ask AI</button>

      <pre>{result}</pre>
    </div>
  );
}
