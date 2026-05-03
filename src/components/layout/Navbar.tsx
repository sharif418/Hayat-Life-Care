"use client"
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Phone, Menu, Mail, Building, Building2, Stethoscope, Shield, Heart,
  TrendingUp, Facebook, Youtube, Instagram, Linkedin, Sun, Moon, MapPin, Download, MessageSquare
} from 'lucide-react'
import { navLinks } from '@/data/home-data'
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useAppointment } from '@/components/providers/AppointmentProvider'
import { useDownload } from '@/components/providers/DownloadProvider'
import { useLanguage } from '@/i18n/LanguageProvider'
import LanguageToggle from '@/components/ui/LanguageToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { openAppointmentDialog } = useAppointment()
  const { openDownloadPopup } = useDownload()
  const { t } = useLanguage()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run once on mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ─── 1. UNIFIED TOP TICKER BAR ─── */}
      <div
        className={`fixed top-0 left-0 right-0 z-60 w-full h-8 flex items-center transition-transform duration-300 ${scrolled ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ background: '#0F172A', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs text-white h-full relative">
          
          {/* Static Contact Info (Hidden on Mobile/Tablet) */}
          <div className="hidden xl:flex items-center gap-4 px-4 h-full bg-hayat-dark z-20 relative shadow-[10px_0_15px_-3px_rgba(15,23,42,1)]">
            <div className="flex items-center gap-1.5 text-white/90 font-medium">
              <Phone className="size-4 text-emerald-400" />
              <span className="text-sm">01335-074940</span>
            </div>
            {/* <a href="mailto:info@hayatlifecare.com" className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
              <Mail className="size-3 text-amber-400" />
              <span>info@hayatlifecare.com</span>
            </a> */}
          </div>

          {/* Marquee Ticker */}
          <div className="flex-1 relative h-full overflow-hidden flex items-center">
            {/* Left fade for ticker */}
            <div className="hidden xl:block absolute left-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(90deg, #0F172A, transparent)' }} />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(270deg, #0F172A, transparent)' }} />
            
            <div className="flex items-center gap-8 animate-marquee whitespace-nowrap pl-4 xl:pl-0">
              {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="text-white/60 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <TrendingUp className="size-3 text-emerald-400" />
                    <span className="text-white/80">Investment:</span> <span className="text-emerald-400 font-bold tracking-wide">৳10 Lacs/Share</span>
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/60 font-medium flex items-center gap-2">
                    <Building2 className="size-3 text-amber-400" />
                    <span className="text-white/80">11 Business Wings</span>
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/60 font-medium flex items-center gap-2">
                    <Stethoscope className="size-3 text-teal-400" />
                    <span className="text-white/80">AI-Powered Diagnostics</span>
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/60 font-medium flex items-center gap-2">
                    <MapPin className="size-3 text-rose-400" />
                    <span className="text-white/80">55 Katha · Beside Chattogram Medical College (O.R. Nizam Road)</span>
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-white/60 font-medium flex items-center gap-2">
                    <Shield className="size-3 text-emerald-400" />
                    <span className="text-white/80">Zero Bank Loan</span>
                  </span>
                  <span className="text-white/20">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          
          {/* Socials (Hidden on Mobile/Tablet) */}
          <div className="hidden xl:flex items-center gap-3 px-4 h-full bg-hayat-dark z-20 relative shadow-[-10px_0_15px_-3px_rgba(15,23,42,1)]">
            <a href="https://www.facebook.com/hayatlifecareltd" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform" aria-label="Facebook">
              <Facebook className="size-3.5" />
            </a>
            <a href="https://www.youtube.com/@hayatLifecareltd" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform" aria-label="YouTube">
              <Youtube className="size-3.5" />
            </a>
            <a href="https://www.instagram.com/hayatlifecareltd/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform" aria-label="Instagram">
              <Instagram className="size-3.5" />
            </a>
            <a href="https://www.linkedin.com/company/hayat-life-care/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform" aria-label="LinkedIn">
              <Linkedin className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN NAVBAR (IMMERSIVE) ─── */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'top-0 ' + (isDarkMode ? 'bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-white/5' : 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-black/5')
            : 'top-8 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 lg:px-4 h-16 md:h-20 flex items-center justify-between w-full relative">
          {/* Logo & Tagline — Premium Glass Container */}
          <a
            href="/"
            className={`flex items-center shrink-0 relative group rounded-2xl px-2 lg:px-3 py-2 -ml-2 lg:-ml-3 transition-all duration-300 ${
              scrolled
                ? isDarkMode ? 'bg-white/3 border border-white/6' : 'bg-teal-50/50 border border-teal-100/50'
                : 'bg-white/6 border border-white/8 backdrop-blur-sm'
            }`}
          >
            {/* Subtle glow behind logo */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full opacity-20 blur-xl pointer-events-none" style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
            <img
              src="/images/logo.svg"
              alt="Hayat Life Care"
              className="h-9 lg:h-10 xl:h-12 w-auto object-contain relative z-10 drop-shadow-sm"
            />
          </a>

          {/* Desktop nav — Right Aligned, showing up to iPad size (md) */}
          <div className="hidden md:flex items-center ml-auto gap-0 md:gap-1 lg:gap-2 xl:gap-4 pr-2">
            {navLinks.map((link) => {
              // Determine if the link is active based on the actual URL pathname
              const isActive = link.href === '/' 
                ? pathname === '/' 
                : pathname?.startsWith(link.href);

              return (
                <div key={link.label} className="relative group">
                  <a
                    href={link.href}
                    className={`relative px-1 md:px-1.5 lg:px-3 xl:px-4 py-2 text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] uppercase tracking-wider lg:tracking-[0.1em] font-bold font-outfit rounded-lg transition-all duration-300 flex items-center gap-0.5 lg:gap-1 ${
                      isActive
                        ? isDarkMode ? 'text-teal-400' : (scrolled ? 'text-teal-600' : 'text-teal-300')
                      : isDarkMode
                        ? 'text-slate-300 hover:text-teal-400'
                        : scrolled ? 'text-slate-700 hover:text-teal-600' : 'text-white/90 hover:text-teal-300'
                    }`}
                >
                  {link.langKey ? t(`nav.${link.langKey}`) : link.label}
                  {link.children && (
                    <svg className="size-3 opacity-50 group-hover:opacity-100 transition-all group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  )}
                  {/* Animated underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                      style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>

                {/* Dropdown Panel */}
                {link.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden min-w-[220px]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}>
                      <div className="p-2">
                        {link.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            onClick={(e) => {
                              // Handle same-page hash scrolling
                              if (child.href.includes('#')) {
                                const hash = child.href.split('#')[1]
                                const basePath = child.href.split('#')[0]
                                if (pathname === basePath || (pathname === '/' && basePath === '')) {
                                  e.preventDefault()
                                  const el = document.getElementById(hash)
                                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }
                              }
                            }}
                            className="flex items-center whitespace-nowrap gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-700 dark:hover:text-teal-400 transition-colors group/item"
                          >
                            <div className="w-2 h-2 rounded-full bg-teal-500/30 group-hover/item:bg-teal-500 group-hover/item:scale-125 transition-all" />
                            {child.langKey ? t(`nav.${child.langKey}`) : child.label}
                          </a>
                        ))}
                      </div>
                      <div className="bg-gray-50 dark:bg-slate-700/50 px-4 py-2.5 border-t border-gray-100 dark:border-slate-600">
                        <a href={link.href} className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700">
                          {t('common.viewAll')} {link.langKey ? t(`nav.${link.langKey}`) : link.label} →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )})}
          </div>


          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-1.5 ml-auto">
            {/* Language Toggle (Mobile) */}
            <div className="scale-90">
              <LanguageToggle />
            </div>
            <button
              className={`rounded-full h-8 w-8 flex items-center justify-center transition-all duration-300 shadow-sm border ${
                scrolled
                  ? isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-teal-400' : 'bg-white border-gray-100 hover:bg-gray-50 text-teal-600'
                  : isHomePage ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-md' : 'bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-md'
              }`}
              onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
                </motion.div>
              </AnimatePresence>
            </button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  onMouseEnter={() => setIsMobileMenuOpen(true)}
                  className={`rounded-xl h-9 w-9 flex items-center justify-center transition-all duration-300 shadow-sm border ${
                    scrolled
                      ? isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white' : 'bg-white border-gray-100 hover:bg-gray-50 text-slate-800'
                      : isHomePage ? 'bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-md' : 'bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-md'
                  }`}
                  aria-label="Menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[400px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-0 flex flex-col h-dvh border-l border-white/20 dark:border-white/10 shadow-2xl">
                
                {/* 1. STICKY HEADER */}
                <SheetHeader className="p-6 pt-14 pb-4 border-b border-black/5 dark:border-white/5 shrink-0 z-10 bg-transparent">
                  <SheetTitle className="text-left">
                    <img
                      src="/images/logo.svg"
                      alt="Hayat Life Care"
                      className="h-8 w-auto object-contain drop-shadow-sm"
                    />
                  </SheetTitle>
                </SheetHeader>

                {/* 2. SCROLLABLE MIDDLE SECTION */}
                <div className="flex-1 overflow-y-auto py-4 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <div className="flex flex-col gap-0.5">
                    {navLinks.map((link) => (
                      <div key={link.label}>
                        {link.children ? (
                          <details className="group">
                            <summary className="flex items-center justify-between px-3 py-3 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/30 rounded-xl transition-all font-outfit uppercase tracking-wider text-[13px] font-semibold cursor-pointer list-none">
                              {link.langKey ? t(`nav.${link.langKey}`) : link.label}
                              <svg className="size-4 opacity-40 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </summary>
                            <div className="ml-3 pl-4 border-l-2 border-teal-100 dark:border-teal-800/50 space-y-1 mb-2 mt-2">
                              {link.children.map((child) => (
                                <SheetClose asChild key={child.href}>
                                  <a
                                    href={child.href}
                                    className="block px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                                  >
                                    {child.langKey ? t(`nav.${child.langKey}`) : child.label}
                                  </a>
                                </SheetClose>
                              ))}
                            </div>
                          </details>
                        ) : (
                          <SheetClose asChild>
                              <a
                                href={link.href}
                                className="block px-3 py-3 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-teal-900/30 rounded-xl transition-all font-outfit uppercase tracking-wider text-[13px] font-semibold"
                              >
                                {link.langKey ? t(`nav.${link.langKey}`) : link.label}
                              </a>
                          </SheetClose>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Contact info */}
                  <div className="mx-3 mt-4 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/30">
                    <div className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-3">Quick Contact</div>
                    <div className="space-y-2.5">
                      <a href="tel:01335074940" className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 transition-colors">
                        <Phone className="size-4 text-teal-600" /> 01335-074940
                      </a>
                      <a href="tel:01335074941" className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 transition-colors">
                        <Phone className="size-4 text-teal-600" /> 01335-074941
                      </a>
                      <a href="https://wa.me/8801617977232" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-teal-600 transition-colors">
                        <MessageSquare className="size-4 text-green-600" /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mx-3 mt-3 mb-6 flex items-center justify-center gap-3">
                    <a href="https://www.facebook.com/hayatlifecareltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors">
                      <Facebook className="size-4 text-gray-500 dark:text-gray-400" />
                    </a>
                    <a href="https://www.youtube.com/@hayatLifecareltd" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors">
                      <Youtube className="size-4 text-gray-500 dark:text-gray-400" />
                    </a>
                    <a href="https://www.instagram.com/hayatlifecareltd/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors">
                      <Instagram className="size-4 text-gray-500 dark:text-gray-400" />
                    </a>
                    <a href="https://www.linkedin.com/company/hayat-life-care/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors">
                      <Linkedin className="size-4 text-gray-500 dark:text-gray-400" />
                    </a>
                  </div>
                </div>

                {/* 3. STICKY BOTTOM BUTTONS */}
                <div className="p-5 border-t border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                  <SheetClose asChild>
                    <Button
                      className="w-full rounded-xl font-semibold text-white h-12 shadow-lg hover:shadow-xl transition-all bg-amber-500 hover:bg-amber-600 border border-amber-400"
                      onClick={() => openAppointmentDialog()}
                    >
                      {t('nav.bookAppointment')}
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="w-full rounded-xl font-semibold text-teal-600 dark:text-teal-400 h-12 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/50 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800/50 transition-all"
                      asChild
                    >
                      <button onClick={(e) => { e.preventDefault(); openDownloadPopup() }} className="flex items-center justify-center gap-2">
                        <Download className="size-4" /> {t('nav.downloadBrochure')}
                      </button>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>



    </>
  )
}
