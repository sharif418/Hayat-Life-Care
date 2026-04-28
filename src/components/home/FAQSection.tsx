'use client'

import React from 'react'
import { HelpCircle } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqs, faqCategoryConfig } from '@/data/home-data'

interface FAQSectionProps {
  isDarkMode: boolean
}

export default function FAQSection({ isDarkMode }: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
      <div className="max-w-3xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <HelpCircle className="size-3" />
              GOT QUESTIONS?
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <div className="relative">
              <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 shadow-sm px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-teal-600 hover:no-underline py-5">
                  <span className="flex items-center gap-2">
                    {(() => {
                      const cat = faqCategoryConfig[faq.category as keyof typeof faqCategoryConfig] || faqCategoryConfig.general
                      const CatIcon = cat.icon
                      return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0" style={{ background: `${cat.color}15` }}><CatIcon className="size-3" style={{ color: cat.color }} /></span>
                    })()}
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  )
}
