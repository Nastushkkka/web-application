import React, { useState } from 'react';
import { login as doLogin } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      lastName: lastName.trim() || null,
      role: "Пользователь"
    };

    doLogin(user);
    setError('');
    if (typeof props.onLogin === 'function') props.onLogin(user);

    navigate("/profile"); 
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Ваш личный кабинет</h2>
        <form onSubmit={handleSubmit}>
          <label>Имя (необязательно):</label>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" />

          <label>Фамилия (необязательно):</label>
          <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" />

          <label>Email:</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />

          <label>Пароль:</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />

          {error && <div className="error">{error}</div>}

          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit">Войти</button>
            <button type="button" onClick={() => {
              setFirstName(''); setLastName(''); setEmail(''); setPassword(''); setError('');
            }}>Очистить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

