"use client";

import { useEffect, useState } from "react";
import { fetchAiQuota } from "@/lib/api";
import AIAnswer from "@/components/AIAnswer";
import Link from "next/link";

const MODES = [
  { value: "explain", label: "Explain", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", description: "Get detailed explanations" },
  { value: "summary", label: "Summary", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", description: "Condense into key points" },
  { value: "exam", label: "Exam", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", description: "Generate practice questions" },
  { value: "revision", label: "Revision", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", description: "Quick review material" },
  { value: "interview", label: "Interview", icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z", description: "Prepare for interviews" },
];

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
  const quotaPercentage = quota ? ((quota.limit - quota.remaining) / quota.limit) * 100 : 0;

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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to get AI response";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-white/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-10 animate-fade-in-up">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center transition-all duration-300 group-hover:glow-white group-hover:scale-110">
              <div className="w-3 h-3 bg-white rounded-full animate-glow-pulse" />
            </div>
            <span className="text-lg font-semibold">StudyAI</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Dashboard
            </Link>
            <Link href="/sessions" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              History
            </Link>
          </nav>
        </header>

        {/* Title Section */}
        <div className="mb-10 animate-fade-in-up delay-100">
          <h1 className="text-4xl font-bold mb-3 text-glow">Study with AI</h1>
          <p className="text-gray-400">Select a mode and enter your topic to get AI-powered assistance</p>
        </div>

        {/* Quota Card */}
        {quota && (
          <div className="glass rounded-2xl p-5 shadow-depth-md mb-8 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  quota.remaining === 0 
                    ? "bg-red-500/20" 
                    : quota.remaining <= 3 
                      ? "bg-yellow-500/20" 
                      : "bg-white/10 glow-white"
                }`}>
                  <svg className={`w-5 h-5 ${
                    quota.remaining === 0 
                      ? "text-red-400" 
                      : quota.remaining <= 3 
                        ? "text-yellow-400" 
                        : "text-white"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">AI Requests</p>
                  <p className="text-lg font-semibold">{quota.remaining} / {quota.limit} remaining</p>
                </div>
              </div>
              {quota.remaining <= 3 && quota.remaining > 0 && (
                <span className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full">Running low</span>
              )}
              {quota.remaining === 0 && (
                <span className="text-xs text-red-400 bg-red-500/10 px-3 py-1 rounded-full">Exhausted</span>
              )}
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  quota.remaining === 0 
                    ? "bg-red-500" 
                    : quota.remaining <= 3 
                      ? "bg-yellow-500" 
                      : "bg-white glow-white"
                }`}
                style={{ width: `${100 - quotaPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Mode Selection */}
        <div className="mb-8 animate-fade-in-up delay-300">
          <label className="text-sm text-gray-400 font-medium mb-4 block">Select Study Mode</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {MODES.map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`group p-4 rounded-xl transition-all duration-300 text-left ${
                  mode === m.value
                    ? "bg-white text-black shadow-depth-lg glow-white scale-[1.02]"
                    : "glass hover:bg-white/10 border border-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-all ${
                  mode === m.value ? "bg-black/10" : "bg-white/10 group-hover:bg-white/20"
                }`}>
                  <svg className={`w-4 h-4 ${mode === m.value ? "text-black" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={m.icon} />
                  </svg>
                </div>
                <p className={`text-sm font-semibold ${mode === m.value ? "text-black" : "text-white"}`}>{m.label}</p>
                <p className={`text-xs mt-1 ${mode === m.value ? "text-black/60" : "text-gray-500"}`}>{m.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-6 animate-fade-in-up delay-400">
          <label className="text-sm text-gray-400 font-medium mb-3 block">Enter your topic or content</label>
          <div className="glass rounded-2xl p-1 shadow-depth-md focus-within:shadow-depth-lg transition-all duration-300">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter topic or paste content to study..."
              rows={6}
              className="w-full bg-transparent border-0 rounded-xl p-5 text-white placeholder:text-gray-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-8 animate-fade-in-up delay-500">
          <button
            onClick={askAI}
            disabled={loading || isQuotaExhausted || !content.trim()}
            className={`w-full md:w-auto btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              loading || isQuotaExhausted || !content.trim()
                ? "bg-white/20 text-gray-400 cursor-not-allowed"
                : "bg-white text-black glow-white shadow-depth-lg hover:shadow-depth-xxl"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>AI is thinking...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Response</span>
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-fade-in-up">
            <p className="text-red-400 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </p>
          </div>
        )}

        {/* AI Answer */}
        {answer && (
          <div className="glass rounded-2xl shadow-depth-xl border border-white/10 overflow-hidden animate-scale-in">
            <div className="flex items-center gap-3 p-5 border-b border-white/10 bg-white/5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center glow-white">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-white">AI Response</h2>
                <p className="text-xs text-gray-400 capitalize">{mode} mode</p>
              </div>
            </div>
            <div className="p-6">
              <AIAnswer text={answer} />
            </div>
            <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
              <button
                onClick={() => navigator.clipboard.writeText(answer)}
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy response
              </button>
              <Link href="/sessions" className="text-sm text-gray-400 hover:text-white transition-colors">
                View in history
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
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
