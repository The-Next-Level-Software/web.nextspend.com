'use client'

import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Wallet, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Features', href: '#features' },
  // { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm shadow-primary/5 border-b border-blue-100'
          : 'bg-transparent'
          }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Scroll progress bar */}
        {/* <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-blue-500 origin-left z-10"
          style={{ scaleX }}
        /> */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-md shadow-primary/30">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Next<span className="text-primary">Spend</span>
            </span> */}
            <img src='Next Spend Logo/header.png' className='h-50' alt="Next Spend" />
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="cursor-pointer relative px-4 py-2 text-sm font-medium rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {active === link.href && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    layoutId="navPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-200 ${active === link.href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                  {link.label}
                </span>
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.a
            href="https://play.google.com/store/apps/details?id=com.nls.nextspend"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 text-background font-semibold text-sm shadow-md hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-11.53-2.88-2.88L3.18 23.76zM20.7 10.06l-2.6-1.5-3.24 2.96 3.24 2.96 2.62-1.51c.75-.43.75-1.48-.02-1.91zM2.01 1.05C1.7 1.37 1.5 1.85 1.5 2.48v19.04c0 .63.2 1.11.52 1.43l.08.07 10.67-10.67v-.25L2.09.98l-.08.07zM13.89 8.35l-2.3-2.3L3.18.24c-.35-.04-.69.03-.99.2l10.7 7.91z" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-normal opacity-80">GET IT ON</span>
              <span className="text-sm font-bold">Google Play</span>
            </div>
          </motion.a>

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
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${active === link.href
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

                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full px-4 py-3 rounded-xl bg-foreground text-background font-semibold text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-11.53-2.88-2.88L3.18 23.76zM20.7 10.06l-2.6-1.5-3.24 2.96 3.24 2.96 2.62-1.51c.75-.43.75-1.48-.02-1.91zM2.01 1.05C1.7 1.37 1.5 1.85 1.5 2.48v19.04c0 .63.2 1.11.52 1.43l.08.07 10.67-10.67v-.25L2.09.98l-.08.07zM13.89 8.35l-2.3-2.3L3.18.24c-.35-.04-.69.03-.99.2l10.7 7.91z" />
                  </svg>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[10px] font-normal opacity-80">GET IT ON</span>
                    <span className="text-sm font-bold">Google Play</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
