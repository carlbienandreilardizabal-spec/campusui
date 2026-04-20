import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function EventDetails() {
  const { id } = useParams();
  const { darkMode, events: localEvents } = useApp();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CATEGORIES = ['Workshop', 'Training', 'Career', 'Technology', 'Science', 'Entertainment'];

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Check local events first
        const local = localEvents.find(e => e.id === id);
        if (local) {
          setEvent({ ...local, isLocal: true });
          setLoading(false);
          return;
        }

        // Otherwise fetch from API (api-{id})
        const numId = id.replace('api-', '');
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${numId}`);
        if (!res.ok) throw new Error('Event not found.');
        const data = await res.json();
        setEvent({
          id: `api-${data.id}`,
          title: data.title.charAt(0).toUpperCase() + data.title.slice(1),
          description: data.body,
          category: CATEGORIES[data.id % CATEGORIES.length],
          status: data.id % 3 === 0 ? 'inactive' : 'active',
          userId: data.userId,
          isLocal: false,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const box = {
    background: darkMode ? '#1e293b' : '#fff',
    borderRadius: '14px',
    padding: '1.5rem',
    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
    marginBottom: '1rem',
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
      <div style={{ width: '40px', height: '40px', border: '4px solid #4f46e5', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
      <p style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>Loading event details…</p>
    </div>
  );

  if (error || !event) return (
    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
      <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error || 'Event not found.'}</p>
      <button onClick={() => navigate('/events')} style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', background: '#4f46e5', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
        ← Back to Events
      </button>
    </div>
  );

  return (
    <div className="fade-in" style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: darkMode ? '#94a3b8' : '#64748b' }}>
        <Link to="/" style={{ color: '#4f46e5' }}>Home</Link>
        <span>›</span>
        <Link to="/events" style={{ color: '#4f46e5' }}>Events</Link>
        <span>›</span>
        <span>Event Details</span>
      </div>

      {/* Status accent bar */}
      <div style={{ height: '4px', borderRadius: '99px', background: event.status === 'active' ? 'linear-gradient(90deg,#4f46e5,#06b6d4)' : '#e2e8f0', marginBottom: '1.5rem' }} />

      {/* Main Info */}
      <div style={box}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: event.status === 'active' ? 'rgba(79,70,229,0.1)' : 'rgba(148,163,184,0.15)', color: event.status === 'active' ? '#4f46e5' : '#94a3b8', textTransform: 'uppercase' }}>
            {event.status}
          </span>
          <span style={{ padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, background: darkMode ? '#334155' : '#f1f5f9', color: darkMode ? '#cbd5e1' : '#475569' }}>
            📁 {event.category}
          </span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: darkMode ? '#f1f5f9' : '#1e293b', lineHeight: 1.3, marginBottom: '1rem' }}>
          {event.title}
        </h1>
        <p style={{ fontSize: '0.95rem', color: darkMode ? '#94a3b8' : '#64748b', lineHeight: 1.7 }}>
          {event.description}
        </p>
      </div>

      {/* Meta */}
      <div style={box}>
        <h2 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: darkMode ? '#475569' : '#94a3b8', marginBottom: '1rem' }}>
          Event Information
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { label: 'Event ID', value: event.id },
            { label: 'Status', value: event.status.charAt(0).toUpperCase() + event.status.slice(1) },
            { label: 'Category', value: event.category },
            { label: 'Source', value: event.isLocal ? 'Local Event' : 'API Event' },
          ].map(item => (
            <div key={item.label}>
              <p style={{ fontSize: '0.75rem', color: darkMode ? '#475569' : '#94a3b8', marginBottom: '0.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: darkMode ? '#cbd5e1' : '#1e293b', wordBreak: 'break-all' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back button */}
      <Link to="/events" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.7rem 1.5rem', borderRadius: '10px',
        background: '#4f46e5', color: '#fff', fontWeight: 600, fontSize: '0.9rem',
        transition: 'background 0.2s',
      }}>
        ← Back to Events
      </Link>
    </div>
  );
}
