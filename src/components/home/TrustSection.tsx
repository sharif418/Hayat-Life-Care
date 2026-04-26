'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, MapPin, Shield, Heart, TrendingUp, FileCheck } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'

interface TrustSectionProps {
  isDarkMode: boolean
}

export default function TrustSection({ isDarkMode }: TrustSectionProps) {
  return (
    <section id="why-choose-us" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Award className="size-3" />
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Hayat Life Care?
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Award, title: 'Largest in Chattogram', desc: 'The biggest diagnostic and doctor consultation center in the region' },
            { icon: MapPin, title: 'Prime Location', desc: 'Near Chittagong Medical College Hospital, the most trusted healthcare zone' },
            { icon: Shield, title: 'No Bank Loan', desc: 'Entirely funded by shareholder investments - zero debt burden' },
            { icon: Heart, title: 'Family-Focused', desc: 'Converting waiting time into quality family time with entertainment facilities' },
            { icon: TrendingUp, title: 'Buyback Guarantee', desc: 'After 3 years at 5% higher price - secure exit option' },
            { icon: FileCheck, title: 'Transparent Operations', desc: 'Govt. approved third-party audit, regular financial reporting' },
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
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
