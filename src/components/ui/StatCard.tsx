import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    label: string
  }
  color?: 'cyan' | 'violet' | 'emerald' | 'rose' | 'orange' | 'blue' | 'purple'
  delay?: number
}

const colorMap = {
  cyan: {
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(0,217,255,0.15)]',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-400/20',
    text: 'text-violet-400',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/20',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-400/20',
    text: 'text-rose-400',
    glow: 'shadow-[0_0_15px_rgba(255,60,172,0.15)]',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    text: 'text-orange-400',
    glow: 'shadow-[0_0_15px_rgba(249,115,22,0.15)]',
  },
  // Legacy
  blue: {
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_15px_rgba(0,217,255,0.15)]',
  },
  purple: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-400/20',
    text: 'text-violet-400',
    glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
  },
}

export function StatCard({ title, value, subtitle, icon, trend, color = 'cyan', delay = 0 }: StatCardProps) {
  const styles = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-card p-5 relative overflow-hidden group cursor-default rounded-3xl"
    >
      <div className={cn(
        'absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity',
        styles.bg
      )} />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-white/50">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h4 className="text-3xl font-bold font-display text-white/95 tracking-tight">{value}</h4>
          </div>
          {subtitle && (
            <p className="text-xs text-white/35 mt-1">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div className={cn(
            'w-10 h-10 rounded-2xl flex items-center justify-center border',
            styles.bg,
            styles.border,
            styles.text,
            styles.glow
          )}>
            {icon}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2 pt-4 border-t border-white/5">
          <div className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg bg-white/5',
            trend.value >= 0 ? 'text-emerald-400' : 'text-red-400'
          )}>
            {trend.value >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-xs text-white/30">{trend.label}</span>
        </div>
      )}
    </motion.div>
  )
}
