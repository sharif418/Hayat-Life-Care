'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, MapPin, Shield, Heart, TrendingUp, FileCheck } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'

interface TrustSectionProps {
  isDarkMode: boolean
}

export default function TrustSection({ isDarkMode }: TrustSectionProps) {
  const { t } = useLanguage()
  return (
    <section id="why-choose-us" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Award className="size-3" />
              {t('trust.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              {t('trust.title')}
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Award, titleKey: 'trust.trust1Title', descKey: 'trust.trust1Desc' },
            { icon: MapPin, titleKey: 'trust.trust2Title', descKey: 'trust.trust2Desc' },
            { icon: Shield, titleKey: 'trust.trust3Title', descKey: 'trust.trust3Desc' },
            { icon: Heart, titleKey: 'trust.trust4Title', descKey: 'trust.trust4Desc' },
            { icon: TrendingUp, titleKey: 'trust.trust5Title', descKey: 'trust.trust5Desc' },
            { icon: FileCheck, titleKey: 'trust.trust6Title', descKey: 'trust.trust6Desc' },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-shadow duration-300 group-hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}
                >
                  <item.icon className="size-7" style={{ color: '#0D9488' }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t(item.descKey)}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
