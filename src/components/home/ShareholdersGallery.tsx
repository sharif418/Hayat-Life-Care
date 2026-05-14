'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Sparkles } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'

export default function ShareholdersGallery() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/shareholders')
        const data = await res.json()
        if (data.success && data.data) {
          setImages(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch shareholders:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (images.length === 0) return null

  return (
    <section id="shareholders" className="py-20 md:py-32 bg-gray-50 dark:bg-slate-900/50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-teal-500/10 ring-1 ring-gray-200 dark:ring-slate-700">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
              Our Visionary <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Shareholders</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We value the trust of our investors. Recognizing their significant contribution to our journey while maintaining absolute confidentiality.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer>
          {/* CSS Columns (Masonry effect) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((img, i) => (
              <StaggerItem key={img.id}>
                <motion.div 
                  className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700"
                  whileHover={{ y: -5 }}
                >
                  <img 
                    src={img.photo} 
                    alt="Shareholder" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/30 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0, y: 10 }}
                      whileInView={{ scale: 1, opacity: 1, y: 0 }}
                      className="bg-white/10 p-3 rounded-full mb-3 backdrop-blur-md ring-1 ring-white/20"
                    >
                      <Shield className="w-6 h-6 text-emerald-400 drop-shadow-md" />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 tracking-wide drop-shadow-md">
                      Confidentiality, We Trust
                    </h3>
                    <div className="w-8 h-1 bg-emerald-400 rounded-full mb-3" />
                    <p className="text-white/80 text-sm font-medium">
                      Proud Shareholder
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

      </div>
    </section>
  )
}
