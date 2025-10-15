const KEY = 'webapp_user';

export function login(user) {
  try {
    localStorage.setItem(KEY, JSON.stringify(user));
  } catch (e) {
    console.error('auth.login error', e);
  }
}

export function logout() {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    console.error('auth.logout error', e);
  }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('auth.getUser error', e);
    return null;
  }
}

export function isAuthenticated() {
  return !!getUser();
}
