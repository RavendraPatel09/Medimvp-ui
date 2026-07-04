import { Star } from 'lucide-react'
import { cn } from '../../lib/utils'

type BadgeColor = 'cyan' | 'violet' | 'emerald' | 'rose' | 'orange' | 'red' | 'blue' | 'purple'

interface GlassBadgeProps {
  children: React.ReactNode
  color?: BadgeColor
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const colorStyles: Record<BadgeColor, string> = {
  cyan: 'bg-cyan-400/10 border-cyan-400/20 text-cyan-300 shadow-[0_0_10px_rgba(0,217,255,0.1)]',
  violet: 'bg-violet-500/10 border-violet-400/20 text-violet-300 shadow-[0_0_10px_rgba(139,92,246,0.1)]',
  emerald: 'bg-emerald-500/10 border-emerald-400/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
  rose: 'bg-rose-500/10 border-rose-400/20 text-rose-300 shadow-[0_0_10px_rgba(255,60,172,0.1)]',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.1)]',
  red: 'bg-red-500/10 border-red-500/20 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.1)]', // Legacy fallback
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.1)]', // Legacy fallback
}

const dotColors: Record<BadgeColor, string> = {
  cyan: 'bg-cyan-400',
  violet: 'bg-violet-400',
  emerald: 'bg-emerald-400',
  rose: 'bg-rose-400',
  orange: 'bg-orange-400',
  red: 'bg-red-400',
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
}

export function GlassBadge({ children, color = 'cyan', size = 'sm', dot, className }: GlassBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border glass',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
        colorStyles[color],
        className
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full shadow-[0_0_5px_currentColor]', dotColors[color])} />}
      {children}
    </span>
  )
}

export function AvailabilityBadge({ availability }: { availability: 'available' | 'limited' | 'sold' }) {
  const config = {
    available: { color: 'emerald', label: 'In Stock' },
    limited: { color: 'orange', label: 'Limited' },
    sold: { color: 'red', label: 'Out of Stock' },
  } as const
  const { color, label } = config[availability]
  return <GlassBadge color={color} dot>{label}</GlassBadge>
}

export function StarRating({ rating, reviews, size = 'sm' }: { rating: number; reviews?: number; size?: 'sm' | 'md' }) {
  return (
    <div className="flex items-center gap-1.5">
      <Star
        size={size === 'sm' ? 12 : 16}
        className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
      />
      <span className={cn('font-semibold text-white/95', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {rating}
      </span>
      {reviews !== undefined && (
        <span className={cn('text-white/40', size === 'sm' ? 'text-[10px]' : 'text-xs')}>
          ({reviews})
        </span>
      )}
    </div>
  )
}
