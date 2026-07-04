import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface RevenueData {
  month: string
  revenue: number
}

export function RevenueChart({ data, className }: { data: RevenueData[], className?: string }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue))

  return (
    <div className={cn('h-48 flex items-end justify-between gap-2 mt-4', className)}>
      {data.map((item, i) => {
        const height = `${(item.revenue / maxRevenue) * 100}%`
        return (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
            {/* Tooltip */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-base-900 border border-cyan-400/20 px-2 py-1 rounded text-[10px] font-bold text-white shadow-glow-cyan z-10 pointer-events-none">
              ₹{(item.revenue / 1000).toFixed(1)}k
            </div>
            
            {/* Bar */}
            <div className="w-full relative bg-white/5 rounded-t-lg overflow-hidden h-full flex items-end border border-white/5 border-b-0">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, type: 'spring' }}
                className="w-full rounded-t-lg relative"
                style={{
                  background: 'linear-gradient(180deg, #00D9FF 0%, rgba(0,217,255,0.1) 100%)',
                  boxShadow: '0 -4px 12px rgba(0,217,255,0.3)',
                }}
              >
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent w-1/2 pointer-events-none" />
                {/* Top highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 rounded-t-lg pointer-events-none" />
              </motion.div>
            </div>
            
            {/* Label */}
            <span className="text-[10px] text-white/40 font-medium group-hover:text-cyan-400 transition-colors uppercase tracking-wider">
              {item.month}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function SalesDonut({ completed, pending }: { completed: number, pending: number }) {
  const total = completed + pending
  const completedPercent = (completed / total) * 100
  const pendingPercent = (pending / total) * 100
  
  // SVG arc calculation (simplified for donut chart)
  const radius = 40
  const circumference = 2 * Math.PI * radius
  
  const completedDash = (completedPercent / 100) * circumference
  const pendingDash = (pendingPercent / 100) * circumference

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(0,217,255,0.3)]">
        {/* Background ring */}
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="16"
        />
        
        {/* Pending ring */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - pendingDash }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="#8B5CF6" // Violet
          strokeWidth="16"
          strokeDasharray={circumference}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
        />
        
        {/* Completed ring */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - completedDash }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="#00D9FF" // Cyan
          strokeWidth="16"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - pendingDash}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(0,217,255,0.5)]"
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-display text-white">{total}</span>
        <span className="text-[10px] text-white/40 uppercase tracking-wider">Total</span>
      </div>
    </div>
  )
}
