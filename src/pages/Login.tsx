import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Pill, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useUIStore } from '../store/uiStore'
import { GlassCard } from '../components/ui/GlassCard'
import { PremiumButton } from '../components/ui/PremiumButton'
import { AnimatedInput } from '../components/ui/AnimatedInput'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { addToast } = useUIStore()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      
      let role: 'buyer' | 'seller' | 'admin' = 'buyer'
      if (data.email.includes('admin')) role = 'admin'
      else if (data.email.includes('seller')) role = 'seller'

      login({
        id: 'user_1',
        name: 'Demo User',
        email: data.email,
        role: role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`
      })

      addToast({ type: 'success', title: 'Welcome Back! 👋', message: 'Successfully logged in.' })
      navigate('/dashboard')
    } catch (err) {
      addToast({ type: 'error', title: 'Login Failed', message: 'Please check your credentials.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#03060F]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/20 to-violet-600/20 rounded-full blur-[120px] mix-blend-screen opacity-50 absolute -top-[20%] -left-[10%]" />
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-[100px] absolute -bottom-[20%] -right-[10%]" />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <motion.div whileHover={{ scale: 1.05, rotate: 10 }} className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-brand shadow-glow-cyan">
              <Pill size={24} className="text-white" />
            </motion.div>
          </Link>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">Welcome Back</h1>
          <p className="text-white/40 mt-2">Sign in to manage your marketplace.</p>
        </div>

        <GlassCard className="p-8 shadow-glass-lg border-white/10" glow="cyan">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AnimatedInput
              id="email"
              type="email"
              label="Email Address"
              icon={<Mail size={18} />}
              error={errors.email?.message as string}
              {...register('email', { required: 'Email is required' })}
            />
            
            <AnimatedInput
              id="password"
              type="password"
              label="Password"
              icon={<Lock size={18} />}
              error={errors.password?.message as string}
              {...register('password', { required: 'Password is required' })}
            />

            <div className="flex items-center justify-between text-sm mt-2 mb-8">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <input type="checkbox" className="hidden" />
                </div>
                <span className="text-white/40 group-hover:text-white/60 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Forgot Password?</a>
            </div>

            <PremiumButton type="submit" variant="primary" fullWidth loading={loading} iconRight={<ArrowRight size={18} />}>
              Sign In
            </PremiumButton>
          </form>
        </GlassCard>
        
        <p className="text-center mt-6 text-white/50 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
