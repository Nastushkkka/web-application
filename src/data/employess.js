import { generateNumericId } from '../utils/id';

export const initialEmployees = [
  { id: generateNumericId(), firstName: 'Anastasia', lastName: 'Likhacheva', role: 'Teacher' },
  { id: generateNumericId(), firstName: 'Mikhail', lastName: 'Ivanov', role: 'Student' },
];
