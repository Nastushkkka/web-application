const EmployeeAPI = {
  employees: [
    { number: 1, name: "Anastasia Likhacheva", job: "Teacher" },
    { number: 2, name: "Mikhail Ivanov", job: "Student" },
    { number: 3, name: "Natali Anikova", job: "Teacher" },
    { number: 4, name: "Aleks Midfielder", job: "Student" },
    { number: 5, name: "Ludmila Sharendo", job: "Student" },
    { number: 6, name: "Igor Astapenko", job: "Rector" },
  ],

  // all возвращает копию массива 
  all() {
    return this.employees.slice();
  },

  get(id) {
    return this.employees.find((p) => p.number === id) || null;
  },

  // delete удаляет по number
  delete(id) {
    this.employees = this.employees.filter((p) => p.number !== id);
  },

  // add вычисляет новый number и добавляет сотрудника
  add(employee) {
    const maxNumber = this.employees.reduce((m, e) => Math.max(m, e.number || 0), 0);
    const newEmployee = {
      number: maxNumber + 1,
      name: employee.name,
      job: employee.job || "Unknown",
    };
    this.employees = [...this.employees, newEmployee];
    return newEmployee;
  },

  update(employee) {
    const idx = this.employees.findIndex((p) => p.number === employee.number);
    if (idx === -1) return null;
    this.employees[idx] = { ...this.employees[idx], ...employee };
    return this.employees[idx];
  },
};

export default EmployeeAPI;
