import { create } from 'zustand'

export const useAuth = create((set) => ({
    isAuthenticated: !!localStorage.getItem('token') || false,
    setToken: (newToken: string) => set({ isAuthenticated: !!newToken }),
}))
