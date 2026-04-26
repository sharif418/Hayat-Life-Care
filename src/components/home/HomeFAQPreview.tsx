'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'
import { faqs } from '@/data/home-data'

interface HomeFAQPreviewProps {
  isDarkMode: boolean
}

// Pick the most useful FAQs for homepage
const previewFaqs = [
  faqs[0],  // What is Hayat Life Care?
  faqs[2],  // What is the land area and structure?
  faqs[3],  // Why invest in Hayat Life Care?
  faqs[14], // Maximum shares?
]

export default function HomeFAQPreview({ isDarkMode }: HomeFAQPreviewProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222, #111B2E)' : 'linear-gradient(180deg, #FAFFFE, #F0FDFA)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <HelpCircle className="size-3" />
              FREQUENTLY ASKED
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Quick Answers
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Common questions about Hayat Life Care — investment, facilities, and more.
            </p>
          </div>
        </FadeIn>

        {/* FAQ Accordion */}
        <FadeIn delay={0.1}>
          <div className="space-y-3">
            {previewFaqs.map((faq, i) => {
              if (!faq) return null
              const isOpen = openIndex === i

              return (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white dark:bg-slate-800 border-teal-200 dark:border-teal-800 shadow-lg'
                      : 'bg-white dark:bg-slate-800/50 border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: isOpen ? 'linear-gradient(135deg, #0D9488, #10B981)' : 'rgba(13,148,136,0.1)' }}
                      >
                        <span className={`text-xs font-bold ${isOpen ? 'text-white' : 'text-teal-600'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className={`text-sm md:text-base font-semibold transition-colors ${
                        isOpen ? 'text-teal-700 dark:text-teal-400' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {faq.q}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`size-5 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-600' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="pl-11 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.a}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </FadeIn>

        {/* View All Link */}
        <FadeIn delay={0.25}>
          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
              style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
            >
              View All {faqs.length} FAQs
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
