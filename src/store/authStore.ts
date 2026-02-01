import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { Provider } from '@supabase/supabase-js';

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
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  loginWithOAuth: (provider: 'google' | 'facebook') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      initializeAuth: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              const user: User = {
                id: profile.id,
                email: profile.email || session.user.email || '',
                name: profile.full_name || session.user.user_metadata?.full_name || '',
                avatar: profile.avatar_url || session.user.user_metadata?.avatar_url,
                phone: profile.phone,
                bio: profile.bio,
                address: profile.address,
                createdAt: profile.created_at,
              };
              set({ user, isAuthenticated: true, isLoading: false });
            } else {
              set({ isLoading: false });
            }
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Error initializing auth:', error);
          set({ isLoading: false });
        }
      },

      login: async (email: string, password: string): Promise<boolean> => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            // Xử lý lỗi cụ thể
            if (error.message.includes('Email not confirmed')) {
              throw new Error('EMAIL_NOT_CONFIRMED');
            }
            throw error;
          }

          if (data.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            if (profile) {
              const user: User = {
                id: profile.id,
                email: profile.email || data.user.email || '',
                name: profile.full_name || '',
                avatar: profile.avatar_url,
                phone: profile.phone,
                bio: profile.bio,
                address: profile.address,
                createdAt: profile.created_at,
              };
              set({ user, isAuthenticated: true });
              return true;
            }
          }
          return false;
        } catch (error: any) {
          console.error('Login error:', error);
          if (error.message === 'EMAIL_NOT_CONFIRMED') {
            throw error;
          }
          return false;
        }
      },

      register: async (data: RegisterData): Promise<boolean> => {
        try {
          const { data: authData, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
              data: {
                full_name: data.name,
                phone: data.phone,
              },
            },
          });

          if (error) {
            console.error('Supabase signup error:', error);
            throw error;
          }

          if (authData.user) {
            // Kiểm tra xem có cần xác thực email không
            // Nếu identities rỗng, nghĩa là cần xác thực email
            const needsEmailConfirmation = !authData.session && authData.user.identities && authData.user.identities.length === 0;
            
            if (needsEmailConfirmation) {
              // Không set user vào state vì chưa xác thực
              throw new Error('EMAIL_CONFIRMATION_REQUIRED');
            }
            
            // Profile sẽ được tạo tự động bởi trigger handle_new_user
            const user: User = {
              id: authData.user.id,
              email: data.email,
              name: data.name,
              phone: data.phone,
              createdAt: new Date().toISOString(),
            };
            set({ user, isAuthenticated: true });
            return true;
          }
          return false;
        } catch (error: any) {
          console.error('Register error:', error);
          if (error.message === 'EMAIL_CONFIRMATION_REQUIRED') {
            throw error;
          }
          throw error;
        }
      },

      loginWithOAuth: async (provider: 'google' | 'facebook') => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) throw error;
        } catch (error) {
          console.error('OAuth login error:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await supabase.auth.signOut();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      updateProfile: async (data: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              full_name: data.name,
              avatar_url: data.avatar,
              phone: data.phone,
              bio: data.bio,
              address: data.address,
              updated_at: new Date().toISOString(),
            })
            .eq('id', currentUser.id);

          if (error) throw error;

          const updatedUser = { ...currentUser, ...data };
          set({ user: updatedUser });
        } catch (error) {
          console.error('Update profile error:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
