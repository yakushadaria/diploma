import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const mockUsers = {
  admin: { id: 1, username: 'adminUser', role: 'admin' },
  teacher: { id: 2, username: 'teacherUser', role: 'teacher' },
  student: { id: 3, username: 'studentUser', role: 'student' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockUsers.student);

  return (
    <AuthContext.Provider value={{ user, setUser, mockUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}