import React, { useState, useEffect } from "react";
import Table from "../Table";
import EmployeeAPI from "../api/service";
import { generateNumericId } from "../utils/id";
import "../App.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  // Загружаем сотрудников при монтировании
  useEffect(() => {
    setEmployees(EmployeeAPI.all());
  }, []);

  const handleDelete = (id) => {
    EmployeeAPI.delete(id);
    setEmployees(EmployeeAPI.all());
  };

  const handleAdd = (name, job) => {
    if (!name || !name.trim()) return;
    const newEmployee = {
      id: generateNumericId(),
      name: name.trim(),
      job: (job || "").trim() || "Unknown",
    };
    EmployeeAPI.add(newEmployee);
    setEmployees(EmployeeAPI.all());
  };

  const handleEdit = (id, { name, job }) => {
    EmployeeAPI.update({
      id,
      name: name.trim(),
      job: (job || "").trim() || "Unknown",
    });
    setEmployees(EmployeeAPI.all());
  };

  return (
    <div className="page-container">
      <button
        className="add-btn"
        onClick={() => handleAdd("Новый сотрудник", "Unknown")}
      >
        Добавить сотрудника
      </button>

      <Table
        employees={employees}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />

      <div className="employee-counter">
        Всего сотрудников: <strong>{employees.length}</strong>
      </div>
    </div>
  );
}

