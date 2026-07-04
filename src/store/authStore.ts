import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'buyer' | 'seller' | 'admin'
  rating?: number
  totalSales?: number
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  register: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      register: (user: User) => {
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },
    }),
    { name: 'medicycle-auth' }
  )
)
