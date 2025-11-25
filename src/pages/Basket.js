import React from "react";
import "../App.css";

export default function Basket() {
  const basketItems = [
    { id: 1, title: "Товар 1", description: "Качественный, стильный, доступный.", price: 99, image: "/images/product1.jpg" },
    { id: 2, title: "Товар 2", description: "Практичный и современный.", price: 120, image: "/images/product2.jpg" },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Корзина</h1>

      {basketItems.length === 0 ? (
        <p className="page-text">Ваша корзина пуста.</p>
      ) : (
        <div className="products-container">
          {basketItems.map(item => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.title} className="product-image" />
              <h3>{item.title}</h3>
              <p className="page-text">{item.description}</p>
              <p className="price">Цена: {item.price} BYN</p>
              <button className="remove-btn">Удалить</button>
            </div>
          ))}
        </div>
      )}

      {basketItems.length > 0 && (
        <div className="basket-summary">
          <p>Всего товаров: <strong>{basketItems.length}</strong></p>
          <p>Общая сумма: <strong>{basketItems.reduce((sum, item) => sum + item.price, 0)} BYN</strong></p>
          <button className="checkout-btn">Оформить заказ</button>
        </div>
      )}
    </div>
  );
}
