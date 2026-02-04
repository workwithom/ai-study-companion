"use client";

import { useEffect, useState } from "react";
import { fetchAiQuota } from "@/lib/api";

export default function StudyPage() {
  const [mode, setMode] = useState("explain");
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quota, setQuota] = useState<{
    limit: number;
    used: number;
    remaining: number;
  } | null>(null);

  //Fetch quota on page load.
  useEffect(() => {
    fetchAiQuota()
      .then(setQuota)
      .catch(() => {});
  }, []);

  const askAI = async () => {
    if (!content.trim()) {
      setError("Please enter some content");
      return;
    }

    if (quota && quota.remaining <= 0) {
      setError("Daily AI quota exhausted");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch("http://localhost:5000/api/ai/ask", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          content,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "AI request failed");
      }

      const data = await res.json();
      setAnswer(data.answer);

      
      fetchAiQuota().then(setQuota).catch(() => {});
    } catch (err: any) {
      setError(err.message || "Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex justify-center px-4">
      <div className="w-full max-w-3xl py-16 space-y-6">

        <h1 className="text-3xl font-bold text-black dark:text-white">
          📘 Study with AI
        </h1>

        {/* Quota */}
        {quota && (
          <p className="text-sm text-zinc-500">
            🔋 AI quota: {quota.remaining} / {quota.limit} requests left today
          </p>
        )}

        {/* Mode Selector */}
        <div className="flex gap-3 items-center">
          <label className="text-sm font-medium">Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-black dark:text-white"
          >
            <option value="explain">Explain</option>
            <option value="summary">Summary</option>
            <option value="exam">Exam</option>
            <option value="revision">Revision</option>
            <option value="interview">Interview</option>
          </select>
        </div>

        {/* Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter topic or content to study..."
          rows={6}
          className="w-full border rounded p-3 dark:bg-black dark:text-white"
        />

        {/* Ask Button */}
        <button
          onClick={askAI}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* AI Answer */}
        {answer && (
          <div className="border rounded p-4 bg-white dark:bg-zinc-900">
            <h2 className="font-semibold mb-2">🤖 AI Answer</h2>
            <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
              {answer}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
