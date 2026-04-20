import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { isLoggedIn, user, logout, darkMode, setDarkMode } = useApp();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    height: '64px',
    background: darkMode ? '#1e293b' : '#fff',
    borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'background 0.25s, border-color 0.25s',
  };

  const brand = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#4f46e5',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  };

  const linksStyle = {
    display: 'flex',
    gap: '0.25rem',
    alignItems: 'center',
  };

  const activeStyle = {
    color: '#4f46e5',
    fontWeight: 600,
  };

  const linkBase = {
    padding: '0.4rem 0.85rem',
    borderRadius: '8px',
    fontSize: '0.9rem',
    color: darkMode ? '#94a3b8' : '#64748b',
    transition: 'background 0.2s, color 0.2s',
  };

  const btnStyle = {
    padding: '0.4rem 1rem',
    borderRadius: '8px',
    fontSize: '0.85rem',
    fontWeight: 600,
    border: 'none',
    background: '#ef4444',
    color: '#fff',
    marginLeft: '0.5rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  const toggleBtn = {
    background: darkMode ? '#334155' : '#f1f5f9',
    border: 'none',
    borderRadius: '999px',
    padding: '0.4rem 0.75rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginLeft: '0.5rem',
  };

  return (
    <nav style={navStyle}>
      <div style={brand}>
        CampusEventUI
      </div>
      <div style={linksStyle}>
        {[
          { to: '/', label: '🏠 Home' },
          { to: '/events', label: '📅 Events' },
          { to: '/dashboard', label: '📊 Dashboard' },
          { to: '/login', label: isLoggedIn ? '👤 ' + user?.name : '🔐 Login' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              ...linkBase,
              ...(isActive ? activeStyle : {}),
              background: 'transparent',
            })}
          >
            {label}
          </NavLink>
        ))}
        <button style={toggleBtn} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        {isLoggedIn && (
          <button style={btnStyle} onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
