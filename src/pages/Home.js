import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/about">About</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}