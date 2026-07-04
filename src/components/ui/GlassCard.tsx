import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  tilt?: boolean
  glow?: 'cyan' | 'violet' | 'rose' | 'emerald' | 'none'
  onClick?: () => void
}

export function GlassCard({ children, className, tilt = false, glow = 'none', onClick }: GlassCardProps) {
  const hoverProps = tilt ? {
    scale: 1.02,
    rotateX: 2,
    rotateY: -2,
  } : {}

  return (
    <motion.div
      whileHover={onClick || tilt ? hoverProps : {}}
      onClick={onClick}
      className={cn(
        'glass-card rounded-3xl transition-all duration-300',
        onClick && 'cursor-pointer hover:shadow-card-hover hover:border-cyan-400/20',
        glow === 'cyan' && 'hover:shadow-glow-cyan hover:border-cyan-400/30',
        glow === 'violet' && 'hover:shadow-glow-violet hover:border-violet-400/30',
        glow === 'rose' && 'hover:shadow-glow-rose hover:border-rose-400/30',
        glow === 'emerald' && 'hover:shadow-glow-emerald hover:border-emerald-400/30',
        tilt && 'perspective',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Inner reflection */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }} />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  )
}
