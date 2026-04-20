import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['All', 'Workshop', 'Training', 'Career', 'Technology', 'Science', 'Entertainment'];

export default function Events() {
  const { darkMode, events: localEvents } = useApp();
  const [apiEvents, setApiEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [dataUpdatedMsg, setDataUpdatedMsg] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchEvents = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
      if (!res.ok) throw new Error('Failed to fetch events.');
      const data = await res.json();
      setApiEvents(data);
      setLastUpdated(new Date());
      setError(null);
      if (isRefresh) {
        setDataUpdatedMsg(true);
        setTimeout(() => setDataUpdatedMsg(false), 3000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  
  useEffect(() => {
    const interval = setInterval(() => fetchEvents(true), 30000);
    return () => clearInterval(interval);
  }, [fetchEvents]);

  const card = (isActive) => ({
    background: darkMode ? '#1e293b' : '#fff',
    borderRadius: '14px',
    padding: '1.25rem',
    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative',
    overflow: 'hidden',
  });

  const mappedApi = apiEvents.map(p => ({
    id: `api-${p.id}`,
    title: p.title.charAt(0).toUpperCase() + p.title.slice(1),
    description: p.body,
    category: CATEGORIES[1 + (p.id % (CATEGORIES.length - 1))],
    status: p.id % 3 === 0 ? 'inactive' : 'active',
  }));

  const allEvents = [...localEvents, ...mappedApi];

  const filtered = allEvents.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.description || '').toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || e.category === category;
    return matchSearch && matchCat;
  });

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid #4f46e5', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
      <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Loading campus events…</p>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
      <p style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 600 }}>{error}</p>
      <button onClick={() => fetchEvents()} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
        Retry
      </button>
    </div>
  );

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: darkMode ? '#f1f5f9' : '#1e293b' }}>📅 Campus Events</h1>
          {lastUpdated && (
            <p style={{ fontSize: '0.78rem', color: darkMode ? '#475569' : '#94a3b8', marginTop: '0.25rem' }}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        {dataUpdatedMsg && (
          <span style={{ background: '#22c55e', color: '#fff', padding: '0.35rem 0.85rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600, animation: 'fadeIn 0.3s ease' }}>
            ✓ Data Updated
          </span>
        )}
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search events…"
          style={{
            flex: 1, minWidth: '200px', padding: '0.65rem 1rem', borderRadius: '10px',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            background: darkMode ? '#1e293b' : '#fff',
            color: darkMode ? '#f1f5f9' : '#1e293b',
            fontSize: '0.9rem', outline: 'none',
          }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: '0.65rem 1rem', borderRadius: '10px',
            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            background: darkMode ? '#1e293b' : '#fff',
            color: darkMode ? '#f1f5f9' : '#1e293b',
            fontSize: '0.9rem', outline: 'none', cursor: 'pointer',
          }}
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Results count */}
      <p style={{ fontSize: '0.85rem', color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '1rem' }}>
        Showing {filtered.length} event{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Events Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: darkMode ? '#475569' : '#94a3b8' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🔎</div>
          <p>No events match your search.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((event, i) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{ ...card(event.status === 'active'), animationDelay: `${i * 0.04}s` }}
                className="fade-in"
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(79,70,229,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                {/* Status bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: event.status === 'active' ? 'linear-gradient(90deg,#4f46e5,#06b6d4)' : '#e2e8f0',
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px',
                    background: event.status === 'active' ? 'rgba(79,70,229,0.1)' : 'rgba(148,163,184,0.15)',
                    color: event.status === 'active' ? '#4f46e5' : '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {event.status}
                  </span>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '999px',
                    background: darkMode ? '#334155' : '#f1f5f9',
                    color: darkMode ? '#94a3b8' : '#64748b',
                  }}>
                    {event.category}
                  </span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.97rem', color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '0.5rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: darkMode ? '#94a3b8' : '#64748b', lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  {event.description}
                </p>
                <span style={{ fontSize: '0.8rem', color: '#4f46e5', fontWeight: 600 }}>View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
