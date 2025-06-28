import { useState } from "react";
import { Link } from "react-router";

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const res = await fetch(`${baseUrl}/v1/auth/login`, {
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
        placeholder="password"
        type="password"
      />
      <button onClick={login}>Login</button>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
