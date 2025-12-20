import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../store/slices/employeesSlice';
import { useSnackbar } from 'notistack';
import EmployeeTable from '../components/common/EmployeeTable';
import Modal from '../components/common/Modal';
import UndoSnackbar from '../components/common/UndoSnackbar';
import { Button, TextField, Box, Paper, Typography, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function Employees() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { items: employees, loading, error } = useSelector((state) => state.employees);

  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newJob, setNewJob] = useState('');
  const [formError, setFormError] = useState('');

  // Состояние для отложенного удаления
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Кастомный валидатор
  const validateEmployee = (name, job) => {
    if (!name || name.trim().length < 2) {
      return 'Имя должно содержать минимум 2 символа';
    }
    if (name.trim().length > 50) {
      return 'Имя слишком длинное (максимум 50 символов)';
    }
    if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name.trim())) {
      return 'Имя может содержать только буквы, пробелы и дефисы';
    }
    if (job && job.trim().length > 30) {
      return 'Должность слишком длинная (максимум 30 символов)';
    }
    return '';
  };

  const handleOpenModal = () => {
    setNewName('');
    setNewJob('');
    setFormError('');
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormError('');
  };

  const handleAddEmployee = () => {
    const error = validateEmployee(newName, newJob);
    if (error) {
      setFormError(error);
      return;
    }

    dispatch(addEmployee({
      name: newName.trim(),
      job: newJob.trim() || 'Не указана',
    }));
    enqueueSnackbar(`Сотрудник ${newName} добавлен!`, { variant: 'success' });
    handleCloseModal();
  };

  const handleEdit = (employee) => {
    const error = validateEmployee(employee.name, employee.job);
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      return;
    }
    dispatch(updateEmployee(employee));
    enqueueSnackbar('Данные сотрудника обновлены', { variant: 'info' });
  };

  // Начинаем отложенное удаление
  const handleDelete = (employee) => {
    setPendingDelete(employee);
  };

  // Когда таймер истёк или отменено
  const handleDeleteClose = (wasCancelled) => {
    if (!wasCancelled && pendingDelete) {
      // Не отменено — удаляем!
      dispatch(deleteEmployee(pendingDelete.id));
      enqueueSnackbar(`${pendingDelete.name} удалён`, { variant: 'success' });
    }
    setPendingDelete(null);
  };

  // Кнопка "Отменить" нажата
  const handleUndo = () => {
    enqueueSnackbar('Удаление отменено', { variant: 'info' });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Сотрудники
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
        sx={{ mb: 2 }}
      >
        Добавить сотрудника
      </Button>

      <EmployeeTable
        employees={employees}
        onDelete={handleDelete}
        onEdit={handleEdit}
        loading={loading}
      />

      <Paper elevation={2} sx={{ p: 2, mt: 2, display: 'inline-block' }}>
        <Typography variant="body1">
          Всего сотрудников: <strong>{employees.length}</strong>
        </Typography>
      </Paper>

      {/* Модалка добавления */}
      <Modal
        open={modalOpen}
        title="Добавить сотрудника"
        onClose={handleCloseModal}
        onConfirm={handleAddEmployee}
        confirmText="Добавить"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Имя сотрудника"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              setFormError('');
            }}
            fullWidth
            required
            autoFocus
            error={!!formError}
            helperText={formError || 'Минимум 2 символа, только буквы'}
          />
          <TextField
            label="Должность"
            value={newJob}
            onChange={(e) => setNewJob(e.target.value)}
            fullWidth
          />
        </Box>
      </Modal>

      {/* Уведомление с отменой удаления */}
      <UndoSnackbar
        open={!!pendingDelete}
        message={`Сотрудник "${pendingDelete?.name}" будет удалён`}
        duration={5000}
        onUndo={handleUndo}
        onClose={handleDeleteClose}
      />
    </Box>
  );
}