import { useState } from "react";
import RepositoryInput from "./RepositoryInput";

interface AddRepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (repositoryData: RepositoryFormData) => void;
}

interface RepositoryFormData {
  owner: string;
  name: string;
}

export function AddRepositoryModal({
  isOpen,
  onClose,
  onSubmit,
}: AddRepositoryModalProps) {
  const [formData, setFormData] = useState<RepositoryFormData>({
    owner: "",
    name: "",
  });

  const handleInputChange = (input: RepositoryFormData | null) => {
    if (!input) {
      setFormData({ name: "", owner: "" });
    } else {
      setFormData(input);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ owner: "", name: "" });
  };

  const handleClose = () => {
    setFormData({ owner: "", name: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-black">Add Repository</h2>
            <button
              onClick={handleClose}
              className="text-black hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-black mb-2"
              >
                Repository URL or Owner/Name
              </label>
              <RepositoryInput
                owner={formData.owner}
                name={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-black text-black hover:bg-gray-100 transition-colors rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors rounded-md cursor-pointer"
              >
                Add Repository
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
