import { motion } from 'framer-motion'
import { CheckCheck, Trash2, Bell, Shield, Info, AlertTriangle, MessageCircle } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { NOTIFICATIONS } from '../data/mockData'
import { timeAgo, cn } from '../lib/utils'
import { staggerContainer, staggerItem, fadeInUp } from '../lib/animations'

export default function Notifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-400/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"><Shield size={18} /></div>
      case 'system': return <div className="p-2 bg-cyan-400/10 text-cyan-400 rounded-xl border border-cyan-400/20 shadow-[0_0_10px_rgba(0,217,255,0.2)]"><Info size={18} /></div>
      case 'alert': return <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20 shadow-[0_0_10px_rgba(255,60,172,0.2)]"><AlertTriangle size={18} /></div>
      case 'message': return <div className="p-2 bg-violet-500/10 text-violet-400 rounded-xl border border-violet-400/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]"><MessageCircle size={18} /></div>
      default: return <div className="p-2 bg-white/5 text-white/40 rounded-xl border border-white/10"><Bell size={18} /></div>
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-[calc(100vh-64px)]">
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-white/95 tracking-tight mb-1">Notifications</h1>
          <p className="text-white/40">You have {NOTIFICATIONS.filter(n => !n.isRead).length} unread alerts.</p>
        </div>
        <div className="flex gap-3">
          <PremiumButton variant="ghost" size="sm" icon={<CheckCheck size={16} />}>Mark all read</PremiumButton>
          <PremiumButton variant="secondary" size="sm" icon={<Trash2 size={16} />}>Clear all</PremiumButton>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
        {NOTIFICATIONS.map((n) => (
          <motion.div key={n.id} variants={staggerItem}>
            <GlassCard className={cn(
              "p-5 flex items-start gap-4 transition-all duration-300",
              !n.isRead ? "bg-white/[0.04] border-cyan-400/20" : "opacity-75 hover:opacity-100"
            )}>
              <div className="shrink-0 mt-1">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className={cn("text-base font-bold", !n.isRead ? "text-white/95" : "text-white/70")}>{n.title}</h3>
                  <span className="text-xs text-white/30 shrink-0">{timeAgo(n.timestamp)}</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed max-w-3xl">{n.message}</p>
                {n.actionUrl && (
                  <button className="mt-3 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider">
                    View Details →
                  </button>
                )}
              </div>
              {!n.isRead && (
                <div className="shrink-0 h-3 w-3 rounded-full bg-cyan-400 shadow-glow-cyan mt-2" />
              )}
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
