'use client'

import React from 'react'
import { Sparkles, Check, X } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'

interface ComparisonSectionProps {
  isDarkMode: boolean
}

export default function ComparisonSection({ isDarkMode }: ComparisonSectionProps) {
  const { t } = useLanguage()
  return (
    <section id="comparison-table" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
      <div className="max-w-5xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Sparkles className="size-3" />
              {t('comparison.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              {t('comparison.title')}
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              {t('comparison.description')}
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                    <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center text-white font-semibold">Hayat Life Care</th>
                    <th className="px-6 py-4 text-center text-white/80 font-semibold">Traditional Hospitals</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Healthcare + Daily Essentials', us: true, them: false },
                    { feature: '11 Business Wings Under One Roof', us: true, them: false },
                    { feature: 'No Bank Loan / Zero Debt', us: true, them: false },
                    { feature: 'Buyback Guarantee (+5%)', us: true, them: false },
                    { feature: 'Family Entertainment Zone', us: true, them: false },
                    { feature: 'AI-Powered Diagnostics', us: true, them: false },
                    { feature: 'Restaurant & Juice Bar On-Site', us: true, them: false },
                    { feature: 'Super Shop & Pharmacy', us: true, them: false },
                    { feature: "Kid's Amusement Park", us: true, them: false },
                    { feature: 'Transparent Profit Sharing', us: true, them: false },
                  ].map((row, i) => (
                    <tr key={i} className="group border-b border-gray-100 dark:border-slate-700/50 last:border-0 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all duration-300">
                      <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{row.feature}</td>
                      <td className="px-6 py-4 text-center bg-teal-50/40 dark:bg-teal-900/10 group-hover:bg-teal-100/40 dark:group-hover:bg-teal-900/30 transition-colors duration-300">
                        <div className="size-8 rounded-full bg-white dark:bg-teal-900/50 flex items-center justify-center mx-auto shadow-sm border border-teal-100 dark:border-teal-800/50">
                          <Check className="size-4 text-teal-600 dark:text-teal-400" strokeWidth={3} />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="size-8 rounded-full bg-gray-50 dark:bg-slate-800 flex items-center justify-center mx-auto border border-gray-100 dark:border-slate-700">
                          <X className="size-4 text-gray-400 dark:text-gray-500" strokeWidth={2} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
