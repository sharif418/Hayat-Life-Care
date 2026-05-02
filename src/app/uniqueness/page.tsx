"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import UniquenessSection from '@/components/home/UniquenessSection';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

import PageHeader from '@/components/layout/PageHeader';

const ComparisonSection = dynamic(() => import('@/components/home/ComparisonSection'));
const TrustSection = dynamic(() => import('@/components/home/TrustSection'));
const PartnersSection = dynamic(() => import('@/components/home/PartnersSection'));
const WhyPartnerSection = dynamic(() => import('@/components/home/WhyPartnerSection'));

export default function UniquenessPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        badge="Why Choose Us"
        title="Our"
        highlightText="Uniqueness"
        description="Discover what makes Hayat Life Care the most integrated, zero-interest, and comprehensive health complex in Chattogram."
      />
      <WhyPartnerSection isDarkMode={isDarkMode} />
      <UniquenessSection isDarkMode={isDarkMode} />
      <ComparisonSection isDarkMode={isDarkMode} />
      <TrustSection isDarkMode={isDarkMode} />
      {/* <PartnersSection isDarkMode={isDarkMode} /> */}
    </PageWrapper>
  );
}
