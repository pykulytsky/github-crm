export type RepositoryCardProps = {
  repository: any;
  onUpdate(id: number): void;
  onDelete(id: number): void;
};

export function RepositoryCard({
  repository,
  onUpdate,
  onDelete,
}: RepositoryCardProps) {
  return <div>{JSON.stringify(repository)}</div>;
}
