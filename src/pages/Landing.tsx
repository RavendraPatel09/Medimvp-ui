import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Shield, Zap, Pill, TrendingDown, Package, CheckCircle2 } from 'lucide-react'
import { PremiumButton } from '../components/ui/PremiumButton'
import { GlassCard } from '../components/ui/GlassCard'
import { staggerContainer, staggerItem } from '../lib/animations'
import { cn } from '../lib/utils'

const features = [
  {
    icon: Shield,
    title: 'Verified Sellers Only',
    desc: 'Every seller undergoes a strict verification process to ensure 100% genuine medicines.',
    color: 'cyan',
  },
  {
    icon: TrendingDown,
    title: 'Wholesale Pricing',
    desc: 'Get access to premium medicines at significantly reduced prices directly from distributors.',
    color: 'violet',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Delivery',
    desc: 'Our optimized logistics network ensures your critical medicines arrive when you need them.',
    color: 'emerald',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#03060F] text-white overflow-hidden selection:bg-cyan-500/30">
      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="aurora-1 absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="aurora-2 absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-violet-600/10 blur-[130px]" />
        <div className="aurora-3 absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-rose-500/5 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 grid-bg opacity-40" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 10 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-brand shadow-glow-cyan"
          >
            <Pill size={20} className="text-white" />
          </motion.div>
          <span className="text-2xl font-black font-display tracking-tight text-white">MediCycle</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/login')} className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
            Sign In
          </button>
          <PremiumButton variant="primary" size="sm" onClick={() => navigate('/register')}>
            Get Started
          </PremiumButton>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        {/* Hero Section */}
        <div className="pt-20 pb-32 text-center relative">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-sm border-cyan-400/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-glow-cyan" />
            <span className="text-xs font-semibold text-cyan-100 uppercase tracking-wider">India's #1 Premium Marketplace</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-[1.1] mb-8"
          >
            The Future of <br />
            <span className="gradient-text bg-clip-text text-transparent">Medicine Resale</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Join a network of verified pharmacies and wholesalers. Buy and sell authentic, unexpired surplus medicines at wholesale rates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <PremiumButton variant="primary" size="lg" iconRight={<ArrowRight size={18} />} onClick={() => navigate('/register')} className="min-w-[200px]">
              Start Buying
            </PremiumButton>
            <PremiumButton variant="secondary" size="lg" icon={<Package size={18} />} onClick={() => navigate('/register')} className="min-w-[200px]">
              Start Selling
            </PremiumButton>
          </motion.div>
          
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 font-medium"
          >
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> CDSCO Approved</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-violet-400" /> 10k+ Pharmacies</span>
            <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Quality Assured</span>
          </motion.div>
        </div>

        {/* Feature grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={staggerItem}>
                <GlassCard tilt glow={feature.color as any} className="p-8 h-full">
                  <div className={cn(
                    'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg',
                    feature.color === 'cyan' && 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shadow-glow-cyan',
                    feature.color === 'violet' && 'bg-violet-500/10 text-violet-400 border border-violet-400/20 shadow-glow-violet',
                    feature.color === 'emerald' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20 shadow-glow-emerald',
                  )}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white/95 mb-3">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed font-light">{feature.desc}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#03060F]/80 backdrop-blur-xl relative z-10 py-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Pill size={24} className="text-cyan-400" />
          <span className="text-2xl font-black font-display text-white">MediCycle</span>
        </div>
        <p className="text-white/40 mb-6 font-light">Transforming the pharmaceutical supply chain in India.</p>
        <p className="text-sm text-white/20">© {new Date().getFullYear()} MediCycle. All rights reserved.</p>
      </footer>
    </div>
  )
}
