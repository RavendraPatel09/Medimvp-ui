import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { modalBackdrop, modalContent } from '../../lib/animations'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`relative w-full ${sizes[size]} glass-strong rounded-3xl border border-white/10 shadow-glass-lg overflow-hidden`}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/6">
                <h3 className="text-lg font-semibold text-white font-display">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-white/30 hover:text-white/80 transition-colors p-1 rounded-lg hover:bg-white/6"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            <div className={title ? '' : 'relative'}>
              {!title && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 text-white/30 hover:text-white/80 transition-colors p-1.5 rounded-lg hover:bg-white/6"
                >
                  <X size={18} />
                </button>
              )}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
