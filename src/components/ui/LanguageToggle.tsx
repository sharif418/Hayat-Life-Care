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
    <div 
      className="relative flex items-center p-[2px] rounded-full transition-all duration-300"
      style={{
        background: isDarkMode ? 'rgba(15,23,42,0.6)' : 'rgba(255,255,255,0.2)',
        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        backdropFilter: 'blur(8px)'
      }}
    >
      <button
        onClick={() => setLocale('en')}
        className={`relative z-10 w-8 h-[26px] flex items-center justify-center text-[10px] font-bold tracking-widest rounded-full transition-colors ${!isBn ? (isDarkMode ? 'text-teal-400' : 'text-teal-700') : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black')}`}
      >
        EN
        {!isBn && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 rounded-full z-[-1]"
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.1)' : '#ffffff',
              boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>
      <button
        onClick={() => setLocale('bn')}
        className={`relative z-10 w-8 h-[26px] flex items-center justify-center text-[10px] font-bold rounded-full transition-colors ${isBn ? (isDarkMode ? 'text-teal-400' : 'text-teal-700') : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black')}`}
      >
        বাং
        {isBn && (
          <motion.div
            layoutId="lang-active"
            className="absolute inset-0 rounded-full z-[-1]"
            style={{
              background: isDarkMode ? 'rgba(255,255,255,0.1)' : '#ffffff',
              boxShadow: isDarkMode ? 'none' : '0 1px 3px rgba(0,0,0,0.1)'
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </button>
    </div>
  )
}
