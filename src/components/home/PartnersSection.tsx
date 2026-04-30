'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Building2, Ship, Stethoscope, FileCheck, Shield } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'

interface TrustSectionProps {
  isDarkMode: boolean
}

export default function PartnersSection({ isDarkMode }: TrustSectionProps) {
  return (
    <section id="partners" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Award className="size-3" />
              TRUSTED PARTNERS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Our Partners & Affiliations
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
          </div>
        </FadeIn>
        <FadeIn>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { name: 'Hayat Holdings', desc: 'Parent Company', icon: Building2 },
              { name: 'Marinus Pvt. Ltd.', desc: 'Maritime & Logistics', icon: Ship },
              { name: 'CMCH', desc: 'Medical College Hospital', icon: Stethoscope },
              { name: 'RJSC', desc: 'Registered with Joint Stock', icon: FileCheck },
            ].map((partner, i) => (
              <motion.div key={i}
                whileHover={{ y: -5, scale: 1.03 }}
                className="group flex flex-col items-center gap-3 p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 min-w-[160px]"
                style={{ boxShadow: '0 0 0 rgba(13,148,136,0)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(13,148,136,0.1), 0 8px 25px rgba(0,0,0,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(13,148,136,0)')}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                  <partner.icon className="size-7 text-white" />
                </div>
                <div className="text-sm font-bold text-gray-900 text-center">{partner.name}</div>
                <div className="text-xs text-gray-700 text-center leading-snug">{partner.desc}</div>
              </motion.div>
            ))}
          </StaggerContainer>
        </FadeIn>
      </div>
    </section>
  )
}
