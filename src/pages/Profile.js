import React from 'react';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser() || {};
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  const greeting = fullName || user.email || 'гость';

  // Если не авторизован-редирект
  if (!user.email) {
    navigate('/login');
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Мой профиль
      </Typography>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 500 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5">
            Привет, {greeting}!
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Typography variant="body1">
            <strong>Имя:</strong> {fullName || 'Не указано'}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email || 'Не указан'}
          </Typography>
          <Typography variant="body1">
            <strong>Роль:</strong> {user.role || 'Пользователь'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}