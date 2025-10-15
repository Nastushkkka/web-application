import React, { useState } from 'react';
import { login as doLogin } from '../utils/auth';

export default function Login(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function validate() {
    if (!email || !password) return 'Введите email и пароль';
    if (email.indexOf('@') === -1) return 'Некорректный email';
    if (password.length < 6) return 'Пароль должен быть не менее 6 символов';
    if (firstName && firstName.trim().length < 2) return 'Имя слишком короткое';
    if (lastName && lastName.trim().length < 2) return 'Фамилия слишком короткая';
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    const user = {
      email: email.trim(),
      firstName: firstName.trim() || null,
      lastName: lastName.trim() || null
    };

    doLogin(user);
    setError('');
    if (typeof props.onLogin === 'function') props.onLogin(user);
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 18, border: '1px solid #ddd', borderRadius: 6 }}>
      <h2 style={{ marginTop: 0 }}>Вход / Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Имя (необязательно)</label>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            type="text"
            name="firstName"
            autoComplete="given-name"
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Фамилия (необязательно)</label>
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            type="text"
            name="lastName"
            autoComplete="family-name"
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Пароль</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8 }}
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </div>

        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" style={{ padding: '8px 14px', cursor: 'pointer' }}>Войти</button>
          <button
            type="button"
            onClick={() => {
              setFirstName(''); setLastName(''); setEmail(''); setPassword(''); setError('');
            }}
            style={{ padding: '8px 12px', cursor: 'pointer' }}
          >
            Очистить
          </button>
        </div>
      </form>
    </div>
  );
}


