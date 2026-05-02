'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone } from 'lucide-react'

function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return { ref, isInView }
}

export default function EmergencyBar() {
  const emergencyReveal = useSectionReveal()

  return (
    <div ref={emergencyReveal.ref} className="relative overflow-hidden" style={{ background: 'linear-gradient(90deg, #DC2626, #D97706, #DC2626)', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={emergencyReveal.isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
      <div className="absolute inset-0 animate-pulse opacity-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
      <div className="relative max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white text-sm md:text-base font-medium">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex items-center gap-2"
        >
          <Phone className="size-4" />
          <span className="font-bold text-sm md:text-base">Emergency Hotline:</span>
        </motion.div>
        <a href="tel:01335074940" className="hover:underline font-bold text-white text-sm md:text-base">01335-074940</a>
        <span className="text-white/30">•</span>
        <a href="tel:01335074941" className="hover:underline font-bold text-white text-sm md:text-base">01335-074941</a>
      </div>
      </motion.div>
    </div>
  )
}
