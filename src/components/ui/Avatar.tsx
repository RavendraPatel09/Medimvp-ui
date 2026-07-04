import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface AvatarProps {
  src?: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  online?: boolean
  className?: string
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
}

const onlineDotSizes = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
}

export function Avatar({ src, name, size = 'md', online, className }: AvatarProps) {
  const initials = name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <div className={cn('relative inline-block shrink-0', className)}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          'relative rounded-full overflow-hidden flex items-center justify-center font-bold font-display shadow-glass',
          sizes[size],
          !src && 'bg-gradient-to-br from-cyan-400 to-violet-500 text-white'
        )}
        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover bg-base-800"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : (
          <span>{initials}</span>
        )}
      </motion.div>

      {online && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full bg-emerald-400',
            onlineDotSizes[size]
          )}
          style={{ border: '2px solid #060C1B' }} // using base-900 color for border cutout
        />
      )}
    </div>
  )
}
