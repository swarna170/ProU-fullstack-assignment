export default function Navbar({ onNavigate }) {
  const buttonStyle = {
    marginRight: "0.5rem",
    padding: "0.4rem 0.9rem",
    borderRadius: "999px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem"
  };

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
        padding: "0.9rem 1.5rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.1rem" }}>Employee Task Manager</h1>
      <nav>
        <button style={buttonStyle} onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button style={buttonStyle} onClick={() => onNavigate("employees")}>Employees</button>
        <button style={buttonStyle} onClick={() => onNavigate("tasks")}>Tasks</button>
      </nav>
    </header>
  );
}
