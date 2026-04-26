'use client'

import React from 'react'
import { Globe } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'

interface PartnersBarProps {
  isDarkMode: boolean
}

const partners = [
  'Bumrungrad',
  'MedPark',
  'Samitivej',
  'Apollo',
  'CMC Vellore',
  'Fortis',
  'Tata Memorial',
  'Narayana Health',
  'Mount Elizabeth',
  'Raffles',
  'Gleneagles',
]

export default function PartnersBar({ isDarkMode }: PartnersBarProps) {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden" style={{ background: isDarkMode ? '#0F172A' : '#F0FDFA' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-3">
              <Globe className="size-3" />
              GLOBAL HEALTHCARE CONNECTIVITY
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto">
              Strategic collaborations with renowned international hospitals — ensuring continuity of care beyond borders.
            </p>
          </div>
        </FadeIn>

        {/* Scrolling partner names */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: `linear-gradient(90deg, ${isDarkMode ? '#0F172A' : '#F0FDFA'}, transparent)` }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: `linear-gradient(270deg, ${isDarkMode ? '#0F172A' : '#F0FDFA'}, transparent)` }} />

          <div className="flex items-center gap-0 animate-marquee-slow whitespace-nowrap">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center gap-0 shrink-0">
                {partners.map((name, i) => (
                  <div key={`${setIndex}-${i}`} className="flex items-center shrink-0">
                    <div className="px-5 py-3 mx-2 rounded-xl bg-white dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300 cursor-default group">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors tracking-wide">
                        {name}
                      </span>
                    </div>
                    {i < partners.length - 1 && (
                      <span className="text-teal-400/30 mx-1 text-lg">•</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inject animation */}
      <style jsx>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
