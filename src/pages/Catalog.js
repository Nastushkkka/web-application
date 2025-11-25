// src/pages/Catalog.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import "../App.css";

const products = [
  {
    id: 1,
    title: "Товар 1",
    description: "Качественный, стильный, доступный.",
    price: 99,
    image: "/images/product1.jpg"
  },
  {
    id: 2,
    title: "Товар 2",
    description: "Практичный и современный.",
    price: 120,
    image: "/images/product2.jpg"
  },
  {
    id: 3,
    title: "Товар 3",
    description: "Надёжный и современный.",
    price: 150,
    image: "/images/product3.jpg"
  }
];

export default function Catalog() {
  return (
    <div className="page-container">
      <h1 className="page-title">Наши товары</h1>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
