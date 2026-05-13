"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import AboutSection from '@/components/home/AboutSection';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import PageHeader from '@/components/layout/PageHeader';

const VisionSection = dynamic(() => import('@/components/home/VisionSection'));
const LeadershipSection = dynamic(() => import('@/components/home/FoundingDirectors'));

export default function AboutPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        title="Hayat"
        highlightText="Life Care"
        subtitle="A Super-specialized Hospital and Diagnostic Center with First PET CT Scan in Chattogram."
        description="A 14-floor integrated medical and lifestyle complex at O.R. Nizam Road — built with zero bank loan, backed by proven hospital directors, and open to a limited number of owners."
      />

      <AboutSection isDarkMode={isDarkMode} />
      <VisionSection />
      <LeadershipSection isDarkMode={isDarkMode} />
      {/* <TimelineSection isDarkMode={isDarkMode} /> */}
    </PageWrapper>
  );
}
