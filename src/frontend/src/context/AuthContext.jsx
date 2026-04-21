
/*
import { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

const mockUsers = {
  admin: { id: 1, username: 'adminUser', role: 'admin' },
  teacher: { id: 2, username: 'teacherUser', role: 'teacher' },
  student: { id: 3, username: 'studentUser', email: 'tipopa@gmail.com', role: 'student' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // mockUsers.student

  return (
    <AuthContext.Provider value={{ user, setUser, mockUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
 */


import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/me", { credentials: "include" })
        .then(res => res.ok ? res.json() : null)
        .then(data => { if (data) setUser(data); })
        .catch(() => {})
        .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("http://localhost:8080/api/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
    window.location.href = "/";
  };

  if (loading) return <div>Loading...</div>;

  return (
      <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
      </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}