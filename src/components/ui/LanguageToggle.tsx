'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/i18n/LanguageProvider'
import { useTheme } from 'next-themes'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const isBn = locale === 'bn'

  return (
    <div 
      className="relative flex items-center gap-1 p-[3px] rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-md group"
      style={{ 
        background: isDarkMode 
          ? 'linear-gradient(135deg, #1E293B, #0F172A)' 
          : 'linear-gradient(135deg, #F1F5F9, #E2E8F0)',
        border: `1px solid ${isDarkMode ? '#334155' : '#CBD5E1'}`,
        width: '90px',
        height: '34px'
      }}
      onClick={() => setLocale(isBn ? 'en' : 'bn')}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${isBn ? 'English' : 'বাংলা'}`}
      title={`Switch to ${isBn ? 'English' : 'বাংলা'}`}
    >
      {/* Sliding Highlight Pill */}
      <motion.div
        className="absolute top-[3px] bottom-[3px] rounded-full shadow-sm"
        initial={false}
        animate={{
          x: isBn ? 44 : 3,
          width: '40px',
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        style={{
          background: 'linear-gradient(135deg, #0D9488, #10B981)',
          boxShadow: '0 2px 8px rgba(13, 148, 136, 0.35)',
        }}
      />

      {/* EN Option */}
      <div 
        className="relative w-1/2 flex items-center justify-center gap-[3px] text-[11px] font-bold transition-all duration-300 z-10 select-none"
        style={{ color: !isBn ? '#FFFFFF' : (isDarkMode ? '#64748B' : '#94A3B8') }}
      >
        {!isBn && <Globe className="size-3" />}
        <span>EN</span>
      </div>

      {/* BN Option */}
      <div 
        className="relative w-1/2 flex items-center justify-center gap-[3px] text-[11px] font-bold transition-all duration-300 z-10 select-none"
        style={{ 
          color: isBn ? '#FFFFFF' : (isDarkMode ? '#64748B' : '#94A3B8'),
          fontFamily: isBn ? 'inherit' : 'inherit'
        }}
      >
        {isBn && <Globe className="size-3" />}
        <span>বাং</span>
      </div>
    </div>
  )
}
