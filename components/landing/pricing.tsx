'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check, Zap, Star, Building2 } from 'lucide-react'
import { useState } from 'react'

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Perfect for getting started with personal finance.',
    color: 'from-sky-400 to-blue-400',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    features: [
      'Income & expense tracking',
      'Basic categories',
      'Monthly summaries',
      'Cloud sync',
      'Mobile & web access',
    ],
  },
  {
    name: 'Pro',
    icon: Star,
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: 'For serious money managers who want full control.',
    color: 'from-primary to-blue-600',
    bg: 'bg-primary',
    border: 'border-primary',
    popular: true,
    features: [
      'Everything in Starter',
      'Unlimited custom categories',
      'Advanced analytics & reports',
      'Budget management',
      'Smart alerts',
      'Multi-profile support',
      'Priority support',
    ],
  },
  {
    name: 'Business',
    icon: Building2,
    monthlyPrice: 299,
    yearlyPrice: 239,
    description: 'For teams and businesses managing shared finances.',
    color: 'from-indigo-400 to-blue-500',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Advanced permissions',
      'Custom reports',
      'API access',
      'Dedicated support',
      'Admin dashboard',
    ],
  },
]

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="relative py-24 px-4 md:px-8 bg-background overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-primary/8 to-transparent rounded-full blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
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
            Simple Pricing
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Transparent{' '}
            <span className="bg-gradient-to-r from-primary via-sky-400 to-blue-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your financial management needs.
          </p>

          {/* Billing toggle */}
          <motion.div
            className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-full px-2 py-1.5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setYearly(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${!yearly ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${yearly ? 'bg-white shadow text-foreground' : 'text-muted-foreground'}`}
            >
              Yearly
              <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">-20%</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ y: plan.popular ? -8 : -6 }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="bg-gradient-to-r from-primary to-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-primary/30 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Most Popular
                    </span>
                  </motion.div>
                )}

                <div className={`rounded-2xl border-2 overflow-hidden h-full flex flex-col ${
                  plan.popular
                    ? 'border-primary shadow-2xl shadow-primary/20 bg-white'
                    : `${plan.border} shadow-sm bg-white`
                }`}>

                  {/* Card top accent */}
                  <div className={`h-1.5 bg-gradient-to-r ${plan.color}`} />

                  <div className="p-7 flex flex-col flex-1">

                    {/* Icon + name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                        <p className="text-xs text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${plan.name}-${yearly}`}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-end gap-1"
                        >
                          {price === 0 ? (
                            <span className="text-4xl font-bold text-foreground">Free</span>
                          ) : (
                            <>
                              <span className="text-4xl font-bold text-foreground">₹{price}</span>
                              <span className="text-muted-foreground text-sm mb-1">/month</span>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                      {yearly && price > 0 && (
                        <motion.p
                          className="text-xs text-sky-500 font-medium mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Billed ₹{price * 12}/year · Save ₹{(plan.monthlyPrice - price) * 12}
                        </motion.p>
                      )}
                    </div>

                    {/* CTA */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mb-7">
                      <Button
                        className={`w-full font-semibold h-11 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 text-white shadow-lg shadow-primary/30'
                            : 'border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-foreground bg-transparent'
                        }`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        {price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                      </Button>
                    </motion.div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent mb-6" />

                    {/* Features */}
                    <div className="space-y-3 flex-1">
                      {plan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start gap-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                          <span className="text-foreground/80">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>

      </div>
    </section>
  )
}
