'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Heart,
  Scan,
  Clock,
  Cpu,
  Globe,
  Award,
  Layers,
  Users,
} from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider'

const uniqueFeatures = [
  {
    icon: Heart,
    title: "Dedicated Women's Diagnostic Floor",
    desc: 'An entire floor exclusively designed for women — ensuring privacy, comfort, and dignity in healthcare.',
    titleKey: 'uniqueness.feature1Title',
    descKey: 'uniqueness.feature1Desc',
    color: '#EC4899',
  },
  {
    icon: Scan,
    title: 'First PET-CT Scan in Chattogram',
    desc: 'State-of-the-art PET-CT imaging technology for advanced cancer detection and monitoring — a first in the region.',
    titleKey: 'uniqueness.feature2Title',
    descKey: 'uniqueness.feature2Desc',
    color: '#8B5CF6',
  },
  {
    icon: Clock,
    title: 'Transforming Waiting into Quality Time',
    desc: 'Restaurants, juice bars, kids play zone, and shopping — families enjoy premium amenities while waiting.',
    titleKey: 'uniqueness.feature3Title',
    descKey: 'uniqueness.feature3Desc',
    color: '#F59E0B',
  },
  {
    icon: Cpu,
    title: 'AI-Enabled Paperless Healthcare',
    desc: 'App-based appointment booking, digital reports, and AI-driven diagnostics for a seamless patient experience.',
    titleKey: 'uniqueness.feature4Title',
    descKey: 'uniqueness.feature4Desc',
    color: '#3B82F6',
  },
  {
    icon: Globe,
    title: 'Global Healthcare Connectivity',
    desc: 'Strategic collaborations with renowned international hospitals such as Bumrungrad, MedPark, Samitivej, Apollo, CMC Vellore, Fortis, Tata Memorial, Narayana Health, Mount Elizabeth, Raffles, and Gleneagles—ensuring continuity of care beyond borders.',
    titleKey: 'uniqueness.feature5Title',
    descKey: 'uniqueness.feature5Desc',
    color: '#06B6D4',
  },
  {
    icon: Award,
    title: 'International Standards & Recognition',
    desc: 'Designed to achieve global accreditation, acceptance, and recognition in healthcare excellence.',
    titleKey: 'uniqueness.feature6Title',
    descKey: 'uniqueness.feature6Desc',
    color: '#D97706',
  },
  {
    icon: Layers,
    title: 'Centralized Management',
    desc: '11 Businesses. One Unified Management.',
    titleKey: 'uniqueness.feature7Title',
    descKey: 'uniqueness.feature7Desc',
    color: '#10B981',
  },
  {
    icon: Users,
    title: 'Management & Leadership',
    desc: '"A Proven, Local & Global Team of Results-Driven Experts from Diverse Professional Backgrounds"',
    titleKey: 'uniqueness.feature8Title',
    descKey: 'uniqueness.feature8Desc',
    color: '#0D9488',
  },
]

interface UniquenessSectionProps {
  isDarkMode: boolean
}

export default function UniquenessSection({ isDarkMode }: UniquenessSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section
      id="uniqueness"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: isDarkMode
          ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)'
          : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981, transparent)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{
              background: isDarkMode ? 'rgba(13,148,136,0.15)' : 'rgba(13,148,136,0.1)',
              color: '#0D9488',
              border: '1px solid rgba(13,148,136,0.2)',
            }}
          >
            <Award className="size-4" />
            {t('uniqueness.badge')}
          </div>
          <h2
            className="text-3xl md:text-5xl font-black mb-4"
            style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
          >
            {t('uniqueness.title').split(' ').slice(0, -1).join(' ')}{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #0D9488, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('uniqueness.title').split(' ').pop()}
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
          >
            {t('uniqueness.description')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: isDarkMode
                  ? 'rgba(30, 41, 59, 0.5)'
                  : 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                backdropFilter: 'blur(10px)',
                boxShadow: isDarkMode
                  ? '0 4px 20px rgba(0,0,0,0.2)'
                  : '0 4px 20px rgba(0,0,0,0.04)',
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top left, ${feature.color}10, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${feature.color}15`,
                    color: feature.color,
                  }}
                >
                  <feature.icon className="size-6" />
                </div>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
                >
                  {t(feature.titleKey)}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
                >
                  {t(feature.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p
            className="text-sm italic mb-4"
            style={{ color: isDarkMode ? '#64748B' : '#94A3B8' }}
          >
            {t('uniqueness.bottomQuote')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
