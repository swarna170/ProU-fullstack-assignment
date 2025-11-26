import { useEffect, useState } from "react";
import { fetchTasks } from "../services/api.js";

export default function TaskList({ reloadFlag }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [reloadFlag]);

  if (loading) return <p>Loading tasks...</p>;
  if (!tasks.length) return <p>No tasks yet.</p>;

  return (
    <div style={{ display: "grid", gap: "0.8rem" }}>
      {tasks.map(task => (
        <div
          key={task._id}
          style={{
            backgroundColor: "#fff",
            borderRadius: "0.9rem",
            padding: "0.8rem 0.9rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            border: "1px solid #f3f3f3"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{task.title}</div>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                backgroundColor:
                  task.status === "done"
                    ? "#e8f8f1"
                    : task.status === "in-progress"
                    ? "#fff7e6"
                    : "#f3f3f3",
                color:
                  task.status === "done"
                    ? "#27ae60"
                    : task.status === "in-progress"
                    ? "#f39c12"
                    : "#555"
              }}
            >
              {task.status}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#666" }}>
            <div>
              Priority:{" "}
              <span style={{ textTransform: "capitalize" }}>
                {task.priority}
              </span>
            </div>
            <div>
              Assigned:{" "}
              <span>
                {task.assignedTo?.name || "Unassigned"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
