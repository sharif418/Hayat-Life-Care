'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/animations'
import { floors } from '@/data/home-data'
import { useLanguage } from '@/i18n/LanguageProvider'

interface FloorsSectionProps {
  isDarkMode: boolean
}

export default function FloorsSection({ isDarkMode }: FloorsSectionProps) {
  const [activeFloor, setActiveFloor] = useState('basement')
  const currentFloor = floors.find((f) => f.id === activeFloor) || floors[0]
  const { t, locale } = useLanguage()
  const isBn = locale === 'bn'

  // Translate floor labels to Bangla
  const translateLabel = (label: string) => {
    if (!isBn) return label
    if (label === 'Basement') return t('floorItems.basement')
    if (label === 'Ground Floor') return t('floorItems.groundFloor')
    if (label === 'Above Level 9') return t('floorItems.aboveLevel9')
    if (label.startsWith('Level ')) return `${t('floorItems.level')} ${label.replace('Level ', '')}`
    return label
  }

  const getIndicatorColor = (id: string) => {
    if (id === 'basement') return 'bg-gray-400'
    if (id === 'ground') return 'bg-amber-500'
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
              {t('floors.title')}
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
              {t('floors.description')}
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
                    {translateLabel(floor.label)}
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
                        {translateLabel(currentFloor.label)}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 md:p-8 flex flex-col md:col-span-2">
                    {/* Floor Number + Title Row */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                      >
                        {currentFloor.label === 'Above Level 9' ? '9+' : currentFloor.label === 'Ground Floor' ? 'G' : currentFloor.label.replace('Level ', '').replace('Basement', 'B')}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold font-outfit tracking-tight text-gray-900 dark:text-white leading-tight">
                          {translateLabel(currentFloor.label)}
                        </h3>
                        <div className="text-[11px] font-semibold uppercase tracking-widest mt-0.5" style={{ color: '#0D9488' }}>
                          Hayat Life Care
                        </div>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="h-px bg-linear-to-r from-teal-200 via-gray-100 to-transparent dark:from-teal-800 dark:via-slate-700 dark:to-transparent mb-5" />

                    {/* Description */}
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {isBn ? currentFloor.descBn : currentFloor.description}
                    </p>

                    {/* Facilities */}
                    <div className="flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
                        <span className="w-4 h-px bg-teal-400" />
                        {t('floors.whatsOnFloor')}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {(isBn ? (currentFloor.facilitiesBn || currentFloor.facilities) : currentFloor.facilities).map((fac, j) => (
                          <div
                            key={j}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-700 transition-colors duration-200"
                          >
                            <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: 'rgba(13,148,136,0.1)' }}>
                              <Check className="size-3 text-teal-600 dark:text-teal-400" />
                            </div>
                            <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-200 leading-tight">
                              {fac}
                            </span>
                          </div>
                        ))}
                      </div>
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
