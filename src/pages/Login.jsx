import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { isLoggedIn, login, logout, darkMode } = useApp();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim()) { setError('Username is required.'); return; }
    if (password !== 'student123') { setError('Incorrect password. Try: student123'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // Simulate auth
    login(username.trim());
    setLoading(false);
    navigate('/dashboard');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: `1.5px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    background: darkMode ? '#0f172a' : '#f8fafc',
    color: darkMode ? '#f1f5f9' : '#1e293b',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    marginBottom: '1rem',
  };

  if (isLoggedIn) return (
    <div className="fade-in" style={{ maxWidth: '420px', margin: '3rem auto', textAlign: 'center' }}>
      <div style={{ background: darkMode ? '#1e293b' : '#fff', borderRadius: '20px', padding: '2.5rem', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontWeight: 800, marginBottom: '0.5rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>You're logged in!</h2>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '1.5rem', fontSize: '0.9rem' }}>You have access to the Dashboard.</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '0.65rem 1.4rem', borderRadius: '10px', background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
            Go to Dashboard
          </button>
          <button onClick={() => { logout(); }} style={{ padding: '0.65rem 1.4rem', borderRadius: '10px', background: '#ef4444', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in" style={{ maxWidth: '420px', margin: '3rem auto' }}>
      <div style={{
        background: darkMode ? '#1e293b' : '#fff',
        borderRadius: '20px',
        padding: '2.5rem',
        border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}>
        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'linear-gradient(135deg,#4f46e5,#06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 0.75rem' }}>
            🎓
          </div>
          <h1 style={{ fontWeight: 800, fontSize: '1.4rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Student Login</h1>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '0.85rem', marginTop: '0.3rem' }}>CampusEventUI — ISPSC</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 500, border: '1px solid rgba(239,68,68,0.2)' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Username / Student ID
          </label>
          <input style={inputStyle} value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. student01" autoComplete="username" />

          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Password
          </label>
          <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" />

          <p style={{ fontSize: '0.78rem', color: darkMode ? '#475569' : '#94a3b8', marginBottom: '1.25rem', textAlign: 'center' }}>
            Demo password: <strong style={{ color: '#4f46e5' }}>student123</strong>
          </p>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '0.8rem', borderRadius: '10px',
            background: loading ? '#a5b4fc' : 'linear-gradient(135deg,#4f46e5,#06b6d4)',
            color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
          }}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  );
}
