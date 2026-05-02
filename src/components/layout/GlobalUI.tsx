"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { ChevronUp, MessageSquare, Phone, Download, Mail } from 'lucide-react'
import FooterSection from '@/components/home/FooterSection'
import ChatWidget from '@/components/home/ChatWidget'
import { useDownload } from '@/components/providers/DownloadProvider'

export default function GlobalUI() {
  const [scrolled, setScrolled] = useState(false)
  const [showMobileBar, setShowMobileBar] = useState(false)
  const [chatSessionId] = useState(() => crypto.randomUUID())
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { openDownloadPopup } = useDownload()

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

      {/* ─── FLOATING ACTION BUTTONS (Right side stack) ─── */}
      <div className={`fixed right-4 sm:right-5 z-40 flex flex-col items-center gap-3 transition-all duration-300 ${showMobileBar ? 'bottom-[72px] lg:bottom-12' : 'bottom-6 lg:bottom-12'}`}>
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

        {/* WhatsApp */}
        <a
          href="https://wa.me/8801617977232"
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

      {/* ─── PREMIUM VISION STRIP (Persistent, solid, all pages — Desktop only) ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-[45] hidden lg:block">
        <div
          className="w-full h-8"
          style={{
            background: '#0F172A',
            borderTop: '1px solid rgba(13,148,136,0.25)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
          }}
        >
          <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 overflow-hidden">
            {/* Left accent */}
            <div className="h-px w-12 xl:w-20 shrink-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(13,148,136,0.5))' }} />
            
            {/* Pulsing dot */}
            <div className="relative shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping opacity-40" />
            </div>

            {/* Vision text — scrolling marquee for smaller screens */}
            <div className="overflow-hidden flex-1 min-w-0">
              <p
                className="text-[10px] xl:text-[11px] font-medium tracking-[0.18em] uppercase text-white/50 whitespace-nowrap text-center"
                style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
              >
                <span className="text-teal-400/70 font-bold">✦</span>
                <span className="mx-2 xl:mx-3">Vision with purpose, driven by innovation and guided by heart—to serve and uplift generations.</span>
                <span className="text-teal-400/70 font-bold">✦</span>
              </p>
            </div>

            {/* Pulsing dot */}
            <div className="relative shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping opacity-40" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Right accent */}
            <div className="h-px w-12 xl:w-20 shrink-0" style={{ background: 'linear-gradient(270deg, transparent, rgba(13,148,136,0.5))' }} />
          </div>
        </div>
      </div>

      {/* ─── CHAT WIDGET ─── */}
      <ChatWidget chatSessionId={chatSessionId} showMobileBar={showMobileBar} />

      {/* ─── MOBILE QUICK CONTACT BAR ─── */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
            className="fixed bottom-3 left-3 right-3 z-50 lg:hidden rounded-2xl"
            style={{
              background: isDarkMode ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
              boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <div className="flex items-center justify-between px-1 py-1">
              <a href="tel:01335074940" className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl text-current flex-1 transition-all active:scale-95 hover:bg-black/5 dark:hover:bg-white/5">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center mb-0.5">
                  <Phone className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[9px] font-medium opacity-80" style={{ color: isDarkMode ? '#E2E8F0' : '#334155' }}>Call Us</span>
              </a>
              <div className="w-px h-6" style={{ background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
              <button onClick={(e) => { e.preventDefault(); openDownloadPopup() }} className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl text-current flex-1 transition-all active:scale-95 hover:bg-black/5 dark:hover:bg-white/5">
                <div className="w-7 h-7 rounded-full bg-indigo-500/10 flex items-center justify-center mb-0.5">
                  <Download className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-[9px] font-medium opacity-80" style={{ color: isDarkMode ? '#E2E8F0' : '#334155' }}>Brochure</span>
              </button>
              <div className="w-px h-6" style={{ background: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
              <a href="/contact" className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl text-current flex-1 transition-all active:scale-95 hover:bg-black/5 dark:hover:bg-white/5">
                <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center mb-0.5">
                  <Mail className="size-3.5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-[9px] font-medium opacity-80" style={{ color: isDarkMode ? '#E2E8F0' : '#334155' }}>Enquiry</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
