import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: (email) =>
        set({
          user: {
            name: email.split('@')[0],
            email,
            role: email.includes('admin') ? 'admin' : 'customer'
          }
        }),

      register: (name, email) =>
        set({
          user: {
            name,
            email,
            role: 'customer'
          }
        }),

      logout: () => set({ user: null })
    }),
    {
      name: 'mon-ecommerce-auth'
    }
  )
);