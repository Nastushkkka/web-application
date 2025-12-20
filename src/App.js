import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cycleTheme } from './store/slices/themeSlice';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AppRouter from './router/AppRouter';
import Login from './pages/Login';
import { isAuthenticated, logout } from './utils/auth';
import './styles/App.css';

export default function App() {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme.current);
  const [auth, setAuth] = useState(isAuthenticated());

  // Создаём MUI тему на основе текущей 
  const theme = createTheme({
    palette: {
      mode: themeState.name === 'dark' ? 'dark' : 'light',
      primary: {
        main: themeState.primary,
      },
      secondary: {
        main: themeState.secondary,
      },
    },
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'webapp_user') {
        setAuth(isAuthenticated());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogin = () => setAuth(true);

  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  const handleCycleTheme = () => {
    dispatch(cycleTheme());
  };

  if (!auth) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider 
        maxSnack={3} 
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <AppRouter
          currentTheme={themeState}
          onCycleTheme={handleCycleTheme}
          onLogout={handleLogout}
        />
      </SnackbarProvider>
    </ThemeProvider>
  );
}