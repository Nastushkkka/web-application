/*import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <NavLink to="/" end style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Home
      </NavLink>
      {' | '}
      <NavLink to="/about" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        About
      </NavLink>
      {' | '}
      <NavLink to="/dashboard" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Dashboard
      </NavLink>
    </nav>
  );
}
*/


import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar({ onLogout }) {
  const linkStyle = ({ isActive }) => ({
    marginRight: 12,
    textDecoration: "none",
    color: isActive ? "#fff" : "#cfcfcf",
    fontWeight: isActive ? "700" : "400"
  });

  return (
    <nav style={{ padding: "12px 18px", background: "#222", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <NavLink to="/" end style={linkStyle}>
          Главная
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          О приложении
        </NavLink>
        <NavLink to="/products" style={linkStyle}>
          Продукция
        </NavLink> {linkStyle}
      </div>
      <div>
        
      </div>
    </nav>
  );
}
