import { useEffect, useState } from "react";
import { RepositoryList } from "../components/repositories/RepositoryList";
import { AddRepositoryModal } from "../components/repositories/AddRepositoryModal";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export function Repositories({ onLogout }: { onLogout: () => void }) {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
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
    const res = await fetch(`${baseUrl}/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      onLogout();
    }
  };

  const handleAddRepository = async ({
    owner,
    name,
  }: {
    owner: string;
    name: string;
  }) => {
    console.log("Adding repository:", owner, name);
    const res = await fetch(`${baseUrl}/v1/github-repositories`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, name }),
    });

    if (res.ok) {
      const newRepository = await res.json();
      setRepositories((oldRepositories) => [newRepository, ...oldRepositories]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteRepository = async (repoId: number) => {
    const res = await fetch(`${baseUrl}/v1/github-repositories/${repoId}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const deletedRepository = await res.json();
      setRepositories((oldRepositories) =>
        oldRepositories.filter((repo) => repo.id !== deletedRepository.id),
      );
    }
  };

  const handleUpdateRepository = async (repoId: number) => {
    const res = await fetch(`${baseUrl}/v1/github-repositories/${repoId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updatedRepository = await res.json();
      setRepositories((oldRepositories) =>
        oldRepositories.map((repo) => {
          if (repo.id == updatedRepository.id) {
            return updatedRepository;
          } else {
            return repo;
          }
        }),
      );
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

      <button onClick={() => setIsModalOpen(true)}>Add Repository</button>

      <RepositoryList
        repositories={repositories}
        onRepositoryUpdate={handleUpdateRepository}
        onRepositoryDelete={handleDeleteRepository}
      />

      <AddRepositoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRepository}
      />
    </>
  );
}
