import type { Repository } from "../../api/types";
import { RepositoryCard } from "./RepositoryCard";

export type RepositoryListProps = {
  repositories: Repository[];
  onRepositoryUpdate(id: number): void;
  onRepositoryDelete(id: number): void;
};

export function RepositoryList({
  repositories,
  onRepositoryUpdate,
  onRepositoryDelete,
}: RepositoryListProps) {
  if (repositories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No repositories added yet.</p>
        <p className="text-gray-500 text-sm mt-2">
          Click "Add Repository" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {repositories.map((repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          onUpdate={() => {
            onRepositoryUpdate(repository.id);
          }}
          onDelete={() => {
            onRepositoryDelete(repository.id);
          }}
        />
      ))}
    </div>
  );
}
