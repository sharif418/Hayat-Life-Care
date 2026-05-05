"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ChevronUp, MessageSquare, Phone, Download, Mail, Moon, Sun, Calendar } from 'lucide-react'
import FooterSection from '@/components/home/FooterSection'
import ChatWidget from '@/components/home/ChatWidget'
import { useDownload } from '@/components/providers/DownloadProvider'
import { useAppointment } from '@/components/providers/AppointmentProvider'
import { useLanguage } from '@/i18n/LanguageProvider'
import LanguageToggle from '@/components/ui/LanguageToggle'

export default function GlobalUI() {
  const [scrolled, setScrolled] = useState(false)
  const [showMobileBar, setShowMobileBar] = useState(false)
  const [chatSessionId] = useState(() => crypto.randomUUID())
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { openDownloadPopup } = useDownload()
  const { openAppointmentDialog } = useAppointment()
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowMobileBar(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <FooterSection />

      {/* Spacer to prevent mobile dock / vision strip from covering footer */}
      <div className="h-[88px] lg:h-8 w-full" style={{ background: '#0F172A' }} />

      {/* ─── DESKTOP QUICK ACTION SIDEBAR ─── */}
      <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3">
        {/* Book Visit */}
        <button
          className="w-11 h-11 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform relative group bg-amber-500 border border-amber-400"
          onClick={() => openAppointmentDialog()}
        >
          <Calendar className="size-5" />
          <span className="absolute right-14 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">{t('nav.bookAppointment')}</span>
        </button>

        {/* Brochure */}
        <button
          className="w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform relative group bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-slate-700"
          onClick={(e) => { e.preventDefault(); openDownloadPopup() }}
        >
          <Download className="size-5" />
          <span className="absolute right-14 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">{t('nav.downloadBrochure')}</span>
        </button>

        {/* Language */}
        <div className="w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 relative group z-50">
          <div className="scale-90">
            <LanguageToggle />
          </div>
          <span className="absolute right-14 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Language</span>
        </div>

        {/* Theme */}
        <button
          className="w-11 h-11 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform relative group bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 border border-gray-100 dark:border-slate-700"
          onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDarkMode ? 'dark' : 'light'}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {isDarkMode ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </motion.div>
          </AnimatePresence>
          <span className="absolute right-14 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>

      {/* ─── FLOATING ACTION BUTTONS (Right side stack) ─── */}
      <div className={`fixed right-4 sm:right-5 z-40 flex flex-col items-center gap-3 transition-all duration-300 bottom-[52px] lg:bottom-12`}>
        {/* Back to top */}
        <AnimatePresence>
          {scrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/50 hover:scale-110 transition-transform"
              style={{ background: isDarkMode ? 'rgba(30,41,59,0.9)' : 'rgba(255,255,255,0.9)', color: '#0D9488' }}
              aria-label="Scroll back to top"
            >
              <ChevronUp className="size-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Brochure (Mobile Only - Desktop has it in the center-right sidebar) */}
        <button
          onClick={(e) => { e.preventDefault(); openDownloadPopup() }}
          className="w-11 h-11 sm:w-12 sm:h-12 lg:hidden rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform relative group bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-slate-700"
          aria-label="Download Brochure"
        >
          <Download className="size-5" />
          <span className="absolute right-14 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">Brochure</span>
        </button>

        {/* Call (Mobile Only) */}
        <a
          href="tel:01335074940"
          className="w-11 h-11 sm:w-12 sm:h-12 lg:hidden rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform relative group bg-emerald-500 border border-emerald-400"
          aria-label="Call Us"
        >
          <Phone className="size-5" />
          <span className="absolute right-14 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">Call Us</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/8801335074940"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform relative group"
          style={{ background: '#25D366' }}
          aria-label="Contact us on WhatsApp"
        >
          <MessageSquare className="size-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full animate-pulse" style={{ boxShadow: '0 0 6px rgba(37,211,102,0.5)' }} />
          <span className="absolute right-14 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">WhatsApp</span>
        </a>
      </div>

      {/* ─── PREMIUM VISION STRIP (Persistent, solid, all pages) ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-45">
        <div
          className="w-full py-2.5 lg:py-2"
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #0D1B2A 50%, #0F172A 100%)',
            borderTop: '1px solid rgba(13,148,136,0.4)',
            boxShadow: '0 -4px 30px rgba(0,0,0,0.25), 0 -1px 0 rgba(13,148,136,0.15)',
          }}
        >
          <div className="h-full max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-center gap-3 lg:gap-4 overflow-hidden">
            {/* Left accent */}
            <div className="hidden sm:block h-px w-12 xl:w-20 shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(13,148,136,0.6))' }} />
            
            {/* Pulsing dot */}
            <div className="relative shrink-0">
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-teal-400 animate-ping opacity-50" />
            </div>

            {/* Desktop Vision text */}
            <div className="hidden sm:block overflow-hidden flex-1 min-w-0">
              <p
                className="text-[11px] lg:text-xs xl:text-[13px] font-semibold tracking-[0.12em] lg:tracking-[0.18em] uppercase whitespace-nowrap text-center"
                style={{
                  fontFamily: 'var(--font-outfit), sans-serif',
                  color: '#FBBF24',
                  textShadow: '0 0 20px rgba(251,191,36,0.3)',
                }}
              >
                <span className="text-teal-400 font-bold">✦</span>
                <span className="mx-2 xl:mx-3">{t('common.visionMarquee')}</span>
                <span className="text-teal-400 font-bold">✦</span>
              </p>
            </div>

            {/* Mobile Vision text (Marquee) */}
            <div className="sm:hidden overflow-hidden flex-1 relative flex items-center h-full">
              <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              >
                <div className="flex items-center pr-8">
                  <span className="text-teal-400 font-bold">✦</span>
                  <span className="mx-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-amber-400" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>{t('common.visionMarquee')}</span>
                  <span className="text-teal-400 font-bold">✦</span>
                </div>
                <div className="flex items-center pr-8">
                  <span className="text-teal-400 font-bold">✦</span>
                  <span className="mx-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-amber-400" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>{t('common.visionMarquee')}</span>
                  <span className="text-teal-400 font-bold">✦</span>
                </div>
              </motion.div>
            </div>

            {/* Pulsing dot */}
            <div className="relative shrink-0">
              <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-teal-400 animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Right accent */}
            <div className="hidden sm:block h-px w-12 xl:w-20 shrink-0" style={{ background: 'linear-gradient(270deg, transparent, rgba(13,148,136,0.6))' }} />
          </div>
        </div>
      </div>

      {/* ─── CHAT WIDGET ─── */}
      <ChatWidget chatSessionId={chatSessionId} showMobileBar={showMobileBar} />


    </>
  )
}
