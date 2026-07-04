import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, LayoutGrid, List, Heart, MapPin } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { GlassBadge, StarRating } from '../components/ui/GlassBadge'
import { AnimatedInput } from '../components/ui/AnimatedInput'
import { MEDICINES, CATEGORIES } from '../data/mockData'
import { staggerContainer, staggerItem, fadeInUp } from '../lib/animations'
import { formatPrice, cn } from '../lib/utils'
import { useUIStore } from '../store/uiStore'

export default function Marketplace() {
  const navigate = useNavigate()
  const { addToast } = useUIStore()
  
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        addToast({ type: 'info', title: 'Removed', message: 'Item removed from wishlist.' })
      } else {
        next.add(id)
        addToast({ type: 'success', title: 'Added', message: 'Item added to wishlist! ❤️' })
      }
      return next
    })
  }

  const filteredMedicines = MEDICINES.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.manufacturer.toLowerCase().includes(search.toLowerCase())
    const matchesCat = activeCategory === 'All' || m.category === activeCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-64px)] flex flex-col">
      {/* Header & Search */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-white/95 tracking-tight mb-2">Marketplace</h1>
        <p className="text-white/40 mb-6">Discover wholesale medicines from verified sellers.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 max-w-2xl">
            <AnimatedInput
              id="search"
              label="Search medicines, manufacturers, conditions..."
              icon={<Search size={18} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <PremiumButton variant="secondary" icon={<Filter size={18} />}>
              Filters
            </PremiumButton>
            <div className="flex p-1 glass-sm rounded-2xl items-center">
              <button
                onClick={() => setView('grid')}
                className={cn('p-2.5 rounded-xl transition-all', view === 'grid' ? 'bg-cyan-400/20 text-cyan-400 shadow-glow-cyan' : 'text-white/30 hover:text-white/80')}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn('p-2.5 rounded-xl transition-all', view === 'list' ? 'bg-cyan-400/20 text-cyan-400 shadow-glow-cyan' : 'text-white/30 hover:text-white/80')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-3 overflow-x-auto pb-4 mb-4 scrollbar-hide"
      >
        <button
          onClick={() => setActiveCategory('All')}
          className={cn(
            'px-5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border',
            activeCategory === 'All'
              ? 'bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border-cyan-400/40 text-white shadow-glow-cyan'
              : 'glass-sm border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
          )}
        >
          All Medicines
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.label)}
            className={cn(
              'px-5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap border',
              activeCategory === cat.label
                ? 'bg-gradient-to-r from-cyan-400/20 to-violet-500/20 border-cyan-400/40 text-white shadow-glow-cyan'
                : 'glass-sm border-white/10 text-white/50 hover:bg-white/10 hover:text-white'
            )}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Results */}
      <div className="flex-1 mt-4">
        {filteredMedicines.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/30">
            <Search size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium text-white/60">No medicines found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : view === 'grid' ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
          >
            {filteredMedicines.map((m) => (
              <motion.div key={m.id} variants={staggerItem}>
                <GlassCard tilt glow="cyan" className="group h-full flex flex-col" onClick={() => navigate(`/medicine/${m.id}`)}>
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-t-3xl overflow-hidden bg-base-800">
                    <img src={m.images[0]} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03060F] via-transparent to-transparent opacity-80" />
                    
                    <button
                      onClick={(e) => toggleWishlist(e, m.id)}
                      className={cn(
                        'absolute top-4 right-4 p-2.5 rounded-xl transition-all shadow-glass backdrop-blur-md',
                        wishlist.has(m.id) ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-glow-rose' : 'bg-black/40 text-white/60 hover:text-white border border-white/10 hover:bg-black/60'
                      )}
                    >
                      <Heart size={16} className={wishlist.has(m.id) ? 'fill-rose-400' : ''} />
                    </button>
                    
                    <div className="absolute top-4 left-4">
                      {m.availability === 'available' ? (
                        <GlassBadge color="emerald" dot>In Stock</GlassBadge>
                      ) : m.availability === 'limited' ? (
                        <GlassBadge color="orange" dot>Limited Stock</GlassBadge>
                      ) : (
                        <GlassBadge color="red" dot>Out of Stock</GlassBadge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white/95 font-display leading-tight line-clamp-1 group-hover:text-cyan-400 transition-colors">{m.name}</h3>
                      <div className="shrink-0 text-right">
                        <p className="text-lg font-black text-cyan-400">{formatPrice(m.sellingPrice)}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-white/40 mb-3">{m.manufacturer}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 glass-sm px-2 py-0.5 rounded border border-white/5">{m.category}</span>
                      <span className="text-[10px] text-white/30 border border-white/5 rounded px-2 py-0.5">{m.expiryDate}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-white/30 uppercase font-bold tracking-wider mb-0.5">Seller</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white/70 truncate max-w-[100px]">{m.sellerName}</span>
                          <StarRating rating={m.sellerRating} />
                        </div>
                      </div>
                      <PremiumButton size="sm" className="px-3" onClick={(e) => { e.stopPropagation(); navigate(`/medicine/${m.id}`) }}>
                        View
                      </PremiumButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
            {filteredMedicines.map((m) => (
              <motion.div key={m.id} variants={staggerItem}>
                <GlassCard className="group flex flex-col sm:flex-row overflow-hidden hover:bg-white/5" onClick={() => navigate(`/medicine/${m.id}`)}>
                  <div className="sm:w-64 aspect-video sm:aspect-auto relative bg-base-800 shrink-0">
                    <img src={m.images[0]} alt={m.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-3 left-3">
                      {m.availability === 'available' ? <GlassBadge color="emerald" dot>In Stock</GlassBadge> : <GlassBadge color="orange" dot>Limited</GlassBadge>}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white/95 font-display mb-1 group-hover:text-cyan-400 transition-colors">{m.name}</h3>
                          <p className="text-sm text-white/40 mb-3">{m.manufacturer}</p>
                        </div>
                        <button
                          onClick={(e) => toggleWishlist(e, m.id)}
                          className={cn('p-2 rounded-xl transition-all', wishlist.has(m.id) ? 'text-rose-400 bg-rose-500/10' : 'text-white/20 hover:text-white/80 hover:bg-white/5')}
                        >
                          <Heart size={20} className={wishlist.has(m.id) ? 'fill-rose-400' : ''} />
                        </button>
                      </div>
                      <p className="text-sm text-white/50 line-clamp-2 mb-4 leading-relaxed">{m.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 glass-sm px-2 py-0.5 rounded border border-white/5">{m.category}</span>
                        <div className="flex items-center gap-1.5 text-xs text-white/40"><MapPin size={12} /> Mumbai</div>
                        <div className="flex items-center gap-1 text-xs text-white/40"><StarRating rating={m.sellerRating} /></div>
                      </div>
                    </div>
                    <div className="sm:w-48 sm:border-l border-white/5 sm:pl-5 flex flex-col justify-center sm:items-end">
                      <div className="text-left sm:text-right w-full mb-4">
                        <p className="text-xs text-white/30 uppercase font-bold tracking-wider mb-1">Wholesale Price</p>
                        <p className="text-2xl font-black text-cyan-400">{formatPrice(m.sellingPrice)}</p>
                        <p className="text-xs text-white/30 line-through mt-0.5 mr-1">{formatPrice(m.originalPrice)} MRP</p>
                      </div>
                      <PremiumButton fullWidth onClick={(e) => { e.stopPropagation(); navigate(`/medicine/${m.id}`) }}>
                        View Details
                      </PremiumButton>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
