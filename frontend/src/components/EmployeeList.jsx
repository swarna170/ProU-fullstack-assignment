import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api.js";

export default function EmployeeList({ reloadFlag }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [reloadFlag]);

  if (loading) return <p>Loading employees...</p>;
  if (!employees.length) return <p>No employees yet.</p>;

  return (
    <div style={{ display: "grid", gap: "0.8rem" }}>
      {employees.map(emp => (
        <div
          key={emp._id}
          style={{
            backgroundColor: "#fff",
            borderRadius: "0.9rem",
            padding: "0.8rem 0.9rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #f3f3f3"
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{emp.name}</div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>{emp.email}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                display: "inline-flex",
                padding: "0.22rem 0.7rem",
                fontSize: "0.75rem",
                borderRadius: "999px",
                backgroundColor: "#eef3ff",
                color: "#2f80ed",
                marginBottom: "0.2rem"
              }}
            >
              {emp.role}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: emp.status === "active" ? "#27ae60" : "#b33939"
              }}
            >
              {emp.status === "active" ? "Active" : "Inactive"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
