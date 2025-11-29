import React from "react";
import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser() || {};
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const greeting = fullName || user.email || "гость";

  function handleLogout() {
    logout();
    navigate("/login"); 
  }

  if (!user.email) {
    navigate("/login");
    return null;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Мой профиль</h1>
      <p className="page-text">Приветствуем Вас, {greeting}!</p>

      <div className="profile-card">
        <p className="page-text"><strong>Имя:</strong> {fullName || "Не указано"}</p>
        <p className="page-text"><strong>Email:</strong> {user.email || "Не указан"}</p>
        <p className="page-text"><strong>Роль:</strong> {user.role || "Пользователь"}</p>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Выйти</button>
    </div>
  );
}
