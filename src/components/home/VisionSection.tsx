'use client'

import React from 'react'
import { Sparkles, Target, Heart } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'
export default function VisionSection() {
  const { t } = useLanguage()
  return (
    <>
      {/* ZONE 1: Vision & Mission (Psychology: Clarity, Transparency, Purpose) */}
      <section id="vision" className="relative py-20 md:py-28 bg-gray-50 dark:bg-slate-900/50 overflow-hidden">
        {/* Subtle medical/clean background accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-100 dark:bg-teal-900/20 rounded-bl-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-1/4 h-3/4 bg-emerald-100 dark:bg-emerald-900/20 rounded-tr-full blur-3xl opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-teal-600 dark:text-teal-400 font-semibold tracking-wider uppercase text-sm mb-3 block">{t('preview.visionBadge')}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">{t('preview.visionTitle')}</h2>
              <div className="w-24 h-1.5 mx-auto rounded-full bg-linear-to-r from-teal-500 to-emerald-500" />
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Vision Card */}
              <div className="group bg-white dark:bg-slate-800 hover:bg-teal-50/30 dark:hover:bg-teal-900/20 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(13,148,136,0.15)] hover:border-teal-200 dark:hover:border-teal-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 dark:bg-teal-900/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-[3]" />
                <div className="p-3.5 inline-block rounded-2xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-6 border border-teal-100 dark:border-teal-800/50 relative z-10">
                  <Sparkles className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{t('preview.visionLabel')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] relative z-10">
                  {t('preview.visionText')}
                </p>
              </div>

              {/* Mission Card */}
              <div className="group bg-white dark:bg-slate-800 hover:bg-emerald-50/30 dark:hover:bg-emerald-900/20 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] hover:border-emerald-200 dark:hover:border-emerald-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-[3]" />
                <div className="p-3.5 inline-block rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-100 dark:border-emerald-800/50 relative z-10">
                  <Target className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{t('preview.missionLabel')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] relative z-10">
                  {t('preview.missionText')}
                </p>
              </div>

              {/* Ethical Vision Card */}
              <div className="group bg-white dark:bg-slate-800 hover:bg-rose-50/30 dark:hover:bg-rose-900/20 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-none border border-gray-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] hover:border-rose-200 dark:hover:border-rose-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 dark:bg-rose-900/20 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-[3]" />
                <div className="p-3.5 inline-block rounded-2xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mb-6 border border-rose-100 dark:border-rose-800/50 relative z-10">
                  <Heart className="size-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">{t('preview.ethicalVisionLabel')}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] relative z-10">
                  {t('preview.ethicalVisionText')}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ZONE 2: Founder's Message (Psychology: Authority, Trust, Leadership, Warmth) */}
      <section className="relative py-20 md:py-28 bg-teal-950 overflow-hidden">
        {/* Deep, authoritative premium background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.15) 0%, transparent 70%)' }} />
        
        <div className="relative max-w-4xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <span className="text-emerald-400 font-medium tracking-widest uppercase text-xs mb-3 block">{t('preview.founderBadge')}</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {t('preview.founderTitle')}
              </h3>
            </div>
            
            <div className="relative">
              {/* Decorative Quote Marks */}
              <div className="absolute -top-6 -left-4 md:-left-10 text-6xl text-teal-800/50 font-serif leading-none select-none">"</div>
              <div className="absolute -bottom-10 -right-4 md:-right-10 text-6xl text-teal-800/50 font-serif leading-none select-none rotate-180">"</div>
              
              <div className="space-y-6 text-gray-200 text-base md:text-lg leading-relaxed relative z-10">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-400 first-letter:mr-2 first-letter:float-left">
                  {t('preview.founderP1')}
                </p>
                <p>
                  {t('preview.founderP2')}
                </p>
                <p>
                  {t('preview.founderP3')}
                </p>
                
                <div className="pt-8 pb-4 text-center">
                  <div className="w-16 h-px bg-linear-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-6" />
                  <strong className="inline-block text-transparent bg-clip-text bg-linear-to-r from-emerald-200 via-white to-emerald-200 italic text-2xl md:text-3xl font-playfair tracking-wide leading-tight">
                    &ldquo;{t('preview.founderQuote')}&rdquo;
                  </strong>
                  <div className="w-16 h-px bg-linear-to-r from-transparent via-emerald-500 to-transparent mx-auto mt-6" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
