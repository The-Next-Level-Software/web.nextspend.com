'use client'

import { motion } from 'framer-motion'
import { Wallet, Twitter, Github, Linkedin, Instagram, ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const links = {
  Product: ['Features', 'Dashboard', 'Pricing', 'Security', 'Changelog'],
  Company: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
}

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="relative bg-background border-t border-blue-100 overflow-hidden">

      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-50/60 to-transparent" />
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-8">

        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand col — 2 cols wide */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md shadow-primary/25">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                <span className="text-primary">Next Level</span> Software
              </span>
            </motion.div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Control every rupee with confidence. Smart personal finance management for everyone.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Stay updated
              </p>
              {subscribed ? (
                <motion.p
                  className="text-sm text-primary font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Thanks for subscribing!
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 text-sm px-3 py-2 rounded-lg border border-blue-100 bg-white focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      type="submit"
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-white px-3 shadow-md shadow-primary/20"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </form>
              )}
            </div>

            {/* Socials */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-colors duration-200"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items], colIdx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + colIdx * 0.1 }}
            >
              <h4 className="text-sm font-bold text-foreground mb-4 tracking-wide uppercase">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item, i) => (
                  <motion.li key={i}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <motion.span
                        className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-200 inline-block"
                      />
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent mb-8" />

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p>© {new Date().getFullYear()} NextSpend. All rights reserved.</p>

          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-primary"
            >
              ♥
            </motion.span>
            <span>in India</span>
          </div>

          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((item, i) => (
              <a key={i} href="#" className="hover:text-primary transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
