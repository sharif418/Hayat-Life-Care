'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/animations'
import { floors } from '@/data/home-data'

interface FloorsSectionProps {
  isDarkMode: boolean
}

export default function FloorsSection({ isDarkMode }: FloorsSectionProps) {
  const [activeFloor, setActiveFloor] = useState('basement')
  const currentFloor = floors.find((f) => f.id === activeFloor) || floors[0]

  const getIndicatorColor = (id: string) => {
    if (id === 'basement') return 'bg-gray-400'
    if (['level1', 'level2'].includes(id)) return 'bg-amber-400'
    if (['level3', 'level4', 'level5'].includes(id)) return 'bg-teal-400'
    if (['level6', 'level7', 'level8'].includes(id)) return 'bg-emerald-400'
    if (['level9', 'above9'].includes(id)) return 'bg-sky-400'
    return 'bg-emerald-400'
  }

  return (
    <section
      id="floors"
      className="py-20 md:py-28"
      style={{
        background: isDarkMode
          ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)'
          : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Floor-wise Facilities
            </h2>
            <div className="relative">
              <div
                className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]"
                style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }}
              />
              <div
                className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40"
                style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }}
              />
            </div>
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Explore each floor of Hayat Life Care — from paid parking to specialized medical institutes.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            {/* ── Floor Navigation ── */}
            <div className="lg:w-52 lg:shrink-0 lg:sticky lg:top-24 z-10 self-start">
              <div
                className="grid grid-cols-3 sm:grid-cols-4 lg:flex lg:flex-col gap-1.5 lg:gap-1.5"
              >
                {floors.map((floor) => (
                  <button
                    key={floor.id}
                    onClick={() => setActiveFloor(floor.id)}
                    className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 border dark:border-slate-700 ${
                      activeFloor === floor.id
                        ? 'text-white border-transparent'
                        : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-teal-50 dark:hover:bg-slate-700 shadow-sm hover:shadow-md'
                    }`}
                    style={
                      activeFloor === floor.id
                        ? { background: 'linear-gradient(135deg, #0D9488, #10B981)', boxShadow: '0 4px 14px rgba(13,148,136,0.3)' }
                        : {}
                    }
                  >
                    <span
                      className={`inline-block w-2 h-2 rounded-full shrink-0 ${
                        activeFloor === floor.id ? 'bg-white' : getIndicatorColor(floor.id)
                      }`}
                    />
                    {floor.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Floor Content ── */}
            <div className="flex-1 min-w-0 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFloor.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="grid md:grid-cols-5 gap-0 bg-white dark:bg-slate-800 rounded-3xl border dark:border-slate-700 shadow-xl overflow-hidden flex-1 lg:min-h-[550px]"
                >
                  {/* Image */}
                  <div className="relative h-64 md:h-full md:min-h-full md:col-span-3">
                    <Image
                      src={currentFloor.image}
                      alt={`${currentFloor.label} - Hayat Life Care`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    {/* Floor badge overlay */}
                    <div className="absolute top-5 left-5">
                      <span
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg backdrop-blur-md"
                        style={{ background: 'rgba(13,148,136,0.9)' }}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${getIndicatorColor(currentFloor.id)}`} />
                        {currentFloor.label}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 md:p-10 flex flex-col justify-center md:col-span-2">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#0D9488' }}>
                      {currentFloor.label}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                      {currentFloor.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 lg:gap-4">
                      {currentFloor.facilities.map((fac, j) => (
                        <div key={j} className="flex items-start gap-2.5 lg:gap-3">
                          <div
                            className="flex items-center justify-center w-5 h-5 lg:w-6 lg:h-6 rounded-full shrink-0 mt-0.5"
                            style={{ background: 'rgba(13,148,136,0.1)' }}
                          >
                            <Check className="size-3 lg:size-3.5" style={{ color: '#0D9488' }} />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">
                            {fac}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
