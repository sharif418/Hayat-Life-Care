'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, HandCoins, Users, Shield, Check, CreditCard, ArrowRight, BookOpen, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { benefitCodes } from '@/data/home-data'
import { useSectionReveal } from '@/components/ui/animations'

interface InvestmentSectionProps {
  isDarkMode: boolean
}

export default function InvestmentSection({ isDarkMode }: InvestmentSectionProps) {
  const [investShares, setInvestShares] = useState(1)
  const [investRate, setInvestRate] = useState(10)
  const brochureReveal = useSectionReveal()

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

          {/* Share Price Widget */}
          <FadeIn delay={0.2}>
            <div className="max-w-lg mx-auto mb-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-lg overflow-hidden">
                <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                        <TrendingUp className="size-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">HLC Share Price</div>
                        <div className="text-[11px] text-gray-500">1st Phase</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black" style={{ color: '#0D9488' }}>৳10 <span className="text-sm font-medium text-gray-500">Lacs</span></div>
                      <div className="flex items-center justify-end gap-1 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-emerald-600 font-semibold">Live</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                      <div className="text-[10px] text-gray-500 mb-0.5">Phase 1</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">৳10L</div>
                      <div className="text-[10px] text-emerald-600">2,500 shares</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                      <div className="text-[10px] text-gray-500 mb-0.5">Phase 2</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">৳15L</div>
                      <div className="text-[10px] text-amber-600">500 shares</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                      <div className="text-[10px] text-gray-500 mb-0.5">Phase 3</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">৳20L</div>
                      <div className="text-[10px] text-rose-600">1,000 shares</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Investment intro */}
          <FadeIn>
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              This is not just an investment, but the creation of lasting value—financially, socially, and through prestigious ownership, offering one of the most sustainable sources of income. It provides lifetime access to high-quality healthcare services for you, your family, and the future. Ownership includes all 11 business wings, along with proportionate ownership of land and structure—ensuring tangible asset value, diversified income streams, and long-term security for your investment.
            </p>
          </FadeIn>

          {/* Key investment info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm">
                <HandCoins className="size-8 mx-auto mb-3" style={{ color: '#D97706' }} />
                <div className="text-sm text-gray-500 mb-1">Share Price</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">10 Lacs BDT</div>
                <div className="text-xs text-gray-400 mt-1">Per Share</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm">
                <Users className="size-8 mx-auto mb-3" style={{ color: '#0D9488' }} />
                <div className="text-sm text-gray-500 mb-1">Total Shares</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4,950</div>
                <div className="text-xs text-gray-400 mt-1">Maximum Available</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm">
                <Shield className="size-8 mx-auto mb-3" style={{ color: '#10B981' }} />
                <div className="text-sm text-gray-500 mb-1">Buyback Policy</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">+5% After 3 Yrs</div>
                <div className="text-xs text-gray-400 mt-1">Guaranteed Exit</div>
              </div>
            </FadeIn>
          </div>

          {/* Payment options */}
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="size-5" style={{ color: '#0D9488' }} />
                  Payment Option A
                </h4>
                <div className="space-y-2">
                  {[
                    '50% Down Payment',
                    '25% Within 30 Days',
                    '25% Within 60-90 Days',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(13,148,136,0.1)' }}>
                        <Check className="size-3.5" style={{ color: '#0D9488' }} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="size-5" style={{ color: '#D97706' }} />
                  Payment Option B{' '}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Directors Only</span>
                </h4>
                <div className="space-y-2">
                  {[
                    '35% Down Payment',
                    '30% Within 30 Days',
                    '35% Within 60-90 Days',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(217,119,6,0.1)' }}>
                        <Check className="size-3.5" style={{ color: '#D97706' }} />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Benefit codes */}
          <FadeIn>
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Shareholder Benefit Codes
            </h3>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {benefitCodes.map((benefit) => (
              <StaggerItem key={benefit.code}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-5 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm text-center hover:shadow-lg hover:border-teal-200 transition-all duration-300"
                >
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                    style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}
                  >
                    <benefit.icon className="size-5" style={{ color: '#0D9488' }} />
                  </div>
                  <div className="text-xs font-bold mb-1 px-2 py-0.5 rounded-full inline-block" style={{ background: 'rgba(13,148,136,0.1)', color: '#0D9488' }}>
                    {benefit.code}
                  </div>
                  <div className="text-sm font-medium text-gray-800 mt-2">
                    {benefit.title}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Investment Calculator */}
          <FadeIn>
            <div className="mt-12 max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-lg overflow-hidden">
              <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                <h4 className="text-xl font-bold flex items-center gap-2">
                  <HandCoins className="size-5" />
                  Investment ROI Calculator
                </h4>
                <p className="text-sm text-white/80 mt-1">Estimate your potential returns</p>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Number of Shares</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={investShares}
                      onChange={e => { const v = parseInt(e.target.value); setInvestShares(isNaN(v) ? 1 : Math.min(10, Math.max(1, v))) }}
                      className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Expected Profit Rate (%)</label>
                    <input
                      type="number"
                      min="5"
                      max="20"
                      step="0.5"
                      value={investRate}
                      onChange={e => { const v = parseFloat(e.target.value); setInvestRate(isNaN(v) ? 10 : Math.min(20, Math.max(5, v))) }}
                      className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Investment', value: `৳${(investShares * 10).toFixed(0)}L`, color: '#0D9488', percent: (investShares / 10) * 100 },
                    { label: 'Annual Return', value: `৳${(investShares * 10 * investRate / 100).toFixed(1)}L`, color: '#10B981', percent: Math.min((investShares * investRate / 200) * 100, 100) },
                    { label: '3-Year Return', value: `৳${(investShares * 10 * investRate / 100 * 3).toFixed(1)}L`, color: '#D97706', percent: Math.min((investShares * investRate * 3 / 200) * 100, 100) },
                    { label: 'Buyback Value', value: `৳${(investShares * 10.5).toFixed(1)}L`, color: '#0D9488', percent: (investShares * 10.5 / 105) * 100 },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl text-center relative overflow-hidden" style={{ background: `${item.color}08` }}>
                      <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                      <div className="text-lg font-bold mb-2" style={{ color: item.color }}>{item.value}</div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
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
                <p className="text-xs text-gray-400 mt-3 text-center">* Based on projected profit rate. Actual returns may vary. Buyback after 3 years at 5% premium.</p>
              </div>
            </div>
          </FadeIn>

          {/* Key highlights */}
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: Shield, text: 'No bank loan will be taken' },
                  { icon: TrendingUp, text: 'Buyback at 5% higher after 3 years' },
                  { icon: Users, text: 'Maximum 4,950 shares' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm">
                    <item.icon className="size-5 shrink-0" style={{ color: '#0D9488' }} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="rounded-full px-10 text-white font-semibold shadow-xl text-lg h-14"
                  style={{ background: '#D97706' }}
                  asChild
                >
                  <a href="#contact">
                    Book a Space <ArrowRight className="ml-2 size-5" />
                  </a>
                </Button>
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
                asChild
              >
                <a href="#contact">
                  <BookOpen className="size-5 mr-2" />
                  Download Brochure
                </a>
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
    </>
  )
}
