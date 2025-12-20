import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SiteFrame from '../components/layout/SiteFrame';
import Catalog from '../pages/Catalog';
import Basket from '../pages/Basket';
import Profile from '../pages/Profile';
import Employees from '../pages/Employees';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

export default function AppRouter({ currentTheme, onCycleTheme, onLogout }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SiteFrame
              currentTheme={currentTheme}
              onCycleTheme={onCycleTheme}
              onLogout={onLogout}
            />
          }
        >
          <Route index element={<Navigate to="/catalog" replace />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="cart" element={<Basket />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={<Employees />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}