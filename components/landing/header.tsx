'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Wallet, Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function handleNav(href: string) {
    setMobileOpen(false)
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm shadow-primary/5 border-b border-blue-100'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md shadow-primary/30">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Next<span className="text-primary">Spend</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group"
              >
                <span className={`transition-colors duration-200 ${active === link.href ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {link.label}
                </span>
                {active === link.href && (
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-full"
                    layoutId="activeNav"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/5 transition-colors duration-200" />
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="ghost"
                className="text-foreground hover:bg-primary/5 hover:text-primary font-medium"
              >
                Sign In
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 text-white font-semibold shadow-md shadow-primary/25 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-primary/10 text-primary"
            onClick={() => setMobileOpen(v => !v)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-16 left-4 right-4 z-50 bg-white rounded-2xl border border-blue-100 shadow-2xl shadow-primary/10 overflow-hidden md:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-primary to-blue-600" />

              <div className="p-4">
                <nav className="flex flex-col gap-1 mb-4">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      onClick={() => handleNav(link.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                        active === link.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-blue-50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      {link.label}
                      {active === link.href && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </motion.button>
                  ))}
                </nav>

                <div className="h-px bg-blue-100 mb-4" />

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/5 text-foreground font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-semibold shadow-md shadow-primary/25 flex items-center justify-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
