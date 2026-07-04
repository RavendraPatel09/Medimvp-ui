import { motion, AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { GlassSidebar } from './GlassSidebar'
import { TopNavbar } from './TopNavbar'
import { ToastContainer } from '../ui/ToastNotification'
import { useUIStore } from '../../store/uiStore'
import { pageVariants } from '../../lib/animations'

export function AppLayout() {
  const { sidebarCollapsed } = useUIStore()
  const location = useLocation()
  const sidebarWidth = sidebarCollapsed ? 72 : 256

  return (
    <div className="min-h-screen flex" style={{ background: '#03060F' }}>
      {/* Background aurora effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="aurora-1 absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-cyan-400/5 blur-[100px]" />
        <div className="aurora-2 absolute -bottom-60 -right-60 w-[600px] h-[600px] rounded-full bg-violet/5 blur-[100px]" />
        <div className="aurora-3 absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-rose/4 blur-[80px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-bg opacity-100" />
      </div>

      {/* Sidebar */}
      <GlassSidebar />

      {/* Main content area — offset by sidebar width */}
      <motion.div
        className="flex flex-col relative z-10 min-h-screen"
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{ width: `calc(100vw - ${sidebarWidth}px)` }}
      >
        {/* Top navbar — spans the remaining width */}
        <TopNavbar />

        {/* Page content */}
        <main className="flex-1 overflow-auto mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>

      <ToastContainer />
    </div>
  )
}
