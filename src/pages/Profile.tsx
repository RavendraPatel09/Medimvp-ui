import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, ShoppingBag, ShieldCheck, Edit3, Shield, Mail, Phone, MapPin, Briefcase } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { Avatar } from '../components/ui/Avatar'
import { cn } from '../lib/utils'
import { fadeInUp } from '../lib/animations'

const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'listings', label: 'My Listings', icon: ShoppingBag },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Profile() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Sales', value: '₹124.5K', icon: null },
    { label: 'Active Listings', value: '24', icon: null },
    { label: 'Avg Rating', value: '4.8', icon: null },
    { label: 'Member Since', value: '2023', icon: null },
  ]

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto min-h-screen">
      
      {/* Header Profile Card */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <GlassCard className="p-8 mb-8 relative overflow-hidden" glow="cyan">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-500/10 to-violet-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="relative group">
              <Avatar src={user?.avatar} name={user?.name || 'U'} size="xl" className="border-4 border-base-900 shadow-glass-lg" />
              <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit3 className="text-white" size={20} />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-black font-display text-white/95">{user?.name}</h1>
                <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                  <Shield size={10} /> Verified {user?.role}
                </div>
              </div>
              <p className="text-white/40 mb-6 font-medium">Managing operations at MediCycle since 2023</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                <div className="flex items-center gap-2 text-white/60"><Mail size={16} className="text-cyan-400" /> {user?.email}</div>
                <div className="flex items-center gap-2 text-white/60"><Phone size={16} className="text-violet-400" /> +91 98765 43210</div>
                <div className="flex items-center gap-2 text-white/60"><MapPin size={16} className="text-rose-400" /> Mumbai, India</div>
              </div>
            </div>

            <PremiumButton variant="secondary" icon={<Edit3 size={16} />}>Edit Profile</PremiumButton>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 relative z-10">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="text-2xl font-black font-display text-white/95 tracking-tight">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1 uppercase font-bold tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Tabs Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all whitespace-nowrap text-sm font-medium border',
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border-cyan-400/30 text-white shadow-glow-cyan' 
                      : 'border-transparent text-white/40 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon size={18} className={isActive ? 'text-cyan-400' : ''} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
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
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-bold font-display text-white/95 mb-6 flex items-center gap-2">
                      <Briefcase className="text-cyan-400" size={20} /> Business Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                      <div>
                        <p className="text-xs text-white/30 uppercase font-bold tracking-wider mb-1">Company Name</p>
                        <p className="text-sm font-medium text-white/90">MediCorp Pharma Ltd.</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/30 uppercase font-bold tracking-wider mb-1">GSTIN</p>
                        <p className="text-sm font-medium text-white/90">27AADCM1234E1Z5</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/30 uppercase font-bold tracking-wider mb-1">Drug License</p>
                        <p className="text-sm font-medium text-white/90">MH-MZ3-123456</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/30 uppercase font-bold tracking-wider mb-1">Address</p>
                        <p className="text-sm font-medium text-white/90 text-balance">123 Business Park, Andheri East, Mumbai 400069</p>
                      </div>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-6 border-cyan-400/20 shadow-[0_0_20px_rgba(0,217,255,0.05)]">
                    <h3 className="text-lg font-bold font-display text-white/95 mb-2">Verification Status</h3>
                    <p className="text-sm text-white/50 mb-6">Your account is fully verified. You have access to all marketplace features.</p>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Identity Verification', status: 'verified' },
                        { label: 'Business License (CDSCO)', status: 'verified' },
                        { label: 'Bank Account Details', status: 'verified' },
                      ].map(item => (
                        <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-sm font-medium text-white/80">{item.label}</span>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                            <ShieldCheck size={14} /> Verified
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              )}

              {activeTab === 'settings' && (
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold font-display text-white/95 mb-6 flex items-center gap-2">
                    <Settings className="text-violet-400" size={20} /> Preferences
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                      <div>
                        <p className="text-sm font-bold text-white/90">Email Notifications</p>
                        <p className="text-xs text-white/40 mt-1">Receive updates about your orders and messages.</p>
                      </div>
                      <div className="w-12 h-6 rounded-full bg-cyan-400 relative cursor-pointer shadow-[0_0_10px_rgba(0,217,255,0.3)]">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-white/5">
                      <div>
                        <p className="text-sm font-bold text-white/90">Marketing Emails</p>
                        <p className="text-xs text-white/40 mt-1">Receive news, offers, and platform updates.</p>
                      </div>
                      <div className="w-12 h-6 rounded-full bg-white/10 border border-white/20 relative cursor-pointer">
                        <div className="w-5 h-5 bg-white/50 rounded-full absolute top-0.5 left-0.5" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <PremiumButton variant="danger" size="sm">Delete Account</PremiumButton>
                    </div>
                  </div>
                </GlassCard>
              )}
              
              {/* Other tabs omitted for brevity, would be similar */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
