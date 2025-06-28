import { useEffect, useState } from "react";
import { RepositoryList } from "../components/repositories/RepositoryList";
import { AddRepositoryModal } from "../components/repositories/AddRepositoryModal";
import {
  addRepository,
  deleteRepository,
  fetchUserRepositories,
  updateRepository,
} from "../api/repository";
import type { Repository } from "../api/types";
import { logout } from "../api/auth";

export function Repositories({ onLogout }: { onLogout: () => void }) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    const data = await fetchUserRepositories();
    setRepositories(data);
  };

  const handleLogout = async () => {
    const res = await logout();

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
    const repository = await addRepository(owner, name);

    if (repository) {
      setRepositories((oldRepositories) => [repository, ...oldRepositories]);
    } else {
      console.log("TODO: handle errors");
    }

    setIsModalOpen(false);
  };

  const handleDeleteRepository = async (repoId: number) => {
    const deletedRepository = await deleteRepository(repoId);

    if (deletedRepository) {
      setRepositories((oldRepositories) =>
        oldRepositories.filter((repo) => repo.id !== deletedRepository.id),
      );
    }
  };

  const handleUpdateRepository = async (repoId: number) => {
    const updatedRepository = await updateRepository(repoId);

    if (updatedRepository) {
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
          handleLogout();
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
