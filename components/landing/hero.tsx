'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lock, Cloud, Smartphone, TrendingUp, TrendingDown, Wallet, Bell } from 'lucide-react'
import { useEffect, useState } from 'react'

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1800
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target])

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

const floatingCards = [
  {
    icon: TrendingUp,
    label: 'Monthly Savings',
    value: 16780,
    prefix: '₹',
    change: '+18%',
    positive: true,
    color: 'from-emerald-400 to-emerald-500',
    delay: 0,
    position: 'top-6 -left-6 md:-left-16',
  },
  {
    icon: TrendingDown,
    label: 'Expenses Cut',
    value: 5,
    prefix: '',
    suffix: '%',
    change: 'this month',
    positive: true,
    color: 'from-sky-400 to-blue-500',
    delay: 0.3,
    position: 'bottom-16 -right-4 md:-right-12',
  },
  {
    icon: Bell,
    label: 'Budget Alert',
    value: null,
    prefix: '',
    suffix: '',
    change: 'Groceries at 80%',
    positive: false,
    color: 'from-amber-400 to-orange-400',
    delay: 0.6,
    position: 'bottom-4 -left-4 md:-left-12',
  },
]

export function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const rotateX = useTransform(springY, [-300, 300], [8, -8])
  const rotateY = useTransform(springX, [-300, 300], [-8, 8])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 px-4 md:px-8 bg-background">

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-sky-300/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-blue-300/20 to-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-sky-200/30 to-primary/5 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(3,157,245,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(3,157,245,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <motion.span
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Smart Finance Management
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-foreground"
            variants={itemVariants}
          >
            Control Every{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-sky-400 to-blue-600 bg-clip-text text-transparent">
                Rupee
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
              />
            </span>
            {' '}with{' '}
            <span className="text-foreground">Confidence</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed"
            variants={itemVariants}
          >
            Track spending, build savings, and grow smarter with NextSpend. Personal finance management made beautifully simple.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 mb-10" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg h-auto font-semibold flex items-center gap-2 shadow-lg shadow-primary/30"
              >
                Get Started Free
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/5 hover:border-primary/50 text-foreground px-8 py-3 text-lg h-auto font-semibold"
              >
                View Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap gap-6 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            {[
              { icon: Lock, label: 'Bank-level encryption' },
              { icon: Cloud, label: 'Real-time sync' },
              { icon: Smartphone, label: 'All devices' },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                whileHover={{ color: '#039DF5', x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-4 h-4 text-primary" />
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Dashboard Card with 3D tilt */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="relative w-full max-w-md"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            {/* Main dashboard card */}
            <div className="rounded-2xl bg-white border border-blue-100 shadow-2xl shadow-primary/10 overflow-hidden">
              {/* Card header */}
              <div className="bg-gradient-to-r from-primary to-blue-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">NextSpend</span>
                </div>
                <div className="flex gap-1.5">
                  {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${c} opacity-80`} />
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Balance */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-sm text-muted-foreground mb-1">Total Balance</p>
                  <p className="text-4xl font-bold text-foreground">
                    ₹<AnimatedCounter target={45230} />
                  </p>
                  <p className="text-emerald-500 text-sm font-medium mt-1">↑ +12% from last month</p>
                </motion.div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: 'Income', value: 68500, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: TrendingUp },
                    { label: 'Expenses', value: 28450, color: 'text-red-500', bg: 'bg-red-50', icon: TrendingDown },
                  ].map(({ label, value, color, bg, icon: Icon }, i) => (
                    <motion.div
                      key={i}
                      className={`rounded-xl ${bg} p-4`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.15 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <Icon className={`w-4 h-4 ${color} mb-2`} />
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className={`text-lg font-bold ${color}`}>₹<AnimatedCounter target={value} /></p>
                    </motion.div>
                  ))}
                </div>

                {/* Mini bar chart */}
                <div>
                  <p className="text-xs text-muted-foreground mb-3 font-medium">Spending Trend</p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-sky-300"
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.6, delay: 1.2 + i * 0.05, ease: 'easeOut' }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                      <span key={i}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            {floatingCards.map(({ icon: Icon, label, value, prefix, suffix, change, positive, color, delay, position }, i) => (
              <motion.div
                key={i}
                className={`absolute ${position} bg-white rounded-xl shadow-lg border border-blue-100 px-4 py-3 min-w-[140px]`}
                initial={{ opacity: 0, scale: 0.7, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.4 + delay, duration: 0.5, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.06, y: -3 }}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-muted-foreground">{label}</p>
                {value !== null ? (
                  <p className="text-sm font-bold text-foreground">
                    {prefix}<AnimatedCounter target={value} suffix={suffix} />
                  </p>
                ) : null}
                <p className={`text-xs font-medium ${positive ? 'text-emerald-500' : 'text-amber-500'}`}>{change}</p>
              </motion.div>
            ))}

            {/* Glow effect behind card */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 to-blue-400/10 rounded-2xl blur-2xl scale-110" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
