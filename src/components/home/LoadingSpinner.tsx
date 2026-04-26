'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center" style={{ background: '#0F172A' }}>
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#0D9488 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Gradient glow */}
      <div
        className="absolute w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }}
      />

      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 mb-8"
      >
        <div className="relative">
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full"
            style={{
              border: '3px solid rgba(13,148,136,0.15)',
              borderTopColor: '#0D9488',
              borderRightColor: '#10B981',
            }}
          />
          {/* Inner pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-2 rounded-full"
            style={{ border: '2px solid rgba(16,185,129,0.3)' }}
          />
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center justify-center w-14 h-14 rounded-xl overflow-hidden"
            >
              <img
                src="/images/icon.svg"
                alt="Hayat Life Care"
                className="w-12 h-12 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center relative z-10"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wider mb-1">
          HAYAT LIFE CARE
        </h1>
        <div className="text-[11px] tracking-[0.3em] text-white/40 uppercase">
          Chattogram
        </div>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 relative z-10"
      >
        <div className="w-48 h-1 rounded-full overflow-hidden bg-white/10">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1/2 h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent, #0D9488, #10B981, transparent)' }}
          />
        </div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
        className="mt-4 text-xs text-white/30 tracking-widest uppercase relative z-10"
      >
        Loading Healthcare Excellence...
      </motion.p>
    </div>
  )
}
