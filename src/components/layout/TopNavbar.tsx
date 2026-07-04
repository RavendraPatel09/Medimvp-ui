import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, Sun, Moon, X, ChevronDown } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'
import { NOTIFICATIONS, MEDICINES } from '../../data/mockData'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../lib/utils'

export function TopNavbar() {
  const { darkMode, toggleDarkMode } = useUIStore()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = NOTIFICATIONS.filter((n) => !n.isRead).length
  const searchResults = searchQuery
    ? MEDICINES.filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header
      className="sticky top-0 z-30 h-16 flex items-center gap-4 px-6"
      style={{
        background: 'rgba(3,6,15,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,217,255,0.07)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
      }}
    >
      {/* Search */}
      <div ref={searchRef} className="relative flex-1 max-w-md">
        <div className={cn(
          'flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 transition-all duration-200',
          searchOpen
            ? 'border-cyan-400/40 shadow-[0_0_0_3px_rgba(0,217,255,0.10)]'
            : 'border-white/6 hover:border-cyan-400/20',
          'border'
        )}
          style={{ background: 'rgba(9,18,38,0.8)' }}
        >
          <Search size={15} className="text-cyan-400/40 shrink-0" />
          <input
            className="flex-1 bg-transparent text-sm text-white/80 outline-none placeholder-white/20 min-w-0"
            placeholder="Search medicines, sellers…"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true) }}
            onFocus={() => setSearchOpen(true)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-white/25 hover:text-white/60 transition-colors shrink-0">
              <X size={13} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 text-[10px] text-white/20 font-mono bg-white/4 px-1.5 py-0.5 rounded border border-white/6 shrink-0">
            ⌘K
          </kbd>
        </div>

        <AnimatePresence>
          {searchOpen && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-2xl overflow-hidden shadow-glass-lg z-50"
              style={{ border: '1px solid rgba(0,217,255,0.12)' }}
            >
              {searchResults.map((m) => (
                <button
                  key={m.id}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-400/6 transition-colors text-left border-b last:border-0"
                  style={{ borderColor: 'rgba(0,217,255,0.06)' }}
                  onClick={() => { navigate(`/medicine/${m.id}`); setSearchOpen(false); setSearchQuery('') }}
                >
                  <div className="w-9 h-9 rounded-xl overflow-hidden bg-base-700 shrink-0 border border-white/5">
                    <img src={m.images[0]} alt={m.name} className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/36x36/091226/00D9FF?text=💊` }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/90 font-medium truncate">{m.name}</p>
                    <p className="text-xs text-white/35">{m.manufacturer}</p>
                  </div>
                  <span className="text-sm font-bold gradient-text-cyan shrink-0">₹{m.sellingPrice}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 ml-auto">
        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl text-white/30 hover:text-cyan-400 hover:bg-cyan-400/8 transition-all duration-200"
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </motion.button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
            className="relative p-2.5 rounded-xl text-white/30 hover:text-cyan-400 hover:bg-cyan-400/8 transition-all duration-200"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00D9FF, #7C3AED)', color: '#fff' }}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-2 right-0 w-80 glass-strong rounded-2xl overflow-hidden shadow-glass-lg z-50"
                style={{ border: '1px solid rgba(0,217,255,0.12)' }}
              >
                <div className="px-4 py-3.5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,217,255,0.06)' }}>
                  <h3 className="text-sm font-bold text-white/90">Notifications</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-cyan-300"
                    style={{ background: 'rgba(0,217,255,0.15)', border: '1px solid rgba(0,217,255,0.2)' }}>
                    {unreadCount} new
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {NOTIFICATIONS.slice(0, 5).map((n) => (
                    <div key={n.id}
                      className={cn('px-4 py-3 border-b last:border-0 cursor-pointer transition-colors hover:bg-cyan-400/4', !n.isRead && 'bg-cyan-400/4')}
                      style={{ borderColor: 'rgba(0,217,255,0.05)' }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl shrink-0 overflow-hidden bg-base-700 border border-white/5">
                          {n.avatar
                            ? <img src={n.avatar} alt="" className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-cyan-400"><Bell size={14} /></div>
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-white/90 leading-relaxed">{n.title}</p>
                          <p className="text-xs text-white/35 mt-0.5 truncate">{n.message}</p>
                        </div>
                        {!n.isRead && <div className="h-2 w-2 rounded-full bg-cyan-400 shrink-0 mt-1" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3" style={{ borderTop: '1px solid rgba(0,217,255,0.06)' }}>
                  <button
                    onClick={() => { navigate('/notifications'); setNotifOpen(false) }}
                    className="w-full text-center text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors py-1"
                  >
                    View all notifications →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative ml-1">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl transition-all duration-200 border"
            style={{
              background: 'rgba(9,18,38,0.8)',
              borderColor: profileOpen ? 'rgba(0,217,255,0.25)' : 'rgba(0,217,255,0.08)',
            }}
          >
            <Avatar src={user?.avatar} name={user?.name || 'U'} size="xs" online />
            <span className="text-sm font-medium text-white/80 hidden sm:block">{user?.name?.split(' ')[0]}</span>
            <motion.div animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} className="text-white/30" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full mt-2 right-0 w-52 glass-strong rounded-2xl overflow-hidden shadow-glass-lg z-50"
                style={{ border: '1px solid rgba(0,217,255,0.12)' }}
              >
                <div className="px-4 py-3.5" style={{ borderBottom: '1px solid rgba(0,217,255,0.06)' }}>
                  <p className="text-sm font-bold text-white/95">{user?.name}</p>
                  <p className="text-xs text-cyan-400/50 truncate mt-0.5">{user?.email}</p>
                </div>
                {[
                  { label: '⚡ Dashboard', path: '/dashboard' },
                  { label: '👤 My Profile', path: '/profile' },
                  { label: '⚙️ Settings', path: '/profile?tab=settings' },
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setProfileOpen(false) }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white/55 hover:text-white/90 hover:bg-cyan-400/5 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div style={{ borderTop: '1px solid rgba(0,217,255,0.06)' }}>
                  <button
                    onClick={() => { logout(); navigate('/login') }}
                    className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/8 transition-colors"
                  >
                    🚪 Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
