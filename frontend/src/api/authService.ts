export const API_URL = import.meta.env.VITE_API_URL_USER;

// register
export async function register(data: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Gửi cookie refreshToken
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Register failed");
  }
  return res.json();
}

// loginUser
export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }
  return res.json();
}

// logoutUser
export async function logoutUser() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Logout failed");
  }
  return res.json();
}
