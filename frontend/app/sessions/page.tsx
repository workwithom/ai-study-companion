"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSessions } from "@/lib/api";
import { deleteSession } from "@/lib/api";

type Session = {
  _id: string;
  mode: string;
  answer: string;
  createdAt: string;
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
    return <p className="p-6">Loading sessions...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📚 Study History</h1>

      {sessions.length === 0 ? (
        <p className="text-gray-500">No study sessions yet.</p>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <Link key={s._id} href={`/sessions/${s._id}`}>
              <div className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold capitalize">
                    {s.mode}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(s.createdAt).toLocaleString()}
                  </span>
                </div>
                <button
  onClick={(e) => {
    e.preventDefault();
    deleteSession(s._id).then(() =>
      setSessions((prev) => prev.filter((x) => x._id !== s._id))
    );
  }}
  className="text-xs text-red-500 hover:underline"
>
  Delete
</button>

                <p className="text-gray-800 line-clamp-4">
                  {s.answer}
                </p>
              </div>
            </Link>
            
          ))}
        </div>
      )}
    </div>
  );
}
