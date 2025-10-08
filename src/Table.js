import React, { useState } from "react";

const Table = ({ employees, onDelete, onAdd }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const submitAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, job);
    setName("");
    setJob("");
  };

  return (
    <div style={{ width: "90%", maxWidth: 800, margin: "0 auto" }}>
      <form onSubmit={submitAdd} style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ flex: 2, padding: 8 }}
        />
        <input
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="Job"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit" style={{ padding: "8px 12px" }}>Add</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px 0" }}>Name</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px 0" }}>Job</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc", padding: "8px 0" }}>Remove</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.number}>
              <td style={{ padding: "8px 0" }}>{employee.name}</td>
              <td style={{ padding: "8px 0" }}>{employee.job}</td>
              <td style={{ padding: "8px 0" }}>
                <button onClick={() => onDelete(employee.number)}>Delete</button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="3" style={{ paddingTop: 12, color: "#ddd" }}>No employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

