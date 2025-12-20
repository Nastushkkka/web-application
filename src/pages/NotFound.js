import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Paper elevation={3} sx={{ p: 6, maxWidth: 500, mx: 'auto' }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h3" gutterBottom color="error">
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Страница не найдена
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Похоже, такой страницы не существует :
        </Typography>
        <Button variant="contained" onClick={() => navigate('/catalog')}>
          Вернуться в каталог
        </Button>
      </Paper>
    </Box>
  );
}