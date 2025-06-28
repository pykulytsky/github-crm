import { useState } from "react";
import { Link } from "react-router";
import { login } from "../api/auth";

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login(email, password);

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
      <button onClick={handleLogin}>Login</button>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
