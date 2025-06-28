import { RepositoryCard } from "./RepositoryCard";

export type RepositoryListProps = {
  repositories: any[];
};

export function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <>
      {repositories.map((repository: any) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          onUpdate={() => {
            console.log("TODO update");
          }}
          onDelete={() => {
            console.log("TODO delete");
          }}
        />
      ))}
    </>
  );
}
