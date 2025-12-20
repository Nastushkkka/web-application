import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';
import { useSnackbar } from 'notistack';
import { Box, Typography, Paper, Button, Card, CardMedia, CardContent, CardActions, Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Modal from '../components/common/Modal';

export default function Basket() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const cartItems = useSelector((state) => state.cart.items);
  
  const [deleteModal, setDeleteModal] = useState({ open: false, item: null });
  const [clearModal, setClearModal] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenDeleteModal = (item) => {
    setDeleteModal({ open: true, item });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.item) {
      dispatch(removeFromCart(deleteModal.item.id));
      enqueueSnackbar(`${deleteModal.item.title} удалён из корзины`, { 
        variant: 'info',
        autoHideDuration: 5000,
      });
    }
    setDeleteModal({ open: false, item: null });
  };

  const handleConfirmClear = () => {
    dispatch(clearCart());
    enqueueSnackbar('Корзина очищена', { 
      variant: 'warning',
      autoHideDuration: 5000,
    });
    setClearModal(false);
  };

  const handleQuantityChange = (id, delta) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity < 1) {
        handleOpenDeleteModal(item);
      } else {
        dispatch(updateQuantity({ id, quantity: newQuantity }));
      }
    }
  };

  const handleCheckout = () => {
    enqueueSnackbar('Заказ оформлен! Спасибо за покупку!', { 
      variant: 'success',
      autoHideDuration: 5000,
    });
    dispatch(clearCart());
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Корзина
      </Typography>

      {cartItems.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <RemoveShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Ваша корзина пуста
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Добавьте товары из каталога
          </Typography>
        </Paper>
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<RemoveShoppingCartIcon />}
              onClick={() => setClearModal(true)}
            >
              Очистить корзину
            </Button>
          </Box>

          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card elevation={3}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      {item.price} BYN × {item.quantity} = {item.price * item.quantity} BYN
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        color="primary"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDeleteModal(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper elevation={3} sx={{ p: 3, mt: 3, maxWidth: 400 }}>
            <Typography variant="body1" gutterBottom>
              Всего товаров: <strong>{totalItems}</strong>
            </Typography>
            <Typography variant="h5" gutterBottom color="primary">
              Итого: <strong>{total} BYN</strong>
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              fullWidth
              onClick={handleCheckout}
            >
              Оформить заказ
            </Button>
          </Paper>
        </>
      )}

      {/* Модалка удаления товара */}
      <Modal
        open={deleteModal.open}
        title="Удалить товар?"
        onClose={() => setDeleteModal({ open: false, item: null })}
        onConfirm={handleConfirmDelete}
        confirmText="Удалить"
        confirmColor="error"
      >
        <Typography>
          Вы уверены, что хотите удалить <strong>{deleteModal.item?.title}</strong> из корзины?
        </Typography>
      </Modal>

      {/* Модалка очистки корзины */}
      <Modal
        open={clearModal}
        title="Очистить корзину?"
        onClose={() => setClearModal(false)}
        onConfirm={handleConfirmClear}
        confirmText="Очистить"
        confirmColor="error"
      >
        <Typography>
          Вы уверены, что хотите удалить все товары из корзины?
        </Typography>
      </Modal>
    </Box>
  );
}