'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, MapPin, Building2, Users } from 'lucide-react'

/* ─────────────────────── helpers ─────────────────────── */
function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        setDone(true)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return { count: inView ? count : ('' as string | number), ref, done }
}

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function StatsSection() {
  const stat1 = useCounter(11, 1800)
  const stat2 = useCounter(55, 2000)
  const stat3 = useCounter(16, 1500)
  const stat4 = useCounter(150, 2200)

  return (
    <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #10B981 100%)' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(13,148,136,0.15) 0%, transparent 70%)' }} />
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { x: '15%', y: '30%', size: 6, delay: 0, duration: 8 },
          { x: '75%', y: '20%', size: 8, delay: 1, duration: 10 },
          { x: '45%', y: '70%', size: 5, delay: 2, duration: 7 },
          { x: '85%', y: '60%', size: 7, delay: 0.5, duration: 9 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
            animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
          {/* Connecting dotted lines between stat cards on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[22%] right-[22%] border-t-2 border-dotted border-white/20 -translate-y-1/2" />
          <FadeIn delay={0}>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Sparkles className="size-7 text-white/90" />
              </div>
              <div ref={stat1.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat1.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                {stat1.count}+
              </div>
              <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Business Wings</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <MapPin className="size-7 text-white/90" />
              </div>
              <div ref={stat2.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat2.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                {stat2.count}
              </div>
              <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Katha Land Area</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Building2 className="size-7 text-white/90" />
              </div>
              <div ref={stat3.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat3.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                {stat3.count}+
              </div>
              <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Floors</div>
            </div>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Users className="size-7 text-white/90" />
              </div>
              <div ref={stat4.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat4.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                4,950
              </div>
              <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Max Shares</div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
