import type { Repository } from "../../api/types";

export type RepositoryCardProps = {
  repository: Repository;
  onUpdate(): void;
  onDelete(): void;
};

export function RepositoryCard({
  repository,
  onUpdate,
  onDelete,
}: RepositoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Repository Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-black mb-2">
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 underline"
          >
            {repository.owner}/{repository.name}
          </a>
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
        <div className="text-center">
          <div className="font-semibold text-black">{repository.stars}</div>
          <div className="text-gray-600">Stars</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-black">{repository.forks}</div>
          <div className="text-gray-600">Forks</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-black">{repository.issues}</div>
          <div className="text-gray-600">Issues</div>
        </div>
      </div>

      <div className="mb-6 text-sm text-gray-600">
        <div>
          Created: {Math.floor(new Date(repository.createdAt).getTime() / 1000)}
        </div>
        <div>
          Added: {Math.floor(new Date(repository.addedAt).getTime() / 1000)}
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onUpdate}
          className="flex-1 px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm rounded-md cursor-pointer"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="flex-1 px-3 py-2 border border-black text-black hover:bg-gray-100 transition-colors text-sm rounded-md cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
