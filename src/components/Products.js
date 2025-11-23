import React from "react";

export default function Products() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Продукция</h2>
      <div style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
        margin: "20px auto",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}>
        <img
          src="/images/product1.jpg" 
          alt="Товар 1"
          style={{ width: "100%", borderRadius: "4px" }}
        />
        <h3>Название товара</h3>
        <p>Описание: качественный, стильный, доступный.</p>
        <p style={{ fontWeight: "bold", color: "#2e7d32" }}>Цена: 99 BYN</p>
      </div>
    </div>
  );
}

