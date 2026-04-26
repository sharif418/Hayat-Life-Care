'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Star, Stethoscope, Linkedin, Facebook } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'

interface LeadershipSectionProps {
  isDarkMode: boolean
}

export default function LeadershipSection({ isDarkMode }: LeadershipSectionProps) {
  return (
    <section id="leadership" className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0D9488 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Users className="size-3" />
              LEADERSHIP
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Meet the Visionaries
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Steering Our Journey</p>
            <div className="w-20 h-1 mx-auto rounded-full mt-3" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Chairman */}
          <FadeIn direction="right">
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-teal-200"
            >
              <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <div className="p-10 text-center">
                <div className="relative inline-block mb-6">
                  <div
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold text-white ring-4 ring-teal-100 group-hover:ring-teal-200 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  >
                    CS
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <Star className="size-4 text-white fill-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Capt. Md Showkat Hossain Chowdhury
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: '#0D9488' }}>
                  Chairman
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  A seasoned Master Mariner and distinguished maritime professional with decades of
                  international experience. Chairman of Marinus Pvt. Ltd. and Hayat Holdings, he brings
                  unparalleled leadership in both maritime and business sectors. His strategic vision and
                  commitment to community development have been instrumental in shaping Hayat Life Care
                  into Chattogram&apos;s most comprehensive healthcare destination.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-teal-100 dark:hover:bg-teal-800 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                    <Linkedin className="size-4 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-teal-100 dark:hover:bg-teal-800 flex items-center justify-center transition-colors" aria-label="Facebook">
                    <Facebook className="size-4 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Managing Director */}
          <FadeIn direction="left">
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-teal-200"
            >
              <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <div className="p-10 text-center">
                <div className="relative inline-block mb-6">
                  <div
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold text-white ring-4 ring-teal-100 group-hover:ring-teal-200 transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  >
                    DA
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <Stethoscope className="size-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Dr. Mohammad Azizul Haque
                </h3>
                <p className="text-sm font-semibold mb-4" style={{ color: '#0D9488' }}>
                  Managing Director
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  Associate Professor at Chattogram Medical College Hospital (CMCH) and a distinguished
                  medical professional with over 25 years of clinical experience. Founder Director of
                  multiple healthcare institutions, Dr. Haque combines deep medical expertise with
                  entrepreneurial acumen. His vision of making world-class healthcare accessible to all
                  drives every aspect of Hayat Life Care&apos;s operations and clinical excellence.
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-teal-100 dark:hover:bg-teal-800 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                    <Linkedin className="size-4 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-teal-100 dark:hover:bg-teal-800 flex items-center justify-center transition-colors" aria-label="Facebook">
                    <Facebook className="size-4 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400" />
                  </a>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
