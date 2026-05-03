'use client'

import React, { useState, useMemo } from 'react'
import { HelpCircle, Search, Building2, TrendingUp, FileCheck, Settings, Shield, Heart, Users, ChevronDown } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faqs, faqCategoryConfig } from '@/data/home-data'
import { useLanguage } from '@/i18n/LanguageProvider'

interface FAQSectionProps {
  isDarkMode: boolean
}

const categoryLabels: Record<string, { label: string; icon: any; description: string }> = {
  all: { label: 'All', icon: HelpCircle, description: 'Browse all questions' },
  general: { label: 'General', icon: Building2, description: 'About Hayat Life Care' },
  investment: { label: 'Investment', icon: TrendingUp, description: 'Returns & funding' },
  shares: { label: 'Shares', icon: FileCheck, description: 'Share structure & pricing' },
  operations: { label: 'Operations', icon: Settings, description: 'Plans & timelines' },
  legal: { label: 'Legal', icon: Shield, description: 'Documents & compliance' },
  leadership: { label: 'Leadership', icon: Users, description: 'Team & management' },
  medical: { label: 'Medical', icon: Heart, description: 'Healthcare services' },
}

function renderFaqAnswer(answer: string) {
  if (answer.includes(' | ')) {
    const parts = answer.split(' | ')
    return (
      <ul className="space-y-2.5 mt-1">
        {parts.map((part, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
            <span>{part.trim()}</span>
          </li>
        ))}
      </ul>
    )
  }
  return <p>{answer}</p>
}

export default function FAQSection({ isDarkMode }: FAQSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useLanguage()

  const catLabelMap: Record<string, string> = {
    all: t('faq.catAll'), general: t('faq.catGeneral'), investment: t('faq.catInvestment'),
    shares: t('faq.catShares'), operations: t('faq.catOperations'), legal: t('faq.catLegal'),
    leadership: t('faq.catLeadership'), medical: t('faq.catMedical'),
  }

  const filteredFaqs = useMemo(() => {
    let result = faqs
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(faq =>
        faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query)
      )
    }
    return result
  }, [searchQuery])

  // Get counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqs.length }
    faqs.forEach(faq => {
      counts[faq.category] = (counts[faq.category] || 0) + 1
    })
    return counts
  }, [])

  // Get unique categories that exist in FAQs
  const availableCategories = useMemo(() => {
    const cats = new Set(faqs.map(f => f.category))
    return ['all', ...Array.from(cats)]
  }, [])

  return (
    <section id="faq" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
      <div className="max-w-5xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <HelpCircle className="size-3" />
              {t('faq.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              {t('faq.title')}
            </h2>
            <div className="relative">
              <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            </div>
            <p className="mt-5 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm">
              {t('faq.description')}
            </p>
          </div>
        </FadeIn>

        {/* Search Bar */}
        <FadeIn delay={0.1}>
          <div className="relative max-w-xl mx-auto mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="size-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </FadeIn>



        {/* Results count */}
        {searchQuery && (
          <FadeIn>
            <div className="text-center mb-6">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing <strong className="text-teal-600 dark:text-teal-400">{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? 'question' : 'questions'}
                <> matching &quot;<strong className="text-teal-600 dark:text-teal-400">{searchQuery}</strong>&quot;</>
              </span>
            </div>
          </FadeIn>
        )}

        {/* FAQ Accordion */}
        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-3">
                {filteredFaqs.map((faq, i) => {
                  const cat = faqCategoryConfig[faq.category as keyof typeof faqCategoryConfig] || faqCategoryConfig.general
                  const CatIcon = cat.icon

                  return (
                    <AccordionItem
                      key={`faq-${i}`}
                      value={`faq-${i}`}
                      className="group/item bg-white dark:bg-slate-800 rounded-xl border dark:border-slate-700 shadow-sm px-6 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-slate-600"
                    >
                      <AccordionTrigger className="text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-teal-600 hover:no-underline py-5">
                        <span className="flex items-center gap-3">
                          <span
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-transform duration-300 group-hover/item:scale-110"
                            style={{ background: `${cat.color}12`, border: `1px solid ${cat.color}20` }}
                          >
                            <CatIcon className="size-3.5" style={{ color: cat.color }} />
                          </span>
                          <span className="flex flex-col items-start">
                            <span className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: cat.color }}>
                              {catLabelMap[faq.category] || faq.category}
                            </span>
                            <span className="text-sm">{faq.q}</span>
                          </span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed pb-5 pl-11">
                        {renderFaqAnswer(faq.a)}
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Search className="size-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('faq.noResults')}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {t('faq.tryDifferent')}
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  {t('faq.showAll')} →
                </button>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
