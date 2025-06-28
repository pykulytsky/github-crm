import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Repositories } from "./pages/Repositories";

function App() {
  const isAuthenticated = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/repositories" /> : <Login />
          }
        />
        <Route
          path="/repositories"
          element={
            isAuthenticated ? <Repositories /> : <Navigate to="/login" />
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
