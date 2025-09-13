import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
