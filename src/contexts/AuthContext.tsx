import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<UserRole, User> = {
  client: {
    id: 'client-1',
    email: 'client@company.ae',
    name: 'Ahmed Al Rashid',
    role: 'client',
    organization: 'Al Rashid Trading LLC',
  },
  employee: {
    id: 'emp-1',
    email: 'sarah@auditclue.ae',
    name: 'Sarah Johnson',
    role: 'employee',
    organization: 'Auditclue',
  },
  admin: {
    id: 'admin-1',
    email: 'admin@auditclue.ae',
    name: 'Michael Chen',
    role: 'admin',
    organization: 'Auditclue',
  },
  super_admin: {
    id: 'super-1',
    email: 'superadmin@auditclue.ae',
    name: 'David Williams',
    role: 'super_admin',
    organization: 'Auditclue',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
