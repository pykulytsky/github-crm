import { useState } from "react";
import { Link } from "react-router";
import { login } from "../api/auth";
import { toast } from "react-hot-toast";

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login(email, password);

    if (res.ok) {
      onSuccess();
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-md font-medium"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-black hover:text-gray-600 underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
