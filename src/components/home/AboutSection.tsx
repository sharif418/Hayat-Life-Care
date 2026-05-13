"use client";
import React from 'react'
import Image from 'next/image'
import { MapPin, Building2, Building, Car, Sparkles, TrendingUp, Shield, Award, Users, FileCheck, Activity, HeartPulse } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'

interface AboutSectionProps {
  isDarkMode: boolean
}

export default function AboutSection({ isDarkMode }: AboutSectionProps) {
  const { t } = useLanguage()
  return (
    <>
      <section id="about" className="py-20 md:py-28 relative overflow-hidden" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>

        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-snug max-w-4xl mx-auto">
                {t('about.subtitle')}
              </h2>
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
                    { icon: HeartPulse, label: t('about.hospital'), value: t('about.hospitalValue') },
                    { icon: Activity, label: t('about.diagnostic'), value: t('about.diagnosticValue') },
                    { icon: MapPin, label: t('about.location'), value: t('about.locationValue') },
                    { icon: Building2, label: t('about.landArea'), value: t('about.landAreaValue') },
                    { icon: Building, label: t('about.structure'), value: t('about.structureValue') },
                    { icon: Sparkles, label: t('about.businessWings'), value: t('about.businessWingsValue') },
                    { icon: Car, label: t('about.paidParking'), value: t('about.paidParkingValue') },
                    { icon: TrendingUp, label: t('about.totalArea'), value: t('about.totalAreaValue') },
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
                  {t('about.description')}
                </p>

                {/* Trust Badges — moved from Hero for viewport fit */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { icon: Shield, text: t('about.registeredCompany') },
                    { icon: Award, text: t('about.noBankLoan') },
                    { icon: Users, text: t('about.shares') },
                    { icon: FileCheck, text: t('about.rjsc') },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors" style={{ background: 'rgba(13,148,136,0.06)', borderColor: 'rgba(13,148,136,0.15)', color: '#0D9488' }}>
                      <badge.icon className="size-3" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xl italic font-bold mt-2 px-4 py-2 rounded-xl inline-block" style={{ color: '#0D9488', background: 'rgba(13,148,136,0.08)' }}>
                  &ldquo;{t('about.oneStopService')}&rdquo;
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
