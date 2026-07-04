import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Pill, Mail, Lock, User, ArrowRight, ArrowLeft, Building2, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { AnimatedInput } from '../components/ui/AnimatedInput'
import { ProgressBar } from '../components/ui/ProgressBar'

const STEPS = ['Account Type', 'Personal Details', 'Security']

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { addToast } = useUIStore()
  
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer')
  
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm({
    mode: 'onChange'
  })

  const password = watch('password', '')
  
  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0
    let strength = 0
    if (pass.length >= 8) strength += 25
    if (pass.match(/[A-Z]/)) strength += 25
    if (pass.match(/[0-9]/)) strength += 25
    if (pass.match(/[^A-Za-z0-9]/)) strength += 25
    return strength
  }
  const strength = getPasswordStrength(password)

  const handleNext = async () => {
    let fieldsToValidate: string[] = []
    if (step === 1) fieldsToValidate = ['name', 'email', 'phone']
    
    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      login({
        id: 'user_new',
        name: data.name,
        email: data.email,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`
      })
      addToast({ type: 'success', title: 'Account Created! 🎉', message: 'Welcome to MediCycle.' })
      navigate('/dashboard')
    } catch (err) {
      addToast({ type: 'error', title: 'Registration Failed', message: 'Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#03060F]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 absolute -top-[20%] -right-[10%]" />
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/10 to-transparent rounded-full blur-[100px] absolute -bottom-[20%] -left-[10%]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <motion.div whileHover={{ scale: 1.05, rotate: 10 }} className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-brand shadow-glow-cyan">
              <Pill size={24} className="text-white" />
            </motion.div>
          </Link>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">Create Account</h1>
          <p className="text-white/40 mt-2">Join India's premier medicine marketplace</p>
        </div>

        <GlassCard className="p-8 shadow-glass-lg border-white/10" glow="cyan">
          {/* Progress */}
          <div className="mb-8">
            <ProgressBar value={((step + 1) / STEPS.length) * 100} color="cyan" animated />
            <div className="flex justify-between mt-3 px-1">
              {STEPS.map((s, i) => (
                <span key={s} className={`text-xs font-medium transition-colors ${i <= step ? 'text-cyan-400' : 'text-white/30'}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white/90 mb-4">How do you want to use MediCycle?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRole('buyer')}
                        className={`p-6 rounded-2xl border text-left transition-all ${
                          role === 'buyer' ? 'bg-cyan-400/10 border-cyan-400/40 shadow-glow-cyan' : 'glass border-white/10 hover:border-white/30'
                        }`}
                      >
                        <User className={role === 'buyer' ? 'text-cyan-400' : 'text-white/40'} size={28} />
                        <h4 className={`font-semibold mt-4 mb-1 ${role === 'buyer' ? 'text-white' : 'text-white/80'}`}>Buyer</h4>
                        <p className="text-xs text-white/40">I want to purchase verified medicines for my pharmacy or hospital.</p>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setRole('seller')}
                        className={`p-6 rounded-2xl border text-left transition-all ${
                          role === 'seller' ? 'bg-violet-500/10 border-violet-400/40 shadow-glow-violet' : 'glass border-white/10 hover:border-white/30'
                        }`}
                      >
                        <Building2 className={role === 'seller' ? 'text-violet-400' : 'text-white/40'} size={28} />
                        <h4 className={`font-semibold mt-4 mb-1 ${role === 'seller' ? 'text-white' : 'text-white/80'}`}>Seller</h4>
                        <p className="text-xs text-white/40">I am a verified distributor looking to sell surplus stock.</p>
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <AnimatedInput
                      id="name"
                      label="Full Name"
                      icon={<User size={18} />}
                      glowColor={role === 'seller' ? 'violet' : 'cyan'}
                      error={errors.name?.message as string}
                      {...register('name', { required: 'Name is required' })}
                    />
                    <AnimatedInput
                      id="email"
                      type="email"
                      label="Business Email"
                      icon={<Mail size={18} />}
                      glowColor={role === 'seller' ? 'violet' : 'cyan'}
                      error={errors.email?.message as string}
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                      })}
                    />
                    <AnimatedInput
                      id="phone"
                      label="Phone Number"
                      icon={<Phone size={18} />}
                      glowColor={role === 'seller' ? 'violet' : 'cyan'}
                      error={errors.phone?.message as string}
                      {...register('phone', { required: 'Phone is required' })}
                    />
                    {role === 'seller' && (
                      <AnimatedInput
                        id="license"
                        label="Drug License Number"
                        icon={<CheckCircle2 size={18} />}
                        glowColor="violet"
                        hint="Required for verification"
                        {...register('license', { required: 'License is required for sellers' })}
                      />
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <AnimatedInput
                      id="password"
                      type="password"
                      label="Create Password"
                      icon={<Lock size={18} />}
                      error={errors.password?.message as string}
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Must be at least 8 characters' }
                      })}
                    />
                    
                    {/* Password Strength */}
                    <div className="px-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-white/40">Password Strength</span>
                        <span className={`text-xs font-bold ${
                          strength < 50 ? 'text-red-400' : strength < 100 ? 'text-orange-400' : 'text-emerald-400'
                        }`}>
                          {strength < 50 ? 'Weak' : strength < 100 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                        <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 25 ? (strength < 50 ? 'bg-red-400' : strength < 100 ? 'bg-orange-400' : 'bg-emerald-400') : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 50 ? (strength < 100 ? 'bg-orange-400' : 'bg-emerald-400') : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 75 ? (strength < 100 ? 'bg-orange-400' : 'bg-emerald-400') : 'bg-transparent'}`} />
                        <div className={`h-full flex-1 rounded-full transition-colors ${strength >= 100 ? 'bg-emerald-400' : 'bg-transparent'}`} />
                      </div>
                      <ul className="text-[10px] text-white/30 mt-3 space-y-1">
                        <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className={password.length >= 8 ? 'text-emerald-400' : ''} /> 8+ characters</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className={/[A-Z]/.test(password) ? 'text-emerald-400' : ''} /> One uppercase letter</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className={/[0-9]/.test(password) ? 'text-emerald-400' : ''} /> One number</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 size={10} className={/[^A-Za-z0-9]/.test(password) ? 'text-emerald-400' : ''} /> One special character</li>
                      </ul>
                    </div>

                    <AnimatedInput
                      id="location"
                      label="City / Location"
                      icon={<MapPin size={18} />}
                      {...register('location', { required: 'Location is required' })}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
              {step > 0 && (
                <PremiumButton type="button" variant="secondary" onClick={() => setStep((s) => s - 1)} icon={<ArrowLeft size={18} />}>
                  Back
                </PremiumButton>
              )}
              {step < STEPS.length - 1 ? (
                <PremiumButton type="button" variant="primary" fullWidth onClick={handleNext} iconRight={<ArrowRight size={18} />}>
                  Continue
                </PremiumButton>
              ) : (
                <PremiumButton type="submit" variant="primary" fullWidth loading={loading} iconRight={<ArrowRight size={18} />}>
                  Create Account
                </PremiumButton>
              )}
            </div>
          </form>
        </GlassCard>
        
        <p className="text-center mt-6 text-white/50 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
