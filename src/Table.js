import React, { useState } from "react";

export default function Table({ employees = [], onDelete, onAdd, onEdit }) {
  const [addingName, setAddingName] = useState("");
  const [addingJob, setAddingJob] = useState("");

  const [editingNumber, setEditingNumber] = useState(null);
  const [editName, setEditName] = useState("");
  const [editJob, setEditJob] = useState("");

  function startEdit(item) {
    setEditingNumber(item.number);
    setEditName(item.name || "");
    setEditJob(item.job || "");
  }

  function cancelEdit() {
    setEditingNumber(null);
    setEditName("");
    setEditJob("");
  }

  function saveEdit() {
    if (!editName || !editName.trim()) return;
    if (typeof onEdit === "function") {
      onEdit(editingNumber, { name: editName.trim(), job: (editJob || "").trim() || "Unknown" });
    }
    cancelEdit();
  }

  function handleAddClick() {
    if (!addingName || !addingName.trim()) return;
    if (typeof onAdd === "function") {
      onAdd(addingName.trim(), addingJob.trim());
      setAddingName("");
      setAddingJob("");
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>
          <th style={{ padding: "8px" }}> 
          <span style={{ visibility: "hidden" }}>#</span> 
          </th>
            <th style={{ padding: "8px 1px" }}>Имя</th>
            <th style={{ padding: "8px 1px" }}>Должность</th>
            <th style={{ padding: "8px 1px" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, idx) => (
            <tr key={emp.number} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px", width: 40 }}>{idx + 1}</td>

              <td style={{ padding: "8px" }}>
                {editingNumber === emp.number ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ width: "100%", padding: 6 }}
                  />
                ) : (
                  emp.name
                )}
              </td>

              <td style={{ padding: "8px", width: 200 }}>
                {editingNumber === emp.number ? (
                  <input
                    value={editJob}
                    onChange={(e) => setEditJob(e.target.value)}
                    style={{ width: "100%", padding: 6 }}
                  />
                ) : (
                  emp.job
                )}
              </td>

              <td style={{ padding: "8px", width: 240 }}>
                {editingNumber === emp.number ? (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={saveEdit} style={{ padding: "6px 10px", cursor: "pointer" }}>
                      Сохранить
                    </button>
                    <button onClick={cancelEdit} style={{ padding: "6px 10px", cursor: "pointer" }}>
                      Отмена
                    </button>
                    <button
                      onClick={() => {
                        if (onDelete) onDelete(emp.number);
                        cancelEdit();
                      }}
                      style={{ padding: "6px 10px", cursor: "pointer" }}
                    >
                      Удалить
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => startEdit(emp)} style={{ padding: "6px 10px", cursor: "pointer" }}>
                      Редактировать
                    </button>
                    <button onClick={() => { if (onDelete) onDelete(emp.number); }} style={{ padding: "6px 10px", cursor: "pointer" }}>
                      Удалить
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}

          {employees.length === 0 && (
            <tr>
              <td colSpan="4" style={{ padding: "12px", color: "#666" }}>
                Нет сотрудников
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: 16, display: "flex", gap: 8, alignItems: "center" }}>
        <input
          placeholder="Имя"
          value={addingName}
          onChange={(e) => setAddingName(e.target.value)}
          style={{ padding: 8, flex: "1 1 200px" }}
        />
        <input
          placeholder="Должность"
          value={addingJob}
          onChange={(e) => setAddingJob(e.target.value)}
          style={{ padding: 8, width: 200 }}
        />
        <button onClick={handleAddClick} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Добавить
        </button>
      </div>
    </div>
  );
}
