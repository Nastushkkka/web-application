import React from 'react';

const Products = () => {
  return (
    <div className="products-container">
      <h2>Наши товары</h2>
      <div className="product-card">
        <img src="/images/product1.jpg" alt="Товар 1" />
        <h3>Название товара</h3>
        <p>Описание товара: качественный, стильный, доступный.</p>
        <p className="price">Цена: 99 BYN</p>
      </div>
    </div>
  );
};

export default Products;
