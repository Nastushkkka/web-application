import React, { useState } from "react";
import Table from "../Table";
import { initialEmployees } from "../data/employees";
import { generateNumericId } from "../utils/id";
import "../App.css";

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleDelete = (id) => setEmployees(employees.filter(emp => emp.id !== id));

  const handleAdd = (firstName, lastName, role) => {
    if (!firstName || !firstName.trim()) return;
    const newEmployee = {
      id: generateNumericId(),
      firstName: firstName.trim(),
      lastName: (lastName || "").trim(),
      role: role || "Unknown",
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleEdit = (id, { firstName, lastName, role }) => {
    setEmployees(
      employees.map(emp =>
        emp.id === id
          ? { ...emp, firstName: firstName.trim(), lastName: lastName.trim(), role: role.trim() }
          : emp
      )
    );
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Сотрудники</h1>
      <button className="add-btn" onClick={() => handleAdd("Новый", "Сотрудник", "Unknown")}>
        Добавить сотрудника
      </button>
      <Table employees={employees} onDelete={handleDelete} onAdd={handleAdd} onEdit={handleEdit} />
      <div className="employee-counter">
        Всего сотрудников: <strong>{employees.length}</strong>
      </div>
    </div>
  );
}
