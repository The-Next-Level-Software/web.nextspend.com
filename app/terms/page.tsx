'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'description', title: 'Description of Service' },
  { id: 'account', title: 'User Account' },
  { id: 'usage', title: 'Acceptable Use' },
  { id: 'data', title: 'Your Data' },
  { id: 'payments', title: 'Payments & Billing' },
  { id: 'termination', title: 'Termination' },
  { id: 'disclaimer', title: 'Disclaimer' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact Us' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-30% 0px -65% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm shadow-primary/5"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image src="/Next Spend Logo/nlslightlogo.png" alt="NextSpend" width={140} height={40} className="h-10 w-auto" />
            </motion.div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.header>

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary/8 via-sky-50 to-background py-16 px-4 overflow-hidden border-b border-blue-100">
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          >
            <FileText className="w-4 h-4" />
            Legal
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Terms of <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Service</span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Last updated: January 1, 2025 · Effective immediately
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex gap-10">

        {/* Sticky sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">On this page</p>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-all duration-200 ${activeSection === s.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-blue-50'
                    }`}
                >
                  {activeSection === s.id && (
                    <motion.span
                      layoutId="termsSidebarPill"
                      className="absolute left-0 w-0.5 h-5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-3xl space-y-12">

          <Section id="acceptance" title="1. Acceptance of Terms">
            <p>By downloading, installing, or using the NextSpend mobile application ("App") or visiting our website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.</p>
            <p>These Terms constitute a legally binding agreement between you and NextSpend ("we", "us", or "our"). By using NextSpend, you confirm that you are at least 13 years of age and have the legal capacity to enter into this agreement.</p>
          </Section>

          <Section id="description" title="2. Description of Service">
            <p>NextSpend is a personal finance management application that provides the following core features:</p>
            <ul>
              <li>Income and expense tracking with real-time balance updates</li>
              <li>Smart category management for organizing transactions</li>
              <li>Multiple payment method tracking (cash, cards, digital wallets)</li>
              <li>Financial analytics including charts, reports, and summaries</li>
              <li>Budget management with spending limits and alerts</li>
              <li>Multi-profile support for personal, family, and business finances</li>
              <li>Cloud sync and automatic backup across devices</li>
              <li>Offline mode with auto-sync when reconnected</li>
              <li>Export reports as PDF and CSV</li>
            </ul>
            <p>We reserve the right to modify, suspend, or discontinue any part of the service at any time with reasonable notice.</p>
          </Section>

          <Section id="account" title="3. User Account">
            <p>To access certain features of NextSpend, you must create an account. You may sign in using:</p>
            <ul>
              <li>Google account</li>
              <li>Apple ID</li>
              <li>Facebook account</li>
              <li>Email and password</li>
            </ul>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
            <p>You must provide accurate, current, and complete information during registration and keep your account information updated. We reserve the right to suspend or terminate accounts that contain false or misleading information.</p>
          </Section>

          <Section id="usage" title="4. Acceptable Use">
            <p>You agree to use NextSpend only for lawful purposes and in accordance with these Terms. You must not:</p>
            <ul>
              <li>Use the app for any fraudulent, illegal, or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to any part of the service or its systems</li>
              <li>Reverse engineer, decompile, or disassemble any part of the app</li>
              <li>Upload or transmit viruses, malware, or any malicious code</li>
              <li>Interfere with or disrupt the integrity or performance of the service</li>
              <li>Scrape, crawl, or extract data from the service without permission</li>
              <li>Use the service to store or transmit unlawful content</li>
            </ul>
            <p>Violation of these terms may result in immediate termination of your account without notice.</p>
          </Section>

          <Section id="data" title="5. Your Data">
            <p>You retain full ownership of all financial data you enter into NextSpend. By using our service, you grant us a limited license to store, process, and display your data solely for the purpose of providing the service to you.</p>
            <p>We implement industry-standard security measures including:</p>
            <ul>
              <li>Encrypted data storage and transfer</li>
              <li>Optional PIN lock and biometric authentication</li>
              <li>Daily automatic secure backups</li>
              <li>Secure login with social sign-in support</li>
            </ul>
            <p>You can export or delete your data at any time. Upon account deletion, we will remove your personal data within 30 days, except where retention is required by law.</p>
          </Section>

          <Section id="payments" title="6. Payments & Billing">
            <p>NextSpend may offer free and premium subscription tiers. For paid plans:</p>
            <ul>
              <li>Subscriptions are billed in advance on a monthly or annual basis</li>
              <li>All payments are processed securely through Google Play or Apple App Store</li>
              <li>Prices are subject to change with 30 days advance notice</li>
              <li>Refunds are handled in accordance with the respective app store's refund policy</li>
              <li>Cancellation takes effect at the end of the current billing period</li>
            </ul>
            <p>We are not responsible for any additional charges imposed by your bank or payment provider.</p>
          </Section>

          <Section id="termination" title="7. Termination">
            <p>You may terminate your account at any time by deleting the app and contacting us to remove your data. We may suspend or terminate your access to NextSpend at our sole discretion, without notice, for conduct that we believe:</p>
            <ul>
              <li>Violates these Terms of Service</li>
              <li>Is harmful to other users, us, or third parties</li>
              <li>Violates any applicable laws or regulations</li>
            </ul>
            <p>Upon termination, your right to use the service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive.</p>
          </Section>

          <Section id="disclaimer" title="8. Disclaimer">
            <p>NextSpend is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:</p>
            <ul>
              <li>The service will be uninterrupted, error-free, or secure</li>
              <li>Any errors in the service will be corrected</li>
              <li>The results obtained from using the service will be accurate or reliable</li>
            </ul>
            <p>NextSpend is a personal finance tracking tool and does not provide financial, investment, tax, or legal advice. Always consult a qualified professional for financial decisions.</p>
            <p>To the maximum extent permitted by law, NextSpend shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.</p>
          </Section>

          <Section id="changes" title="9. Changes to Terms">
            <p>We reserve the right to update these Terms at any time. When we make material changes, we will notify you by:</p>
            <ul>
              <li>Sending a notification through the app</li>
              <li>Updating the "Last updated" date at the top of this page</li>
              <li>Sending an email to your registered address for significant changes</li>
            </ul>
            <p>Your continued use of NextSpend after changes become effective constitutes your acceptance of the revised Terms. If you do not agree to the updated Terms, you must stop using the service.</p>
          </Section>

          <Section id="contact" title="10. Contact Us">
            <p>If you have any questions, concerns, or feedback about these Terms of Service, please reach out to us:</p>
            <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 mt-4 space-y-2">
              <p className="font-semibold text-foreground">Next Level Software Support</p>
              <p>Email: <a href="mailto:info@thenextlevelsoftware.com" className="text-primary hover:underline">info@thenextlevelsoftware.com</a></p>
              <p>Website: <a href="https://thenextlevelsoftware.com" target="_blank" className="text-primary hover:underline">thenextlevelsoftware.com</a></p>
              <p>Response time: Within 48 business hours</p>
            </div>
          </Section>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-100 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Next Level Software. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-primary font-medium">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-6 bg-gradient-to-b from-primary to-blue-500 rounded-full" />
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="pl-4 space-y-3 text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-primary [&_a]:hover:underline">
        {children}
      </div>
    </motion.section>
  )
}
