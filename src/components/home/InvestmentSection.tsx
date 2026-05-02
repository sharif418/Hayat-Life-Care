'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, HandCoins, Users, Shield, Check, CreditCard, ArrowRight, BookOpen, Phone, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/animations'
import { useSectionReveal } from '@/components/ui/animations'
import { useDownload } from '@/components/providers/DownloadProvider'

interface InvestmentSectionProps {
  isDarkMode: boolean
}

const benefitNames: Record<string, string> = {
  B1: 'Lifetime Financial Benefit',
  B2: 'Self Health Access',
  B3: 'Partner Health Access',
  B4: 'Family Health Access',
  B5: 'Family Health Access Including Parents',
  B6: 'Family Health Access Including Parents-in-law',
  B7: 'VIP Access to All Facilities of the Complex',
  B8: 'Social Recognition & Share Certification',
}

function TierBenefits({ benefits, gradient, color }: { benefits: string[], gradient: string, color: string }) {
  const [hovered, setHovered] = useState<string | null>(null)
  return (
    <div className="px-5 pb-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">Benefits Included</div>
      <div className="flex flex-wrap gap-2">
        {benefits.map((b) => (
          <span
            key={b}
            onMouseEnter={() => setHovered(b)}
            onMouseLeave={() => setHovered(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm cursor-pointer transition-all duration-200 ease-out ${
              hovered === b
                ? 'scale-110 -translate-y-1 shadow-lg ring-2 ring-white/40'
                : hovered
                  ? 'opacity-50 scale-95'
                  : ''
            }`}
            style={{ background: gradient }}
          >
            {b}
          </span>
        ))}
      </div>
      {/* Inline benefit meaning display */}
      <div className={`mt-3 overflow-hidden transition-all duration-200 ease-out ${hovered ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: `${color}10` }}>
          <span className="font-bold shrink-0" style={{ color }}>{hovered}:</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">{hovered ? benefitNames[hovered] : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default function InvestmentSection({ isDarkMode }: InvestmentSectionProps) {
  const [investShares, setInvestShares] = useState(1)
  const [investRate, setInvestRate] = useState(10)
  const brochureReveal = useSectionReveal()
  const { openDownloadPopup } = useDownload()
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', shares: '1', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleInvestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          subject: `Investment Inquiry — ${formData.shares} Share(s)`,
          message: formData.message || `Interested in investing ${formData.shares} share(s) in Hayat Life Care.`,
        }),
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', phone: '', email: '', shares: '1', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <>
      <section id="investment" className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <TrendingUp className="size-3" />
                INVESTMENT OPPORTUNITY
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Pathways to Prestige Ownership
              </h2>
              <div className="relative">
                <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
              <p className="mt-4 text-teal-700 dark:text-teal-400 font-medium italic">
                Become a partner in building a healthier, more prosperous tomorrow—together.
              </p>
            </div>
          </FadeIn>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 1. PARTNERSHIP CTA — TOP (Client Request)              */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div className="max-w-5xl mx-auto mb-16">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative h-[380px] md:h-[420px]">
                  <img
                    src="/images/investment-partnership.png"
                    alt="Join our growing family of investors"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.4) 100%)' }} />
                  <div className="absolute inset-0 flex items-center">
                    <div className="px-8 md:px-14 max-w-xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-emerald-300 mb-5">
                        <Users className="size-3" />
                        JOIN OUR GROWING FAMILY
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        Together, We Build a
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-300"> Healthier Future</span>
                      </h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
                        Join 500+ visionary investors who believe in building a healthcare legacy for generations. Your partnership today shapes the well-being of tomorrow.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          size="lg"
                          className="rounded-full px-8 text-white font-semibold shadow-xl hover:scale-105 transition-transform"
                          style={{ background: 'linear-gradient(135deg, #D97706, #B45309)' }}
                          onClick={() => setShowInvestModal(true)}
                        >
                          <Sparkles className="mr-2 size-4" />
                          Click to be a partner
                        </Button>
                        <Button
                          size="lg"
                          className="rounded-full px-8 text-white font-semibold bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                          asChild
                        >
                          <a href="tel:01335074940">
                            <Phone className="mr-2 size-4" />
                            Speak With Us
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 2. SHAREHOLDER TIERS — Director Status & Benefits      */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div className="mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-4">
                  <Users className="size-3" />
                  SHAREHOLDER TIERS
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Director Status & Benefits
                </h3>
                <div className="relative mb-4">
                  <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #D97706, #B45309)' }} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
                  Your status and benefits grow with your investment. Choose the tier that best suits your vision.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {[
                  {
                    tier: 'Bronze',
                    status: 'Share Holder',
                    amount: '৳10,00,000',
                    minShares: '1 Share',
                    benefits: ['B1', 'B2', 'B8'],
                    color: '#CD7F32',
                    gradient: 'linear-gradient(135deg, #CD7F32, #A0522D)',
                    popular: false,
                  },
                  {
                    tier: 'Silver',
                    status: 'Share Holder',
                    amount: '৳20,00,000 — ৳40,00,000',
                    minShares: '2 Shares',
                    benefits: ['B1', 'B2', 'B3', 'B8'],
                    color: '#9CA3AF',
                    gradient: 'linear-gradient(135deg, #9CA3AF, #6B7280)',
                    popular: false,
                  },
                  {
                    tier: 'Gold',
                    status: 'Share Holder',
                    amount: '৳50,00,000 — ৳90,00,000',
                    minShares: '5 Shares',
                    benefits: ['B1', 'B2', 'B3', 'B4', 'B8'],
                    color: '#D97706',
                    gradient: 'linear-gradient(135deg, #D97706, #B45309)',
                    popular: true,
                  },
                  {
                    tier: 'Platinum',
                    status: 'Director',
                    amount: '৳1,00,00,000 — ৳1,40,00,000',
                    minShares: '10 Shares',
                    benefits: ['B1', 'B2', 'B3', 'B4', 'B5', 'B8'],
                    color: '#6366F1',
                    gradient: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                    popular: false,
                  },
                  {
                    tier: 'Diamond',
                    status: 'Director',
                    amount: '৳1,50,00,000 — ৳1,90,00,000',
                    minShares: '15 Shares',
                    benefits: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B8'],
                    color: '#06B6D4',
                    gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
                    popular: false,
                  },
                  {
                    tier: 'VIP',
                    status: 'Director',
                    amount: '৳2,00,00,000+',
                    minShares: '20 Shares',
                    benefits: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
                    color: '#0D9488',
                    gradient: 'linear-gradient(135deg, #0D9488, #065F46)',
                    popular: false,
                  },
                ].map((tier, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className={`group relative bg-white dark:bg-slate-800 rounded-2xl border-2 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-default ${
                      tier.popular ? 'border-amber-300 dark:border-amber-600 ring-2 ring-amber-200/50' : 'border-gray-100 dark:border-slate-700 hover:border-transparent'
                    }`}
                    style={{
                      // @ts-ignore
                      '--tier-color': tier.color,
                    }}
                  >
                    {!tier.popular && (
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 0 2px ${tier.color}, 0 0 20px ${tier.color}25` }}
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% -20%, ${tier.color}12 0%, transparent 60%)` }}
                    />
                    {tier.popular && (
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg" style={{ background: tier.gradient }}>
                        Popular
                      </div>
                    )}
                    <div className="relative p-5 pb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300" style={{ background: tier.gradient }}>
                          <HandCoins className="size-5" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:tracking-wide transition-all duration-300">{tier.tier}</div>
                          <div className="text-xs font-semibold" style={{ color: tier.color }}>{tier.status}</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-0.5">{tier.amount}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Minimum: {tier.minShares}</div>
                    </div>
                    <TierBenefits benefits={tier.benefits} gradient={tier.gradient} color={tier.color} />
                    <div className="h-1.5 group-hover:h-2 transition-all duration-300 rounded-b-2xl" style={{ background: tier.gradient }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 3. INVESTMENT ROI CALCULATOR                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div className="max-w-5xl mx-auto mb-16 bg-white dark:bg-slate-800/80 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden">
              <div className="p-6 md:p-8 text-white" style={{ background: 'linear-gradient(135deg, #0D9488 0%, #065F46 100%)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center">
                    <HandCoins className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">Investment ROI Calculator</h4>
                    <p className="text-sm text-white/70">Estimate your potential returns in real-time</p>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Number of Shares</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={investShares}
                      onChange={e => { const v = parseInt(e.target.value); setInvestShares(isNaN(v) ? 1 : Math.min(20, Math.max(1, v))) }}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Expected Profit Rate (%)</label>
                    <input
                      type="number"
                      min="5"
                      max="20"
                      step="0.5"
                      value={investRate}
                      onChange={e => { const v = parseFloat(e.target.value); setInvestRate(isNaN(v) ? 10 : Math.min(20, Math.max(5, v))) }}
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-lg font-bold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Investment', value: `৳${(investShares * 10).toFixed(0)}L`, color: '#0D9488', percent: (investShares / 20) * 100 },
                    { label: 'Annual Return', value: `৳${(investShares * 10 * investRate / 100).toFixed(1)}L`, color: '#10B981', percent: Math.min((investShares * investRate / 200) * 100, 100) },
                    { label: '3-Year Return', value: `৳${(investShares * 10 * investRate / 100 * 3).toFixed(1)}L`, color: '#D97706', percent: Math.min((investShares * investRate * 3 / 200) * 100, 100) },
                    { label: 'Buyback Value', value: `৳${(investShares * 10.5).toFixed(1)}L`, color: '#0D9488', percent: (investShares * 10.5 / 210) * 100 },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-2xl text-center relative overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow duration-300" style={{ background: `${item.color}06` }}>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{item.label}</div>
                      <div className="text-xl font-black mb-2" style={{ color: item.color }}>{item.value}</div>
                      <div className="h-1.5 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(item.percent, 5)}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-4 text-center">* Based on projected profit rate. Actual returns may vary. Buyback after 3 years at 5% premium.</p>

                {/* Additional Benefits — Dynamic based on shares */}
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                  <h5 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Shield className="size-4" style={{ color: '#0D9488' }} />
                    Additional Benefits:
                  </h5>
                  <div className="space-y-2">
                    {(() => {
                      const benefits = [
                        { code: 'B-1', title: 'Lifetime Financial Benefit', always: true },
                        { code: 'B-2', title: 'Caring for him/herself.', always: true },
                        { code: 'B-3', title: 'Partner Health access.', minShares: 2 },
                        { code: 'B-4', title: 'Family Health Access.', minShares: 5 },
                        { code: 'B-5', title: 'Family Health Access Including Parents.', minShares: 10 },
                        { code: 'B-6', title: 'Family Health Access Including Parents-in-law.', minShares: 15 },
                        { code: 'B-7', title: 'VIP Access to all facilities of the complex.', minShares: 20 },
                        { code: 'B-8', title: 'Social Recognition and Share certification.', always: true },
                      ]
                      return benefits
                        .filter(b => b.always || (b.minShares && investShares >= b.minShares))
                        .map((b) => (
                          <div key={b.code} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5" style={{ background: 'rgba(13,148,136,0.1)' }}>
                              <Check className="size-3" style={{ color: '#0D9488' }} />
                            </div>
                            <span><strong className="text-gray-800 dark:text-white">{b.code}</strong> - {b.title}</span>
                          </div>
                        ))
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 4. VALUE PROPOSITION — Investment Details Card           */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div className="max-w-5xl mx-auto mb-16">
              <div className="relative bg-white dark:bg-slate-800/80 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #0D9488, #D97706, #10B981)' }} />
                <div className="px-6 md:px-10 pt-7 pb-5 border-b border-gray-100 dark:border-slate-700">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                        <TrendingUp className="size-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">HLC Share Price</div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-emerald-600 font-semibold">Live · 1st Phase</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black" style={{ color: '#0D9488' }}>৳10 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Lacs</span></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      { phase: 'Phase 1', price: '৳10L', shares: '2,500 shares', color: 'text-emerald-600' },
                      { phase: 'Phase 2', price: '৳15L', shares: '500 shares', color: 'text-amber-600' },
                      { phase: 'Phase 3', price: '৳20L', shares: '1,000 shares', color: 'text-rose-600' },
                    ].map((p, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3 text-center">
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{p.phase}</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{p.price}</div>
                        <div className={`text-[10px] ${p.color}`}>{p.shares}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-snug">
                      More Than an Investment —<br />
                      <span style={{ color: '#0D9488' }}>A Legacy of Lasting Value</span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                      Prestigious ownership offering sustainable income, lifetime healthcare access for your family, and proportionate ownership of land, structure &amp; all 11 business wings.
                    </p>
                    <div className="space-y-3">
                      {[
                        { icon: Shield, text: 'Tangible asset value with land ownership' },
                        { icon: TrendingUp, text: 'Diversified income from 11 business wings' },
                        { icon: Users, text: 'Lifetime healthcare for your entire family' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(13,148,136,0.08)' }}>
                            <item.icon className="size-4" style={{ color: '#0D9488' }} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-linear-to-br from-gray-50 to-teal-50/30 dark:from-slate-800 dark:to-slate-700/50 p-6 md:p-8 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-700">
                    {[
                      { icon: HandCoins, label: 'Share Price', value: '10 Lacs BDT', sub: 'Per Share', color: '#D97706' },
                      { icon: Users, label: 'Total Shares', value: '4,950', sub: 'Maximum Available', color: '#0D9488' },
                      { icon: Shield, label: 'Buyback Policy', value: '+5% After 3 Yrs', sub: 'Guaranteed Exit', color: '#10B981' },
                    ].map((stat, i) => (
                      <motion.div key={i} whileHover={{ x: 4 }} className="flex items-center gap-4 group cursor-default">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300" style={{ background: `${stat.color}15` }}>
                          <stat.icon className="size-4" style={{ color: stat.color }} />
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{stat.label}</div>
                          <div className="text-base font-bold text-gray-900 dark:text-white">{stat.value}</div>
                          <div className="text-[10px] text-gray-400">{stat.sub}</div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="pt-3 mt-1 border-t border-gray-200/60 dark:border-slate-600">
                      <div className="flex items-center gap-2 mb-2.5">
                        <CreditCard className="size-3.5" style={{ color: '#0D9488' }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Payment Plan</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { step: '1', label: 'Down Payment — 50%', desc: 'At booking' },
                          { step: '2', label: '2nd Installment — 25%', desc: 'Within 30 days' },
                          { step: '3', label: '3rd Installment — 25%', desc: '60–90 days' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black text-white shrink-0" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                              {item.step}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-semibold text-gray-700 dark:text-gray-200">{item.label}</div>
                              <div className="text-[9px] text-gray-400">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Trust Highlights */}
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: 'No bank loan will be taken' },
                  { icon: TrendingUp, text: 'Buyback at 5% higher after 3 years' },
                  { icon: Users, text: 'Maximum 4,950 shares' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm">
                    <item.icon className="size-4 shrink-0" style={{ color: '#0D9488' }} />
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── DOWNLOAD BROCHURE CTA ─── */}
      <section ref={brochureReveal.ref} className="relative py-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #10B981 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={brochureReveal.isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Learn More?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Download our comprehensive brochure for detailed information about investment opportunities, floor plans, and business wing details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 text-white font-semibold shadow-xl"
                style={{ background: '#D97706' }}
                onClick={(e) => { e.preventDefault(); openDownloadPopup() }}
              >
                <BookOpen className="size-5 mr-2" />
                Download Brochure
              </Button>
              <Button
                size="lg"
                className="rounded-full px-8 text-white font-semibold shadow-xl bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25"
                asChild
              >
                <a href="tel:01335074940">
                  <Phone className="size-5 mr-2" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* INVEST NOW MODAL — Lead Collection                    */}
      {/* ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showInvestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center p-4"
            onClick={() => { setShowInvestModal(false); setFormStatus('idle') }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden w-full max-w-lg"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-6 pb-4 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                <button
                  onClick={() => { setShowInvestModal(false); setFormStatus('idle') }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
                >
                  <X className="size-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                    <HandCoins className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Invest in Hayat Life Care</h3>
                    <p className="text-sm text-white/80">Start your investment journey today</p>
                  </div>
                </div>
              </div>

              {formStatus === 'success' ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.1)' }}>
                    <Check className="size-8" style={{ color: '#0D9488' }} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Your investment inquiry has been received. Our team will contact you within 24 hours.</p>
                  <Button
                    className="rounded-full px-8 text-white"
                    style={{ background: '#0D9488' }}
                    onClick={() => { setShowInvestModal(false); setFormStatus('idle') }}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInvestSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        placeholder="01XXX-XXXXXX"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Number of Shares Interested</label>
                    <select
                      value={formData.shares}
                      onChange={e => setFormData(p => ({ ...p, shares: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    >
                      <option value="1">1 Share — ৳10 Lacs (Bronze)</option>
                      <option value="2">2 Shares — ৳20 Lacs (Silver)</option>
                      <option value="5">5 Shares — ৳50 Lacs (Gold)</option>
                      <option value="10">10 Shares — ৳1 Crore (Platinum)</option>
                      <option value="15">15 Shares — ৳1.5 Crore (Diamond)</option>
                      <option value="20">20+ Shares — ৳2 Crore+ (VIP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Message (Optional)</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder="Any questions or specific requirements..."
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
                    />
                  </div>
                  {formStatus === 'error' && (
                    <p className="text-sm text-red-500 text-center">Something went wrong. Please try again or call us directly.</p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={formStatus === 'submitting'}
                    className="w-full rounded-xl text-white font-semibold shadow-lg h-12 text-base disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #D97706, #B45309)' }}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</span>
                    ) : (
                      <span className="flex items-center gap-2"><Sparkles className="size-4" /> Submit Investment Inquiry</span>
                    )}
                  </Button>
                  <p className="text-[11px] text-gray-400 text-center">Your information is secure and will only be used to contact you about investment opportunities.</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
