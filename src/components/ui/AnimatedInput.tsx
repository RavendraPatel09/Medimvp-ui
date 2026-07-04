import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  icon?: React.ReactNode
  glowColor?: 'cyan' | 'violet' | 'rose' | 'emerald'
}

export const AnimatedInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, glowColor = 'cyan', className, id, ...props }, ref) => {
    
    const glowClasses = {
      cyan: 'focus:border-cyan-400/50 focus:shadow-[0_0_0_4px_rgba(0,217,255,0.1)]',
      violet: 'focus:border-violet-400/50 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]',
      rose: 'focus:border-rose-400/50 focus:shadow-[0_0_0_4px_rgba(255,60,172,0.1)]',
      emerald: 'focus:border-emerald-400/50 focus:shadow-[0_0_0_4px_rgba(0,217,160,0.1)]',
    }

    const textClasses = {
      cyan: 'text-cyan-400',
      violet: 'text-violet-400',
      rose: 'text-rose-400',
      emerald: 'text-emerald-400',
    }

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative group">
          <input
            id={id}
            ref={ref}
            className={cn(
              'peer w-full bg-base-800/50 border border-white/10 rounded-2xl px-4 pt-6 pb-2 text-white/90 outline-none transition-all duration-300',
              'hover:border-white/20',
              glowClasses[glowColor],
              icon ? 'pl-11' : '',
              error ? 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : ''
            )}
            placeholder=" " // Required for peer-placeholder-shown
            {...props}
          />
          
          <label
            htmlFor={id}
            className={cn(
              'absolute text-sm text-white/40 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] cursor-text pointer-events-none',
              icon ? 'left-11' : 'left-4',
              'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3',
              error ? 'text-red-400/80' : `peer-focus:${textClasses[glowColor]}`
            )}
          >
            {label}
          </label>

          {icon && (
            <div className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors duration-300',
              'peer-focus:text-white/60',
              error ? 'text-red-400/50' : ''
            )}>
              {icon}
            </div>
          )}
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1.5 mt-1.5 ml-1 text-xs text-red-400"
            >
              <AlertCircle size={12} />
              <span>{error}</span>
            </motion.div>
          )}
          {!error && hint && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="mt-1.5 ml-1 text-xs text-white/40"
            >
              {hint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  glowColor?: 'cyan' | 'violet' | 'rose' | 'emerald'
}

export const AnimatedTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, glowColor = 'cyan', className, id, ...props }, ref) => {
    const glowClasses = {
      cyan: 'focus:border-cyan-400/50 focus:shadow-[0_0_0_4px_rgba(0,217,255,0.1)]',
      violet: 'focus:border-violet-400/50 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]',
      rose: 'focus:border-rose-400/50 focus:shadow-[0_0_0_4px_rgba(255,60,172,0.1)]',
      emerald: 'focus:border-emerald-400/50 focus:shadow-[0_0_0_4px_rgba(0,217,160,0.1)]',
    }

    const textClasses = {
      cyan: 'text-cyan-400',
      violet: 'text-violet-400',
      rose: 'text-rose-400',
      emerald: 'text-emerald-400',
    }

    return (
      <div className={cn('relative w-full', className)}>
        <div className="relative group">
          <textarea
            id={id}
            ref={ref}
            className={cn(
              'peer w-full bg-base-800/50 border border-white/10 rounded-2xl px-4 pt-6 pb-3 text-white/90 outline-none transition-all duration-300 min-h-[100px] resize-y',
              'hover:border-white/20',
              glowClasses[glowColor],
              error ? 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : ''
            )}
            placeholder=" "
            {...props}
          />
          
          <label
            htmlFor={id}
            className={cn(
              'absolute text-sm text-white/40 duration-300 transform -translate-y-3 scale-75 top-4 left-4 z-10 origin-[0] cursor-text pointer-events-none',
              'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3',
              error ? 'text-red-400/80' : `peer-focus:${textClasses[glowColor]}`
            )}
          >
            {label}
          </label>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1.5 mt-1.5 ml-1 text-xs text-red-400"
            >
              <AlertCircle size={12} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedTextarea.displayName = 'AnimatedTextarea'
