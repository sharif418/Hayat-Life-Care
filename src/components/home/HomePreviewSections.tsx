'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Building2, MapPin, Car, Sparkles, ArrowRight,
  Stethoscope, ShoppingBag, Utensils, ParkingCircle,
  Globe, Award, Shield, TrendingUp, HandCoins, Users,
  Heart, Eye, Target, Crown, Building, FileCheck,
  Activity, HeartPulse
} from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'

interface HomePreviewSectionsProps {
  isDarkMode: boolean
}

export default function HomePreviewSections({ isDarkMode }: HomePreviewSectionsProps) {
  const { t } = useLanguage()
  return (
    <>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* ABOUT PREVIEW — At A Glance */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>

        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <Eye className="size-3" />
                {t('preview.aboutBadge')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {t('preview.aboutTitle')}
              </h2>
              <p className="text-base md:text-lg text-teal-700 dark:text-teal-400 font-medium italic mb-4">
                {t('about.subtitle')}
              </p>
              <div className="relative">
                <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image side */}
            <FadeIn direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/hayat-exterior-vertical.jpg"
                  alt="Hayat Life Care Building View"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-4 py-2 text-white text-sm font-medium">
                  55 Katha Complex • O.R. Nizam Road, Chattogram
                </div>
              </div>
            </FadeIn>

            {/* Info side */}
            <FadeIn direction="left">
              <div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: MapPin, label: t('about.location'), valueKey: 'about.locationValue' },
                    { icon: Building2, label: t('about.landArea'), valueKey: 'about.landAreaValue' },
                    { icon: Building, label: t('about.structure'), valueKey: 'about.structureValue' },
                    { icon: HeartPulse, label: t('about.hospital'), valueKey: 'about.hospitalValue' },
                    { icon: Activity, label: t('about.diagnostic'), valueKey: 'about.diagnosticValue' },
                    { icon: Sparkles, label: t('about.businessWings'), valueKey: 'about.businessWingsValue' },
                    { icon: Car, label: t('about.paidParking'), valueKey: 'about.paidParkingValue' },
                    { icon: TrendingUp, label: t('about.future'), valueKey: 'about.futureValue' },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300">

                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                          style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}
                        >
                          <item.icon className="size-5" style={{ color: '#0D9488' }} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.label}</div>
                          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t(item.valueKey)}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {t('preview.aboutDescription')}
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { icon: Shield, text: t('about.registeredCompany') },
                    { icon: Award, text: t('about.noBankLoan') },
                    { icon: Users, text: t('about.shares') },
                    { icon: FileCheck, text: t('about.rjsc') },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors" style={{ background: 'rgba(13,148,136,0.06)', borderColor: 'rgba(13,148,136,0.15)', color: '#0D9488' }}>
                      <badge.icon className="size-3" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  >
                    {t('preview.aboutCTA')}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* FACILITIES PREVIEW — 11 Wings Overview */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #111B2E 0%, #0C1222 100%)' : 'linear-gradient(180deg, #F0FDFA 0%, #FAFFFE 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <Building2 className="size-3" />
                {t('preview.facilitiesBadge')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {t('preview.facilitiesTitle')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {t('preview.facilitiesDescription')}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: ParkingCircle, nameKey: 'preview.fc1Name', descKey: 'preview.fc1Desc', color: '#6366F1' },
              { icon: ShoppingBag, nameKey: 'preview.fc2Name', descKey: 'preview.fc2Desc', color: '#10B981' },
              { icon: Utensils, nameKey: 'preview.fc3Name', descKey: 'preview.fc3Desc', color: '#F59E0B' },
              { icon: Stethoscope, nameKey: 'preview.fc4Name', descKey: 'preview.fc4Desc', color: '#0D9488' },
              { icon: Heart, nameKey: 'preview.fc5Name', descKey: 'preview.fc5Desc', color: '#EF4444' },
              { icon: Crown, nameKey: 'preview.fc6Name', descKey: 'preview.fc6Desc', color: '#EC4899' },
              { icon: Sparkles, nameKey: 'preview.fc7Name', descKey: 'preview.fc7Desc', color: '#8B5CF6' },
              { icon: HandCoins, nameKey: 'preview.fc8Name', descKey: 'preview.fc8Desc', color: '#06B6D4' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 text-center cursor-default"
                >
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon className="size-6" style={{ color: item.color }} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1">{t(item.nameKey)}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t(item.descKey)}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
              >
                {t('preview.facilitiesCTA')}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* UNIQUENESS PREVIEW — Why Hayat is Different */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <Award className="size-3" />
                {t('preview.uniquenessBadge')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {t('preview.uniquenessTitle')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {t('preview.uniquenessDescription')}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: t('preview.globalConnectivity'),
                desc: t('preview.globalConnectivityDesc'),
                color: '#06B6D4',
              },
              {
                icon: Shield,
                title: t('preview.noBankLoan'),
                desc: t('preview.noBankLoanDesc'),
                color: '#10B981',
              },
              {
                icon: Building2,
                title: t('preview.singleManagement'),
                desc: t('preview.singleManagementDesc'),
                color: '#0F766E',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 rounded-t-2xl" style={{ background: item.color }} />
                  <div
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon className="size-6" style={{ color: item.color }} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/uniqueness"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
              >
                {t('preview.uniquenessCTA')}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* INVESTMENT PREVIEW — Key highlights */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative" style={{ background: isDarkMode ? 'linear-gradient(180deg, #111B2E 0%, #0C1222 100%)' : 'linear-gradient(180deg, #F0FDFA 0%, #FAFFFE 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <TrendingUp className="size-3" />
                {t('preview.investmentBadge')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {t('preview.investmentTitle')}
              </h2>
              <p className="text-teal-700 dark:text-teal-400 font-medium italic max-w-xl mx-auto">
                {t('preview.investmentSubtitle')}
              </p>
            </div>
          </FadeIn>

          {/* Key Investment Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 max-w-5xl mx-auto">
            {[
              { icon: HandCoins, value: '৳10 Lacs', label: t('preview.perShare'), color: '#D97706' },
              { icon: Users, value: '4,950', label: t('preview.totalShares'), color: '#3B82F6' },
              { icon: Shield, value: '3 Years', label: t('preview.buybackGuarantee'), color: '#10B981' },
              { icon: TrendingUp, value: '11 Wings', label: t('preview.revenueSources'), color: '#0D9488' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300">
                  <item.icon className="size-7 mx-auto mb-3" style={{ color: item.color }} />
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">{item.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 p-6 md:p-8 shadow-sm mb-10">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm text-center">
                {t('preview.investmentBody')}
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/investment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
              >
                {t('preview.investmentCTA')}
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />

      {/* ═══════════════════════════════════════════════════════ */}
      {/* VISION PREVIEW — Quick glance */}
      {/* ═══════════════════════════════════════════════════════ */}
      <>
        {/* ZONE 1: Vision & Mission (Psychology: Clarity, Transparency, Purpose) */}
        <section className="relative py-20 md:py-28 bg-gray-50 dark:bg-slate-900/50 overflow-hidden">
          {/* Subtle medical/clean background accents */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-100 dark:bg-teal-900/20 rounded-bl-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-emerald-100 dark:bg-emerald-900/20 rounded-tr-full blur-3xl opacity-60" />

          <div className="relative max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-16">
                <span className="text-teal-600 dark:text-teal-400 font-semibold tracking-wider uppercase text-sm mb-3 block">{t('preview.visionBadge')}</span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">{t('preview.visionTitle')}</h2>
                <div className="w-24 h-1.5 mx-auto rounded-full bg-linear-to-r from-teal-500 to-emerald-500" />
              </div>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {/* Vision Card */}
                <div className="group bg-white dark:bg-slate-800 hover:bg-teal-50/30 dark:hover:bg-teal-900/20 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.15)] hover:border-teal-200 dark:hover:border-teal-800/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 dark:bg-teal-900/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-[3]" />
                  <div className="p-3.5 inline-block rounded-2xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-6 border border-teal-100 dark:border-teal-800/50 relative z-10">
                    <Sparkles className="size-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{t('preview.visionLabel')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] relative z-10">
                    {t('preview.visionText')}
                  </p>
                </div>

                {/* Mission Card */}
                <div className="group bg-white dark:bg-slate-800 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/20 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] hover:border-emerald-200 dark:hover:border-emerald-800/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-[3]" />
                  <div className="p-3.5 inline-block rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-800/50 relative z-10">
                    <Target className="size-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{t('preview.missionLabel')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] relative z-10">
                    {t('preview.missionText')}
                  </p>
                </div>

                {/* Ethical Vision Card */}
                <div className="group bg-white dark:bg-slate-800 hover:bg-rose-50/30 dark:hover:bg-rose-900/20 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] hover:border-rose-200 dark:hover:border-rose-800/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 dark:bg-rose-900/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-[3]" />
                  <div className="p-3.5 inline-block rounded-2xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mb-6 border border-rose-100 dark:border-rose-800/50 relative z-10">
                    <Heart className="size-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{t('preview.ethicalVisionLabel')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] relative z-10">
                    {t('preview.ethicalVisionText')}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ZONE 2: Founder's Message (Psychology: Authority, Trust, Leadership, Warmth) */}
        <section className="relative py-20 md:py-28 bg-teal-950 overflow-hidden">
          {/* Deep, authoritative premium background */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%)' }} />
          
          <div className="relative max-w-4xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-10">
                <span className="text-emerald-400 font-medium tracking-widest uppercase text-xs mb-3 block">{t('preview.founderBadge')}</span>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {t('preview.founderTitle')}
                </h3>
              </div>
              
              <div className="relative">
                {/* Decorative Quote Marks */}
                <div className="absolute -top-6 -left-4 md:-left-10 text-6xl text-teal-800/50 font-serif leading-none select-none">"</div>
                <div className="absolute -bottom-10 -right-4 md:-right-10 text-6xl text-teal-800/50 font-serif leading-none select-none rotate-180">"</div>
                
                <div className="space-y-6 text-gray-200 text-base md:text-lg leading-relaxed relative z-10">
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-400 first-letter:mr-2 first-letter:float-left">
                    {t('preview.founderP1')}
                  </p>
                  <p>
                    {t('preview.founderP2')}
                  </p>
                  <p>
                    {t('preview.founderP3')}
                  </p>
                  
                  <div className="pt-8 pb-4 text-center">
                    <div className="w-16 h-px bg-linear-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-6" />
                    <strong className="inline-block text-transparent bg-clip-text bg-linear-to-r from-emerald-200 via-white to-emerald-200 italic text-2xl md:text-3xl font-playfair tracking-wide leading-tight">
                      &ldquo;{t('preview.founderQuote')}&rdquo;
                    </strong>
                    <div className="w-16 h-px bg-linear-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-6" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </>
    </>
  )
}
