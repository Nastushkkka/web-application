import React, { useState, useEffect } from "react";
import Table from "../Table";
import EmployeeAPI from "../api/service";
import { generateNumericId } from "../utils/id";
import "../App.css";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
     
     {/* было до использования Material
      <button
        className="add-btn"
        onClick={() => handleAdd("Новый сотрудник", "Unknown")}
      >
        Добавить сотрудника
      </button>*/}

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAdd("Новый сотрудник", "Unknown")}
      >
        Добавить сотрудника
      </Button>


      <Table
        employees={employees}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />

      {/* БЫЛО
      <div className="employee-counter">
        Всего сотрудников: <strong>{employees.length}</strong>
      </div>
      */}

      <Paper elevation={2} style={{ padding: "10px 12px", marginTop: 12 }}>
        <Typography variant="body1">
          Всего сотрудников: <strong>{employees.length}</strong>
        </Typography>
      </Paper>

    </div>
  );
}

