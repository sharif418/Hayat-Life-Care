'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, TrendingUp, Check, Building2 } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'

interface TimelineSectionProps {
  isDarkMode: boolean
}

export default function TimelineSection({ isDarkMode }: TimelineSectionProps) {
  return (
    <>
      {/* ─── TIMELINE SECTION ─── */}
      <section id="timeline" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <Clock className="size-3" />
                OUR JOURNEY
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Project Timeline
              </h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                Our Journey to Excellence
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Vertical center line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, #0D9488, #10B981)' }} />

            {[
              { date: '2024 Q4', title: 'Project Conceptualization & Planning', desc: 'Vision born to create Chattogram\'s most comprehensive healthcare destination' },
              { date: '2025 Q1', title: 'Company Registration & Land Acquisition', desc: 'Registered company with Joint Stock, 55 Katha land acquired at O.R. Nizam Road' },
              { date: '2025 Q2', title: 'Architectural Design & CDA Approval', desc: 'Building plan designed for 14-18 floors with state-of-the-art facilities' },
              { date: '2025 Q3', title: 'Construction Begins', desc: 'Foundation work starts with 3 basements and 9+ floors' },
              { date: '2027 Q4', title: 'Revenue Generation Begins', desc: '10 of 11 business wings operational within 8 months of construction start' },
              { date: '2028 Q4', title: 'Full-Scale Operations', desc: 'Complete operation of all 9+ floors with 11 business wings' },
              { date: '2030 Q2', title: 'Specialized Hospital Opening', desc: 'Hospital wing operational - Cancer, Heart, Kidney, Gyne & Obs' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className={`relative flex items-start mb-10 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Date badge - hidden on mobile, shown on desktop */}
                  <div className={`hidden md:flex w-1/2 ${i % 2 === 0 ? 'justify-end pr-10' : 'justify-start pl-10'}`}>
                    <div className="px-4 py-2 rounded-full text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                      {item.date}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white z-10" style={{ background: '#0D9488', boxShadow: '0 0 12px rgba(13,148,136,0.5)' }} />

                  {/* Content card */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
                    {/* Date badge for mobile */}
                    <div className="md:hidden mb-2">
                      <span className="px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                        {item.date}
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:border-teal-200 border-l-4" style={{ borderLeftColor: '#0D9488' }}>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONSTRUCTION PROGRESS ─── */}
      <section id="progress" className="py-16" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <TrendingUp className="size-3" />
                CONSTRUCTION UPDATE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Building Progress
              </h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Overall Completion</h3>
                <span className="text-2xl font-black" style={{ color: '#0D9488' }}>35%</span>
              </div>
              <div className="h-4 rounded-full bg-gray-100 overflow-hidden mb-8">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '35%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { phase: 'Land Acquisition', status: 'completed', percent: 100 },
                  { phase: 'Design & Approval', status: 'completed', percent: 100 },
                  { phase: 'Foundation Work', status: 'in-progress', percent: 60 },
                  { phase: 'Structural Construction', status: 'upcoming', percent: 15 },
                  { phase: 'Interior Finishing', status: 'upcoming', percent: 0 },
                  { phase: 'Equipment Installation', status: 'upcoming', percent: 0 },
                ].map((item, i) => (
                  <StaggerItem key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: item.status === 'completed' ? 'rgba(16,185,129,0.05)' : item.status === 'in-progress' ? 'rgba(13,148,136,0.05)' : 'rgba(107,114,128,0.03)' }}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      item.status === 'completed' ? 'bg-emerald-100' :
                      item.status === 'in-progress' ? 'bg-teal-100 animate-pulse' :
                      'bg-gray-100'
                    }`}>
                      {item.status === 'completed' ? (
                        <Check className="size-4 text-emerald-600" />
                      ) : item.status === 'in-progress' ? (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0D9488' }} />
                      ) : (
                        <Clock className="size-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.phase}</div>
                      <div className="h-1.5 rounded-full bg-gray-100 mt-1.5 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: item.status === 'completed' ? '#10B981' : item.status === 'in-progress' ? '#0D9488' : '#D1D5DB' }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                    <span className={`text-xs font-bold shrink-0 ${
                      item.status === 'completed' ? 'text-emerald-600' :
                      item.status === 'in-progress' ? 'text-teal-600' :
                      'text-gray-400'
                    }`}>{item.percent}%</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── BEFORE/AFTER COMPARISON ─── */}
      <section id="comparison" className="py-16" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <Building2 className="size-3" />
                OUR VISION
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                From Vision to Reality
              </h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                See how Hayat Life Care is transforming Chattogram&apos;s healthcare landscape
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current/Construction Phase */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg group">
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold">
                  UNDER CONSTRUCTION
                </div>
                <Image
                  src="/images/hayat-exterior-new.jpg"
                  alt="Hayat Life Care Construction"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="p-5 bg-white dark:bg-slate-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Current Progress</h3>
                  <p className="text-sm text-gray-600">Foundation and structural work underway. 35% complete as of 2025.</p>
                  <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '35%', background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  </div>
                </div>
              </div>

              {/* Future/Vision Phase */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-teal-200 shadow-lg group">
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                  COMPLETED VISION
                </div>
                <Image
                  src="/images/hayat-exterior-new.jpg"
                  alt="Hayat Life Care Future Vision"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="p-5 bg-white dark:bg-slate-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Future Vision (2028)</h3>
                  <p className="text-sm text-gray-600">Complete 9+ floor complex with 11 business wings and specialized hospital.</p>
                  <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
