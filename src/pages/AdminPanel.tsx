import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Users, Package, AlertTriangle, CheckCircle2, XCircle, Search, ShieldCheck } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { Avatar } from '../components/ui/Avatar'
import { cn } from '../lib/utils'
import { useUIStore } from '../store/uiStore'

const TABS = [
  { id: 'overview', label: 'System Overview', icon: ShieldAlert },
  { id: 'users', label: 'User Verification', icon: Users },
  { id: 'reports', label: 'Reported Items', icon: AlertTriangle },
]

export default function AdminPanel() {
  const { addToast } = useUIStore()
  const [activeTab, setActiveTab] = useState('overview')
  const [search, setSearch] = useState('')

  const handleAction = (action: string) => {
    addToast({ type: 'success', title: 'Action Successful', message: `User ${action} successfully.` })
  }

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen flex gap-8">
      
      {/* Sidebar Nav */}
      <div className="w-64 shrink-0 hidden lg:block">
        <h1 className="text-2xl font-black font-display text-white/95 mb-8 flex items-center gap-2">
          <ShieldAlert className="text-rose-400" size={24} /> Admin Portal
        </h1>
        <div className="space-y-2">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium border',
                  isActive 
                    ? 'bg-rose-500/10 border-rose-500/30 text-white shadow-glow-rose' 
                    : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={18} className={isActive ? 'text-rose-400' : ''} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden w-full overflow-x-auto pb-4 mb-4 flex gap-2 scrollbar-hide fixed top-16 left-0 px-6 z-20 bg-[#03060F]/80 backdrop-blur-xl border-b border-white/5">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-xs font-medium whitespace-nowrap border',
                isActive 
                  ? 'bg-rose-500/10 border-rose-500/30 text-white shadow-glow-rose' 
                  : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon size={14} className={isActive ? 'text-rose-400' : ''} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 lg:mt-0 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <GlassCard glow="rose" className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg"><Users size={18} /></div>
                      <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Pending Users</h3>
                    </div>
                    <p className="text-3xl font-black font-display text-white mt-4">12</p>
                    <p className="text-xs text-rose-400 mt-1 font-medium">Requires immediate action</p>
                  </GlassCard>
                  <GlassCard glow="emerald" className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><ShieldCheck size={18} /></div>
                      <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">System Health</h3>
                    </div>
                    <p className="text-3xl font-black font-display text-white mt-4">99.9%</p>
                    <p className="text-xs text-emerald-400 mt-1 font-medium">All systems operational</p>
                  </GlassCard>
                  <GlassCard glow="cyan" className="p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-cyan-400/10 text-cyan-400 rounded-lg"><Package size={18} /></div>
                      <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">Active Listings</h3>
                    </div>
                    <p className="text-3xl font-black font-display text-white mt-4">4,521</p>
                    <p className="text-xs text-cyan-400 mt-1 font-medium">+124 this week</p>
                  </GlassCard>
                </div>

                <GlassCard className="p-6 border-white/5">
                  <h3 className="text-lg font-bold font-display text-white/95 mb-6">Recent Activity Log</h3>
                  <div className="space-y-4">
                    {[
                      { msg: 'System backup completed successfully.', time: '10 mins ago', type: 'system' },
                      { msg: 'New seller "PharmaCorp" verified.', time: '1 hour ago', type: 'user' },
                      { msg: 'Suspicious login attempt blocked from IP 192.168.1.1.', time: '2 hours ago', type: 'security' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1.5 shadow-sm",
                          log.type === 'system' ? 'bg-cyan-400' : log.type === 'user' ? 'bg-emerald-400' : 'bg-rose-400'
                        )} />
                        <div>
                          <p className="text-sm text-white/80">{log.msg}</p>
                          <p className="text-xs text-white/30 mt-0.5">{log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {activeTab === 'users' && (
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold font-display text-white/95">Pending Verifications</h3>
                  <div className="w-64 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-base-800 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white/90 outline-none focus:border-rose-400/50 focus:shadow-[0_0_0_4px_rgba(255,60,172,0.1)] transition-all"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-xs font-bold text-white/30 uppercase tracking-wider pb-4 pr-4">User Details</th>
                        <th className="text-left text-xs font-bold text-white/30 uppercase tracking-wider pb-4 pr-4">Documents</th>
                        <th className="text-left text-xs font-bold text-white/30 uppercase tracking-wider pb-4 pr-4">Type</th>
                        <th className="text-right text-xs font-bold text-white/30 uppercase tracking-wider pb-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((i) => (
                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <Avatar name={`Seller ${i}`} size="sm" />
                              <div>
                                <p className="text-sm font-bold text-white/90">Global Pharma {i}</p>
                                <p className="text-xs text-white/40">hello@globalpharma{i}.com</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="text-xs font-medium text-cyan-400 hover:underline cursor-pointer">View License.pdf</span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="px-2 py-1 rounded bg-violet-500/10 text-violet-400 text-[10px] uppercase font-bold tracking-wider">Seller</span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleAction('approved')} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors" title="Approve">
                                <CheckCircle2 size={16} />
                              </button>
                              <button onClick={() => handleAction('rejected')} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors" title="Reject">
                                <XCircle size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            )}

            {/* Omitted other tabs for brevity */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
