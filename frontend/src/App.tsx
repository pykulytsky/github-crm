import { BrowserRouter } from "react-router-dom";
import "./styles/styles.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { AppRouter } from "./components/routing/AppRouter";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
