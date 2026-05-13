"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import UniquenessSection from '@/components/home/UniquenessSection';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

import PageHeader from '@/components/layout/PageHeader';

const ComparisonSection = dynamic(() => import('@/components/home/ComparisonSection'));
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
        description="Discover what makes Hayat Life Care the most integrated, comprehensive health complex and truly one-of-a-kind in Chattogram."
        langKeyPrefix="pages.uniqueness"
      />
      <UniquenessSection isDarkMode={isDarkMode} hideHeader={true} />
      <ComparisonSection isDarkMode={isDarkMode} compactTop={true} />
      {/* <PartnersSection isDarkMode={isDarkMode} /> */}
    </PageWrapper>
  );
}
