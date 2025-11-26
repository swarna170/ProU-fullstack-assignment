import { useState } from "react";
import TaskList from "../components/TaskList.jsx";
import { createTask } from "../services/api.js";

export default function TasksPage() {
  const [form, setForm] = useState({
    title: "",
    status: "todo",
    priority: "medium"
  });
  const [error, setError] = useState("");
  const [reloadFlag, setReloadFlag] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title) {
      setError("Title is required");
      return;
    }

    try {
      await createTask(form);
      setForm({ title: "", status: "todo", priority: "medium" });
      setReloadFlag(f => f + 1);
    } catch {
      setError("Could not create task");
    }
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 0.9fr)", gap: "1.5rem" }}>
      <div>
        <h2 style={{ marginBottom: "0.5rem" }}>Tasks</h2>
        <p style={{ marginTop: 0, marginBottom: "1rem", fontSize: "0.9rem", color: "#666" }}>
          Track work across your team by status and priority.
        </p>
        <TaskList reloadFlag={reloadFlag} />
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
          <h3 style={{ marginTop: 0, marginBottom: "0.75rem", fontSize: "1rem" }}>Add task</h3>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <label style={{ fontSize: "0.85rem" }}>Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                style={{
                  borderRadius: "0.7rem",
                  border: "1px solid #ddd",
                  padding: "0.45rem 0.7rem",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem" }}>Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={{
                    borderRadius: "0.7rem",
                    border: "1px solid #ddd",
                    padding: "0.45rem 0.7rem",
                    fontSize: "0.9rem"
                  }}
                >
                  <option value="todo">To do</option>
                  <option value="in-progress">In progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label style={{ fontSize: "0.85rem" }}>Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  style={{
                    borderRadius: "0.7rem",
                    border: "1px solid #ddd",
                    padding: "0.45rem 0.7rem",
                    fontSize: "0.9rem"
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
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
              Save task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
