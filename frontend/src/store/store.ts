import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type AuthState = {
    isAuthenticated: boolean
    token: string
    username: string
    setToken: (newToken: string) => void
    setUsername: (username: string) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            username: '',
            token: '',
            setToken: (newToken: string) => {
                set({ isAuthenticated: !!newToken, token: newToken })
            },
            setUsername: (username: string) => {
                set({ username })
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                token: state.token,
                username: state.username,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)
