import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'cyan' | 'violet' | 'emerald' | 'rose' | 'gradient' | 'blue' | 'purple'
  label?: string
  showValue?: boolean
  animated?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  color = 'cyan',
  label,
  showValue,
  animated = false,
  className
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  const colorStyles = {
    cyan: 'bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.5)]',
    violet: 'bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]',
    emerald: 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    rose: 'bg-rose-400 shadow-[0_0_10px_rgba(255,60,172,0.5)]',
    gradient: 'bg-gradient-to-r from-cyan-400 via-violet-500 to-rose-400 shadow-[0_0_10px_rgba(139,92,246,0.4)]',
    // Legacy
    blue: 'bg-cyan-400 shadow-[0_0_10px_rgba(0,217,255,0.5)]',
    purple: 'bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]',
  }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-xs font-medium text-white/50">{label}</span>}
          {showValue && <span className="text-xs font-bold text-white/80">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn(
            'h-full rounded-full relative',
            colorStyles[color]
          )}
        >
          {animated && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}
