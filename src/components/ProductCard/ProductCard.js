import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductCard({ image, title, description, price, onAddToCart }) {
  return (
    <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="180"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom color="primary">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
          {price} BYN
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<ShoppingCartIcon />}
          fullWidth
          onClick={onAddToCart}
        >
          В корзину
        </Button>
      </CardActions>
    </Card>
  );
}