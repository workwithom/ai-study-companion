const API_BASE =
  process.env.NEXT_PUBLIC_API_URL;

export const api = async (
  path: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", // 🔑 cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};

// ---------- AI Sessions ----------

export const fetchSessions = async () => {
  return api("/api/ai/sessions");
};

export const fetchSessionById = async (id: string) => {
  return api(`/api/ai/sessions/${id}`);
};

export const deleteSession = async (id: string) => {
  return api(`/api/ai/sessions/${id}`, {
    method: "DELETE",
  });
};

// ---------- AI Quota ----------

export const fetchAiQuota = async () => {
  return api("/api/ai/quota");
};
