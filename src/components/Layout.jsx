import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useApp } from '../context/AppContext';

export default function Layout() {
  const { darkMode } = useApp();
  return (
    <div style={{ minHeight: '100vh', background: darkMode ? '#0f172a' : '#f8fafc', transition: 'background 0.25s' }}>
      <Navbar />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <Outlet />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        fontSize: '0.8rem',
        color: darkMode ? '#475569' : '#94a3b8',
        borderTop: `1px solid ${darkMode ? '#1e293b' : '#e2e8f0'}`,
        marginTop: '2rem',
      }}>
        © 2026 CampusEventUI — ISPSC | Prof Elective 3 - Advanced Web Development: Front End 2
      </footer>
    </div>
  );
}
