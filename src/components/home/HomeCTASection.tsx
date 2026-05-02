'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageSquare, Mail, Download, MapPin, Clock, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { useDownload } from '@/components/providers/DownloadProvider'

interface HomeCTASectionProps {
  isDarkMode: boolean
}

export default function HomeCTASection({ isDarkMode }: HomeCTASectionProps) {
  const { openDownloadPopup } = useDownload()
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'radial-gradient(ellipse at top right, rgba(13,148,136,0.15), transparent 60%)' }} />
        <div className="absolute bottom-0 right-0 w-full h-full" style={{ background: 'radial-gradient(ellipse at bottom left, rgba(16,185,129,0.1), transparent 60%)' }} />
      </div>
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full border border-white/5 animate-pulse" />
      <div className="absolute bottom-16 left-16 w-24 h-24 rounded-full border border-white/5" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: 'rgba(13,148,136,0.15)', color: '#5EEAD4', border: '1px solid rgba(13,148,136,0.2)' }}
            >
              <Phone className="size-3" />
              GET IN TOUCH
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Begin Your{' '}
              <span style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Journey?
              </span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
              Whether you&apos;re interested in investment, healthcare partnerships, or simply want to learn more — we&apos;re here to help.
            </p>
          </div>
        </FadeIn>

        {/* CTA Buttons Row */}
        <FadeIn delay={0.15}>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
            <Button
              className="rounded-full px-6 py-3 h-auto font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
              asChild
            >
              <a href="tel:01335074940" className="flex items-center gap-2">
                <Phone className="size-4" />
                Call Now
              </a>
            </Button>
            <Button
              className="rounded-full px-6 py-3 h-auto font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: '#25D366' }}
              asChild
            >
              <a href="https://wa.me/8801617977232" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageSquare className="size-4" />
                WhatsApp
              </a>
            </Button>
            <Button
              className="rounded-full px-6 py-3 h-auto font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{ background: '#3B82F6' }}
              asChild
            >
              <a href="mailto:info@hayatlifecare.com" className="flex items-center gap-2">
                <Mail className="size-4" />
                Email Us
              </a>
            </Button>
            <Button
              className="rounded-full px-6 py-3 h-auto font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
              asChild
            >
              <button onClick={(e) => { e.preventDefault(); openDownloadPopup() }} className="flex items-center gap-2">
                <Download className="size-4" />
                Download Brochure
              </button>
            </Button>
          </div>
        </FadeIn>

        {/* Info Cards */}
        <StaggerContainer className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            {
              icon: MapPin,
              title: 'Head Office',
              detail: 'Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram',
              color: '#0D9488',
            },
            {
              icon: Building2,
              title: 'Project Site',
              detail: 'Manashi, O.R. Nizam Road, Chattogram (Near CMCH)',
              color: '#10B981',
            },
            {
              icon: Clock,
              title: 'Operating Hours',
              detail: 'Open All Day',
              color: '#D97706',
            },
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <div
                  className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center"
                  style={{ background: `${item.color}20` }}
                >
                  <item.icon className="size-5" style={{ color: item.color }} />
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-white/50 text-xs leading-relaxed whitespace-pre-line">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-10">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors group"
            >
              Visit Full Contact Page
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
