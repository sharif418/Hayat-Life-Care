'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Loader2, X, ChevronLeft, ChevronRight, ImageIcon, Eye } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider'

interface EventPhoto {
  id: string
  photo: string
  caption?: string
}

interface EventItem {
  id: string
  name: string
  description: string
  coverPhoto?: string
  photos: EventPhoto[]
  createdAt: string
}

export default function EventsShowcase() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const { t } = useLanguage()

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events')
        const data = await res.json()
        if (data.success && data.data) {
          setEvents(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex < 0 || !selectedEvent) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(-1)
        setSelectedEvent(null)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % allPhotos.length)
      }
    }
    const allPhotos = getAllPhotos(selectedEvent)
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, selectedEvent])

  function getAllPhotos(event: EventItem): { src: string; caption?: string }[] {
    const photos: { src: string; caption?: string }[] = []
    if (event.coverPhoto) photos.push({ src: event.coverPhoto, caption: event.name + ' — Cover' })
    event.photos.forEach(p => photos.push({ src: p.photo, caption: p.caption || event.name }))
    return photos
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="size-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (events.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-20 md:py-28 relative overflow-hidden" id="events" style={{ background: 'linear-gradient(180deg, #F0FAF7 0%, #F8FDFC 50%, #FAFFFE 100%)' }}>
        {/* Decorative blurs */}
        <div className="absolute top-0 left-0 -translate-y-1/4 -translate-x-1/4 opacity-10 pointer-events-none blur-3xl">
          <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #D97706, #F59E0B, transparent)' }} />
        </div>
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none blur-3xl">
          <div className="w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, #0D9488, #10B981, transparent)' }} />
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold mb-6 shadow-sm"
            >
              <Calendar className="size-4" />
              <span>{t('gallery.eventsBadge') || 'OUR EVENTS'}</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              {t('gallery.eventsTitle') || 'Memorable'}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #D97706, #F59E0B)' }}>
                {t('gallery.eventsHighlight') || 'Moments'}
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg leading-relaxed"
            >
              {t('gallery.eventsDescription') || 'Highlights from our latest events, grand openings, and community initiatives.'}
            </motion.p>
          </div>

          {/* Event Cards Grid */}
          <div className={`grid gap-8 mx-auto ${
            events.length === 1 ? 'grid-cols-1 max-w-lg' :
            events.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl' :
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl'
          }`}>
            {events.map((event, index) => {
              const photoCount = (event.coverPhoto ? 1 : 0) + event.photos.length
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedEvent(event)
                    setLightboxIndex(0)
                  }}
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-amber-200/60">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #D97706, #F59E0B, #D97706)' }} />

                    {/* Cover Photo */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      {event.coverPhoto ? (
                        <img
                          src={event.coverPhoto}
                          alt={event.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A, #FCD34D)' }}>
                          <Calendar className="size-16 text-amber-600/30" />
                        </div>
                      )}

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl">
                            <Eye className="size-6 text-amber-600" />
                          </div>
                        </div>
                      </div>

                      {/* Photo count badge */}
                      {photoCount > 0 && (
                        <div className="absolute bottom-3 right-3 z-10">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold shadow-lg">
                            <ImageIcon className="size-3" />
                            {photoCount} {photoCount === 1 ? 'Photo' : 'Photos'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="px-6 py-5">
                      <div className="absolute left-6 right-6" style={{ marginTop: '-1px' }}>
                        <div className="h-[2px] rounded-full opacity-40" style={{ background: 'linear-gradient(90deg, transparent, #D97706, #F59E0B, transparent)' }} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 mt-2 group-hover:text-amber-700 transition-colors duration-300 line-clamp-1">
                        {event.name}
                      </h3>
                      {event.description && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 text-amber-600 text-xs font-semibold">
                        <span>View Gallery</span>
                        <ChevronRight className="size-3" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── EVENT LIGHTBOX ─── */}
      <AnimatePresence>
        {selectedEvent && lightboxIndex >= 0 && (() => {
          const allPhotos = getAllPhotos(selectedEvent)
          if (allPhotos.length === 0) return null
          const currentPhoto = allPhotos[lightboxIndex]
          return (
            <motion.div
              key="event-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
              onClick={() => { setLightboxIndex(-1); setSelectedEvent(null) }}
            >
              {/* Event title */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
                <span className="px-4 py-1.5 rounded-full text-sm font-bold text-white" style={{ background: 'rgba(217,119,6,0.8)' }}>
                  {selectedEvent.name}
                </span>
                <span className="text-white/50 text-xs font-medium">
                  {lightboxIndex + 1} / {allPhotos.length}
                </span>
              </div>

              {/* Close */}
              <button
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-20"
                onClick={() => { setLightboxIndex(-1); setSelectedEvent(null) }}
                aria-label="Close"
              >
                <X className="size-6" />
              </button>

              {/* Nav arrows */}
              {allPhotos.length > 1 && (
                <>
                  <button
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all z-20 shadow-lg hover:scale-110"
                    style={{ background: 'rgba(217,119,6,0.7)' }}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + allPhotos.length) % allPhotos.length) }}
                    aria-label="Previous"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all z-20 shadow-lg hover:scale-110"
                    style={{ background: 'rgba(217,119,6,0.7)' }}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % allPhotos.length) }}
                    aria-label="Next"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}

              {/* Photo */}
              <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4" onClick={e => e.stopPropagation()}>
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption || selectedEvent.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Caption */}
              {currentPhoto.caption && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-20">
                  <div className="px-5 py-2.5 rounded-xl backdrop-blur-md text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
                    <div className="text-sm font-semibold">{currentPhoto.caption}</div>
                    <div className="text-[11px] text-white/50 mt-0.5">Use ← → arrow keys to navigate · ESC to close</div>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </>
  )
}
