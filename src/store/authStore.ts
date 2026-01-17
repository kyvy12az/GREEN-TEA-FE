import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  address?: string;
  createdAt: string;
}

interface RegisterData {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Mock users database in localStorage
const USERS_STORAGE_KEY = 'mock-users-db';

const getMockUsers = (): Array<{ email: string; password: string; user: User }> => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveMockUser = (email: string, password: string, user: User) => {
  const users = getMockUsers();
  users.push({ email, password, user });
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const updateMockUser = (userId: string, data: Partial<User>) => {
  const users = getMockUsers();
  const userIndex = users.findIndex(u => u.user.id === userId);
  if (userIndex !== -1) {
    users[userIndex].user = { ...users[userIndex].user, ...data };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = getMockUsers();
        const foundUser = users.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (foundUser) {
          set({ user: foundUser.user, isAuthenticated: true });
          return true;
        }

        return false;
      },

      register: async (data: RegisterData): Promise<boolean> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        const users = getMockUsers();
        const existingUser = users.find(
          u => u.email.toLowerCase() === data.email.toLowerCase()
        );

        if (existingUser) {
          return false; // Email already exists
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          email: data.email,
          name: data.name,
          phone: data.phone,
          createdAt: new Date().toISOString(),
        };

        saveMockUser(data.email, data.password, newUser);
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...data };
          updateMockUser(currentUser.id, data);
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
