import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function About() {
  const features = [
    'Просмотр и управление каталогом товаров',
    'Адаптивный интерфейс для удобной работы на ПК и телефоне',
    'Авторизация и работа с профилями пользователей',
    'Просмотр списка сотрудников',
    'Добавление новых сотрудников (для администраторов)',
    'Редактирование информации о сотрудниках',
    'Удаление сотрудников (для администраторов)',
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        О приложении
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Добро пожаловать в систему управления магазином, созданную для удобного контроля и работы с данными!
        </Typography>
        <Typography variant="body1">
          Данное приложение объединяет управление товарами, сотрудниками и профилями пользователей в единой платформе.
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Возможности системы:
        </Typography>
        <List>
          {features.map((feature, idx) => (
            <ListItem key={idx} sx={{ py: 0.5 }}>
              <ListItemText primary={`• ${feature}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}