import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeAPI from "./api/service";
import Table from "./Table";
import Login from "./components/Login";
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
      id: generateNumericId(),
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
      <header className="app-header">
        {/* Верхняя часть шапки */}
        <div className="header-top">
          <h1 className="header-title">Мой магазин</h1>
          <div className="user-info">Приветствуем Вас, {greeting}!</div>
        </div>

        {/* Нижняя часть шапки */}
        <div className="header-bottom">
          <nav className="header-nav">
            <a href="/catalog" className="active">Каталог</a>
            <a href="/cart">Корзина</a>
            <a href="/orders">Заказы</a>
            <a href="/profile">Мой профиль</a>
            <a href="/profile">Сотрудники</a>
            <a href="/profile">О нас</a>
          </nav>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      </header>

      {/* Основной контент */}
      <main className="app-content">
        <button className="add-btn" onClick={() => handleAdd("Новый сотрудник", "Unknown")}>
          Добавить сотрудника
        </button>

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
      </main>
    </div>
  );
}
