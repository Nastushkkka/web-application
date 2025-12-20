import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export default function EmployeeTable({ employees = [], onDelete, onEdit, loading }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editJob, setEditJob] = useState('');

  const startEdit = (emp) => {
    setEditingId(emp.id);
    setEditName(emp.name || '');
    setEditJob(emp.job || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditJob('');
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    onEdit({
      id: editingId,
      name: editName.trim(),
      job: editJob.trim() || 'Не указана',
    });
    cancelEdit();
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Загрузка...</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold', width: 60 }}>#</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Имя</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Должность</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 'bold', width: 140 }} align="center">
              Действия
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((emp, idx) => (
            <TableRow key={emp.id} hover>
              <TableCell>{idx + 1}</TableCell>

              <TableCell>
                {editingId === emp.id ? (
                  <TextField
                    size="small"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    fullWidth
                    autoFocus
                  />
                ) : (
                  emp.name
                )}
              </TableCell>

              <TableCell>
                {editingId === emp.id ? (
                  <TextField
                    size="small"
                    value={editJob}
                    onChange={(e) => setEditJob(e.target.value)}
                    fullWidth
                  />
                ) : (
                  emp.job
                )}
              </TableCell>

              <TableCell align="center">
                {editingId === emp.id ? (
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <IconButton color="success" onClick={saveEdit} size="small">
                      <SaveIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={cancelEdit} size="small">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <IconButton color="primary" onClick={() => startEdit(emp)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => onDelete(emp)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </TableCell>
            </TableRow>
          ))}

          {employees.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#888' }}>
                Нет сотрудников
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}