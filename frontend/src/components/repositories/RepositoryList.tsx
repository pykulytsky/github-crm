import { RepositoryCard } from "./RepositoryCard";

export type RepositoryListProps = {
  repositories: any[];
  onRepositoryUpdate(id: number): void;
  onRepositoryDelete(id: number): void;
};

export function RepositoryList({
  repositories,
  onRepositoryUpdate,
  onRepositoryDelete,
}: RepositoryListProps) {
  return (
    <>
      {repositories.map((repository: any) => (
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
    </>
  );
}
