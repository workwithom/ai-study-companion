"use client";

import { useEffect, useState } from "react";
import { fetchSessionById } from "@/lib/api";
import { useParams } from "next/navigation";
import { deleteSession } from "@/lib/api";
import { useRouter } from "next/navigation";

type Session = {
  _id: string;
  mode: string;
  content: string;
  answer: string;
  createdAt: string;
};

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

const handleDelete = async () => {
  const confirmDelete = confirm("Delete this session?");
  if (!confirmDelete) return;

  try {
    await deleteSession(id);
    router.push("/sessions");
  } catch {
    alert("Failed to delete session");
  }
};


  useEffect(() => {
    fetchSessionById(id)
      .then(setSession)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!session) return <p className="p-6">Session not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold capitalize">
          {session.mode} Session
        </h1>
        <span className="text-sm text-gray-500">
          {new Date(session.createdAt).toLocaleString()}
        </span>
      </div>

      <section>
        <h2 className="font-semibold mb-2">📥 Input</h2>
        <p className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {session.content}
        </p>
      </section>

      <section>
        <h2 className="font-semibold mb-2">🤖 AI Answer</h2>
        <p className="bg-white p-4 rounded border whitespace-pre-wrap">
          {session.answer}
        </p>
      </section>
      <button
        onClick={handleDelete}
        className="text-sm text-red-600 hover:underline"
      > 🗑️ Delete Session
      </button>

    </div>
  );
}
