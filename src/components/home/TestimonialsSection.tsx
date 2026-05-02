'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'

interface Testimonial {
  id: string
  name: string
  designation: string
  text: string
  photo: string | null
  rating: number
  order: number
}

interface TestimonialsSectionProps {
  isDarkMode: boolean
}

export default function TestimonialsSection({ isDarkMode }: TestimonialsSectionProps) {
  const { t } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        if (data.data && data.data.length > 0) {
          setTestimonials(data.data)
        }
      })
      .catch(err => console.error('Failed to fetch testimonials:', err))
      .finally(() => setLoading(false))
  }, [])

  // Generate initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  if (loading) {
    return (
      <section id="testimonials" className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 40%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 40%, #FAFFFE 100%)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 40%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 40%, #FAFFFE 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Star className="size-3" />
              {t('testimonials.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              {t('testimonials.title')}
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-md p-6 h-full flex flex-col">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`size-4 ${j < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1 italic relative pl-6">
                  <span className="absolute left-0 top-0 text-3xl leading-none" style={{ color: '#0D9488', opacity: 0.3 }}>&ldquo;</span>
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                  {testimonial.photo ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-teal-100 dark:border-teal-800">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold text-white shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    >
                      {getInitials(testimonial.name)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.designation}</div>
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
