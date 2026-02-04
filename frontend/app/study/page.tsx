"use client";

import { useEffect, useState } from "react";
import { fetchAiQuota } from "@/lib/api";
import AIAnswer from "@/components/AIAnswer";


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

  const isQuotaExhausted = quota ? quota.remaining === 0 : false;

  let quotaClass = "bg-green-100 text-green-700";

  if (quota) {
    if (quota.remaining === 0) {
      quotaClass = "bg-red-100 text-red-700";
    } else if (quota.remaining <= 3) {
      quotaClass = "bg-yellow-100 text-yellow-800";
    }
  }



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
          <div
            className={`inline-block text-sm px-3 py-1 rounded-full font-medium ${quotaClass}`}
          >
          🔋 {quota.remaining} / {quota.limit} AI requests left today
          </div>
)}

{quota && quota.remaining <= 3 && quota.remaining > 0 && (
  <p className="text-sm text-yellow-700">
    ⚠️ You’re running low on AI requests today.
  </p>
)}

{quota && quota.remaining === 0 && (
  <p className="text-sm text-red-600">
    🚫 Daily AI quota exhausted. Try again tomorrow.
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
          disabled={loading || isQuotaExhausted}
          className={`px-6 py-2 rounded text-white
          ${
          loading || isQuotaExhausted
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-zinc-800"
        }
      `}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* AI Answer */}
        {answer && (
          <div className="border rounded p-5 bg-white dark:bg-zinc-900">
            <h2 className="font-semibold mb-3 text-lg">🤖 AI Answer</h2>
            <AIAnswer text={answer} />
          </div>
        )}


      </div>
    </div>
  );
}
