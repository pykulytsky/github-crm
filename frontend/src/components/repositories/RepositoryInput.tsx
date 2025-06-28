import { useEffect, useState } from "react";

function parseRepositoryInput(
  input: string,
): { owner: string; name: string } | null {
  const trimmed = input.trim();

  const shortMatch = trimmed.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (shortMatch) return { owner: shortMatch[1], name: shortMatch[2] };

  const urlMatch = trimmed.match(
    /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(\/)?$/,
  );
  if (urlMatch) return { owner: urlMatch[1], name: urlMatch[2] };

  return null;
}

export type RepositoryInputProps = {
  owner: string;
  name: string;
  onChange(input: { owner: string; name: string } | null): void;
};

export default function RepositoryInput({
  owner,
  name,
  onChange,
}: RepositoryInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (owner && name) {
      setInput(`${owner}/${name}`);
      setError("");
    }
  }, [owner, name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    const parsed = parseRepositoryInput(value);
    if (parsed) {
      onChange(parsed);
      setError("");
    } else {
      onChange(null);
      setError('Invalid repository URL format (use "owner/repo" or full URL)');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        placeholder="e.g. facebook/react or https://github.com/facebook/react"
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
