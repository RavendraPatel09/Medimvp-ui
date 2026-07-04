import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from './components/layout/AppLayout'
import { useAuthStore } from './store/authStore'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Marketplace from './pages/Marketplace'
import MedicineDetails from './pages/MedicineDetails'
import AddMedicine from './pages/AddMedicine'
import Chat from './pages/Chat'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import AdminPanel from './pages/AdminPanel'

const queryClient = new QueryClient()

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/dashboard" replace />
}

function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-black font-display gradient-text mb-4">404</p>
        <p className="text-white/50 text-xl mb-6">Page not found</p>
        <a href="/" className="text-blue-400 hover:text-blue-300 transition-colors">← Back to Home</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route element={<RequireAuth><AppLayout /></RequireAuth>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/medicine/:id" element={<MedicineDetails />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Marketplace />} />

            {/* Admin only */}
            <Route path="/admin" element={<RequireAdmin><AdminPanel /></RequireAdmin>} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
