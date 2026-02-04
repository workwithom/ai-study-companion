"use client";

import { useEffect, useState } from "react";
import { fetchSessionById, deleteSession } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Session = {
  _id: string;
  mode: string;
  content: string;
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

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteSession(id);
      router.push("/sessions");
    } catch {
      alert("Failed to delete session");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  useEffect(() => {
    fetchSessionById(id)
      .then(setSession)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="glass rounded-2xl p-12 shadow-depth-lg text-center max-w-md animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Session not found</h3>
          <p className="text-gray-400 mb-6">This session may have been deleted or does not exist.</p>
          <Link
            href="/sessions"
            className="btn-secondary inline-flex items-center gap-2 bg-white/10 border border-white/20 px-6 py-3 rounded-xl text-white"
          >
            Back to Sessions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/2 rounded-full blur-3xl" />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
          <div className="relative glass rounded-2xl p-8 shadow-depth-xxl max-w-md w-full animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Delete Session?</h3>
            <p className="text-gray-400 text-center mb-6">This action cannot be undone. This session will be permanently deleted.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 btn-secondary bg-white/10 border border-white/20 py-3 rounded-xl text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl text-white font-medium transition-colors disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in-up">
          <Link href="/sessions" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Sessions</span>
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-secondary flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-red-400 hover:text-red-300 hover:border-red-500/30 hover:bg-red-500/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </header>

        {/* Session Header Card */}
        <div className="glass rounded-2xl p-6 shadow-depth-lg mb-8 animate-fade-in-up delay-100">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center glow-white">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={MODE_ICONS[session.mode] || MODE_ICONS.explain} />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold capitalize text-glow">{session.mode} Session</h1>
                <span className="text-xs font-semibold uppercase tracking-wider text-white/60 bg-white/10 px-3 py-1 rounded-full">
                  {session.mode}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {new Date(session.createdAt).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <section className="mb-8 animate-fade-in-up delay-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold">Your Input</h2>
          </div>
          <div className="glass rounded-xl p-6 shadow-depth-md">
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{session.content}</p>
          </div>
        </section>

        {/* AI Answer Section */}
        <section className="animate-fade-in-up delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center glow-white">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold">AI Response</h2>
          </div>
          <div className="glass rounded-xl p-6 shadow-depth-lg border border-white/10">
            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{session.answer}</p>
          </div>
        </section>

        {/* Action Footer */}
        <div className="mt-10 flex items-center justify-between glass rounded-xl p-4 shadow-depth-sm animate-fade-in-up delay-400">
          <Link
            href="/sessions"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            View all sessions
          </Link>
          <Link
            href="/study"
            className="btn-primary flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-xl glow-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Session
          </Link>
        </div>
      </div>
    </div>
  );
}
