'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Heart, Shield, Sparkles, Baby, Microscope, Users, BookOpen, ArrowRight } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'

interface HealthTipsSectionProps {
  isDarkMode: boolean
}

export default function HealthTipsSection({ isDarkMode }: HealthTipsSectionProps) {
  return (
    <section id="health-tips" className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Lightbulb className="size-3" />
              HEALTH & WELLNESS
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Health Tips & Insights
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Stay informed with expert health advice and wellness guidance from our medical team.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Heart,
              category: 'Cardiology',
              title: '5 Habits for a Healthy Heart',
              excerpt: 'Simple lifestyle changes that can significantly reduce your risk of heart disease. From diet modifications to daily exercise routines recommended by our cardiologists.',
              color: '#EF4444',
            },
            {
              icon: Shield,
              category: 'Preventive Care',
              title: 'Why Annual Health Checkups Matter',
              excerpt: 'Regular health screenings can detect potential issues early when they are most treatable. Learn which tests you should prioritize based on your age and family history.',
              color: '#0D9488',
            },
            {
              icon: Sparkles,
              category: 'Wellness',
              title: 'Managing Stress in Daily Life',
              excerpt: 'Chronic stress affects both mental and physical health. Discover evidence-based techniques from our specialists for maintaining balance and well-being.',
              color: '#D97706',
            },
            {
              icon: Baby,
              category: 'Pediatrics',
              title: 'Childhood Nutrition Essentials',
              excerpt: 'Proper nutrition during childhood sets the foundation for lifelong health. Our pediatricians share guidelines for balanced meals and healthy eating habits.',
              color: '#8B5CF6',
            },
            {
              icon: Microscope,
              category: 'Diagnostics',
              title: 'Understanding Your Lab Results',
              excerpt: 'Lab reports can be confusing. Our diagnostic experts break down the key numbers and what they mean for your health in simple, understandable terms.',
              color: '#06B6D4',
            },
            {
              icon: Users,
              category: 'Family Health',
              title: 'Creating a Family Health Plan',
              excerpt: 'A proactive approach to family wellness involves regular checkups, emergency preparedness, and open communication about health concerns across generations.',
              color: '#10B981',
            },
          ].map((tip, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all duration-300"
              >
                <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${tip.color}, ${tip.color}88)` }} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-xl"
                      style={{ background: `${tip.color}15` }}
                    >
                      <tip.icon className="size-5" style={{ color: tip.color }} />
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: `${tip.color}10`, color: tip.color }}>
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {tip.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: tip.color }}>
                    <BookOpen className="size-4" />
                    Read More
                    <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
