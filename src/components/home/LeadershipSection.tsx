'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Star, Stethoscope } from 'lucide-react'
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
              <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                <Image
                  src="/images/leaders/chairman.png"
                  alt="Capt. Md Showkat Hossain Chowdhury"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
                    <Star className="size-3 fill-teal-400 text-teal-400" />
                    Chairman
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
                    Capt. Md Showkat Hossain Chowdhury
                  </h3>
                </div>
              </div>
              <div className="p-8 bg-white dark:bg-slate-800 relative">
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0" />
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                  A seasoned Master Mariner and distinguished maritime professional with decades of
                  international experience. Chairman of Marinus Pvt. Ltd. and Hayat Holdings, he brings
                  unparalleled leadership in both maritime and business sectors. His strategic vision and
                  commitment to community development have been instrumental in shaping Hayat Life Care
                  into Chattogram&apos;s most comprehensive healthcare destination.
                </p>
              </div>
            </motion.div>
          </FadeIn>

          {/* Managing Director */}
          <FadeIn direction="left">
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-teal-200"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                <Image
                  src="/images/leaders/md.png"
                  alt="Dr. Mohammad Azizul Haque"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
                    <Stethoscope className="size-3 text-teal-400" />
                    Managing Director
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 leading-tight">
                    Dr. Mohammad Azizul Haque
                  </h3>
                </div>
              </div>
              <div className="p-8 bg-white dark:bg-slate-800 relative">
                <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-teal-500/0 via-teal-500/20 to-teal-500/0" />
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                  Associate Professor at Chattogram Medical College Hospital (CMCH) and a distinguished
                  medical professional with over 25 years of clinical experience. Founder Director of
                  multiple healthcare institutions, Dr. Haque combines deep medical expertise with
                  entrepreneurial acumen. His vision of making world-class healthcare accessible to all
                  drives every aspect of Hayat Life Care&apos;s operations and clinical excellence.
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
