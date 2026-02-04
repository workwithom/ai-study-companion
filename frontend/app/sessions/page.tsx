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

const MODE_COLORS: Record<string, string> = {
  explain: "bg-blue-100 text-blue-700",
  summary: "bg-green-100 text-green-700",
  exam: "bg-red-100 text-red-700",
  revision: "bg-yellow-100 text-yellow-800",
  interview: "bg-purple-100 text-purple-700",
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSessions()
      .then(setSessions)
      .catch(() => setError("Failed to load sessions"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading sessions…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📚 Study History</h1>

      {sessions.length === 0 ? (
        <div className="border rounded-lg p-8 text-center bg-white dark:bg-zinc-900">
          <p className="text-gray-600 dark:text-gray-300">
            No study sessions yet.
          </p>
          <Link
            href="/study"
            className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline"
          >
            Start your first session →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <Link key={s._id} href={`/sessions/${s._id}`}>
              <div className="border rounded-xl p-5 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      MODE_COLORS[s.mode] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.mode.toUpperCase()}
                  </span>

                  <span className="text-xs text-gray-500">
                    {new Date(s.createdAt).toLocaleString()}
                  </span>
                </div>

                <p className="text-gray-800 dark:text-gray-200 line-clamp-4 leading-relaxed">
                  {s.answer}
                </p>

                <p className="mt-3 text-sm text-blue-600 font-medium">
                  View details →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
