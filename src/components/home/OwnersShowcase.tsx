'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Loader2, Crown } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function OwnersShowcase() {
  const [owners, setOwners] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchOwners() {
      try {
        const res = await fetch('/api/owners')
        const data = await res.json()
        if (data.success && data.data) {
          setOwners(data.data.filter((o: any) => o.active))
        }
      } catch (err) {
        console.error('Failed to fetch owners:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOwners()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="size-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (owners.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="our-owners" style={{ background: 'linear-gradient(180deg, #F8FDFC 0%, #F0FAF7 40%, #E8F5F0 70%, #F0FAF7 100%)' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-15 pointer-events-none blur-3xl">
        <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #0D9488, #10B981, transparent)' }} />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-15 pointer-events-none blur-3xl">
        <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #6366F1, #0D9488, transparent)' }} />
      </div>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%230D9488\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold mb-6 shadow-sm"
          >
            <Crown className="size-4" />
            <span>{t('pages.ourOwnersBadge') || 'OUR VISIONARIES'}</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {t('pages.meetOur') || 'Meet Our'}{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
              {t('pages.esteemedOwners') || 'Esteemed Owners'}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg leading-relaxed"
          >
            {t('pages.ourOwnersDescription') || 'The visionaries and partners who are driving the future of healthcare and lifestyle at Hayat Life Care.'}
          </motion.p>
        </div>

        {/* Owner Cards Grid */}
        <div className={`grid gap-8 mx-auto ${
          owners.length === 1 ? 'grid-cols-1 max-w-sm' :
          owners.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl' :
          owners.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl'
        }`}>
          {owners.map((owner, index) => (
            <motion.div
              key={owner.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="group relative h-full"
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-teal-200/60 h-full flex flex-col">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981, #0D9488)' }} />
                
                {/* Photo Section */}
                <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-gray-100">
                  {owner.image ? (
                    <img
                      src={owner.image}
                      alt={owner.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F0FDFA, #CCFBF1, #99F6E4)' }}>
                      <span className="text-7xl font-bold text-teal-600/30 select-none">
                        {owner.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Elegant gradient overlay — bottom portion only */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }} />
                  
                  {/* Subtle corner crown badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
                      <Crown className="size-4 text-white drop-shadow-sm" />
                    </div>
                  </div>
                </div>

                {/* Info Section — Clean, Premium Layout */}
                <div className="relative px-6 pt-5 pb-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Decorative divider */}
                    <div className="absolute top-0 left-6 right-6">
                      <div className="h-[2px] rounded-full opacity-60" style={{ background: 'linear-gradient(90deg, transparent, #0D9488, #10B981, transparent)' }} />
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug tracking-tight group-hover:text-teal-700 transition-colors duration-300">
                      {owner.name}
                    </h3>

                    {/* Identity / Description */}
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {owner.identity}
                    </p>
                  </div>

                  {/* Subtle decorative dot accent */}
                  <div className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    <div className="w-0.5 h-0.5 rounded-full bg-teal-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
