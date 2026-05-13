'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { lightboxImages } from '@/data/home-data'
import { useLanguage } from '@/i18n/LanguageProvider'

interface GallerySectionProps {
  isDarkMode: boolean
}

export default function GallerySection({ isDarkMode }: GallerySectionProps) {
  const [galleryFilter, setGalleryFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const { t } = useLanguage()

  // Handle keyboard navigation for the lightbox
  useEffect(() => {
    if (lightboxIndex < 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(-1)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex])

  return (
    <>
      <section id="gallery" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
                <Building2 className="size-3" />
                {t('gallery.badge')}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                {t('gallery.title')}
              </h2>
              <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {t('gallery.description')}
              </p>
              <div className="flex justify-center mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-medium">
                  <ZoomIn className="size-3" />
                  {lightboxImages.length} Photos · Click to enlarge
                </span>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['All', 'Healthcare', 'Dining', 'Retail', 'Facilities'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  galleryFilter === cat
                    ? 'text-white shadow-md'
                    : isDarkMode 
                      ? 'bg-[#1E293B] text-gray-300 border border-white/10 hover:border-teal-500 hover:text-teal-400'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600'
                }`}
                style={galleryFilter === cat ? { background: 'linear-gradient(135deg, #0D9488, #10B981)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          <StaggerContainer key={galleryFilter} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lightboxImages
              .map((img, i) => {
                // Alternating brick pattern for a premium look without grid gaps
                const isWide = i === 0 || i === 5 || i === 10;
                return { ...img, idx: i, span: isWide ? 'md:col-span-2' : '' };
              })
              .filter((img) => galleryFilter === 'All' || img.category === galleryFilter)
              .map((img) => (
              <StaggerItem key={img.idx} className={img.span || ''}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative group rounded-2xl overflow-hidden border shadow-sm cursor-pointer h-48 md:h-60 ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200'
                  }`}
                  onClick={() => setLightboxIndex(img.idx)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="size-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {img.alt}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── GALLERY LIGHTBOX ─── */}
      <AnimatePresence>
        {lightboxIndex >= 0 && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIndex(-1)}
          >
            {/* Image counter top center */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-sm font-semibold text-white" style={{ background: 'rgba(13,148,136,0.8)' }}>
                {lightboxIndex + 1} / {lightboxImages.length}
              </span>
            </div>
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={() => setLightboxIndex(-1)}
              aria-label="Close lightbox"
            >
              <X className="size-6" />
            </button>
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10 shadow-lg hover:scale-110"
              style={{ background: 'rgba(13,148,136,0.7)' }}
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length) }}
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10 shadow-lg hover:scale-110"
              style={{ background: 'rgba(13,148,136,0.7)' }}
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % lightboxImages.length) }}
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4" onClick={e => e.stopPropagation()}>
              <Image
                src={lightboxImages[lightboxIndex]?.src || ''}
                alt={lightboxImages[lightboxIndex]?.alt || ''}
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            {/* Caption bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <div className="px-5 py-2.5 rounded-xl backdrop-blur-md text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
                <div className="text-sm font-semibold">{lightboxImages[lightboxIndex]?.alt}</div>
                <div className="text-[11px] text-white/50 mt-0.5">Use ← → arrow keys to navigate · ESC to close</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
