"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import AboutSection from '@/components/home/AboutSection';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Stethoscope, ShoppingBag, Building2, MapPin, Car, Shield } from 'lucide-react';

import PageHeader from '@/components/layout/PageHeader';

const VisionSection = dynamic(() => import('@/components/home/VisionSection'));
const LeadershipSection = dynamic(() => import('@/components/home/LeadershipSection'));
const TimelineSection = dynamic(() => import('@/components/home/TimelineSection'));

const highlights = [
  { icon: Stethoscope, text: 'First Cancer Diagnostic and Specialized Hospital.' },
  { icon: ShoppingBag, text: 'A One-Stop Service for Healthcare & Daily Essentials.' },
  { icon: Building2, text: '55 Katha Complex with 11 Business Wings.' },
  { icon: MapPin, text: 'Prime Location- Adjacent to CMCH ( O.R.Nizam Road), Chattogram.' },
  { icon: Car, text: '150+ Paid Parking Spaces with Modern Facilities.' },
  { icon: Shield, text: 'Transparent Investment with Guaranteed Buyback Policy.' },
]

export default function AboutPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        badge="About Us"
        title="About"
        highlightText="Hayat Life Care"
        description="Building a healthier future for Chattogram through world-class medical facilities, everyday convenience, and uncompromising quality."
      />

      {/* ─── Key Highlights ─── */}
      <section className="relative -mt-10 z-10 pb-10" style={{ background: 'transparent' }}>
        <div className="max-w-5xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-slate-700 shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-slate-700">
              {/* Left Column */}
              <div className="p-6 md:p-8 space-y-0">
                {highlights.slice(0, 3).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 border-b border-gray-50 dark:border-slate-700/50 last:border-0 group"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}>
                      <item.icon className="size-5" style={{ color: '#0D9488' }} />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Right Column */}
              <div className="p-6 md:p-8 space-y-0">
                {highlights.slice(3, 6).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0 border-b border-gray-50 dark:border-slate-700/50 last:border-0 group"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}>
                      <item.icon className="size-5" style={{ color: '#0D9488' }} />
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-snug">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AboutSection isDarkMode={isDarkMode} />
      <VisionSection />
      <LeadershipSection isDarkMode={isDarkMode} />
      {/* <TimelineSection isDarkMode={isDarkMode} /> */}
    </PageWrapper>
  );
}
