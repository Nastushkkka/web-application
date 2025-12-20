import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './slices/employeesSlice';
import themeReducer from './slices/themeSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    theme: themeReducer,
    cart: cartReducer,
  },
});

export default store;