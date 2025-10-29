import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from '../App';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Login from '../components/Login';
import { isAuthenticated } from '../utils/auth';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/login"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <Login onLogin={() => window.location.replace("/")} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
