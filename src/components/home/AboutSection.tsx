"use client";
import React from 'react'
import Image from 'next/image'
import { MapPin, Building2, Building, Car, Sparkles, TrendingUp, Shield, Award, Users, Clock, FileCheck } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'

interface AboutSectionProps {
  isDarkMode: boolean
}

export default function AboutSection({ isDarkMode }: AboutSectionProps) {
  return (
    <>
      <section id="about" className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-5 animate-float-slow" style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
        <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-5 animate-float-slow" style={{ background: 'radial-gradient(circle, #10B981, transparent)', animationDelay: '2s' }} />
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                At A Glance
              </h2>
              <p className="text-base md:text-lg text-teal-700 dark:text-teal-400 font-medium italic mb-4">
                Your Family, Your Wellness, Your Future. Together We&apos;re Building a Healthier Society.
              </p>
              <div className="relative">
                <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn direction="right">
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                <Image
                  src="/images/hayat-exterior-vertical.jpg"
                  alt="Hayat Life Care Building View"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-4 py-2 text-white text-sm font-medium">
                  55 Katha Complex • O.R. Nizam Road
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: MapPin, label: 'Location', value: 'O.R. Nizam Road, Chattogram' },
                    { icon: Building2, label: 'Land Area', value: '55 Katha' },
                    { icon: Building, label: 'Structure', value: '9 Levels + 3 Basements' },
                    { icon: Car, label: 'Paid Parking', value: '150+ Paid Parking Spaces' },
                    { icon: Sparkles, label: 'Business Wings', value: '11 Comprehensive Wings' },
                    { icon: TrendingUp, label: 'Future', value: '14-18 Floor Expansion' },
                  ].map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-teal-200 dark:hover:border-teal-800 transition-all duration-300">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                          style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}
                        >
                          <item.icon className="size-5" style={{ color: '#0D9488' }} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{item.label}</div>
                          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.value}</div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Hayat Life Care is not just a building — it&apos;s a vision realized. Strategically
                  located near Chittagong Medical College Hospital, it brings together healthcare,
                  daily essentials, dining, and entertainment into a single, world-class complex.
                </p>

                {/* Trust Badges — moved from Hero for viewport fit */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { icon: Shield, text: 'Registered Company' },
                    { icon: Award, text: 'No Bank Loan' },
                    { icon: Users, text: '4,950 Shares' },
                    { icon: Clock, text: 'Dec 2028 Operation' },
                    { icon: FileCheck, text: 'RJSC Registered' },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors" style={{ background: 'rgba(13,148,136,0.06)', borderColor: 'rgba(13,148,136,0.15)', color: '#0D9488' }}>
                      <badge.icon className="size-3" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xl italic font-bold mt-2 px-4 py-2 rounded-xl inline-block" style={{ color: '#0D9488', background: 'rgba(13,148,136,0.08)' }}>
                  &ldquo;A one-stop service for healthcare &amp; daily essentials&rdquo;
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />
    </>
  )
}
