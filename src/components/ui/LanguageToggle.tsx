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
      className="relative w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 hover:shadow-md"
      style={{
        background: isDarkMode ? 'rgba(30,41,59,0.6)' : 'rgba(241,245,249,0.8)',
        border: `1.5px solid ${isDarkMode ? '#475569' : '#CBD5E1'}`,
      }}
      onClick={() => setLocale(isBn ? 'en' : 'bn')}
      aria-label={isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
      title={isBn ? 'Switch to English' : 'বাংলায় দেখুন'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isBn ? 'en' : 'bn'}
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="text-[19px] leading-none select-none"
        >
          {isBn ? '🇬🇧' : '🇧🇩'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
