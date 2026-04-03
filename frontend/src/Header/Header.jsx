import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const NAV_LINKS = [
  { label: "Home",    to: "/home"    },
  { label: "About",   to: "/about"   },
  { label: "Contact", to: "/contact" },
];

// Stagger delay per visual slot
const DELAYS = [0.05, 0.10, 0.13, 0.18, 0.21, 0.26, 0.29, 0.32];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  // Returns animated style for a given stagger slot index
  const animated = (idx, extra = {}) => ({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateX(0)" : "translateX(20px)",
    transition: isOpen
      ? `opacity 0.25s ${DELAYS[idx]}s, transform 0.3s ${DELAYS[idx]}s cubic-bezier(.2,0,.2,1)`
      : "opacity 0.15s, transform 0.2s cubic-bezier(.4,0,1,1)",
    pointerEvents: isOpen ? "all" : "none",
    ...extra,
  });

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%",
          height: "60px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          zIndex: 50,
          fontFamily: "'Sora', sans-serif",
          borderBottom: "1px solid #ebebeb",
          overflow: "hidden",
        }}
      >
        {/* Orange accent line */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, #f97316 30%, #fb923c 70%, transparent)",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0, zIndex: 2 }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #f97316, #fb923c)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
              alt="MindNest logo"
              style={{ width: 20, height: 20 }}
            />
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>
            MindNest
          </span>
        </div>

        {/* ── Inline animated links — slide in from right inside the header ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          right: 60,
          top: 0, bottom: 0,
        }}>

          {/* Nav links with separator dots */}
          {NAV_LINKS.map(({ label, to }, idx) => {
            const active = location.pathname === to;
            return (
              <React.Fragment key={to}>
                <Link
                  to={to}
                  onClick={() => setIsOpen(false)}
                  style={animated(idx * 2, {
                    fontSize: 13.5,
                    fontWeight: 400,
                    color: active ? "#f97316" : "#555",
                    padding: "0 14px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    position: "relative",
                  })}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#1a1a1a";
                      e.currentTarget.style.background = "#faf7f4";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#555";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {label}
                  {/* Active underline */}
                  {active && (
                    <span style={{
                      position: "absolute",
                      bottom: 0, left: 14, right: 14,
                      height: 2,
                      background: "#f97316",
                      borderRadius: "2px 2px 0 0",
                    }} />
                  )}
                </Link>

                {/* Dot separator between links */}
                {idx < NAV_LINKS.length - 1 && (
                  <span style={animated(idx * 2 + 1, {
                    width: 3, height: 3, borderRadius: "50%",
                    background: "#ddd", flexShrink: 0,
                    display: "inline-block",
                  })} />
                )}
              </React.Fragment>
            );
          })}

          {/* Dot before logout */}
          <span style={animated(6, {
            width: 3, height: 3, borderRadius: "50%",
            background: "#ddd", flexShrink: 0,
            display: "inline-block", marginLeft: 0,
          })} />

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={animated(6, {
              fontSize: 13.5,
              fontWeight: 400,
              color: "#e05252",
              padding: "0 14px",
              height: "60px",
              display: "flex",
              alignItems: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              whiteSpace: "nowrap",
            })}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#c0392b"; e.currentTarget.style.background = "#fff5f5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#e05252"; e.currentTarget.style.background = "transparent"; }}
          >
            Logout
          </button>

          {/* User chip */}
          {user && (
            <div style={animated(7, {
              display: "flex", alignItems: "center", gap: 6,
              padding: "4px 10px 4px 4px",
              borderRadius: 20,
              border: "1px solid #f0ebe4",
              background: "#faf7f4",
              fontSize: 12, color: "#888",
              whiteSpace: "nowrap",
              marginLeft: 6,
            })}>
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "linear-gradient(135deg, #f97316, #fb923c)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 600, color: "#fff", flexShrink: 0,
              }}>
                {initials}
              </div>
              {user.name}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen((p) => !p)}
          aria-label="Toggle menu"
          style={{
            width: 36, height: 36,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5,
            cursor: "pointer", borderRadius: 8,
            border: "1px solid #e8e8e8",
            background: "#fafafa", padding: 0,
            flexShrink: 0, zIndex: 2,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block",
              width: isOpen && i === 1 ? 0 : 16,
              height: 1.5,
              background: isOpen && i !== 1 ? "#f97316" : "#555",
              borderRadius: 2,
              transformOrigin: "center",
              transition: "transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s, width 0.3s, background 0.2s",
              transform: isOpen
                ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "none"
                : "none",
              opacity: isOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </header>

      {/* Spacer — keeps page content below the fixed header */}
      <div style={{ height: 60 }} />
    </>
  );
}

export default Header;