import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useAuthStore = create()(
    persist(
        (set) => ({
            isAuthenticated: !!localStorage.getItem('token') || false,
            token: localStorage.getItem('token') || '',
            setToken: (newToken: string) =>
                set({ isAuthenticated: !!newToken, token: newToken }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        }
    )
)
