'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react'
import { useEffect, useState } from 'react'

function AnimatedCounter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (1600 / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target])
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

const bars = [55, 70, 45, 80, 60, 90, 65, 85, 50, 75, 88, 72]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const transactions = [
  { name: 'Salary Credit', category: 'Income', amount: '+$45,000', positive: true, icon: '💼', time: 'Today' },
  { name: 'Grocery Store', category: 'Food', amount: '-$2,340', positive: false, icon: '🛒', time: 'Yesterday' },
  { name: 'Netflix', category: 'Entertainment', amount: '-$649', positive: false, icon: '🎬', time: '2 days ago' },
  { name: 'Freelance Work', category: 'Income', amount: '+$8,500', positive: true, icon: '💻', time: '3 days ago' },
]

const donutSegments = [
  { label: 'Food', percent: 35, color: '#039DF5' },
  { label: 'Transport', percent: 20, color: '#38bdf8' },
  { label: 'Shopping', percent: 25, color: '#7dd3fc' },
  { label: 'Others', percent: 20, color: '#bae6fd' },
]

export function DashboardPreview() {
  const [inView, setInView] = useState(false)

  // Build donut path data
  const radius = 40
  const cx = 60
  const cy = 60
  let cumulative = 0
  const segments = donutSegments.map((seg) => {
    const start = cumulative
    cumulative += seg.percent
    const startAngle = (start / 100) * 360 - 90
    const endAngle = (cumulative / 100) * 360 - 90
    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const x1 = cx + radius * Math.cos(startRad)
    const y1 = cy + radius * Math.sin(startRad)
    const x2 = cx + radius * Math.cos(endRad)
    const y2 = cy + radius * Math.sin(endRad)
    const largeArc = seg.percent > 50 ? 1 : 0
    return { ...seg, d: `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z` }
  })

  return (
    <section className="relative py-24 px-4 md:px-8 bg-background overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-gradient-to-t from-primary/8 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          onViewportEnter={() => setInView(true)}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Live Dashboard
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            See Your Money{' '}
            <span className="bg-gradient-to-r from-primary via-sky-400 to-blue-600 bg-clip-text text-transparent">
              Clearly
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beautiful dashboards and interactive charts that make financial insights instantly clear.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          className="rounded-2xl bg-white border border-blue-100 shadow-2xl shadow-primary/10 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Top bar */}
          <div className="bg-gradient-to-r from-primary to-blue-600 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-white" />
              <span className="text-white font-semibold text-sm">NextSpend Dashboard</span>
            </div>
            <div className="flex gap-1.5">
              {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((c, i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full ${c} opacity-80`} />
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">

            {/* Stat cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Balance', value: 45230, prefix: '$', change: '+12%', positive: true, icon: Wallet, bg: 'bg-primary', light: 'bg-blue-50' },
                { label: 'Total Income', value: 68500, prefix: '$', change: '+8%', positive: true, icon: TrendingUp, bg: 'bg-sky-500', light: 'bg-sky-50' },
                { label: 'Total Expenses', value: 28450, prefix: '$', change: '-5%', positive: false, icon: TrendingDown, bg: 'bg-blue-400', light: 'bg-blue-50' },
              ].map(({ label, value, prefix, change, positive, icon: Icon, bg, light }, i) => (
                <motion.div
                  key={i}
                  className={`rounded-xl ${light} border border-blue-100 p-5`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(3,157,245,0.12)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {inView ? <AnimatedCounter target={value} prefix={prefix} /> : `${prefix}0`}
                  </p>
                  <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${positive ? 'text-sky-500' : 'text-blue-400'}`}>
                    {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span>{change} from last month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

              {/* Bar chart — takes 2 cols */}
              <motion.div
                className="lg:col-span-2 rounded-xl bg-blue-50/60 border border-blue-100 p-5"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold text-foreground">Monthly Spending Trend</h3>
                  <span className="text-xs text-muted-foreground bg-white border border-blue-100 px-2 py-1 rounded-md">2024</span>
                </div>
                <div className="flex items-end gap-1.5 h-32">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-sky-300 relative group"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none"
                        transition={{ duration: 0.15 }}
                      >
                        {h}%
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-[10px] text-muted-foreground">
                  {months.map((m, i) => <span key={i}>{m}</span>)}
                </div>
              </motion.div>

              {/* Donut chart */}
              <motion.div
                className="rounded-xl bg-blue-50/60 border border-blue-100 p-5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Spending Breakdown</h3>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col items-center">
                  <motion.svg
                    width="120" height="120" viewBox="0 0 120 120"
                    initial={{ rotate: -90, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                  >
                    {segments.map((seg, i) => (
                      <motion.path
                        key={i}
                        d={seg.d}
                        fill={seg.color}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      />
                    ))}
                    <circle cx="60" cy="60" r="24" fill="white" />
                    <text x="60" y="56" textAnchor="middle" fontSize="8" fill="#4b7a9e" fontWeight="500">Total</text>
                    <text x="60" y="68" textAnchor="middle" fontSize="9" fill="#0f172a" fontWeight="700">$28,450</text>
                  </motion.svg>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 w-full">
                    {donutSegments.map((seg, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-[11px] text-muted-foreground">{seg.label} {seg.percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent transactions */}
            <motion.div
              className="rounded-xl bg-blue-50/60 border border-blue-100 p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-foreground mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.map((tx, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-blue-100"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    whileHover={{ x: 4, backgroundColor: '#f0f8ff' }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{tx.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{tx.name}</p>
                        <p className="text-xs text-muted-foreground">{tx.category} · {tx.time}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${tx.positive ? 'text-sky-500' : 'text-blue-400'}`}>
                      {tx.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}
