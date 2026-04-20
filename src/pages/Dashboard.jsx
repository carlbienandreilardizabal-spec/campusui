import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { darkMode, user, events, addEvent, deleteEvent, toggleStatus } = useApp();
  const [form, setForm] = useState({ title: '', description: '', category: 'Workshop' });
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState('');

  const CATEGORIES = ['Workshop', 'Training', 'Career', 'Technology', 'Science', 'Entertainment'];

  const card = {
    background: darkMode ? '#1e293b' : '#fff',
    borderRadius: '14px',
    padding: '1.25rem',
    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 1rem',
    borderRadius: '10px',
    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    background: darkMode ? '#0f172a' : '#f8fafc',
    color: darkMode ? '#f1f5f9' : '#1e293b',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'inherit',
    marginBottom: '0.75rem',
    boxSizing: 'border-box',
  };

  const handleAdd = () => {
    if (!form.title.trim()) return;
    addEvent({ ...form, status: 'active' });
    setForm({ title: '', description: '', category: 'Workshop' });
    setShowForm(false);
    setMsg('Event added successfully!');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    setMsg('Event deleted.');
    setTimeout(() => setMsg(''), 3000);
  };

  const localEvents = events.filter(e => e.id.startsWith('local-'));
  const activeCount = events.filter(e => e.status === 'active').length;
  const inactiveCount = events.filter(e => e.status === 'inactive').length;

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: darkMode ? '#f1f5f9' : '#1e293b' }}>
          📊 Dashboard
        </h1>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginTop: '0.25rem' }}>
          Welcome back, <strong>{user?.name}</strong>! Manage your campus events here.
        </p>
      </div>

      {/* Success message */}
      {msg && (
        <div style={{ background: '#22c55e', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '10px', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem', animation: 'fadeIn 0.3s ease' }}>
          ✓ {msg}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        {[
          { label: 'Total Events', value: events.length, icon: '📋', color: '#4f46e5' },
          { label: 'Active', value: activeCount, icon: '✅', color: '#22c55e' },
          { label: 'Inactive', value: inactiveCount, icon: '⏸️', color: '#f59e0b' },
          { label: 'My Events', value: localEvents.length, icon: '⭐', color: '#06b6d4' },
        ].map(stat => (
          <div key={stat.label} style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.78rem', color: darkMode ? '#94a3b8' : '#64748b', marginTop: '0.1rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Add Event */}
      <div style={{ ...card, marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showForm ? '1.25rem' : 0 }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>➕ Add New Event</h2>
          <button onClick={() => setShowForm(!showForm)} style={{ padding: '0.4rem 1rem', borderRadius: '8px', background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
            {showForm ? 'Cancel' : '+ Add Event'}
          </button>
        </div>
        {showForm && (
          <div>
            <input style={inputStyle} placeholder="Event title *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Event description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={handleAdd} style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', background: '#22c55e', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>
              Save Event
            </button>
          </div>
        )}
      </div>

      {/* Event List */}
      <div style={card}>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>
          📋 All Events ({events.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {events.map(event => (
            <div key={event.id} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem',
              background: darkMode ? '#0f172a' : '#f8fafc',
              borderRadius: '10px', border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
              flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '0.15rem', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {event.title}
                </p>
                <p style={{ fontSize: '0.75rem', color: darkMode ? '#475569' : '#94a3b8' }}>{event.category} • {event.id}</p>
              </div>
              <span style={{
                padding: '0.2rem 0.65rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
                background: event.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                color: event.status === 'active' ? '#22c55e' : '#f59e0b',
                textTransform: 'uppercase',
              }}>
                {event.status}
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => toggleStatus(event.id)} style={{ padding: '0.35rem 0.8rem', borderRadius: '7px', border: 'none', background: darkMode ? '#334155' : '#e2e8f0', color: darkMode ? '#cbd5e1' : '#475569', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  Toggle
                </button>
                <button onClick={() => handleDelete(event.id)} style={{ padding: '0.35rem 0.8rem', borderRadius: '7px', border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
