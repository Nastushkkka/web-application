// src/components/ProductCard.jsx
import React from "react";
import "../App.css";

export default function ProductCard({ image, title, description, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">{price} BYN</p>
    </div>
  );
}
