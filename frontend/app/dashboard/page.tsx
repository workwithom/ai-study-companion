"use client";

import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchSessions, fetchAiQuota } from "@/lib/api";

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

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [quota, setQuota] = useState<{ limit: number; used: number; remaining: number } | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([
        fetchSessions().then(setSessions).catch(() => []),
        fetchAiQuota().then(setQuota).catch(() => null),
      ]).finally(() => setLoadingData(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const recentSessions = sessions.slice(0, 5);
  const quotaPercentage = quota ? (quota.used / quota.limit) * 100 : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border-2 border-white/80 flex items-center justify-center transition-all duration-300 group-hover:glow-white group-hover:scale-110">
                <div className="w-3 h-3 bg-white rounded-full animate-glow-pulse" />
              </div>
              <span className="text-lg font-semibold">StudyAI</span>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/study" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              Study
            </Link>
            <Link href="/sessions" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
              History
            </Link>
            <button
              onClick={async () => {
                await logoutUser();
                router.push("/login");
              }}
              className="btn-secondary text-sm px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 shadow-depth-sm"
            >
              Logout
            </button>
          </nav>
        </header>

        {/* Welcome Section */}
        <section className="mb-12 animate-fade-in-up delay-100">
          <h1 className="text-4xl font-bold mb-2 text-glow">
            Welcome back, <span className="gradient-text">{user.name}</span>
          </h1>
          <p className="text-gray-400">{user.email}</p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Sessions Card */}
          <div className="glass rounded-2xl p-6 shadow-depth-lg card-hover animate-fade-in-up delay-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center glow-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Sessions</p>
                <p className="text-3xl font-bold">{sessions.length}</p>
              </div>
            </div>
            <Link href="/sessions" className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
              View all
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* AI Quota Card */}
          <div className="glass rounded-2xl p-6 shadow-depth-lg card-hover animate-fade-in-up delay-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center glow-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">AI Requests Left</p>
                <p className="text-3xl font-bold">{quota?.remaining ?? "..."}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500 glow-white"
                  style={{ width: `${100 - quotaPercentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{quota?.used ?? 0} of {quota?.limit ?? 0} used today</p>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="glass rounded-2xl p-6 shadow-depth-lg card-hover animate-fade-in-up delay-400">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center glow-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-400">Start Learning</p>
                <p className="text-lg font-semibold">New Session</p>
              </div>
            </div>
            <Link
              href="/study"
              className="btn-primary w-full inline-flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-xl glow-white shadow-depth-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Studying
            </Link>
          </div>
        </div>

        {/* Recent Sessions */}
        <section className="animate-fade-in-up delay-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Sessions</h2>
            <Link href="/sessions" className="text-sm text-gray-400 hover:text-white transition-colors">
              View all
            </Link>
          </div>

          {loadingData ? (
            <div className="glass rounded-2xl p-12 shadow-depth-lg text-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading sessions...</p>
            </div>
          ) : recentSessions.length === 0 ? (
            <div className="glass rounded-2xl p-12 shadow-depth-lg text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 glow-white">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No sessions yet</h3>
              <p className="text-gray-400 mb-6">Start your first study session to see your history here.</p>
              <Link
                href="/study"
                className="btn-primary inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl glow-white"
              >
                Start Learning
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {recentSessions.map((session, i) => (
                <Link key={session._id} href={`/sessions/${session._id}`}>
                  <div
                    className="glass rounded-xl p-5 shadow-depth-md card-hover cursor-pointer animate-fade-in-up"
                    style={{ animationDelay: `${600 + i * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={MODE_ICONS[session.mode] || MODE_ICONS.explain} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {session.mode}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(session.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-300 line-clamp-2">{session.answer}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
