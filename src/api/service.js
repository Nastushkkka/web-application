const EmployeeAPI = {
  employees: [
    { number: 1, name: "Anastasia Likhacheva", job: "Teacher" },
    { number: 2, name: "Mikhail Ivanov", job: "Student" },
    { number: 3, name: "Natali Anikova", job: "Teacher" },
    { number: 4, name: "Aleks Midfielder", job: "Student" },
    { number: 5, name: "Ludmila Sharendo", job: "Student" },
    { number: 6, name: "Igor Astapenko", job: "Rector" },
  ],
  all: function () {
    return this.employees;
  },
  get: function (id) {
    const isEmployee = (p) => p.number === id;
    return this.employees.find(isEmployee);
  },
  delete: function (id) {
    const isNotDelEmployee = (p) => p.number !== id;
    this.employees = this.employees.filter(isNotDelEmployee);
    return;
  },
  add: function (employee) {
    this.employees.shift(employee);
    return employee;
  },
  update: function (employee) {
    this.get();
    this.employees.shift(employee);
    return employee;
  },
};
export default EmployeeAPI;
