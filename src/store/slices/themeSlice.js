import { createSlice } from '@reduxjs/toolkit';

const themes = {
  light: {
    name: 'light',
    label: '☀️ Светлая',
    primary: '#1976d2',
    secondary: '#9c27b0',
  },
  dark: {
    name: 'dark',
    label: '🌙 Тёмная',
    primary: '#90caf9',
    secondary: '#ce93d8',
  },
  forest: {
    name: 'forest',
    label: '🌲 Лесная',
    primary: '#2e7d32',
    secondary: '#8d6e63',
  },
  sunset: {
    name: 'sunset',
    label: '🌅 Закат',
    primary: '#f57c00',
    secondary: '#d32f2f',
  },
  ocean: {
    name: 'ocean',
    label: '🌊 Океан',
    primary: '#0288d1',
    secondary: '#00838f',
  },
};

const loadTheme = () => {
  const saved = localStorage.getItem('webapp_theme');
  return themes[saved] || themes.light;
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    current: loadTheme(),
    available: Object.values(themes),
  },
  reducers: {
    setTheme: (state, action) => {
      const themeName = action.payload;
      if (themes[themeName]) {
        state.current = themes[themeName];
        localStorage.setItem('webapp_theme', themeName);
      }
    },
    cycleTheme: (state) => {
      const names = Object.keys(themes);
      const currentIndex = names.indexOf(state.current.name);
      const nextIndex = (currentIndex + 1) % names.length;
      state.current = themes[names[nextIndex]];
      localStorage.setItem('webapp_theme', names[nextIndex]);
    },
  },
});

export const { setTheme, cycleTheme } = themeSlice.actions;
export default themeSlice.reducer;