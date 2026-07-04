import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageSquare, ShoppingCart, ShieldCheck, Package, MapPin, ChevronRight, Share2 } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { GlassBadge, StarRating } from '../components/ui/GlassBadge'
import { MEDICINES } from '../data/mockData'
import { formatPrice } from '../lib/utils'
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animations'
import { useUIStore } from '../store/uiStore'
export default function MedicineDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useUIStore()
  
  const medicine = MEDICINES.find((m) => m.id === id) || MEDICINES[0]
  const [activeImage, setActiveImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = Math.round(((medicine.originalPrice - medicine.sellingPrice) / medicine.originalPrice) * 100)

  const handleContactSeller = () => {
    addToast({ type: 'info', title: 'Connecting', message: `Starting chat with ${medicine.sellerName}...` })
    setTimeout(() => navigate('/chat'), 800)
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-white/40 mb-6 font-medium">
        <button onClick={() => navigate('/marketplace')} className="hover:text-cyan-400 transition-colors">Marketplace</button>
        <ChevronRight size={14} />
        <span className="text-white/80">{medicine.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Gallery */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-4">
          <GlassCard className="aspect-square relative group overflow-hidden bg-base-800 p-1">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={medicine.images[activeImage]}
                alt={medicine.name}
                className="w-full h-full object-cover rounded-[22px]"
              />
            </AnimatePresence>
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {medicine.availability === 'available' ? (
                <GlassBadge color="emerald" dot>In Stock</GlassBadge>
              ) : (
                <GlassBadge color="orange" dot>Limited Stock</GlassBadge>
              )}
              {discount > 0 && (
                <GlassBadge color="rose">-{discount}% OFF</GlassBadge>
              )}
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted)
                  addToast({ type: isWishlisted ? 'info' : 'success', title: isWishlisted ? 'Removed' : 'Added to Wishlist' })
                }}
                className={`p-3 rounded-xl glass-sm transition-all border ${isWishlisted ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-glow-rose' : 'border-white/10 text-white/50 hover:bg-white/10 hover:text-white'}`}
              >
                <Heart size={20} className={isWishlisted ? 'fill-rose-400' : ''} />
              </button>
              <button className="p-3 rounded-xl glass-sm border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </GlassCard>
          
          <div className="grid grid-cols-4 gap-3">
            {medicine.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-square rounded-xl overflow-hidden glass border-2 transition-all ${
                  activeImage === idx ? 'border-cyan-400 shadow-glow-cyan' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex flex-col">
          <motion.div variants={staggerItem} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 glass-sm px-2 py-0.5 rounded border border-white/5">{medicine.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black font-display text-white/95 leading-tight mb-2">
              {medicine.name}
            </h1>
            <p className="text-lg text-white/50 font-light">{medicine.manufacturer}</p>
          </motion.div>

          <motion.div variants={staggerItem} className="p-6 glass-card rounded-3xl mb-8 border-cyan-400/20">
            <p className="text-sm text-white/40 uppercase font-bold tracking-wider mb-1">Wholesale Price</p>
            <div className="flex items-end gap-4 mb-2">
              <span className="text-4xl font-black text-cyan-400 tracking-tight">{formatPrice(medicine.sellingPrice)}</span>
              <span className="text-lg text-white/30 line-through mb-1">{formatPrice(medicine.originalPrice)} MRP</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium pt-4 mt-4 border-t border-white/10">
              <span className="flex items-center gap-2 text-white/70">
                <Package size={16} className="text-cyan-400" /> Min. Order: 50 Units
              </span>
              <span className="flex items-center gap-2 text-white/70">
                <ShieldCheck size={16} className="text-emerald-400" /> 100% Genuine
              </span>
            </div>
          </motion.div>

          <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4 mb-8">
            <PremiumButton size="lg" icon={<ShoppingCart size={20} />} onClick={() => addToast({ type: 'success', title: 'Added to Cart' })}>
              Add to Cart
            </PremiumButton>
            <PremiumButton variant="secondary" size="lg" icon={<MessageSquare size={20} />} onClick={handleContactSeller}>
              Contact Seller
            </PremiumButton>
          </motion.div>

          {/* Details Grid */}
          <motion.div variants={staggerItem} className="grid grid-cols-2 gap-4 mb-8">
            <div className="glass p-4 rounded-2xl border-white/5">
              <p className="text-xs text-white/40 mb-1">Stock Location</p>
              <p className="text-sm font-semibold text-white/90">Mumbai, MH</p>
            </div>
            <div className="glass p-4 rounded-2xl border-white/5">
              <p className="text-xs text-white/40 mb-1">Expiry Date</p>
              <p className="text-sm font-semibold text-rose-400">{medicine.expiryDate}</p>
            </div>
            <div className="glass p-4 rounded-2xl border-white/5">
              <p className="text-xs text-white/40 mb-1">Mfd. Date</p>
              <p className="text-sm font-semibold text-white/90">{medicine.manufacturingDate}</p>
            </div>
            <div className="glass p-4 rounded-2xl border-white/5">
              <p className="text-xs text-white/40 mb-1">Available Qty</p>
              <p className="text-sm font-semibold text-white/90">{medicine.quantity} {medicine.unit}</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={staggerItem} className="mb-8">
            <h3 className="text-lg font-bold text-white/90 font-display mb-3">Description</h3>
            <p className="text-white/50 leading-relaxed font-light">{medicine.description}</p>
          </motion.div>

          {/* Seller Info */}
          <motion.div variants={staggerItem}>
            <GlassCard className="p-6 border-white/10">
              <h3 className="text-sm uppercase font-bold tracking-wider text-white/40 mb-4">Seller Information</h3>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-rose-500 p-0.5">
                    <div className="w-full h-full bg-base-900 rounded-full flex items-center justify-center font-bold text-xl text-white">
                      {medicine.sellerName[0]}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white/95">{medicine.sellerName}</h4>
                      <ShieldCheck size={14} className="text-emerald-400" />
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <StarRating rating={medicine.sellerRating} reviews={128} />
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <MapPin size={12} /> Mumbai, MH
                      </span>
                    </div>
                  </div>
                </div>
                <PremiumButton variant="secondary" size="sm" onClick={handleContactSeller}>
                  Message
                </PremiumButton>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
