import { api } from "./api";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = (data: {
  email: string;
  password: string;
}) => {
  return api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getMe = () => {
  return api("/api/auth/me");
};

export const logoutUser = () => {
  return api("/api/auth/logout", {
    method: "POST",
  });
};
