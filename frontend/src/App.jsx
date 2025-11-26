import { useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeesPage from "./pages/EmployeesPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Navbar onNavigate={setPage} />
      <main style={{ padding: "1.5rem", maxWidth: "1000px", margin: "0 auto" }}>
        {page === "dashboard" && <Dashboard />}
        {page === "employees" && <EmployeesPage />}
        {page === "tasks" && <TasksPage />}
      </main>
    </div>
  );
}
