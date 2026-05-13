"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import LoadingSpinner from '@/components/home/LoadingSpinner';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const HomePreviewSections = dynamic(() => import('@/components/home/HomePreviewSections'));
const VirtualTourSection = dynamic(() => import('@/components/home/VirtualTourSection'));
const PartnersBar = dynamic(() => import('@/components/home/PartnersBar'));
const VideoSection = dynamic(() => import('@/components/home/VideoSection'));
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'));
const HomeFAQPreview = dynamic(() => import('@/components/home/HomeFAQPreview'));
const HomeCTASection = dynamic(() => import('@/components/home/HomeCTASection'));

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Page-level scroll progress bar
  const { scrollYProgress: pageScrollProgress } = useScroll()

  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative bg-white dark:bg-slate-950 dark:text-gray-100 transition-colors duration-300" style={{ background: isDarkMode ? '#0F172A' : '#FAFFFE' }}>
      {/* Z-Index for modal dialogs like appointment / contact forms is handled by their respective components or globally (e.g., z-50). */}
      <AnimatePresence>
        {!isPageLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-9999"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ─── SCROLL PROGRESS BAR ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left shadow-[0_0_10px_rgba(16,185,129,0.5)]"
        style={{
          opacity: useTransform(pageScrollProgress, [0, 0.01], [0, 1]),
          background: 'linear-gradient(90deg, #0D9488, #10B981)',
          scaleX: pageScrollProgress,
        }}
      />
      <motion.div
        className="fixed top-[3px] right-4 z-50 text-[10px] font-mono px-1.5 py-0.5 rounded-b-md opacity-0 hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(13,148,136,0.9)', color: 'white' }}
      >
        {Math.round(pageScrollProgress.get() * 100)}%
      </motion.div>

      <main className="flex-1">
        {/* 1. Hero */}
        <HeroSection 
          heroRef={heroRef}
          heroY={heroY}
          heroOpacity={heroOpacity}
          isDarkMode={isDarkMode}
        />

        {/* 2. Stats - Hidden per client request */}
        {/* <StatsSection /> */}
        
        {/* 3. Informative Preview Sections (About, Facilities, Uniqueness, Investment, Vision) */}
        <HomePreviewSections isDarkMode={isDarkMode} />

        {/* 4. Virtual Floor Tour */}
        {/* <VirtualTourSection isDarkMode={isDarkMode} /> */}

        {/* 5. International Partners */}
        {/* <PartnersBar isDarkMode={isDarkMode} /> */}

        {/* 6. Video Showcase */}
        <VideoSection isDarkMode={isDarkMode} />
        
        {/* Section divider */}
        <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />
        
        {/* 7. Testimonials */}
        <TestimonialsSection isDarkMode={isDarkMode} />

        {/* 8. FAQ Preview */}
        <HomeFAQPreview isDarkMode={isDarkMode} />

        {/* 9. Contact CTA */}
        <HomeCTASection isDarkMode={isDarkMode} />
      </main>
    </div>
  )
}

