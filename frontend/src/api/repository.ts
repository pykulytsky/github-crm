import type { Repository } from "./types";
import { baseUrl } from "./utils";

export async function fetchUserRepositories(): Promise<Array<Repository>> {
  const res = await fetch(`${baseUrl}/v1/github-repositories`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return data;
}

export async function addRepository(
  owner: string,
  name: string,
): Promise<Repository | null> {
  const res = await fetch(`${baseUrl}/v1/github-repositories`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner, name }),
  });

  if (res.ok) {
    return await res.json();
  } else {
    return null;
  }
}

export async function deleteRepository(
  repoId: number,
): Promise<Repository | null> {
  const res = await fetch(`${baseUrl}/v1/github-repositories/${repoId}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    return await res.json();
  } else {
    return null;
  }
}

export async function updateRepository(
  repoId: number,
): Promise<Repository | null> {
  const res = await fetch(`${baseUrl}/v1/github-repositories/${repoId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    return await res.json();
  } else {
    return null;
  }
}
