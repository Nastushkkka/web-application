import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { useSnackbar } from 'notistack';
import { Box, Typography, Grid } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';

const products = [
  {
    id: 1,
    title: 'Колер жёлто-коричневый',
    description: 'Для внутренних работ',
    price: 9,
    image: '/images/koler1.jpg',
  },
  {
    id: 2,
    title: 'Колер серо-голубой',
    description: 'Цвет-хит сезона',
    price: 9,
    image: '/images/koler2.jpg',
  },
  {
    id: 3,
    title: 'Эмаль для пола',
    description: 'Износостойкая эмаль жёлто-коричневая',
    price: 15,
    image: '/images/product1.jpg',
  },
  {
    id: 4,
    title: 'Шпатлёвка',
    description: 'Полимерная для гипсокартона',
    price: 20,
    image: '/images/product2.jpg',
  },
  {
    id: 5,
    title: 'Грунтовка',
    description: 'Церезит СТ17',
    price: 32,
    image: '/images/product3.jpg',
  },
  {
    id: 6,
    title: 'Кисть малярная',
    description: '70 мм',
    price: 7,
    image: '/images/product4.jpg',
  },
];

export default function Catalog() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    enqueueSnackbar(`${product.title} добавлен в корзину!`, { 
      variant: 'success',
      autoHideDuration: 3000,
    });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Наши товары
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              onAddToCart={() => handleAddToCart(product)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}