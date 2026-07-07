import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "📝 Sign Up" },
  { to: "/onboarding", label: "🧭 Interests" },
  { to: "/group", label: "👥 Group" },
  { to: "/events", label: "📅 Events" },
  { to: "/profile", label: "👤 Profile" },
  { to: "/admin", label: "🛠️ Admin" },
  { to: "/groups", label: "📋 Manage Groups" },
];

function Nav({ darkMode, setDarkMode }) {
  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", padding: "20px 16px 0", flexWrap: "wrap", alignItems: "center" }}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/"}
          style={({ isActive }) => ({
            padding: "8px 14px",
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            textDecoration: "none",
            color: isActive ? "#F6F0E4" : "#5C5347",
            background: isActive ? "#2A2521" : "transparent",
            transition: "all 0.18s ease",
          })}
        >
          {link.label}
        </NavLink>
      ))}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: "8px 14px",
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 600,
          border: "1.5px solid #C4622D",
          background: "transparent",
          color: "#C4622D",
          cursor: "pointer",
        }}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}

export default Nav;