'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Building2, MapPin, Car, Sparkles, ArrowRight,
  Stethoscope, ShoppingBag, Utensils, ParkingCircle,
  Globe, Award, Shield, TrendingUp, HandCoins, Users,
  Heart, Eye, Target, Crown
} from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'

interface HomePreviewSectionsProps {
  isDarkMode: boolean
}

export default function HomePreviewSections({ isDarkMode }: HomePreviewSectionsProps) {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════ */}
      {/* ABOUT PREVIEW — At A Glance */}
      {/* ═══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-5 animate-pulse" style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <Eye className="size-3" />
                AT A GLANCE
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                About Hayat Life Care
              </h2>
              <p className="text-base md:text-lg text-teal-700 dark:text-teal-400 font-medium italic">
                Your Family, Your Wellness, Your Future.
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Image side */}
            <FadeIn direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/images/about-aerial.png"
                  alt="Hayat Life Care Aerial View"
                  width={700}
                  height={450}
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
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Hayat Life Care is not just a building — it&apos;s a vision realized. Strategically 
                  located near Chittagong Medical College Hospital, it brings together healthcare, 
                  daily essentials, dining, and entertainment into a single, world-class complex.
                </p>

                <StaggerContainer className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: MapPin, label: 'Location', value: 'O.R. Nizam Road' },
                    { icon: Building2, label: 'Land Area', value: '55 Katha' },
                    { icon: Sparkles, label: 'Wings', value: '11 Business Wings' },
                    { icon: Car, label: 'Parking', value: '150+ Spaces' },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}>
                          <item.icon className="size-4" style={{ color: '#0D9488' }} />
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{item.label}</div>
                          <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{item.value}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                >
                  Explore Full Details
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
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
                11 BUSINESS WINGS
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Our Facilities
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                A one stop service for Healthcare &amp; Daily Essential — from advanced diagnostics to premium dining, everything under one roof.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: ParkingCircle, name: 'Car Parking', desc: '150+ spaces with 3 basements', color: '#6366F1' },
              { icon: ShoppingBag, name: 'Super Shop & Pharmacy', desc: '24/7 daily essentials & medicine', color: '#10B981' },
              { icon: Utensils, name: 'Restaurant & Cafe', desc: 'Hygienic dining & juice bar', color: '#F59E0B' },
              { icon: Stethoscope, name: 'Diagnostic Center', desc: 'International-standard pathology', color: '#0D9488' },
              { icon: Heart, name: 'Specialized Hospital', desc: 'Cancer, Heart, Kidney, Gyne & Obs', color: '#EF4444' },
              { icon: Users, name: "Doctor's Chambers", desc: '30+ specialist consultation rooms', color: '#3B82F6' },
              { icon: Crown, name: 'Female Diagnostic', desc: 'Dedicated women\'s healthcare wing', color: '#EC4899' },
              { icon: Sparkles, name: "Kid's Park & More", desc: 'Entertainment & optical shop', color: '#8B5CF6' },
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
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
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
                View All 11 Wings & Floor Plans
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
                WHAT MAKES US UNIQUE
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Why Hayat Life Care?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                The first cancer diagnostic and specialized hospital in Chattogram — one of the largest at the medical hub.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
            {[
              {
                icon: Globe,
                title: 'Global Connectivity',
                desc: 'Collaborations with Bumrungrad, Apollo, Tata Memorial, Fortis, Narayana Health & more international hospitals.',
                color: '#06B6D4',
              },
              {
                icon: Shield,
                title: 'No Bank Loan',
                desc: 'Entirely funded by shareholders — no debt burden. Your investment is 100% secured by real assets.',
                color: '#10B981',
              },
              {
                icon: Building2,
                title: 'Single Management',
                desc: 'All 11 wings managed under one roof — ensuring quality, coordination, and accountability.',
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
                Discover All Unique Features
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
                INVESTMENT OPPORTUNITY
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Pathways to Prestige Ownership
              </h2>
              <p className="text-teal-700 dark:text-teal-400 font-medium italic max-w-xl mx-auto">
                Become a partner in building a healthier, more prosperous tomorrow—together.
              </p>
            </div>
          </FadeIn>

          {/* Key Investment Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 max-w-5xl mx-auto">
            {[
              { icon: HandCoins, value: '৳10 Lacs', label: 'Per Share (1st Phase)', color: '#D97706' },
              { icon: Users, value: '4,950', label: 'Total Shares', color: '#3B82F6' },
              { icon: Shield, value: '3 Years', label: 'Buyback Guarantee @ 5%', color: '#10B981' },
              { icon: TrendingUp, value: '11 Wings', label: 'Revenue Sources', color: '#0D9488' },
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
                This is not just an investment, but the creation of lasting value—financially, socially, and through prestigious ownership. 
                Ownership includes all 11 business wings, along with proportionate ownership of land and structure—ensuring tangible asset value 
                and long-term security for your investment.
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
                View Full Investment Details
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
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-white/10" />
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-white/10" />
        <div className="relative max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Eye className="size-5" /> Our Vision
                </h3>
                <p className="text-white/85 text-sm leading-relaxed line-clamp-4">
                  To redefine healthcare as a fully integrated, people-focused ecosystem where patients and families can access expert medical care, 
                  international-standard diagnostics, and specialized hospital treatment alongside daily essentials and wellness services—all under one roof.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Target className="size-5" /> Our Mission
                </h3>
                <p className="text-white/85 text-sm leading-relaxed line-clamp-4">
                  To design a space and offer services where patients and families can access expert medical care, international-standard diagnostics, 
                  and specialized hospital treatment under one roof, transforming waiting time into quality family time.
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-semibold text-sm transition-all duration-300 group"
              >
                Read Full Vision, Mission & Founder&apos;s Message
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
