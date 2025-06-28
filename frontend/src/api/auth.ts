import { baseUrl } from "./utils";

export async function login(email: string, password: string) {
  const res = await fetch(`${baseUrl}/v1/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res;
}

export async function signup(email: string, password: string) {
  const res = await fetch(`${baseUrl}/v1/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return res;
}

export async function me() {
  return await fetch(`${baseUrl}/v1/auth/me`, {
    credentials: "include",
  });
}

export async function logout() {
  const res = await fetch(`${baseUrl}/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res;
}
