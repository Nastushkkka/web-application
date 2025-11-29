import { Outlet } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

export default function SiteFrame() {
  const user = getUser() || {};
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  const greeting = fullName || user.email || "гость";

  function handleLogout() {
    logout();
    window.location.replace("/login");
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-top">
          <h1 className="header-title">Мой магазин</h1>
          <div className="user-info">Приветствуем Вас, {greeting}!</div>
        </div>
        <div className="header-bottom">
          <nav className="header-nav">
            <a href="/catalog">Каталог</a>
            <a href="/cart">Корзина</a>
            <a href="/profile">Мой профиль</a>
            <a href="/employees">Сотрудники</a>
            <a href="/about">О нас</a>
          </nav>
          <button onClick={handleLogout} className="logout-btn">Выйти</button>
        </div>
      </header>

      <main className="app-content">
        <Outlet /> {/* сюда будут вставляться страницы */}
      </main>
    </div>
  );
}
