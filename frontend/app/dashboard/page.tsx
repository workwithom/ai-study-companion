"use client";

import { useAuth } from "@/hooks/useAuth";
import { logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>{user.email}</p>

      <button
        onClick={async () => {
          await logoutUser();
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
