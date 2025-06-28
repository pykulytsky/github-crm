import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/styles.css";
import { Login } from "./pages/Login";
import { Repositories } from "./pages/Repositories";
import { Signup } from "./pages/Signup";
import { useEffect, useState } from "react";
import { me } from "./api/auth";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    me()
      .then((res) => setIsAuthenticated(res.ok))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-lg">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
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
              isAuthenticated ? (
                <Navigate to="/repositories" />
              ) : (
                <Signup
                  onSuccess={() => {
                    setIsAuthenticated(true);
                  }}
                />
              )
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
    </div>
  );
}

export default App;
