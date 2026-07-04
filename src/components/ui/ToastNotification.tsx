import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { useUIStore } from '../../store/uiStore'

const ICONS: Record<string, React.ReactNode> = {
  success: <CheckCircle2 className="text-emerald-400" size={20} />,
  error: <AlertCircle className="text-red-400" size={20} />,
  info: <Info className="text-cyan-400" size={20} />,
}

const BORDERS: Record<string, string> = {
  success: 'border-emerald-500/30',
  error: 'border-red-500/30',
  info: 'border-cyan-500/30',
}

const GLOWS: Record<string, string> = {
  success: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  error: 'shadow-[0_0_15px_rgba(239,68,68,0.15)]',
  info: 'shadow-[0_0_15px_rgba(0,217,255,0.15)]',
}

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-3 w-80 p-4 glass-strong rounded-2xl border ${BORDERS[toast.type]} ${GLOWS[toast.type]}`}
          >
            <div className="shrink-0 mt-0.5">{ICONS[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white/95">{toast.title}</h4>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-white/20 hover:text-white/60 transition-colors p-1"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
