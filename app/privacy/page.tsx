'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'collection', title: 'Data We Collect' },
  { id: 'usage', title: 'How We Use Data' },
  { id: 'storage', title: 'Data Storage & Security' },
  { id: 'sharing', title: 'Data Sharing' },
  { id: 'retention', title: 'Data Retention' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'children', title: "Children's Privacy" },
  { id: 'thirdparty', title: 'Third-Party Services' },
  { id: 'changes', title: 'Policy Changes' },
  { id: 'contact', title: 'Contact Us' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('overview')
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
      <div className="relative bg-gradient-to-br from-emerald-50 via-sky-50 to-background py-16 px-4 overflow-hidden border-b border-blue-100">
        <motion.div
          className="absolute top-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-medium mb-4"
          >
            <Shield className="w-4 h-4" />
            Privacy First
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Privacy <span className="bg-gradient-to-r from-emerald-500 to-primary bg-clip-text text-transparent">Policy</span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Last updated: January 1, 2025 · We take your privacy seriously
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
                    ? 'bg-emerald-500/10 text-emerald-600 font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-blue-50'
                    }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-3xl space-y-12">

          <Section id="overview" title="1. Overview">
            <p>At NextSpend, your privacy is our top priority. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the NextSpend mobile application and related services.</p>
            <p>We are committed to being transparent about our data practices. We collect only what is necessary to provide you with a great personal finance management experience, and we never sell your personal data to third parties.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {[
                { icon: '🔒', label: 'Encrypted Storage' },
                { icon: '🚫', label: 'No Data Selling' },
                { icon: '✅', label: 'You Own Your Data' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm font-medium text-emerald-700">
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </Section>

          <Section id="collection" title="2. Data We Collect">
            <p>We collect the following types of information:</p>
            <p className="font-semibold text-foreground">Account Information</p>
            <ul>
              <li>Name and email address (from sign-in provider)</li>
              <li>Profile photo (optional, from social login)</li>
              <li>Authentication tokens from Google, Apple, or Facebook</li>
            </ul>
            <p className="font-semibold text-foreground">Financial Data (stored locally & synced to your account)</p>
            <ul>
              <li>Income and expense transactions you manually enter</li>
              <li>Category names and custom categories you create</li>
              <li>Budget limits and savings goals you set</li>
              <li>Payment method labels you define</li>
              <li>Notes and descriptions attached to transactions</li>
            </ul>
            <p className="font-semibold text-foreground">Usage & Technical Data</p>
            <ul>
              <li>App crash reports and error logs</li>
              <li>Device type, OS version, and app version</li>
              <li>General usage analytics (feature usage frequency)</li>
            </ul>
            <p>We do not collect your bank account numbers, credit card numbers, or any actual financial account credentials.</p>
          </Section>

          <Section id="usage" title="3. How We Use Your Data">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the NextSpend service</li>
              <li>Sync your financial data across your devices</li>
              <li>Send you budget alerts, overspending notifications, and reminders you configure</li>
              <li>Generate your financial reports, charts, and summaries</li>
              <li>Authenticate your identity and secure your account</li>
              <li>Diagnose technical issues and fix bugs</li>
              <li>Respond to your support requests</li>
              <li>Send important service announcements and policy updates</li>
            </ul>
            <p>We do not use your financial data for advertising, profiling, or any purpose beyond delivering the service to you.</p>
          </Section>

          <Section id="storage" title="4. Data Storage & Security">
            <p>We take the security of your financial data seriously. Our security measures include:</p>
            <ul>
              <li>All data is encrypted in transit using TLS/SSL</li>
              <li>Data at rest is encrypted using AES-256 encryption</li>
              <li>Optional PIN lock to prevent unauthorized app access</li>
              <li>Optional biometric authentication (fingerprint/Face ID)</li>
              <li>Daily automatic secure backups</li>
              <li>Secure cloud infrastructure with access controls</li>
            </ul>
            <p>Your data is stored on secure servers. While we implement industry-standard security practices, no method of transmission over the internet is 100% secure. We encourage you to use a strong password and enable PIN/biometric lock.</p>
          </Section>

          <Section id="sharing" title="5. Data Sharing">
            <p>We do not sell, trade, or rent your personal information to third parties. We may share data only in the following limited circumstances:</p>
            <ul>
              <li><strong className="text-foreground">Service Providers:</strong> Trusted third-party vendors who help us operate the service (e.g., cloud hosting, analytics), bound by confidentiality agreements</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, court order, or government authority</li>
              <li><strong className="text-foreground">Business Transfer:</strong> In the event of a merger, acquisition, or sale of assets, with prior notice to you</li>
              <li><strong className="text-foreground">Safety:</strong> To protect the rights, property, or safety of NextSpend, our users, or the public</li>
            </ul>
            <p>Any third-party service providers we use are contractually obligated to protect your data and use it only for the purposes we specify.</p>
          </Section>

          <Section id="retention" title="6. Data Retention">
            <p>We retain your data for as long as your account is active or as needed to provide you services. Specifically:</p>
            <ul>
              <li>Active account data is retained indefinitely while your account exists</li>
              <li>Upon account deletion, personal data is removed within 30 days</li>
              <li>Anonymized, aggregated analytics data may be retained longer</li>
              <li>Backup copies may persist for up to 90 days after deletion</li>
              <li>Data required by law may be retained for the legally mandated period</li>
            </ul>
            <p>You can request deletion of your data at any time by contacting us or using the in-app account deletion feature.</p>
          </Section>

          <Section id="rights" title="7. Your Rights">
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong className="text-foreground">Access:</strong> Request a copy of all personal data we hold about you</li>
              <li><strong className="text-foreground">Correction:</strong> Update or correct inaccurate personal information</li>
              <li><strong className="text-foreground">Deletion:</strong> Request deletion of your account and associated data</li>
              <li><strong className="text-foreground">Export:</strong> Download your financial data as PDF or CSV at any time</li>
              <li><strong className="text-foreground">Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from non-essential communications at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:info@thenextlevelsoftware.com">info@thenextlevelsoftware.com</a>. We will respond within 30 days.</p>
          </Section>

          <Section id="children" title="8. Children's Privacy">
            <p>NextSpend is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.</p>
            <p>If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at <a href="mailto:info@thenextlevelsoftware.com">info@thenextlevelsoftware.com</a>. We will promptly delete such information from our systems.</p>
            <p>Users between 13 and 18 years of age should use the app only with parental consent.</p>
          </Section>

          <Section id="thirdparty" title="9. Third-Party Services">
            <p>NextSpend integrates with the following third-party services for authentication and distribution:</p>
            <ul>
              <li><strong className="text-foreground">Google Sign-In</strong> — governed by Google's Privacy Policy</li>
              <li><strong className="text-foreground">Apple Sign-In</strong> — governed by Apple's Privacy Policy</li>
              <li><strong className="text-foreground">Facebook Login</strong> — governed by Meta's Privacy Policy</li>
              <li><strong className="text-foreground">Google Play Store</strong> — for app distribution and payments</li>
            </ul>
            <p>These services have their own privacy policies. We encourage you to review them. We are not responsible for the privacy practices of these third-party services.</p>
            <p>Future features may include Google Drive or Dropbox export. These integrations will be opt-in and clearly disclosed.</p>
          </Section>

          <Section id="changes" title="10. Policy Changes">
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make changes:</p>
            <ul>
              <li>We will update the "Last updated" date at the top of this page</li>
              <li>For significant changes, we will notify you via in-app notification</li>
              <li>For material changes affecting your rights, we will send an email notification</li>
            </ul>
            <p>Your continued use of NextSpend after the effective date of the revised policy constitutes your acceptance of the changes.</p>
          </Section>

          <Section id="contact" title="11. Contact Us">
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mt-4 space-y-2">
              <p className="font-semibold text-foreground">Next Level Privacy Team</p>
              {/* <p>Email: <a href="mailto:privacy@nextspend.com" className="text-emerald-600 hover:underline">privacy@nextspend.com</a></p> */}
              <p>Support: <a href="mailto:info@thenextlevelsoftware.com" className="text-emerald-600 hover:underline">info@thenextlevelsoftware.com</a></p>
              <p>Website: <a href="https://thenextlevelsoftware.com" target='blank' className="text-emerald-600 hover:underline">thenextlevelsoftware.com</a></p>
              <p>Response time: Within 30 days for privacy requests</p>
            </div>
          </Section>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-100 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Next Level Software. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-primary font-medium">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
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
        <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-primary rounded-full" />
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="pl-4 space-y-3 text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-emerald-600 [&_a]:hover:underline">
        {children}
      </div>
    </motion.section>
  )
}
