import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Button, Box, LinearProgress } from '@mui/material';

export default function UndoSnackbar({ 
  open, 
  message, 
  duration = 5000, 
  onUndo, 
  onClose 
}) {
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  useEffect(() => {
    if (!open) {
      setProgress(100);
      setTimeLeft(duration / 1000);
      return;
    }

    const startTime = Date.now();
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      
      setProgress((remaining / duration) * 100);
      setTimeLeft(Math.ceil(remaining / 1000));

      if (remaining <= 0) {
        clearInterval(timer);
        onClose(false); // false = не отменено, удаляем
      }
    }, 100);

    return () => clearInterval(timer);
  }, [open, duration, onClose]);

  const handleUndo = () => {
    onClose(true); // true = отменено
    if (onUndo) onUndo();
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        severity="warning" 
        sx={{ width: '100%', minWidth: 350 }}
        action={
          <Button color="inherit" size="small" onClick={handleUndo}>
            ОТМЕНИТЬ
          </Button>
        }
      >
        <Box>
          {message} ({timeLeft} сек)
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mt: 1, height: 6, borderRadius: 3 }}
          />
        </Box>
      </Alert>
    </Snackbar>
  );
}