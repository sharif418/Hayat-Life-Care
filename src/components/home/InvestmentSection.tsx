'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, HandCoins, Users, Shield, Check, CreditCard, ArrowRight, BookOpen, Phone, X, Sparkles, Building2, BadgePercent, UserCheck, ArrowRightLeft, BadgeCheck, Landmark, ClipboardCheck, RefreshCw, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/ui/animations'
import { useSectionReveal } from '@/components/ui/animations'
import { useDownload } from '@/components/providers/DownloadProvider'
import { useLanguage } from '@/i18n/LanguageProvider'
import dynamic from 'next/dynamic'

const WhyPartnerSection = dynamic(() => import('@/components/home/WhyPartnerSection'))

interface InvestmentSectionProps {
  isDarkMode: boolean
  children?: React.ReactNode
}

const benefitNameKeys: Record<string, string> = {
  B1: 'investment.b1',
  B2: 'investment.b2',
  B3: 'investment.b3',
  B4: 'investment.b4',
  B5: 'investment.b5',
  B6: 'investment.b6',
  B7: 'investment.b7',
  B8: 'investment.b8',
}

function TierBenefits({ benefits, color }: { benefits: string[], color: string }) {
  const { t } = useLanguage()
  return (
    <div className="px-5 pb-6">
      <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: color, opacity: 0.3 }} />
      <div className="space-y-2.5">
        {benefits.map((b) => (
          <div key={b} className="flex items-start gap-2.5">
            <Check className="size-4 mt-0.5 shrink-0" style={{ color }} />
            <span className="text-[13px] font-medium leading-snug opacity-90">
              {t(benefitNameKeys[b])}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InvestmentSection({ isDarkMode, children }: InvestmentSectionProps) {
  const [investShares, setInvestShares] = useState(1)
  const [investRate, setInvestRate] = useState(10)
  const { ref: brochureRef, isInView: isBrochureInView } = useSectionReveal()
  const { openDownloadPopup } = useDownload()
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', shares: '1', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const { t } = useLanguage()

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
      <section id="investment" className="relative z-10 -mt-10 md:-mt-16 pb-20 md:pb-28">
        {/* Move the background gradient to an absolute div so it doesn't overlap the dark PageHeader */}
        <div className="absolute inset-0 top-24 md:top-32 -z-10" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }} />
        <div className="max-w-7xl mx-auto px-4">
          {/* Inner Header removed as PageHeader is already showing the title */}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 1. PARTNERSHIP CTA — HIDDEN per client request          */}
          {/*    Set to true to re-enable this section                */}
          {/* ═══════════════════════════════════════════════════════ */}
          {false && (
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
                        {t('investment.joinFamily')}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        {t('investment.togetherTitle')}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-300"> {t('investment.togetherHighlight')}</span>
                      </h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
                        {t('investment.togetherDesc')}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          size="lg"
                          className="rounded-full px-8 text-white font-semibold shadow-xl hover:scale-105 transition-transform"
                          style={{ background: 'linear-gradient(135deg, #D97706, #B45309)' }}
                          onClick={() => setShowInvestModal(true)}
                        >
                          <Sparkles className="mr-2 size-4" />
                          {t('investment.clickToPartner')}
                        </Button>
                        <Button
                          size="lg"
                          className="rounded-full px-8 text-white font-semibold bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                          asChild
                        >
                          <a href="tel:01335074940">
                            <Phone className="mr-2 size-4" />
                            {t('investment.speakWithUs')}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 2. WHY BE A PARTNER — Moved from Uniqueness page       */}
          {/* ═══════════════════════════════════════════════════════ */}
          <WhyPartnerSection isDarkMode={isDarkMode} onBecomePartnerClick={() => setShowInvestModal(true)} />

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 3. SHAREHOLDER TIERS — Director Status & Benefits      */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div id="tiers" className="mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-4">
                  <Users className="size-3" />
                  SHAREHOLDER TIERS
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Become a <span style={{ color: '#D97706' }}>Director</span>
                </h3>
                <div className="relative mb-4">
                  <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #D97706, #B45309)' }} />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-3xl mx-auto">
                  {t('investment.tierDesc')}
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
                    popular: false,
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
                ].map((tier, i) => {
                  const isDirector = tier.status === 'Director'
                  return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group relative rounded-2xl border-2 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                       tier.popular
                          ? 'border-amber-300 dark:border-amber-600 ring-2 ring-amber-200/50'
                          : isDirector ? 'border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.12)]' : 'border-gray-100 dark:border-slate-700 hover:border-transparent'
                    }`}
                    style={{
                      // @ts-ignore
                      '--tier-color': tier.color,
                      background: isDirector
                        ? `linear-gradient(160deg, #0F172A 0%, #1E293B 100%)`
                        : (isDarkMode ? '#1E293B' : '#FFFFFF'),
                      ...(isDirector ? { color: '#F8FAFC', borderColor: `${tier.color}40` } : { color: isDarkMode ? '#F8FAFC' : '#0F172A' })
                    }}
                  >
                    {/* Director tier accent strip */}
                    {isDirector && (
                      <div className="absolute top-0 left-0 right-0 h-1 opacity-80" style={{ background: tier.gradient }} />
                    )}
                    {!tier.popular && (
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ boxShadow: `inset 0 0 0 2px ${tier.color}, 0 0 20px ${tier.color}25` }}
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% -20%, ${tier.color}15 0%, transparent 60%)` }}
                    />
                    {tier.popular && (
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg" style={{ background: tier.gradient }}>
                        {t('investment.popular')}
                      </div>
                    )}
                    {isDirector && (
                      <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg" style={{ background: tier.gradient }}>
                        Director
                      </div>
                    )}
                    <div className="relative p-6 pb-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300" style={{ background: tier.gradient }}>
                          <HandCoins className="size-6" />
                        </div>
                        <div>
                          <div className={`text-xl font-bold group-hover:tracking-wide transition-all duration-300 ${isDirector ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{tier.tier}</div>
                          <div className="text-sm font-semibold" style={{ color: tier.color }}>{tier.status}</div>
                        </div>
                      </div>
                      <div className={`text-base font-bold mb-1 ${isDirector ? 'text-gray-100' : 'text-gray-800 dark:text-gray-200'}`}>{tier.amount}</div>
                      <div className={`text-xs ${isDirector ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>Minimum: {tier.minShares}</div>
                    </div>
                    <TierBenefits benefits={tier.benefits} color={tier.color} />
                    <div className="h-2 group-hover:h-3 transition-all duration-300 rounded-b-2xl" style={{ background: tier.gradient }} />
                  </motion.div>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          {/* CTA Button Moved Below Tiers */}
          <FadeIn>
            <div className="flex justify-center -mt-4 mb-16">
              <Button
                size="lg"
                className="rounded-full px-10 py-6 text-white font-semibold shadow-xl hover:scale-105 transition-transform text-lg"
                style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                onClick={() => setShowInvestModal(true)}
              >
                <Sparkles className="mr-2 size-5" />
                {t('investment.clickToPartner')}
              </Button>
            </div>
          </FadeIn>



          {/* ═══════════════════════════════════════════════════════ */}
          {/* 4A. SHARE PRICE & VALUE PROPOSITION                      */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div className="max-w-5xl mx-auto mb-16">
              <div className="relative bg-white dark:bg-slate-800/80 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #0D9488, #D97706, #10B981)' }} />
                {/* Share Price Header */}
                <div className="px-6 md:px-10 pt-7 pb-5 border-b border-gray-100 dark:border-slate-700">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                        <TrendingUp className="size-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{t('investment.hlcSharePrice')}</div>
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-emerald-600 font-semibold">{t('investment.livePhase')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black" style={{ color: '#0D9488' }}>৳10 <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('investment.lacs')}</span></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {[
                      { phase: 'Phase 1', price: '৳10L', shares: '2,500 shares', color: 'text-emerald-700 dark:text-emerald-300', active: true },
                      { phase: 'Phase 2', price: '৳15L', shares: '1,000 shares', color: 'text-amber-600', active: false },
                      { phase: 'Phase 3', price: '৳20L', shares: '1,000 shares', color: 'text-rose-600', active: false },
                    ].map((p, i) => (
                      <div key={i} className={`rounded-xl p-3 text-center transition-transform ${p.active ? 'bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-500 shadow-md scale-105 z-10' : 'bg-gray-50 dark:bg-slate-700/50 border border-transparent hover:scale-105'}`}>
                        <div className={`text-[10px] mb-0.5 flex items-center justify-center gap-1 ${p.active ? 'text-emerald-700 font-bold dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'}`}>
                          {p.phase}
                          {p.active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                        </div>
                        <div className={`font-black ${p.active ? 'text-lg text-emerald-700 dark:text-emerald-300' : 'text-sm text-gray-900 dark:text-white'}`}>{p.price}</div>
                        <div className={`text-[10px] font-medium ${p.color}`}>{p.shares}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FUNDAMENTALS SECTION                                    */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div className="max-w-5xl mx-auto mb-16 rounded-3xl p-8 md:p-12 border shadow-2xl relative overflow-hidden" 
                 style={{ 
                   background: isDarkMode ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' : 'linear-gradient(135deg, #0F172A 0%, #064E3B 100%)',
                   borderColor: isDarkMode ? '#334155' : '#0F172A'
                 }}>
              
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #D97706, transparent)' }} />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #10B981, transparent)' }} />

              <div className="text-center mb-12 relative z-10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-2 leading-tight">
                  {t('investment.fundamentalsTitle')} <span style={{ color: '#D97706' }}>{t('investment.fundamentalsHighlight')}</span>
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
                {[
                  { icon: Landmark, titleKey: 'investment.fund1Title', descKey: 'investment.fund1Desc', color: '#9CA3AF' },
                  { icon: ClipboardCheck, titleKey: 'investment.fund2Title', descKey: 'investment.fund2Desc', color: '#F59E0B' },
                  { icon: RefreshCw, titleKey: 'investment.fund3Title', descKey: 'investment.fund3Desc', color: '#3B82F6' },
                  { icon: MapPin, titleKey: 'investment.fund4Title', descKey: 'investment.fund4Desc', color: '#F43F5E' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 transition-colors group">
                    <item.icon className="size-8 mb-6 group-hover:scale-110 transition-transform" style={{ color: item.color }} strokeWidth={1.5} />
                    <h4 className="text-lg font-bold text-white mb-3" style={{ color: '#D97706' }}>{t(item.titleKey)}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {t(item.descKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 4B. PAYMENT POLICY — Separate Section                   */}
          {/* ═══════════════════════════════════════════════════════ */}
          {/* ═══════════════════════════════════════════════════════ */}
          {/* 3. INVESTMENT ROI CALCULATOR                            */}
          {/* ═══════════════════════════════════════════════════════ */}
          <FadeIn>
            <div id="roi-calculator" className="max-w-5xl mx-auto bg-white dark:bg-slate-800/80 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden">
              <div className="p-6 md:p-8 text-white" style={{ background: 'linear-gradient(135deg, #0D9488 0%, #065F46 100%)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center">
                    <HandCoins className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{t('investment.roiTitle')}</h4>
                    <p className="text-sm text-white/70">{t('investment.roiSubtitle')}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid sm:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">{t('investment.numberOfShares')}</label>
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
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">{t('investment.expectedProfit')}</label>
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
                    { label: t('investment.investmentLabel'), value: `৳${(investShares * 10).toFixed(0)}L`, color: '#0D9488', percent: (investShares / 20) * 100 },
                    { label: t('investment.annualReturnLabel'), value: `৳${(investShares * 10 * investRate / 100).toFixed(1)}L`, color: '#10B981', percent: Math.min((investShares * investRate / 200) * 100, 100) },
                    { label: t('investment.threeYearReturn'), value: `৳${(investShares * 10 * investRate / 100 * 3).toFixed(1)}L`, color: '#D97706', percent: Math.min((investShares * investRate * 3 / 200) * 100, 100) },
                    { label: t('investment.buybackValue'), value: `৳${(investShares * 10.5).toFixed(1)}L`, color: '#0D9488', percent: (investShares * 10.5 / 210) * 100 },
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
                <p className="text-[11px] text-gray-400 mt-4 text-center">{t('investment.roiDisclaimer')}</p>

                {/* Additional Benefits — Dynamic based on shares */}
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                  <h5 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Shield className="size-4" style={{ color: '#0D9488' }} />
                    {t('investment.additionalBenefits')}
                  </h5>
                  <div className="space-y-2">
                    {(() => {
                      const benefits = [
                        { code: 'B-1', titleKey: 'investment.b1', always: true },
                        { code: 'B-2', titleKey: 'investment.b2', always: true },
                        { code: 'B-3', titleKey: 'investment.b3', minShares: 2 },
                        { code: 'B-4', titleKey: 'investment.b4', minShares: 5 },
                        { code: 'B-5', titleKey: 'investment.b5', minShares: 10 },
                        { code: 'B-6', titleKey: 'investment.b6', minShares: 15 },
                        { code: 'B-7', titleKey: 'investment.b7', minShares: 20 },
                        { code: 'B-8', titleKey: 'investment.b8', always: true },
                      ]
                      return benefits
                        .filter(b => b.always || (b.minShares && investShares >= b.minShares))
                        .map((b) => (
                          <div key={b.code} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5" style={{ background: 'rgba(13,148,136,0.1)' }}>
                              <Check className="size-3" style={{ color: '#0D9488' }} />
                            </div>
                            <span><strong className="text-gray-800 dark:text-white">{b.code}</strong> - {t(b.titleKey)}</span>
                          </div>
                        ))
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {children}

      {/* ─── DOWNLOAD BROCHURE CTA ─── */}
      <section ref={brochureRef} className="relative py-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #10B981 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isBrochureInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('investment.readyToLearn')}
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
                {t('investment.readyToLearnDesc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl"
                  style={{ background: '#D97706' }}
                  onClick={(e) => { e.preventDefault(); openDownloadPopup() }}
                >
                  <BookOpen className="size-5 mr-2" />
                  {t('investment.downloadBrochure')}
                </Button>
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25"
                  asChild
                >
                  <a href="tel:01335074940">
                    <Phone className="size-5 mr-2" />
                    {t('investment.speakWithUs')}
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
                    <h3 className="text-xl font-bold">{t('investment.investInHayat')}</h3>
                    <p className="text-sm text-white/80">{t('investment.startJourney')}</p>
                  </div>
                </div>
              </div>

              {formStatus === 'success' ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(13,148,136,0.1)' }}>
                    <Check className="size-8" style={{ color: '#0D9488' }} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('investment.thankYou')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">{t('investment.inquiryReceived')}</p>
                  <Button
                    className="rounded-full px-8 text-white"
                    style={{ background: '#0D9488' }}
                    onClick={() => { setShowInvestModal(false); setFormStatus('idle') }}
                  >
                    {t('investment.close')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInvestSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{t('investment.fullName')}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder={t('investment.enterName')}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{t('investment.phoneNumber')}</label>
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
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{t('investment.emailLabel')}</label>
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
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{t('investment.sharesInterested')}</label>
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
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{t('investment.messageOptional')}</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      placeholder={t('investment.messagePlaceholder')}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-800 dark:text-white dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
                    />
                  </div>
                  {formStatus === 'error' && (
                    <p className="text-sm text-red-500 text-center">{t('investment.somethingWrong')}</p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={formStatus === 'submitting'}
                    className="w-full rounded-xl text-white font-semibold shadow-lg h-12 text-base disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #D97706, #B45309)' }}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t('investment.submitting')}</span>
                    ) : (
                      <span className="flex items-center gap-2"><Sparkles className="size-4" /> {t('investment.submitInquiry')}</span>
                    )}
                  </Button>
                  <p className="text-[11px] text-gray-400 text-center">{t('investment.secureInfo')}</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
