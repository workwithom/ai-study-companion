"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSessions } from "@/lib/api";

type Session = {
  _id: string;
  mode: string;
  answer: string;
  createdAt: string;
};

const MODE_ICONS: Record<string, string> = {
  explain: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  summary: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  exam: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  revision: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  interview: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchSessions()
      .then(setSessions)
      .catch(() => setError("Failed to load sessions"))
      .finally(() => setLoading(false));
  }, []);

  const filteredSessions = filter === "all" 
    ? sessions 
    : sessions.filter(s => s.mode === filter);

  const modes = ["all", ...Array.from(new Set(sessions.map(s => s.mode)))];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in-up">
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
            <Link href="/study" className="btn-primary bg-white text-black text-sm font-semibold px-5 py-2 rounded-full glow-white">
              New Session
            </Link>
          </nav>
        </header>

        {/* Title */}
        <div className="mb-10 animate-fade-in-up delay-100">
          <h1 className="text-4xl font-bold mb-3 text-glow">Study History</h1>
          <p className="text-gray-400">Review your past learning sessions and track your progress</p>
        </div>

        {/* Filter Tabs */}
        {sessions.length > 0 && (
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 animate-fade-in-up delay-200">
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  filter === mode
                    ? "bg-white text-black glow-white shadow-depth-md"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="glass rounded-2xl p-12 shadow-depth-lg text-center animate-fade-in-up">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading your sessions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="glass rounded-2xl p-12 shadow-depth-lg text-center animate-fade-in-up border border-red-500/30">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-red-400">{error}</h3>
            <button 
              onClick={() => window.location.reload()} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sessions.length === 0 && (
          <div className="glass rounded-2xl p-12 shadow-depth-lg text-center animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 glow-white animate-pulse-glow">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">No sessions yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start your first AI-powered study session to begin building your learning history.
            </p>
            <Link
              href="/study"
              className="btn-primary inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3 rounded-xl glow-white shadow-depth-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Start First Session
            </Link>
          </div>
        )}

        {/* Sessions Grid */}
        {!loading && !error && filteredSessions.length > 0 && (
          <div className="grid gap-4">
            {filteredSessions.map((s, i) => (
              <Link key={s._id} href={`/sessions/${s._id}`}>
                <div 
                  className="glass rounded-2xl p-6 shadow-depth-md card-hover cursor-pointer animate-fade-in-up group"
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                >
                  <div className="flex items-start gap-5">
                    {/* Mode Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:glow-white group-hover:scale-110">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={MODE_ICONS[s.mode] || MODE_ICONS.explain} />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-white/60 bg-white/10 px-3 py-1 rounded-full">
                          {s.mode}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(s.createdAt).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>

                      <p className="text-gray-300 line-clamp-3 leading-relaxed mb-4">
                        {s.answer}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                        <span>View details</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {!loading && !error && sessions.length > 0 && (
          <div className="mt-12 glass rounded-2xl p-6 shadow-depth-md animate-fade-in-up delay-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-glow">{sessions.length}</p>
                <p className="text-sm text-gray-400">Total Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-glow">
                  {Array.from(new Set(sessions.map(s => s.mode))).length}
                </p>
                <p className="text-sm text-gray-400">Modes Used</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-glow">
                  {sessions.filter(s => new Date(s.createdAt).toDateString() === new Date().toDateString()).length}
                </p>
                <p className="text-sm text-gray-400">Today</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-glow">
                  {sessions.filter(s => {
                    const date = new Date(s.createdAt);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return date >= weekAgo;
                  }).length}
                </p>
                <p className="text-sm text-gray-400">This Week</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
