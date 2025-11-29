/*import React from "react";
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
}*/


import React from "react";
import "../components/ProductCard.css"; // лучше подключить стили карточки отдельно

export default function ProductCard({ image, title, description, price }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={title} className="product-image" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <strong className="price">{price} BYN</strong>
    </div>
  );
}
