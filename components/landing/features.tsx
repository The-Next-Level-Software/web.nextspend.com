'use client'

import { motion } from 'framer-motion'
import {
  PieChart,
  TrendingUp,
  CreditCard,
  Tag,
  Target,
  Bell,
  Users,
  Lock,
} from 'lucide-react'

const features = [
  {
    icon: PieChart,
    title: 'Income & Expense Tracking',
    description: 'Add, edit, and manage transactions in seconds with real-time balance updates.',
    color: 'from-blue-400 to-primary',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    glow: 'group-hover:shadow-blue-200',
  },
  {
    icon: Tag,
    title: 'Smart Categories',
    description: 'Built-in and custom categories to organize spending and understand where your money goes.',
    color: 'from-violet-400 to-purple-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    glow: 'group-hover:shadow-violet-200',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Methods',
    description: 'Track cash, cards, digital wallets, and more all in one place.',
    color: 'from-sky-400 to-cyan-500',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    glow: 'group-hover:shadow-sky-200',
  },
  {
    icon: TrendingUp,
    title: 'Powerful Analytics',
    description: 'Interactive charts, reports, and monthly summaries to visualize your finances.',
    color: 'from-emerald-400 to-green-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    glow: 'group-hover:shadow-emerald-200',
  },
  {
    icon: Target,
    title: 'Budget Management',
    description: 'Set spending limits by category and get notified before overspending.',
    color: 'from-orange-400 to-amber-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    glow: 'group-hover:shadow-orange-200',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Stay informed with overspending notifications and recurring payment reminders.',
    color: 'from-rose-400 to-pink-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    glow: 'group-hover:shadow-rose-200',
  },
  {
    icon: Users,
    title: 'Multi-Profile Support',
    description: 'Separate finances for personal, family, and business expenses.',
    color: 'from-indigo-400 to-blue-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    glow: 'group-hover:shadow-indigo-200',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Encrypted data with PIN lock, biometric unlock, and secure backups.',
    color: 'from-slate-400 to-gray-500',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    glow: 'group-hover:shadow-slate-200',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-24 px-4 md:px-8 bg-background overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div
          className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-primary/8 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-sky-300/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything You Need
          </motion.span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Powerful Features{' '}
            <span className="bg-gradient-to-r from-primary via-sky-400 to-blue-600 bg-clip-text text-transparent">
              Built for You
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to take control of your finances in one beautiful app.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              <div className={`relative h-full rounded-2xl bg-white border ${feature.border} p-6 shadow-sm transition-shadow duration-300 ${feature.glow} group-hover:shadow-lg overflow-hidden`}>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`} />

                {/* Top accent line */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.color} rounded-t-2xl`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.07 }}
                />

                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`bg-gradient-to-br ${feature.color} bg-clip-text`}>
                    <feature.icon className="w-6 h-6" style={{ color: 'transparent', stroke: 'url(#grad)' }} />
                  </div>
                  {/* fallback colored icon */}
                  <feature.icon className={`w-6 h-6 absolute bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ display: 'none' }} />
                </motion.div>

                {/* Simpler icon approach */}
                <div className="hidden">
                  <feature.icon />
                </div>

                <h3 className="text-base font-semibold mb-2 text-foreground leading-snug">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom arrow on hover */}
                <motion.div
                  className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={false}
                >
                  <span>Learn more</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-sky-50 to-blue-50 border border-primary/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            { value: '50K+', label: 'Active Users' },
            { value: '₹2Cr+', label: 'Tracked Monthly' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.9★', label: 'User Rating' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            >
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
