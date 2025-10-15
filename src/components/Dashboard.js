import React from 'react';
import { getUser, logout } from '../utils/auth';

export default function Dashboard(props) {
  const user = getUser() || {};
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
  const greeting = fullName || user.email || 'гость';

  function handleLogout() {
    logout();
    if (typeof props.onLogout === 'function') props.onLogout();
  }

  return React.createElement(
    'div',
    { style: { maxWidth: 720, margin: '40px auto', padding: 18 } },
    React.createElement('h2', null, 'Привет, ' + greeting + '!'),
    React.createElement(
      'p',
      { style: { fontSize: '20px', fontWeight: 700, marginTop: 8, lineHeight: 1.2 } },
      'Добро пожаловать'
    ),
    React.createElement('button', { onClick: handleLogout, style: { padding: '8px 12px' } }, 'Выйти')
  );
  
}
