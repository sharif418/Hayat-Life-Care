"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageProvider'

interface PageHeaderProps {
  badge?: string
  title: string
  highlightText?: string
  subtitle?: string
  description?: string
  /** Optional i18n key prefix like "pages.about" — if provided, auto-translates badge/title/highlight/description */
  langKeyPrefix?: string
}

export default function PageHeader({ badge, title, highlightText, subtitle, description, langKeyPrefix }: PageHeaderProps) {
  const { t } = useLanguage()

  const displayBadge = langKeyPrefix && badge ? t(`${langKeyPrefix}Badge`) : badge
  const displayTitle = langKeyPrefix && title ? t(`${langKeyPrefix}Title`) : title
  const displayHighlight = langKeyPrefix && highlightText ? t(`${langKeyPrefix}Highlight`) : highlightText
  const displaySubtitle = langKeyPrefix && subtitle ? t(`${langKeyPrefix}Subtitle`) : subtitle
  const displayDesc = langKeyPrefix && description ? t(`${langKeyPrefix}Desc`) : description

  return (
    <div className="relative pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-24 overflow-hidden" style={{ background: '#0F172A' }}>
      {/* Background Effects — subtle, premium */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-emerald-500/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        {/* Top row: badge + title inline-ish */}
        <div className="flex flex-col items-center text-center gap-3">
          {/* Badge */}
          {displayBadge && (
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/8 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] md:text-xs font-semibold text-emerald-300 tracking-widest uppercase">{displayBadge}</span>
            </motion.div>
          )}

          {/* Title — compact */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-tight"
          >
            {displayTitle}{' '}
            {displayHighlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                {displayHighlight}
              </span>
            )}
          </motion.h1>

          {/* Subtitle / Big Word */}
          {displaySubtitle && (
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-slate-100 tracking-tight leading-snug max-w-3xl mt-1"
            >
              {displaySubtitle}
            </motion.h2>
          )}

          {/* Description — elegant, smaller */}
          {displayDesc && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm md:text-[15px] text-slate-400 max-w-xl leading-relaxed"
          >
            {displayDesc.split('\n').map((line: string, i: number) => (
              <React.Fragment key={i}>
                {line}
                {i !== displayDesc.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
