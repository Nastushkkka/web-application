import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Modal({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Сохранить',
  confirmColor = 'primary',
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {children}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Отмена
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} variant="contained" color={confirmColor}>
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}