import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Pill, Tag, ImageIcon } from 'lucide-react'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { AnimatedInput, AnimatedTextarea } from '../components/ui/AnimatedInput'
import { useUIStore } from '../store/uiStore'
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animations'
import { CATEGORIES } from '../data/mockData'

export default function AddMedicine() {
  const navigate = useNavigate()
  const { addToast } = useUIStore()
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate image upload by creating object URLs
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...newImages].slice(0, 4)) // Max 4 images
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 4
  })

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async () => {
    if (images.length === 0) {
      addToast({ type: 'error', title: 'Missing Image', message: 'Please upload at least one image.' })
      return
    }

    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      addToast({ type: 'success', title: 'Success', message: 'Medicine listed successfully!' })
      navigate('/dashboard')
    } catch (error) {
      addToast({ type: 'error', title: 'Error', message: 'Failed to list medicine.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto min-h-screen">
      <motion.div variants={fadeInUp} initial="initial" animate="animate" className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-white/95 tracking-tight mb-2">List New Medicine</h1>
        <p className="text-white/40">Provide details to sell your stock on the marketplace.</p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
          
          {/* Images Section */}
          <motion.div variants={staggerItem}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white/90 font-display mb-4 flex items-center gap-2">
                <ImageIcon size={20} className="text-cyan-400" />
                Product Images
              </h3>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer ${
                  isDragActive ? 'border-cyan-400 bg-cyan-400/5 shadow-glow-cyan' : 'border-white/10 hover:border-cyan-400/30 hover:bg-white/5'
                }`}
              >
                <input {...getInputProps()} />
                <div className="w-16 h-16 rounded-2xl bg-base-800 flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <Upload size={24} className={isDragActive ? 'text-cyan-400' : 'text-white/40'} />
                </div>
                <p className="text-sm font-medium text-white/80 mb-1">Drag & drop images here</p>
                <p className="text-xs text-white/40">PNG, JPG up to 5MB (Max 4)</p>
              </div>

              <AnimatePresence>
                {images.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6"
                  >
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden glass border border-white/10 group">
                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeImage(idx) }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 shadow-lg"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

          {/* Basic Info */}
          <motion.div variants={staggerItem}>
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white/90 font-display mb-6 flex items-center gap-2">
                <Pill size={20} className="text-violet-400" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2">
                  <AnimatedInput
                    id="name"
                    label="Medicine Name"
                    glowColor="violet"
                    error={errors.name?.message as string}
                    {...register('name', { required: 'Name is required' })}
                  />
                </div>
                <AnimatedInput
                  id="manufacturer"
                  label="Manufacturer"
                  glowColor="violet"
                  error={errors.manufacturer?.message as string}
                  {...register('manufacturer', { required: 'Manufacturer is required' })}
                />
                <div className="relative">
                  <select
                    className={`w-full bg-base-800/50 border border-white/10 rounded-2xl px-4 py-4 text-white/90 outline-none transition-all duration-300 appearance-none focus:border-violet-400/50 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1)]`}
                    {...register('category', { required: 'Category is required' })}
                  >
                    <option value="" disabled selected className="text-white/40">Select Category</option>
                    {CATEGORIES.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              
              <AnimatedTextarea
                id="description"
                label="Full Description"
                glowColor="violet"
                error={errors.description?.message as string}
                {...register('description', { required: 'Description is required' })}
              />
            </GlassCard>
          </motion.div>

          {/* Pricing & Stock */}
          <motion.div variants={staggerItem}>
            <GlassCard className="p-6 border-cyan-400/20">
              <h3 className="text-lg font-bold text-white/90 font-display mb-6 flex items-center gap-2">
                <Tag size={20} className="text-emerald-400" />
                Pricing & Inventory
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <AnimatedInput
                  id="sellingPrice"
                  type="number"
                  label="Selling Price (₹)"
                  glowColor="emerald"
                  error={errors.sellingPrice?.message as string}
                  {...register('sellingPrice', { required: 'Required', min: 1 })}
                />
                <AnimatedInput
                  id="originalPrice"
                  type="number"
                  label="Original MRP (₹)"
                  glowColor="emerald"
                  error={errors.originalPrice?.message as string}
                  {...register('originalPrice', { required: 'Required', min: 1 })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatedInput
                  id="quantity"
                  type="number"
                  label="Stock Quantity"
                  glowColor="emerald"
                  error={errors.quantity?.message as string}
                  {...register('quantity', { required: 'Required', min: 1 })}
                />
                <div className="relative">
                  <select
                    className="w-full bg-base-800/50 border border-white/10 rounded-2xl px-4 py-4 text-white/90 outline-none transition-all duration-300 appearance-none focus:border-emerald-400/50 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)]"
                    {...register('unit', { required: 'Required' })}
                  >
                    <option value="strips">Strips</option>
                    <option value="bottles">Bottles</option>
                    <option value="boxes">Boxes</option>
                    <option value="vials">Vials</option>
                  </select>
                </div>
                <AnimatedInput
                  id="expiryDate"
                  type="date"
                  label="Expiry Date"
                  glowColor="rose"
                  error={errors.expiryDate?.message as string}
                  {...register('expiryDate', { required: 'Required' })}
                />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={staggerItem} className="flex justify-end gap-4 pt-4">
            <PremiumButton type="button" variant="secondary" onClick={() => navigate('/dashboard')}>
              Cancel
            </PremiumButton>
            <PremiumButton type="submit" variant="primary" loading={loading} className="px-10">
              Publish Listing
            </PremiumButton>
          </motion.div>

        </motion.div>
      </form>
    </div>
  )
}
