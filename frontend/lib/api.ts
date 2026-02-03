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
