import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeAPI from "./api/service";
import Table from "./Table";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { isAuthenticated, getUser, logout } from "./utils/auth";
import { generateNumericId } from "./utils/id";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    if (auth) {
      setEmployees(EmployeeAPI.all());
    } else {
      setEmployees([]);
    }
  }, [auth]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key === "webapp_user") {
        setAuth(isAuthenticated());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleDelete = (number) => {
    EmployeeAPI.delete(number);
    setEmployees(EmployeeAPI.all());
  };

  const handleAdd = (name, job) => {
    if (!name || !name.trim()) return;
    const newEmployee = {
      id: generateNumericId(), // уникальный числовой ID
      name: name.trim(),
      job: (job || "").trim() || "Unknown",
    };
   
    EmployeeAPI.add(newEmployee);
    setEmployees(EmployeeAPI.all());
  };

  const handleEdit = (number, { name, job }) => {
    const existing = EmployeeAPI.get(number);
    if (!existing) return;
    EmployeeAPI.update({ number, name: name.trim(), job: (job || "").trim() || "Unknown" });
    setEmployees(EmployeeAPI.all());
  };

  function handleLogin() {
    setAuth(true);
  }

  function handleLogout() {
    logout();
    setAuth(false);
  }

  if (!auth) {
    return <Login onLogin={handleLogin} />;
  }

  const user = getUser() || {};
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const greeting = fullName || user.email || "гость";

  return (
    <div className="App">
      <NavBar onLogout={handleLogout} />
      <header className="App-header" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div>
            <h3 style={{ margin: 0 }}>Привет, {greeting}!</h3>
            <div style={{ fontSize: 28, color: "#ddd" }}>Добро пожаловать в приложение!</div>
          </div>
          <div>
            <button onClick={handleLogout} style={{ padding: "6px 10px", cursor: "pointer" }}>
              Выйти
            </button>
          </div>
        </div>

        <div style={{ marginTop: 20, width: "100%" }}>
          <Table
            employees={employees}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onEdit={handleEdit}
          />

          {/* Счётчик сотрудников */}
          <div style={{
            marginTop: 12,
            padding: "10px 12px",
            background: "#fafafa",
            border: "1px solid #eee",
            borderRadius: 6,
            display: "inline-block",
            fontSize: 14,
            color: "#333"
          }}>
            Всего сотрудников: <strong>{employees.length}</strong>
          </div>
        </div>
      </header>
    </div>
  );
}
