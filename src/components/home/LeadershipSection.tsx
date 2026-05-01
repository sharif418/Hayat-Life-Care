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
              className="group relative flex flex-col h-full bg-white dark:bg-slate-800 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-teal-200"
            >
              <div className="relative aspect-[4/3.5] w-full overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                <Image
                  src="/images/wings/Chairman-Sir-R-01.png"
                  alt="Capt. Md Showkat Hossain Chowdhury"
                  fill
                  className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 sm:p-10 bg-white dark:bg-slate-800 relative grow flex flex-col items-center text-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-800/50 shadow-[0_4px_20px_rgba(20,184,166,0.15)] text-teal-700 dark:text-teal-300 text-sm font-bold z-10">
                  <Star className="size-4 fill-teal-500 text-teal-500" />
                  Chairman
                </div>
                
                <div className="mt-4 mb-5 h-[60px] flex items-center justify-center w-full">
                  <h3 className="text-xl sm:text-[1.35rem] xl:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
                    Capt. Md Showkat Hossain Chowdhury
                  </h3>
                </div>
                
                <div className="w-12 h-1 bg-linear-to-r from-teal-500 to-emerald-400 rounded-full mb-6 mx-auto" />
                
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                  A seasoned Master Mariner who currently serves as the Chairman of <strong>Marinus Pvt. Ltd.</strong>, <strong>Hayat Holdings</strong> and <strong>Hayat Life Care</strong>. He brings a distinguished track record of leadership spanning the marine and construction industries at both national and international levels.
                </p>
              </div>
            </motion.div>
          </FadeIn>

          {/* Managing Director */}
          <FadeIn direction="left">
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative flex flex-col h-full bg-white dark:bg-slate-800 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-teal-200"
            >
              <div className="relative aspect-[4/3.5] w-full overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                <Image
                  src="/images/wings/MD-sir-R-01.png"
                  alt="Dr. Mohammad Azizul Haque"
                  fill
                  className="object-cover object-top scale-105 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-slate-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8 sm:p-10 bg-white dark:bg-slate-800 relative grow flex flex-col items-center text-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-800/50 shadow-[0_4px_20px_rgba(20,184,166,0.15)] text-teal-700 dark:text-teal-300 text-sm font-bold z-10">
                  <Stethoscope className="size-4 text-teal-500" />
                  Managing Director
                </div>
                
                <div className="mt-4 mb-5 h-[60px] flex items-center justify-center w-full">
                  <h3 className="text-xl sm:text-[1.35rem] xl:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-snug">
                    Dr. Mohammad Azizul Haque
                  </h3>
                </div>
                
                <div className="w-12 h-1 bg-linear-to-r from-teal-500 to-emerald-400 rounded-full mb-6 mx-auto" />
                
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                  The Founder Director of <strong>Park View Hospital</strong>, <strong>Ekhusey Hospital</strong>, <strong>Delta Hospital</strong> and <strong>Treatment Hospital</strong> in Chattogram. He also serves as an Associate Professor at <strong>Chattogram Medical College & Hospital</strong>.
                </p>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
