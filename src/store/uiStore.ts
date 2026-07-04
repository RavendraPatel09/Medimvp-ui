import { create } from 'zustand'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}

interface UIState {
  sidebarCollapsed: boolean
  darkMode: boolean
  toasts: Toast[]
  activeModal: string | null
  setSidebarCollapsed: (v: boolean) => void
  toggleSidebar: () => void
  toggleDarkMode: () => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  openModal: (name: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarCollapsed: false,
  darkMode: true,
  toasts: [],
  activeModal: null,

  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

  addToast: (toast) => {
    const id = Date.now().toString()
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
    setTimeout(() => get().removeToast(id), 4000)
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  openModal: (name) => set({ activeModal: name }),
  closeModal: () => set({ activeModal: null }),
}))
