import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
  supabaseUser: SupabaseUser | null;
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
    email: 'atharva.student@saraswati.com',
    name: 'CR Atharva Kadam',
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
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        // Map to our User interface with mock data for now
        const mockUser = mockUsers.find(u => u.email === session.user.email);
        if (mockUser) {
          setUser({ ...mockUser, id: session.user.id });
        }
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setSupabaseUser(session.user);
          const mockUser = mockUsers.find(u => u.email === session.user.email);
          if (mockUser) {
            setUser({ ...mockUser, id: session.user.id });
          }
        } else {
          setSupabaseUser(null);
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        return { success: false, error: error.message };
      }

      // User will be set by the auth state change listener
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSupabaseUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, supabaseUser }}>
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
