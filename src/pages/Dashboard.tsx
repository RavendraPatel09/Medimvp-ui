import { motion } from 'framer-motion'
import { DollarSign, Package, MessageSquare, TrendingUp, Star, Eye, ShoppingBag, Plus, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { StatCard } from '../components/ui/StatCard'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { RevenueChart, SalesDonut } from '../components/ui/AnimatedChart'
import { AvailabilityBadge } from '../components/ui/GlassBadge'
import { MEDICINES, DASHBOARD_STATS, REVENUE_DATA } from '../data/mockData'
import { staggerContainer, staggerItem, fadeInUp } from '../lib/animations'
import { formatPrice, cn } from '../lib/utils'

export default function Dashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const myMedicines = MEDICINES.slice(0, 4)
  const totalRevenue = REVENUE_DATA.reduce((a, b) => a + b.revenue, 0)

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Welcome */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-white/95 tracking-tight">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p className="text-white/40 mt-1">Here's your business overview for today.</p>
        </div>
        <div className="flex gap-3">
          <PremiumButton variant="secondary" size="sm" icon={<ShoppingBag size={15} />} onClick={() => navigate('/marketplace')}>
            Browse Market
          </PremiumButton>
          <PremiumButton variant="primary" size="sm" icon={<Plus size={15} />} onClick={() => navigate('/add-medicine')}>
            New Listing
          </PremiumButton>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
      >
        <motion.div variants={staggerItem}>
          <StatCard
            title="Total Revenue"
            value={`₹${(DASHBOARD_STATS.totalRevenue / 1000).toFixed(1)}K`}
            subtitle="This month"
            icon={<DollarSign size={22} />}
            color="cyan"
            trend={{ value: 12.4, label: 'vs last month' }}
            delay={0}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            title="Active Listings"
            value={DASHBOARD_STATS.activeListings}
            subtitle="Medicines on sale"
            icon={<Package size={22} />}
            color="emerald"
            trend={{ value: 3, label: 'new this week' }}
            delay={0.1}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            title="Messages"
            value={DASHBOARD_STATS.totalMessages}
            subtitle="Total conversations"
            icon={<MessageSquare size={22} />}
            color="violet"
            trend={{ value: 8.2, label: 'vs last week' }}
            delay={0.2}
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <StatCard
            title="Avg. Rating"
            value={`${DASHBOARD_STATS.averageRating}★`}
            subtitle={`${DASHBOARD_STATS.totalSales} total sales`}
            icon={<Star size={22} />}
            color="rose"
            delay={0.3}
          />
        </motion.div>
      </motion.div>

      {/* Charts row */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-3 gap-5"
      >
        {/* Revenue chart */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <GlassCard className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold text-white/90 font-display">Revenue Overview</h3>
                <p className="text-xs text-white/40 mt-0.5">Last 7 months performance</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black font-display text-white/95">₹{(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs font-bold text-cyan-400">+14.2% overall</p>
              </div>
            </div>
            <div className="flex-1 mt-6">
              <RevenueChart data={REVENUE_DATA} />
            </div>
          </GlassCard>
        </motion.div>

        {/* Donut */}
        <motion.div variants={staggerItem}>
          <GlassCard className="p-6 h-full flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-white/90 font-display">Orders</h3>
              <p className="text-xs text-white/40 mt-0.5">Completion rate</p>
            </div>
            <div className="flex-1 flex items-center justify-center py-4">
              <SalesDonut completed={DASHBOARD_STATS.completedOrders} pending={DASHBOARD_STATS.pendingOrders} />
            </div>
            <div className="mt-4 space-y-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
                  <span className="text-sm font-medium text-white/60">Completed</span>
                </div>
                <span className="text-sm font-bold text-white/90">{DASHBOARD_STATS.completedOrders}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  <span className="text-sm font-medium text-white/60">Pending</span>
                </div>
                <span className="text-sm font-bold text-white/90">{DASHBOARD_STATS.pendingOrders}</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* My Listings */}
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="xl:col-span-2">
          <GlassCard className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white/90 font-display">Recent Listings</h3>
                <p className="text-xs text-white/40 mt-0.5">Your active medicines on the market</p>
              </div>
              <PremiumButton variant="ghost" size="sm" iconRight={<ArrowRight size={14} />} onClick={() => navigate('/profile')}>
                View all
              </PremiumButton>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Medicine', 'Category', 'Price', 'Qty', 'Status', 'Views'].map((h) => (
                      <th key={h} className="text-left text-xs font-bold text-white/30 uppercase tracking-wider pb-4 pr-4 last:pr-0">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myMedicines.map((m, i) => (
                    <motion.tr
                      key={m.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/medicine/${m.id}`)}
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl overflow-hidden bg-base-800 border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                            <img src={m.images[0]} alt={m.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white/90 group-hover:text-cyan-300 transition-colors">{m.name}</p>
                            <p className="text-xs text-white/40">{m.manufacturer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-white/60 glass-sm px-2.5 py-1 rounded-lg border-white/10">{m.category}</span>
                      </td>
                      <td className="py-4 pr-4">
                        <div>
                          <p className="text-sm font-bold text-white/95">{formatPrice(m.sellingPrice)}</p>
                          <p className="text-[10px] text-white/30 line-through">{formatPrice(m.originalPrice)}</p>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-sm font-medium text-white/60">{m.quantity} {m.unit}</td>
                      <td className="py-4 pr-4"><AvailabilityBadge availability={m.availability as 'available' | 'limited' | 'sold'} /></td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40">
                          <Eye size={14} className="text-cyan-400/60" />
                          {Math.floor(Math.random() * 500 + 50)}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="flex flex-col gap-4">
          {[
            { icon: Plus, label: 'Add Medicine', desc: 'List a new medicine for sale', color: 'cyan', path: '/add-medicine' },
            { icon: MessageSquare, label: 'Messages', desc: `${DASHBOARD_STATS.totalMessages} active conversations`, color: 'violet', path: '/chat' },
            { icon: TrendingUp, label: 'Analytics', desc: 'View detailed performance', color: 'rose', path: '/admin' },
          ].map((action) => {
            const Icon = action.icon
            return (
              <GlassCard
                key={action.label}
                glow={action.color as any}
                className="p-5 cursor-pointer flex-1 flex items-center gap-4 group"
                onClick={() => navigate(action.path)}
              >
                <div className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3',
                  action.color === 'cyan' ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shadow-glow-cyan' :
                  action.color === 'violet' ? 'bg-violet-500/10 text-violet-400 border border-violet-400/20 shadow-glow-violet' :
                  'bg-rose-500/10 text-rose-400 border border-rose-400/20 shadow-glow-rose'
                )}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white/90 group-hover:text-white transition-colors">{action.label}</h4>
                  <p className="text-xs text-white/40 mt-1 font-medium">{action.desc}</p>
                </div>
                <ArrowRight size={16} className="ml-auto text-white/20 group-hover:text-white/60 transition-colors" />
              </GlassCard>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
