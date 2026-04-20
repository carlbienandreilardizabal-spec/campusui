import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Home() {
  const { darkMode, isLoggedIn, user } = useApp();

  const card = {
    background: darkMode ? '#1e293b' : '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const features = [
    { icon: '📅', title: 'Browse Events', desc: 'Explore all upcoming campus events in one place.', link: '/events', cta: 'View Events' },
    { icon: '🔐', title: 'Secure Dashboard', desc: 'Manage events with role-protected access.', link: isLoggedIn ? '/dashboard' : '/login', cta: isLoggedIn ? 'Go to Dashboard' : 'Login to Access' },
    { icon: '⚡', title: 'Real-Time Updates', desc: 'Data refreshes automatically every 30 seconds.', link: '/events', cta: 'See Live Feed' },
  ];

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
        borderRadius: '20px',
        padding: '3.5rem 2.5rem',
        color: '#fff',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '0.5rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            🎓 Ilocos Sur Polytechnic State College
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Welcome{isLoggedIn ? `, ${user?.name}` : ''} to<br />CampusEventUI
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '520px', marginBottom: '1.5rem' }}>
            Your centralized hub for managing, discovering, and tracking campus events — built with React, Vite, and modern web technologies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/events" style={{
              background: '#fff', color: '#4f46e5', padding: '0.7rem 1.5rem',
              borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s',
            }}>
              📅 Browse Events
            </Link>
            {!isLoggedIn && (
              <Link to="/login" style={{
                background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.7rem 1.5rem',
                borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem',
                border: '2px solid rgba(255,255,255,0.4)',
              }}>
                🔐 Student Login
              </Link>
            )}
          </div>
        </div>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', background: 'rgba(255,255,255,0.07)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', right: '60px', bottom: '-60px', width: '160px', height: '160px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
      </div>

      {/* Feature Cards */}
      <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>
        What can you do?
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {features.map((f) => (
          <div key={f.title} style={card}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>{f.title}</h3>
            <p style={{ fontSize: '0.88rem', color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '1rem' }}>{f.desc}</p>
            <Link to={f.link} style={{
              display: 'inline-block', padding: '0.45rem 1rem', borderRadius: '8px',
              background: '#4f46e5', color: '#fff', fontSize: '0.85rem', fontWeight: 600,
            }}>
              {f.cta} →
            </Link>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Events', value: '50+', icon: '📋' },
          { label: 'Active Students', value: '1,200+', icon: '🎓' },
          { label: 'Departments', value: '8', icon: '🏫' },
        ].map(stat => (
          <div key={stat.label} style={{ ...card, flex: '1', minWidth: '160px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4f46e5', margin: '0.3rem 0' }}>{stat.value}</div>
            <div style={{ fontSize: '0.8rem', color: darkMode ? '#94a3b8' : '#64748b' }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
