import React, { useState, useEffect } from "react";
import "./App.css";
import EmployeeAPI from "./api/service";
import Table from "./Table";

export default function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(EmployeeAPI.all());
  }, []);

  // обработчик удаления, вызывает EmployeeAPI.delete и обновляет state
  const handleDelete = (number) => {
    EmployeeAPI.delete(number);
    setEmployees(EmployeeAPI.all());
  };

  //обработчик добавления
  const handleAdd = (name, job) => {
    if (!name || !name.trim()) return;
    EmployeeAPI.add({ name: name.trim(), job: (job || "").trim() || "Unknown" });
    setEmployees(EmployeeAPI.all());
  };

  return (
    <div className="App">
      <header className="App-header">
        {
        
        }
        <Table employees={employees} onDelete={handleDelete} onAdd={handleAdd} />
      </header>
    </div>
  );
}
