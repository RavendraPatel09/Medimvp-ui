import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBag, Plus, MessageSquare, Bell, User,
  ChevronLeft, ChevronRight, Shield, Pill, LogOut, Heart
} from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'
import { cn } from '../../lib/utils'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'cyan' },
  { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace', color: 'violet' },
  { icon: Plus, label: 'Add Medicine', path: '/add-medicine', color: 'emerald' },
  { icon: MessageSquare, label: 'Messages', path: '/chat', color: 'rose' },
  { icon: Bell, label: 'Notifications', path: '/notifications', color: 'cyan' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist', color: 'rose' },
  { icon: User, label: 'Profile', path: '/profile', color: 'violet' },
]

const adminItems = [
  { icon: Shield, label: 'Admin Panel', path: '/admin', color: 'rose' },
]

const colorMap: Record<string, string> = {
  cyan: 'text-cyan-400 group-hover:text-cyan-300',
  violet: 'text-violet-400 group-hover:text-violet-300',
  emerald: 'text-emerald-500 group-hover:text-emerald-400',
  rose: 'text-rose-400 group-hover:text-rose-300',
}

const activeBgMap: Record<string, string> = {
  cyan: 'bg-cyan-400/10 border-cyan-400/25 text-cyan-300',
  violet: 'bg-violet-500/10 border-violet-400/25 text-violet-300',
  emerald: 'bg-emerald-500/10 border-emerald-400/25 text-emerald-400',
  rose: 'bg-rose-500/10 border-rose-400/25 text-rose-300',
}

export function GlassSidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(6,12,27,0.98) 0%, rgba(3,6,15,0.99) 100%)',
        borderRight: '1px solid rgba(0,217,255,0.08)',
        boxShadow: '4px 0 40px rgba(0,0,0,0.6)',
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Logo */}
      <div className={cn('flex items-center h-16 border-b px-4 shrink-0', 'border-cyan-400/8')}
        style={{ borderBottom: '1px solid rgba(0,217,255,0.08)' }}
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-glow-cyan"
          style={{ background: 'linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)' }}
        >
          <Pill size={18} className="text-white" />
        </motion.div>

        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-3 overflow-hidden"
            >
              <p className="font-black text-lg font-display gradient-text whitespace-nowrap">MediCycle</p>
              <p className="text-[10px] text-cyan-400/50 whitespace-nowrap font-medium tracking-wider uppercase">Medicine Marketplace</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden space-y-1">
        {navItems.map((item) => (
          <SidebarItem key={item.path} {...item} collapsed={sidebarCollapsed} />
        ))}

        {user?.role === 'admin' && (
          <>
            <div className="my-3 mx-1 border-t" style={{ borderColor: 'rgba(0,217,255,0.06)' }} />
            <p className={cn('text-[9px] uppercase tracking-[0.15em] text-cyan-400/30 font-bold px-3 mb-2', sidebarCollapsed && 'hidden')}>
              Admin
            </p>
            {adminItems.map((item) => (
              <SidebarItem key={item.path} {...item} collapsed={sidebarCollapsed} />
            ))}
          </>
        )}
      </nav>

      {/* User footer */}
      <div className="px-3 pb-4 pt-3 shrink-0" style={{ borderTop: '1px solid rgba(0,217,255,0.06)' }}>
        <div className={cn(
          'flex items-center gap-3 px-2 py-2.5 rounded-xl cursor-pointer group transition-all duration-200',
          'hover:bg-white/5',
          sidebarCollapsed && 'justify-center'
        )}>
          <div className="relative shrink-0">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full border border-cyan-400/20 bg-base-800"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border-2 border-[#03060F]" />
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white/90 truncate">{user?.name}</p>
                <p className="text-xs text-cyan-400/40 truncate">{user?.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
          onClick={handleLogout}
          className={cn(
            'mt-1 flex items-center gap-3 w-full p-2 rounded-xl text-white/25 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200',
            sidebarCollapsed ? 'justify-center' : ''
          )}
          title="Sign Out"
        >
          <LogOut size={16} className="shrink-0" />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs font-medium">
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Collapse toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className="absolute -right-3.5 top-[4.5rem] w-7 h-7 rounded-full flex items-center justify-center z-50 transition-all"
        style={{
          background: 'linear-gradient(135deg, #091226 0%, #0D1B38 100%)',
          border: '1px solid rgba(0,217,255,0.18)',
          boxShadow: '0 0 12px rgba(0,217,255,0.15)',
        }}
      >
        {sidebarCollapsed ? <ChevronRight size={13} className="text-cyan-400" /> : <ChevronLeft size={13} className="text-cyan-400" />}
      </motion.button>
    </motion.aside>
  )
}

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  path: string
  color: string
  collapsed: boolean
}

function SidebarItem({ icon: Icon, label, path, color, collapsed }: SidebarItemProps) {
  return (
    <NavLink to={path}>
      {({ isActive }) => (
        <motion.div
          className={cn(
            'relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group border',
            isActive ? activeBgMap[color] : 'border-transparent text-white/35 hover:text-white/80 hover:bg-white/4',
            collapsed ? 'justify-center' : ''
          )}
          whileHover={{ x: collapsed ? 0 : 3 }}
          transition={{ duration: 0.15 }}
        >
          {/* Active indicator */}
          {isActive && (
            <motion.div
              layoutId="activeIndicator"
              className={cn('absolute left-0 w-0.5 rounded-full', {
                'bg-cyan-400': color === 'cyan',
                'bg-violet-400': color === 'violet',
                'bg-emerald-500': color === 'emerald',
                'bg-rose-400': color === 'rose',
              })}
              style={{ height: '60%', top: '20%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}

          <Icon size={17} className={cn('shrink-0 transition-all duration-200', isActive ? colorMap[color] : '')} />

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-medium whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip when collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-4 px-3 py-1.5 glass-strong rounded-xl text-xs text-white/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-glass font-medium"
              style={{ border: '1px solid rgba(0,217,255,0.15)' }}>
              {label}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-l border-b border-cyan-400/15"
                style={{ background: 'rgba(9,18,38,0.9)' }} />
            </div>
          )}
        </motion.div>
      )}
    </NavLink>
  )
}
