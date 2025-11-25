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
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <img
          src="/images/product1.jpg"
          alt="Товар 1"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
            borderRadius: "6px",
            display: "block",
            margin: "0 auto 12px"
          }}
        />
        <h3 style={{ fontSize: "18px", color: "#1c4284", margin: "8px 0" }}>Название товара</h3>
        <p style={{ fontSize: "14px", color: "#333", marginBottom: "8px" }}>
          Описание: качественный, стильный, доступный.
        </p>
        <p style={{ fontWeight: "bold", color: "#2e7d32" }}>Цена: 99 BYN</p>
      </div>
    </div>
  );
}


