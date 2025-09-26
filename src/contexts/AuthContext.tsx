import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
  studentId?: string;
  class?: string;
  subject?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@edu.com',
    name: 'Rohan Sharma',
    role: 'student',
    studentId: 'STU2024001',
    class: '10-A',
  },
  {
    id: '2',
    email: 'teacher@edu.com',
    name: 'Prof. Rajesh Khanna',
    role: 'teacher',
    subject: 'Mathematics',
  },
  {
    id: '3',
    email: 'devansh.student@edu.com',
    name: 'Devansh Gupta',
    role: 'student',
    studentId: 'STU2024002',
    class: '10-B',
  },
  {
    id: '4',
    email: 'vivek.teacher@edu.com',
    name: 'Prof. Vivek Kulkarni',
    role: 'teacher',
    subject: 'Physics',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('edu_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('edu_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Simple password validation (in real app, this would be hashed)
    if (password !== 'password123') {
      setIsLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
    
    setUser(foundUser);
    localStorage.setItem('edu_user', JSON.stringify(foundUser));
    setIsLoading(false);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edu_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
