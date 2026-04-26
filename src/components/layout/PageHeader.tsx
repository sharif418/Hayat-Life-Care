"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface PageHeaderProps {
  badge: string
  title: string
  highlightText: string
  description: string
}

export default function PageHeader({ badge, title, highlightText, description }: PageHeaderProps) {
  return (
    <div className="relative pt-[140px] pb-20 lg:pt-[180px] lg:pb-24 overflow-hidden flex flex-col items-center justify-center text-center" style={{ background: '#0F172A' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-teal-500/10 via-emerald-500/10 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl flex flex-col items-center">
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-300 tracking-wider uppercase">{badge}</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          {title} <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-emerald-300">{highlightText}</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </div>
  )
}
