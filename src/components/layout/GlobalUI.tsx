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

      {/* Spacer to prevent mobile dock from covering footer */}
      <div className="h-[88px] lg:h-0 w-full" style={{ background: '#0F172A' }} />

      {/* ─── FLOATING ACTION BUTTONS (Right side stack) ─── */}
      <div className={`fixed right-4 sm:right-5 z-40 flex flex-col items-center gap-3 transition-all duration-300 ${showMobileBar ? 'bottom-[72px] lg:bottom-6' : 'bottom-6'}`}>
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

      {/* ─── FLOATING VISION STATEMENT (Left side, Desktop only) ─── */}
      <div className="fixed bottom-6 left-6 z-40 hidden xl:flex">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-teal-500/20 shadow-[0_8px_30px_rgba(13,148,136,0.15)] rounded-full px-5 py-2.5 flex items-center gap-3 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
          <div className="absolute inset-0 bg-linear-to-r from-teal-500/0 via-teal-500/10 to-teal-500/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
          <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300 tracking-[0.15em] uppercase" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
            <span className="text-teal-600 dark:text-teal-400 font-bold mr-2">Our Vision</span>
            Vision with purpose, driven by innovation and guided by heart—to serve and uplift generations.
          </p>
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
