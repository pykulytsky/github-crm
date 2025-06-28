import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Repositories } from "./pages/Repositories";
import { Signup } from "./pages/Signup";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    fetch(`${baseUrl}/v1/auth/me`, {
      credentials: "include",
    })
      .then((res) => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/repositories" />
            ) : (
              <Login
                onSuccess={() => {
                  setIsAuthenticated(true);
                }}
              />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/repositories" /> : <Signup />
          }
        />
        <Route
          path="/repositories"
          element={
            isAuthenticated ? (
              <Repositories
                onLogout={() => {
                  setIsAuthenticated(false);
                }}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to="/repositories" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
