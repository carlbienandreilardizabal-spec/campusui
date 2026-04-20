import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';

// ---------- Auth Context ----------
const AuthContext = createContext(null);

// ---------- Event Reducer ----------
const initialEvents = [
  { id: 'local-1', title: 'JS Workshop', category: 'Workshop', status: 'active', description: 'Deep dive into modern JavaScript.' },
  { id: 'local-2', title: 'React Bootcamp', category: 'Training', status: 'active', description: 'Full day hands-on React training.' },
  { id: 'local-3', title: 'Tech Career Fair', category: 'Career', status: 'inactive', description: 'Connect with top tech companies.' },
];

function eventReducer(state, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, { ...action.payload, id: 'local-' + Date.now() }];
    case 'DELETE_EVENT':
      return state.filter(e => e.id !== action.payload);
    case 'TOGGLE_STATUS':
      return state.map(e =>
        e.id === action.payload
          ? { ...e, status: e.status === 'active' ? 'inactive' : 'active' }
          : e
      );
    default:
      return state;
  }
}

// ---------- Combined Provider ----------
export function AppProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [events, dispatch] = useReducer(eventReducer, initialEvents);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const login = (username) => {
    setIsLoggedIn(true);
    setUser({ name: username });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const addEvent = (event) => dispatch({ type: 'ADD_EVENT', payload: event });
  const deleteEvent = (id) => dispatch({ type: 'DELETE_EVENT', payload: id });
  const toggleStatus = (id) => dispatch({ type: 'TOGGLE_STATUS', payload: id });

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, darkMode, setDarkMode, events, addEvent, deleteEvent, toggleStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useApp() {
  return useContext(AuthContext);
}
