import { useState } from "react";
import { Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export function Signup({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isFormValid =
    email && password && confirmPassword && password === confirmPassword;

  const signup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    const res = await fetch(`${baseUrl}/v1/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        type="password"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={signup} disabled={!isFormValid}>
        Signup
      </button>
      <Link to="/login">Login</Link>
    </div>
  );
}
