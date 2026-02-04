const API_BASE = "http://localhost:5000";

export const api = async (
  path: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", //for cookies
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

export const fetchSessions = async () => {
  const res = await fetch("http://localhost:5000/api/ai/sessions", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch sessions");
  }

  return res.json();
};

export const fetchSessionById = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/ai/sessions/${id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch session");
  }

  return res.json();
};

export const deleteSession = async (id: string) => {
  const res = await fetch(
    `http://localhost:5000/api/ai/sessions/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete session");
  }

  return res.json();
};
