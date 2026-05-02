'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Gem,
  TrendingUp,
  HeartPulse,
  Shield,
  Microscope,
  Hospital,
  Scan,
  Lightbulb,
  UtensilsCrossed,
  Car,
  MapPin,
  Building2,
  CheckCircle2,
} from 'lucide-react'

const partnerReasons = [
  {
    icon: Gem,
    title: 'One-time Investment, Lifetime Returns',
    desc: 'Invest once and secure a sustainable income stream that lasts for generations.',
    color: '#8B5CF6',
  },
  {
    icon: TrendingUp,
    title: 'Combined Income & Healthcare Benefits',
    desc: 'Earn returns while enjoying premium healthcare access for you and your family.',
    color: '#10B981',
  },
  {
    icon: Shield,
    title: 'Secure Investment with Full Ownership',
    desc: 'Complete ownership of Land, Building, and Equipment — your assets, your control.',
    color: '#0D9488',
  },
  {
    icon: HeartPulse,
    title: 'High & Sustainable Halal Income',
    desc: 'Ethical, Sharia-compliant returns from the healthcare and lifestyle industry.',
    color: '#EC4899',
  },
  {
    icon: CheckCircle2,
    title: 'No Bank Loan Involved',
    desc: 'A completely debt-free project ensuring financial security and transparency.',
    color: '#22C55E',
  },
  {
    icon: Microscope,
    title: 'First Cancer Diagnostic Center in the City',
    desc: 'Pioneering PET-CT and advanced cancer diagnostics — a first in Chattogram.',
    color: '#F59E0B',
  },
  {
    icon: Hospital,
    title: 'First Specialized Hospital in the City',
    desc: 'Multi-disciplinary specialized hospital with internationally trained specialists.',
    color: '#3B82F6',
  },
  {
    icon: Scan,
    title: 'Largest Diagnostic Center in Chattogram',
    desc: 'State-of-the-art imaging and laboratory facilities unmatched in the region.',
    color: '#6366F1',
  },
  {
    icon: Lightbulb,
    title: 'Unique Concept in Bangladesh',
    desc: 'The first complex combining healthcare and lifestyle services under one roof.',
    color: '#D97706',
  },
  {
    icon: UtensilsCrossed,
    title: 'Integrated Lifestyle Facilities',
    desc: 'Restaurants, Supermarkets, Amusement areas, Cafés, ATM booths, and Parking — all in one place.',
    color: '#06B6D4',
  },
  {
    icon: Car,
    title: '150+ Car Parking Spaces',
    desc: 'Unparalleled in nearby healthcare facilities — secure, spacious, and 24/7 monitored.',
    color: '#EF4444',
  },
  {
    icon: MapPin,
    title: 'Prime Location with High Visibility',
    desc: 'Beside Chattogram Medical College on O.R. Nizam Road — maximum accessibility and footfall.',
    color: '#F97316',
  },
  {
    icon: Building2,
    title: '11 Business Wings Under Single Management',
    desc: 'A fully integrated ecosystem — from diagnostics to dining, all seamlessly connected.',
    color: '#0F766E',
  },
]

interface WhyPartnerSectionProps {
  isDarkMode: boolean
}

export default function WhyPartnerSection({ isDarkMode }: WhyPartnerSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="why-partner"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(180deg, #0F172A 0%, #0C1222 50%, #0F172A 100%)'
          : 'linear-gradient(180deg, #FFFFFF 0%, #F0FDFA 50%, #FFFFFF 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }}
        />
        <div
          className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(13,148,136,1) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-5"
            style={{
              background: isDarkMode ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)',
              color: '#8B5CF6',
              border: '1px solid rgba(139,92,246,0.2)',
            }}
          >
            <Gem className="size-4" />
            Partnership Benefits
          </div>
          <h2
            className="text-3xl md:text-5xl font-black mb-5"
            style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
          >
            Why You Should Be a{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #0D9488)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Partner
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
          >
            13 compelling reasons to invest in Hayat Life Care — Chattogram&apos;s most
            ambitious healthcare and lifestyle destination.
          </p>
        </motion.div>

        {/* Headline stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-14"
        >
          {[
            { value: '13', label: 'Key Reasons' },
            { value: '₹0', label: 'Bank Loan' },
            { value: '55', label: 'Katha Land' },
            { value: '150+', label: 'Parking' },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{
                background: isDarkMode ? 'rgba(30,41,59,0.5)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                boxShadow: isDarkMode ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <span
                className="text-2xl font-black"
                style={{
                  background: 'linear-gradient(135deg, #0D9488, #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: isDarkMode ? '#64748B' : '#94A3B8' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {partnerReasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                background: isDarkMode
                  ? 'rgba(30, 41, 59, 0.5)'
                  : 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
                backdropFilter: 'blur(10px)',
                boxShadow: isDarkMode
                  ? '0 4px 20px rgba(0,0,0,0.2)'
                  : '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top left, ${reason.color}10, transparent 60%)`,
                }}
              />

              {/* Top colored accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${reason.color}60, transparent)` }}
              />

              <div className="relative z-10 flex gap-4">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${reason.color}12`,
                    color: reason.color,
                  }}
                >
                  <reason.icon className="size-5" />
                </div>

                <div className="min-w-0">
                  {/* Number */}
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest mb-1 block"
                    style={{ color: `${reason.color}80` }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Title */}
                  <h3
                    className="text-[15px] font-bold mb-1.5 leading-tight"
                    style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
                  >
                    {reason.title}
                  </h3>
                  {/* Description */}
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
                  >
                    {reason.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-14"
        >
          <a
            href="/investment"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #0D9488, #10B981)',
            }}
          >
            <Gem className="size-4" />
            Become a Partner Today
          </a>
          <p
            className="text-sm italic mt-4"
            style={{ color: isDarkMode ? '#64748B' : '#94A3B8' }}
          >
            &ldquo;Invest in healthcare. Invest in the future.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
