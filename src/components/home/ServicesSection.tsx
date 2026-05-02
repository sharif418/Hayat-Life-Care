"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { services } from '@/data/home-data'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function ServicesSection() {
  const { t } = useLanguage()
  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#0F172A' }}>
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #10B981, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-4">
              <Sparkles className="size-3" />
              {t('services.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              {t('services.title')}
            </h2>
            <div className="relative">
              <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            </div>
            <p className="mt-4 text-gray-300 max-w-xl mx-auto">
              {t('services.description')}
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/30 hover:bg-white/10 border-l-4"
                style={{ borderLeftColor: '#0D9488' }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 40px rgba(13,148,136,0.2), 0 8px 30px rgba(0,0,0,0.3)' }} />
                <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)' }} />
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                      style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.25), rgba(16,185,129,0.25))' }}
                    >
                      <service.icon className="size-6" style={{ color: '#34D399' }} />
                    </div>
                    <span className="text-3xl font-black text-white/10">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
