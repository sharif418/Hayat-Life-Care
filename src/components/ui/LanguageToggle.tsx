'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useTheme } from 'next-themes'

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const isBn = locale === 'bn'

  return (
    <button
      className="relative h-7 px-2.5 rounded cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-sm"
      style={{
        background: isDarkMode ? 'rgba(30,41,59,0.6)' : 'rgba(241,245,249,0.8)',
        border: `1px solid ${isDarkMode ? '#475569' : '#CBD5E1'}`,
        color: isDarkMode ? '#E2E8F0' : '#334155'
      }}
      onClick={() => setLocale(isBn ? 'en' : 'bn')}
      aria-label={isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
      title={isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isBn ? 'en' : 'bn'}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className="text-[11px] font-bold tracking-wider select-none uppercase"
        >
          {isBn ? 'EN' : 'বাং'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
