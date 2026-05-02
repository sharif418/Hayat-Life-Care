'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useTheme } from 'next-themes'

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const isBn = locale === 'bn'

  return (
    <div 
      className="relative flex items-center p-0.5 rounded-full cursor-pointer overflow-hidden border shadow-inner transition-colors duration-300"
      style={{ 
        background: isDarkMode ? '#1E293B' : '#F1F5F9',
        borderColor: isDarkMode ? '#334155' : '#E2E8F0',
        width: '84px',
        height: '32px'
      }}
      onClick={() => setLocale(isBn ? 'en' : 'bn')}
      role="button"
      tabIndex={0}
      aria-label="Toggle language"
    >
      {/* Sliding Highlight */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full shadow-sm"
        initial={false}
        animate={{
          x: isBn ? 41 : 2, // 84 / 2 = 42, accounting for padding
          width: '38px',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          background: 'linear-gradient(135deg, #0D9488, #10B981)',
        }}
      />

      {/* EN Text */}
      <div 
        className="absolute left-0 w-1/2 flex items-center justify-center text-xs font-bold transition-colors duration-300 z-10"
        style={{ color: !isBn ? '#FFFFFF' : (isDarkMode ? '#94A3B8' : '#64748B') }}
      >
        EN
      </div>

      {/* BN Text */}
      <div 
        className="absolute right-0 w-1/2 flex items-center justify-center text-xs font-bold transition-colors duration-300 z-10"
        style={{ color: isBn ? '#FFFFFF' : (isDarkMode ? '#94A3B8' : '#64748B') }}
      >
        বাং
      </div>
    </div>
  )
}
