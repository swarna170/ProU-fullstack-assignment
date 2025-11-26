import { useEffect, useState } from "react";
import { fetchEmployees, fetchTasks } from "../services/api.js";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const [employees, tasks] = await Promise.all([fetchEmployees(), fetchTasks()]);
        setEmployeesCount(employees.length);
        setTasksCount(tasks.length);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "70vh" }}>
      <section
        style={{
          display: "flex",
          gap: "3rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2rem 0"
        }}
      >
        <div style={{ flex: "1 1 0" }}>
          <p style={{ color: "#2f80ed", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
            ProU Task Manager
          </p>
          <h2
            style={{
              fontSize: "3rem",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "1rem",
              textTransform: "uppercase"
            }}
          >
            Task
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#2f80ed",
                color: "#fff",
                borderRadius: "999px",
                padding: "0.15rem 0.9rem",
                margin: "0 0.4rem"
              }}
            >
              Management
            </span>
            Software
          </h2>
          <p style={{ fontSize: "0.98rem", color: "#555", maxWidth: "480px", marginBottom: "1.5rem" }}>
            Organize and manage your team without chaos. Keep employees and tasks in sync with a simple board
            that shows exactly who is doing what and when.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              style={{
                backgroundColor: "#2f80ed",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "0.75rem 1.8rem",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 8px 18px rgba(47,128,237,0.35)"
              }}
            >
              Get Started
            </button>
            {!loading && (
              <div style={{ fontSize: "0.85rem", color: "#555" }}>
                <strong>{employeesCount}</strong> team members ·{" "}
                <strong>{tasksCount}</strong> active tasks
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: "1 1 0", display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              background: "linear-gradient(145deg,#e6f3ff,#ffffff)",
              borderRadius: "1.5rem",
              padding: "1.2rem 1rem",
              boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
              border: "1px solid rgba(255,255,255,0.7)"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.8rem"
              }}
            >
              <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>Team Board</div>
              <div style={{ display: "flex", gap: "0.3rem" }}>
                <span style={dotStyle("#ffb347")} />
                <span style={dotStyle("#6fcf97")} />
                <span style={dotStyle("#56ccf2")} />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.6rem",
                fontSize: "0.8rem"
              }}
            >
              <Column
                title="To Do"
                color="#f2994a"
                items={["Wireframe dashboard", "Set up database"]}
              />
              <Column
                title="In Progress"
                color="#2f80ed"
                items={["API integration", "Auth flow"]}
              />
              <Column
                title="Done"
                color="#27ae60"
                items={["Employee CRUD", "Task model"]}
              />
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          position: "fixed",
          right: "1.5rem",
          bottom: "1.5rem",
          backgroundColor: "#ffffff",
          borderRadius: "1.1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          padding: "0.9rem 1rem",
          maxWidth: "260px",
          fontSize: "0.8rem",
          display: "flex",
          gap: "0.6rem",
          alignItems: "flex-start",
          zIndex: 20
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "999px",
            backgroundColor: "#2f80ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontWeight: 600, marginBottom: "0.15rem" }}>Need help?</div>
          <div style={{ color: "#555", marginBottom: "0.4rem" }}>
            Chat with the ProU team to set up your task workspace in minutes.
          </div>
          <button
            style={{
              border: "none",
              backgroundColor: "#2f80ed",
              color: "#fff",
              borderRadius: "999px",
              padding: "0.3rem 0.9rem",
              fontSize: "0.75rem",
              cursor: "pointer"
            }}
          >
            Chat now
          </button>
        </div>
      </div>
    </div>
  );
}

function Column({ title, color, items }) {
  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.3rem",
          marginBottom: "0.4rem"
        }}
      >
        <span
          style={{
            width: "6px",
            height: "18px",
            borderRadius: "999px",
            backgroundColor: color
          }}
        />
        <span style={{ fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {items.map(item => (
          <div
            key={item}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "0.6rem",
              padding: "0.4rem 0.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function dotStyle(color) {
  return {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: color
  };
}
