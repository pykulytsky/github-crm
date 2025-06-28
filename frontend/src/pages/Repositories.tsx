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
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout: authLogout } = useAuth();

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    const data = await fetchUserRepositories();
    setRepositories(data);
  };

  const handleLogout = async () => {
    await authLogout();
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
      toast.error("Failed to add repository");
    }

    setIsModalOpen(false);
  };

  const handleDeleteRepository = async (repoId: number) => {
    const deletedRepository = await deleteRepository(repoId);

    if (deletedRepository) {
      setRepositories((oldRepositories) =>
        oldRepositories.filter((repo) => repo.id !== deletedRepository.id),
      );
    } else {
      toast.error("Failed to delete repository");
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
    } else {
      toast.error("Failed to update repository");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-12">
      <div className="p-6 px-12 flex justify-between">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md font-medium cursor-pointer"
        >
          Add Repository
        </button>

        <button
          onClick={() => {
            handleLogout();
          }}
          className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-md cursor-pointer"
        >
          Logout
        </button>
      </div>

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
    </div>
  );
}
