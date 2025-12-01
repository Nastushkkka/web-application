import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SiteFrame from "../components/SiteFrame";
import About from "../pages/About";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Basket";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Login from "../components/Login";
import Employees from "../pages/Employees"; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* редирект с корня на каталог */}
        <Route path="/" element={<Navigate to="/catalog" replace />} />

        {/* рамка с шапкой и навигацией */}
        <Route path="/" element={<SiteFrame />}>
          <Route path="catalog" element={<Catalog />} />
          <Route path="cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={<Employees />} /> 
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* отдельный маршрут для логина */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
