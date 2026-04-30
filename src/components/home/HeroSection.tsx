"use client";
import React from 'react'
import Image from 'next/image'
import { motion, MotionValue, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp, Sparkles, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'

function formatNumber(num: string | number): string {
  if (typeof num === 'string') return num
  return num.toLocaleString()
}

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return { count: inView ? count : ('' as string | number), ref }
}

// ─── Dynamic Headlines (Dream Education style: thin top + BOLD highlight) ───
const headlines = [
  { top: 'To Gift an Innovative Healthcare Facility to', highlight: 'the Society and Generations.' },
  { top: 'Toward a Secure and Sustainable', highlight: 'Financial Future' },
  { top: 'Your dream to be "a prestigious owner of the', highlight: 'largest diagnostic and Hospital"' },
]

// ─── Background images that cycle with headlines ───
const heroBgImages = [
  '/images/hayat-exterior-new.jpg',
  '/images/wings/floor_level2.jpg',
  '/images/medical-lab.png',
  '/images/hayat-exterior-new.jpg',
]

interface HeroSectionProps {
  heroRef: React.RefObject<HTMLElement | null>
  heroY: MotionValue<number>
  heroOpacity: MotionValue<number>
  isDarkMode: boolean
}

export default function HeroSection({
  heroRef,
  heroY,
  heroOpacity,
  isDarkMode
}: HeroSectionProps) {
  const stat1 = useCounter(11, 1800)
  const stat2 = useCounter(55, 2000)
  const stat3 = useCounter(16, 1500)
  const stat4 = useCounter(150, 2200)

  // ─── Rotating headline state ───
  const [headlineIndex, setHeadlineIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen pt-[140px] md:pt-[160px] pb-12"
      >
        {/* Background images — crossfade */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={headlineIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={heroBgImages[headlineIndex % heroBgImages.length]}
                alt="Hayat Life Care"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Overlay — Dark gradient for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.6) 20%, rgba(15,23,42,0.7) 50%, rgba(15,23,42,0.95) 100%)',
          }}
        />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-4 pt-4 pb-8 md:pt-6 md:pb-10 text-center flex flex-col items-center justify-center"
          style={{ opacity: heroOpacity }}
        >
          {/* Eyebrow Badge — Official "Brochure Approve" style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-slate-800 text-[11px] md:text-sm font-semibold mb-6 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.08)]"
            style={{ 
              background: 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(248,250,252,0.95) 50%, rgba(255,255,255,0.85) 100%)',
              border: '1px solid rgba(13, 148, 136, 0.2)', // Subtle teal border
            }}
          >
            <div className="flex items-center justify-center bg-linear-to-br from-amber-400 to-amber-500 rounded-full p-1.5 shadow-sm">
              <Award className="size-3.5 md:size-4 text-slate-900" />
            </div>
            <span className="tracking-wide">
              The First Cancer Diagnostic &amp; Specialized Hospital in Chattogram, with One of the Largest Facilities.
            </span>
          </motion.div>

          {/* ─── Rotating Headlines — Dream Education Style ─── */}
          <div className="mb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={headlineIndex}
                initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                {/* Premium Editorial Top Line */}
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="h-[2px] w-8 sm:w-16 bg-linear-to-r from-transparent to-teal-400/60" />
                  <h2 
                    className="text-xs sm:text-sm md:text-lg lg:text-xl text-teal-50 font-bold tracking-[0.2em] uppercase drop-shadow-md" 
                    style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                  >
                    {headlines[headlineIndex].top}
                  </h2>
                  <div className="h-[2px] w-8 sm:w-16 bg-linear-to-l from-transparent to-teal-400/60" />
                </div>
                {/* BOLD highlight — Premium Teal/Emerald Gradient */}
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] whitespace-pre-line"
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    background: 'linear-gradient(135deg, #2DD4BF 0%, #0D9488 50%, #115E59 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 4px 20px rgba(13,148,136,0.3))',
                  }}
                >
                  {headlines[headlineIndex].highlight}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description — clean, muted */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-slate-200/95 text-[13px] sm:text-sm md:text-base lg:text-[17px] max-w-3xl mx-auto mb-8 leading-relaxed font-medium"
          >
            One of the Largest Healthcare &amp; Lifestyle Complexes in Chattogram&apos;s Medical Hub—<br className="hidden md:block" />
            Offering World-class Healthcare Services, Daily Essentials, Dining, and Family Entertainment.
          </motion.p>

          {/* CTA Buttons — Dream Education style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10"
          >
            <Button
              size="lg"
              className="rounded-full px-7 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm group"
              style={{ 
                background: 'linear-gradient(135deg, #0D9488, #10B981)',
                boxShadow: '0 0 20px rgba(16,185,129,0.3)'
              }}
              asChild
            >
              <a href="/facilities#services">
                Explore Services <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              className="rounded-full px-7 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-sm group relative overflow-hidden"
              style={{ 
                background: 'rgba(245,158,11,0.12)', 
                border: '1px solid rgba(245,158,11,0.3)', 
                color: '#FCD34D', 
                backdropFilter: 'blur(8px)' 
              }}
              asChild
            >
              <a href="/investment#investment">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-amber-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <TrendingUp className="mr-2 size-4 group-hover:scale-110 transition-transform" /> Invest Now
              </a>
            </Button>
          </motion.div>

          {/* Stat cards — glassmorphic bottom strip like Dream Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="w-full max-w-2xl"
          >
            <div
              className="grid grid-cols-4 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              {[
                { label: 'BUSINESS WINGS', value: stat1.count, suffix: '' },
                { label: 'KATHA LAND', value: stat2.count, suffix: '' },
                { label: 'FLOORS', value: stat3.count, suffix: '+' },
                { label: 'PAID PARKING', value: stat4.count, suffix: '+' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`py-4 md:py-5 text-center ${i < 3 ? 'border-r border-white/10' : ''}`}
                >
                  <div
                    ref={i === 0 ? stat1.ref : i === 1 ? stat2.ref : i === 2 ? stat3.ref : stat4.ref}
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white"
                  >
                    {formatNumber(stat.value as string | number)}
                    {stat.suffix}
                  </div>
                  <div className="text-[9px] md:text-[10px] text-white/40 mt-1 tracking-[0.15em] uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — minimal */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-white/40"
          >
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-1 h-1 rounded-full bg-white/50"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
