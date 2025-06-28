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
    <div>
      <div>
        <div>
          <div>
            <h2>Add Repository</h2>
            <button onClick={handleClose}>×</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="owner">Repository Owner</label>
              <RepositoryInput
                owner={formData.owner}
                name={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit">Add Repository</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
