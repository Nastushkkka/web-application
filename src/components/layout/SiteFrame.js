import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box, Container, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getUser } from '../../utils/auth';

export default function SiteFrame({ currentTheme, onCycleTheme, onLogout }) {
  const user = getUser() || {};
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  const greeting = fullName || user.email || 'гость';

  const navLinkStyle = ({ isActive }) => ({
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '4px',
    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
    fontWeight: isActive ? 600 : 400,
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            🏗️ СтройМаркет
          </Typography>

          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            <NavLink to="/catalog" style={navLinkStyle}>Каталог</NavLink>
            <NavLink to="/cart" style={navLinkStyle}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon fontSize="small" />
              </Badge>
              Корзина
            </NavLink>
            <NavLink to="/employees" style={navLinkStyle}>Сотрудники</NavLink>
            <NavLink to="/profile" style={navLinkStyle}>Профиль</NavLink>
            <NavLink to="/about" style={navLinkStyle}>О нас</NavLink>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
              Привет, {greeting}!
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={onCycleTheme}
            >
              {currentTheme.label}
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={onLogout}
            >
              Выйти
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}