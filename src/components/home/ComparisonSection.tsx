'use client'

import React from 'react'
import { Sparkles, Check, X } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'

interface ComparisonSectionProps {
  isDarkMode: boolean
}

export default function ComparisonSection({ isDarkMode }: ComparisonSectionProps) {
  return (
    <section id="comparison-table" className="py-20 md:py-28" style={{ background: isDarkMode ? '#0C1222' : '#FAFFFE' }}>
      <div className="max-w-5xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Sparkles className="size-3" />
              THE HAYAT DIFFERENCE
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              How We Compare
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              See what sets Hayat Life Care apart from traditional healthcare facilities
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
                    <tr key={i} className={i % 2 === 0 ? 'bg-teal-50/30' : 'bg-white'}>
                      <td className="px-6 py-3.5 font-medium text-gray-800 dark:text-gray-200">{row.feature}</td>
                      <td className="px-6 py-3.5 text-center">
                        <Check className="size-5 mx-auto text-green-500" />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <X className="size-5 mx-auto text-red-400" />
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
