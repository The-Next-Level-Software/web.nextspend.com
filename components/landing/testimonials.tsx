'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Singh',
    role: 'Freelancer',
    initials: 'PS',
    color: 'from-sky-400 to-blue-500',
    content: 'NextSpend has completely changed how I manage my finances. I now know exactly where every rupee goes!',
    rating: 5,
  },
  {
    name: 'Raj Patel',
    role: 'Business Owner',
    initials: 'RP',
    color: 'from-primary to-blue-600',
    content: 'The multi-profile feature is a lifesaver. I can track personal and business expenses separately with ease.',
    rating: 5,
  },
  {
    name: 'Anjali Sharma',
    role: 'Student',
    initials: 'AS',
    color: 'from-indigo-400 to-violet-500',
    content: 'Finally, an app that makes budgeting fun. The animations are smooth and the interface is super intuitive.',
    rating: 5,
  },
  {
    name: 'Vikram Mehta',
    role: 'Software Engineer',
    initials: 'VM',
    color: 'from-cyan-400 to-sky-500',
    content: 'The analytics dashboard is incredible. I can see my spending patterns at a glance and make smarter decisions.',
    rating: 5,
  },
  {
    name: 'Neha Gupta',
    role: 'Teacher',
    initials: 'NG',
    color: 'from-blue-400 to-indigo-500',
    content: 'Budget alerts have saved me so many times. I never overspend on groceries anymore. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Arjun Kapoor',
    role: 'Startup Founder',
    initials: 'AK',
    color: 'from-sky-500 to-primary',
    content: 'Managing team expenses was a nightmare before NextSpend. Now everything is organized and transparent.',
    rating: 5,
  },
]

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      className="relative bg-white border border-blue-100 rounded-2xl p-6 w-72 flex-shrink-0 shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300 group"
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Top accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.color} rounded-t-2xl`} />

      {/* Quote icon */}
      <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-8 h-8 text-primary" />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 400 }}
          >
            <Star className="w-4 h-4 fill-primary text-primary" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-foreground/80 leading-relaxed mb-5">
        "{t.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white text-xs font-bold">{t.initials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const row1 = testimonials.slice(0, 3)
  const row2 = testimonials.slice(3, 6)

  return (
    <section id="testimonials" className="relative py-24 px-4 md:px-8 bg-background overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/8 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-20 left-0 w-80 h-80 bg-gradient-to-br from-sky-300/10 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
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
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What People Say
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Loved by{' '}
            <span className="bg-gradient-to-r from-primary via-sky-400 to-blue-600 bg-clip-text text-transparent">
              People Like You
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users who have taken control of their finances with NextSpend.
          </p>
        </motion.div>

        {/* Marquee row 1 — left */}
        <div className="relative mb-5 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...row1, ...row1].map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Marquee row 2 — right */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-5 w-max"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...row2, ...row2].map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { value: '50,000+', label: 'Happy Users' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '1M+', label: 'Transactions Tracked' },
            { value: '98%', label: 'Satisfaction Rate' },
          ].map(({ value, label }, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {value}
              </span>
              <span className="text-xs">{label}</span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
