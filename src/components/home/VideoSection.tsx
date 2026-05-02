'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Play, Youtube, ExternalLink, X, Volume2, VolumeX, Maximize2, Star } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageProvider'
import { Button } from '@/components/ui/button'

// Fallback static data — used when API has no videos
const fallbackVideos = [
  {
    id: 'fallback-1',
    title: 'Hayat Life Care — Official Overview',
    description: 'Discover the vision behind Chattogram\'s most ambitious healthcare & lifestyle complex.',
    youtubeId: 'KgX0Afipj5o',
  },
  {
    id: 'fallback-2',
    title: 'Our World-Class Facilities',
    description: 'Explore 11 business wings, international-standard diagnostics, and premium amenities.',
    youtubeId: 'awOjNHJHNQ8',
  },
  {
    id: 'fallback-3',
    title: 'Investment Opportunity',
    description: 'Learn about our transparent investment model — shares, returns, and growth potential.',
    youtubeId: 'yfyKJBpNxrM',
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
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [videos, setVideos] = useState<VideoItem[]>(fallbackVideos)

  // Featured / Spotlight video state
  const featuredRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const isFeaturedInView = useInView(featuredRef, { margin: '-100px' })
  const [featuredVideoId, setFeaturedVideoId] = useState<string>('')
  const [featuredMuted, setFeaturedMuted] = useState(true)
  const [featuredReady, setFeaturedReady] = useState(false)

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

  // Fetch featured video from site-settings
  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/site-settings')
        if (res.ok) {
          const json = await res.json()
          const allSettings = json.data || {}
          for (const group of Object.values(allSettings) as any[][]) {
            const setting = group.find((s: any) => s.key === 'featured_video_id')
            if (setting && setting.value) {
              setFeaturedVideoId(setting.value)
              return
            }
          }
        }
      } catch {
        // No featured video
      }
    }
    fetchFeatured()
  }, [])

  // YouTube postMessage helper — controls the iframe player
  const sendYTCommand = useCallback((command: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        '*'
      )
    }
  }, [])

  // Auto play/pause based on scroll visibility + try auto-unmute
  useEffect(() => {
    if (!featuredVideoId || !featuredReady) return
    if (isFeaturedInView) {
      sendYTCommand('playVideo')
      // Try to auto-unmute after a short delay (browser may allow after scroll interaction)
      setTimeout(() => {
        sendYTCommand('unMute')
        setFeaturedMuted(false)
      }, 300)
    } else {
      sendYTCommand('pauseVideo')
    }
  }, [isFeaturedInView, featuredVideoId, featuredReady, sendYTCommand])

  // Mark iframe as ready after it loads
  const handleIframeLoad = useCallback(() => {
    setTimeout(() => setFeaturedReady(true), 500)
  }, [])

  // Toggle mute/unmute via postMessage
  const toggleMute = useCallback(() => {
    if (featuredMuted) {
      sendYTCommand('unMute')
    } else {
      sendYTCommand('mute')
    }
    setFeaturedMuted(!featuredMuted)
  }, [featuredMuted, sendYTCommand])

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
              {t('video.badge')}
            </div>
            <h2
              className="text-3xl md:text-5xl font-black mb-4"
              style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
            >
              {t('video.titlePrefix')}{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0D9488, #10B981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hayat Life Care
              </span>{' '}
              {t('video.titleSuffix')}
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
            >
              {t('video.description')}
            </p>
          </motion.div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* FEATURED / SPOTLIGHT VIDEO                             */}
          {/* Auto-plays on scroll, pauses when scrolled away        */}
          {/* ═══════════════════════════════════════════════════════ */}
          {featuredVideoId && (
            <motion.div
              ref={featuredRef}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-14"
            >
              <div className="max-w-5xl mx-auto">
                {/* Featured badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: isDarkMode ? 'rgba(217,119,6,0.15)' : 'rgba(217,119,6,0.1)',
                      color: '#D97706',
                      border: '1px solid rgba(217,119,6,0.2)',
                    }}
                  >
                    <Star className="size-3" fill="#D97706" />
                    {t('video.featuredVideo')}
                  </div>
                </div>

                {/* Video Player Container */}
                <div
                  className="relative rounded-3xl overflow-hidden shadow-2xl group"
                  style={{
                    border: `2px solid ${isDarkMode ? 'rgba(217,119,6,0.3)' : 'rgba(217,119,6,0.2)'}`,
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -inset-1 rounded-3xl opacity-30 blur-xl -z-10"
                    style={{ background: 'linear-gradient(135deg, #D97706, #0D9488)' }}
                  />

                  <div className="relative aspect-video bg-black">
                    {/* Iframe — always loaded, controlled via YouTube postMessage API */}
                    <iframe
                      ref={iframeRef}
                      src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=0&mute=1&loop=1&playlist=${featuredVideoId}&rel=0&modestbranding=1&controls=0&showinfo=0&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                      title="Featured Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 0 }}
                      onLoad={handleIframeLoad}
                    />

                    {/* Bottom control overlay — always visible */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
                    >
                      <button
                        onClick={toggleMute}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md text-white text-sm font-medium transition-all hover:scale-105"
                        style={{
                          background: featuredMuted
                            ? 'linear-gradient(135deg, #D97706, #B45309)'
                            : 'rgba(255,255,255,0.2)',
                        }}
                      >
                        {featuredMuted ? (
                          <>
                            <VolumeX className="size-4" />
                            <span>🔊 {t('video.tapUnmute')}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="size-4" />
                            <span>{t('video.playingSound')}</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setPlayingVideo(featuredVideoId)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        aria-label="Watch fullscreen"
                      >
                        <Maximize2 className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* VIDEO GALLERY — Existing cards                         */}
          {/* ═══════════════════════════════════════════════════════ */}
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
                {t('video.subscribe')}
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
