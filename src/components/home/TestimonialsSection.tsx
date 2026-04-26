'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'

interface TestimonialsSectionProps {
  isDarkMode: boolean
}

export default function TestimonialsSection({ isDarkMode }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 40%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 40%, #FAFFFE 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Star className="size-3" />
              TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              What People Say
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: 'Ahmed Rahman',
              role: 'Business Owner, Chattogram',
              text: 'Hayat Life Care is exactly what Chattogram needed. Having all healthcare services under one roof with daily essentials is a game-changer for busy families like mine.',
              initials: 'AR',
            },
            {
              name: 'Dr. Fatima Begum',
              role: 'Senior Consultant, CMCH',
              text: 'As a medical professional, I appreciate the vision behind this project. The combination of advanced diagnostics with lifestyle facilities will transform patient experience in our city.',
              initials: 'FB',
            },
            {
              name: 'Mohammad Karim',
              role: 'Investor & Shareholder',
              text: 'The transparent operations, no-bank-loan policy, and buyback guarantee gave me the confidence to invest. This project has real potential for sustainable returns.',
              initials: 'MK',
            },
          ].map((testimonial, i) => (
            <StaggerItem key={i}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-md p-6 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 italic relative pl-6">
                  <span className="absolute left-0 top-0 text-3xl leading-none" style={{ color: '#0D9488', opacity: 0.3 }}>&ldquo;</span>
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
