import { useState } from "react";
import EmployeeList from "../components/EmployeeList.jsx";
import { createEmployee } from "../services/api.js";

export default function EmployeesPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [error, setError] = useState("");
  const [reloadFlag, setReloadFlag] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.role) {
      setError("Please fill all fields");
      return;
    }

    try {
      await createEmployee(form);
      setForm({ name: "", email: "", role: "" });
      setReloadFlag(f => f + 1);
    } catch {
      setError("Could not create employee");
    }
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: "1.5rem" }}>
      <div>
        <h2 style={{ marginBottom: "0.5rem" }}>Employees</h2>
        <p style={{ marginTop: 0, marginBottom: "1rem", fontSize: "0.9rem", color: "#666" }}>
          View all team members, their roles and status in one place.
        </p>
        <EmployeeList reloadFlag={reloadFlag} />
      </div>
      <div>
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            padding: "1.2rem 1.3rem",
            boxShadow: "0 14px 35px rgba(0,0,0,0.08)",
            border: "1px solid #f0f0f0"
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "0.75rem", fontSize: "1rem" }}>Add employee</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem" }}>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{
                  borderRadius: "0.7rem",
                  border: "1px solid #ddd",
                  padding: "0.45rem 0.7rem",
                  fontSize: "0.9rem"
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem" }}>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={{
                  borderRadius: "0.7rem",
                  border: "1px solid #ddd",
                  padding: "0.45rem 0.7rem",
                  fontSize: "0.9rem"
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem" }}>Role</label>
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="Frontend Developer, QA, PM..."
                style={{
                  borderRadius: "0.7rem",
                  border: "1px solid #ddd",
                  padding: "0.45rem 0.7rem",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            {error && (
              <div style={{ fontSize: "0.8rem", color: "#c0392b" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                marginTop: "0.4rem",
                backgroundColor: "#2f80ed",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "0.55rem 1rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Save employee
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
