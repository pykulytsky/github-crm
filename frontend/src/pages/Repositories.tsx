import { useEffect, useState } from "react";
import { RepositoryList } from "../components/repositories/RepositoryList";

export function Repositories({ onLogout }: { onLogout: () => void }) {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const res = await fetch(`${baseUrl}/v1/github-repositories`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setRepositories(data);

    console.log(data);
  };

  const logout = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const res = await fetch(`${baseUrl}/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      onLogout();
    }
  };
  return (
    <>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>

      <RepositoryList repositories={repositories} />
    </>
  );
}
