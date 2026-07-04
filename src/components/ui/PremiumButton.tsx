import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'emerald' | 'violet' | 'rose'
type ButtonSize = 'sm' | 'md' | 'lg'

interface PremiumButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  loading?: boolean
  children?: React.ReactNode
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-btn-cyan text-white shadow-btn-cyan hover:shadow-glow-cyan font-semibold',
  secondary: 'glass border-white/10 text-white/90 hover:bg-white/8 hover:border-cyan-400/20 shadow-glass',
  ghost: 'text-white/60 hover:text-cyan-400 hover:bg-cyan-400/10',
  danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 shadow-[0_4px_20px_rgba(239,68,68,0.35)]',
  emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-400 hover:to-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.35)]',
  violet: 'bg-btn-violet text-white shadow-btn-violet hover:shadow-glow-violet font-semibold',
  rose: 'bg-btn-rose text-white shadow-btn-rose hover:shadow-glow-rose font-semibold',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5 rounded-xl',
  md: 'px-6 py-2.5 text-sm gap-2 rounded-2xl',
  lg: 'px-8 py-3.5 text-base gap-2.5 rounded-3xl',
}

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  loading,
  children,
  className,
  fullWidth,
  disabled,
  onClick,
  ...props
}: PremiumButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Ripple effect
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      
      setRipples((prev) => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 700) // matches ripple duration
    }

    onClick?.(e)
  }

  return (
    <motion.button
      ref={btnRef}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.96 }}
      onClick={handleClick}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 outline-none',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      {...props}
    >
      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Button content */}
      <span className={cn('relative z-10 flex items-center', sizes[size].split(' ').find(c => c.startsWith('gap-')))}>
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full shrink-0"
          />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {iconRight && !loading && <span className="shrink-0">{iconRight}</span>}
      </span>
    </motion.button>
  )
}
