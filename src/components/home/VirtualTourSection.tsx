'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, ArrowRight, Car, ShoppingBag, UtensilsCrossed, Stethoscope, Microscope, Baby } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'

interface VirtualTourSectionProps {
  isDarkMode: boolean
}

export default function VirtualTourSection({ isDarkMode }: VirtualTourSectionProps) {
  return (
    <section id="virtual-tour" className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Building2 className="size-3" />
              EXPLORE OUR BUILDING
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Virtual Building Tour
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Click on any floor to explore the facilities available at each level
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">
            {/* Building visualization */}
            <div className="w-full lg:w-1/2">
              <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
                {/* Building structure */}
                <div className="space-y-1.5">
                   {[
                    { label: 'Above L9', color: '#064E3B', active: true },
                    { label: 'L9', color: '#065F46', active: true },
                    { label: 'L8', color: '#0D9488', active: true },
                    { label: 'L7', color: '#0F766E', active: true },
                    { label: 'L6', color: '#115E59', active: true },
                    { label: 'L5', color: '#134E4A', active: true },
                    { label: 'L4', color: '#0D9488', active: true },
                    { label: 'L3', color: '#0F766E', active: true },
                    { label: 'L2', color: '#115E59', active: true },
                    { label: 'L1', color: '#134E4A', active: true },
                    { label: 'B1/B2/B3', color: '#1E293B', active: true },
                  ].map((floor, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04, x: 12 }}
                      className="w-full py-3 px-6 rounded-lg text-white text-sm font-semibold flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:brightness-110 border border-white/10 hover:border-white/25"
                      style={{ background: floor.color }}
                      onClick={() => {
                        window.location.href = '/facilities';
                      }}
                    >
                      <span>{floor.label}</span>
                      <ArrowRight className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
                {/* Building base */}
                <div className="mt-2 py-3 rounded-b-2xl text-center text-xs text-gray-500 dark:text-gray-400 font-medium" style={{ background: '#F1F5F9' }}>
                  55 Katha · O.R. Nizam Road · Chattogram
                </div>
              </div>
            </div>
            {/* Info panel */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9+ Floors of Excellence</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Hayat Life Care is designed as a vertical healthcare city, with each floor dedicated to specific services. From secure basement parking to specialized medical institutes on the upper floors — a one-stop destination for healthcare and daily essentials.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Car, label: 'Basement Parking', count: '150+' },
                    { icon: ShoppingBag, label: 'Retail & Shopping', count: '5 Wings' },
                    { icon: UtensilsCrossed, label: 'Food & Dining', count: '3 Wings' },
                    { icon: Stethoscope, label: 'Medical Services', count: '3 Floors' },
                    { icon: Microscope, label: 'Diagnostics', count: 'AI-Powered' },
                    { icon: Baby, label: 'Family Fun', count: 'Play Zone' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600 hover:border-teal-200 dark:hover:border-teal-700 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0" style={{ background: 'rgba(13,148,136,0.12)' }}>
                        <item.icon className="size-4" style={{ color: '#0D9488' }} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{item.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
