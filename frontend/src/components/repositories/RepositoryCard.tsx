export type RepositoryCardProps = {
  repository: any;
  onUpdate(): void;
  onDelete(): void;
};

export function RepositoryCard({
  repository,
  onUpdate,
  onDelete,
}: RepositoryCardProps) {
  return (
    <div>
      <p>{JSON.stringify(repository)}</p>
      <button onClick={onUpdate}>update</button>
      <button onClick={onDelete}>delete</button>
    </div>
  );
}
