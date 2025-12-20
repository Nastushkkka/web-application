import axiosInstance from './axios';
import { ENDPOINTS } from './endpoints';

// Локальные данные (имитация базы данных)
let localEmployees = [
  { id: 1, name: 'Анастасия Лихачева', job: 'Менеджер' },
  { id: 2, name: 'Михаил Иванов', job: 'Продавец' },
  { id: 3, name: 'Наталья Аникова', job: 'Кладовщик' },
  { id: 4, name: 'Алексей Полузащитников', job: 'Продавец' },
  { id: 5, name: 'Людмила Шарендо', job: 'Бухгалтер' },
  { id: 6, name: 'Игорь Астапенко', job: 'Директор' },
];

const employeeService = {
  // Получить всех
  async getAll() {
    try {
      await axiosInstance.get(ENDPOINTS.EMPLOYEES);
    } catch (error) {
      console.warn('API недоступен, используем локальные данные');
    }
    return [...localEmployees];
  },

  // Получить по ID
  async getById(id) {
    return localEmployees.find((e) => e.id === id) || null;
  },

  // Добавить
  async add(employee) {
    try {
      await axiosInstance.post(ENDPOINTS.EMPLOYEES, employee);
    } catch (error) {
      console.warn('POST запрос не удался, сохраняем локально');
    }

    const maxId = localEmployees.reduce((max, e) => Math.max(max, e.id), 0);
    const newEmployee = {
      id: maxId + 1,
      name: employee.name,
      job: employee.job || 'Не указана',
    };
    localEmployees.push(newEmployee);
    return newEmployee;
  },

  // Обновить
  async update(employee) {
    try {
      await axiosInstance.put(`${ENDPOINTS.EMPLOYEES}/${employee.id}`, employee);
    } catch (error) {
      console.warn('PUT запрос не удался, обновляем локально');
    }

    const idx = localEmployees.findIndex((e) => e.id === employee.id);
    if (idx === -1) return null;

    localEmployees[idx] = { ...localEmployees[idx], ...employee };
    return localEmployees[idx];
  },

  // Удалить
  async delete(id) {
    try {
      await axiosInstance.delete(`${ENDPOINTS.EMPLOYEES}/${id}`);
    } catch (error) {
      console.warn('DELETE запрос не удался, удаляем локально');
    }

    localEmployees = localEmployees.filter((e) => e.id !== id);
    return true;
  },
};

export default employeeService;