'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Youtube, ExternalLink, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Fallback static data — used when API has no videos
const fallbackVideos = [
  {
    id: 'fallback-1',
    title: 'Hayat Life Care — Official Overview',
    description: 'Discover the vision behind Chattogram\'s most ambitious healthcare & lifestyle complex on 55 Katha.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
  },
  {
    id: 'fallback-2',
    title: 'Our World-Class Facilities',
    description: 'Explore 11 business wings, international-standard diagnostics, and premium amenities across 14+ floors.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
  },
  {
    id: 'fallback-3',
    title: 'Investment Opportunity',
    description: 'Learn about our transparent investment model — 4,950 shares, zero bank loans, buyback guarantee.',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual video ID
  },
]

interface VideoItem {
  id: string
  title: string
  description: string
  youtubeId: string
  thumbnail?: string
}

interface VideoSectionProps {
  isDarkMode: boolean
}

export default function VideoSection({ isDarkMode }: VideoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [videos, setVideos] = useState<VideoItem[]>(fallbackVideos)

  // Fetch videos from API (admin-managed)
  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/videos')
        if (res.ok) {
          const json = await res.json()
          if (json.data && json.data.length > 0) {
            setVideos(json.data)
          }
        }
      } catch {
        // Use fallback data if API fails
      }
    }
    fetchVideos()
  }, [])

  return (
    <>
      <section
        id="videos"
        ref={sectionRef}
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          background: isDarkMode ? '#0F172A' : '#FAFFFE',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
              style={{
                background: isDarkMode ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.1)',
                color: '#EF4444',
                border: '1px solid rgba(239,68,68,0.2)',
              }}
            >
              <Youtube className="size-4" />
              Watch Our Videos
            </div>
            <h2
              className="text-3xl md:text-5xl font-black mb-4"
              style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
            >
              See{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0D9488, #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hayat Life Care
              </span>{' '}
              in Action
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
            >
              Watch our latest videos to experience the facilities, services, and vision of Hayat Life Care.
            </p>
          </motion.div>

          {/* Video Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: isDarkMode ? 'rgba(30,41,59,0.5)' : '#FFFFFF',
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                  boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.06)',
                }}
                onClick={() => setPlayingVideo(video.youtubeId)}
              >
                {/* Thumbnail with play overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="size-7 text-white ml-1" fill="white" />
                    </div>
                  </div>
                  {/* YouTube badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
                    <Youtube className="size-3" />
                    YouTube
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
                    style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
                  >
                    {video.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
                  >
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-10"
          >
            <Button
              className="rounded-full px-6 font-semibold text-white shadow-lg"
              style={{ background: '#EF4444' }}
              asChild
            >
              <a
                href="https://www.youtube.com/@hayatLifecareltd"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="size-4 mr-2" />
                Subscribe to Our Channel
                <ExternalLink className="size-3.5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── Video Lightbox Modal ─── */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8"
            onClick={() => setPlayingVideo(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Video Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 0 }}
              />
              {/* Close Button */}
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors z-10"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
