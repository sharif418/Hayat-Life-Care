"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import AboutSection from '@/components/home/AboutSection';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

import PageHeader from '@/components/layout/PageHeader';

const VisionSection = dynamic(() => import('@/components/home/VisionSection'));
const LeadershipSection = dynamic(() => import('@/components/home/LeadershipSection'));
const TimelineSection = dynamic(() => import('@/components/home/TimelineSection'));

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
      <AboutSection isDarkMode={isDarkMode} />
      <VisionSection />
      <LeadershipSection isDarkMode={isDarkMode} />
      <TimelineSection isDarkMode={isDarkMode} />
    </PageWrapper>
  );
}
