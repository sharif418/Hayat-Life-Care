"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import InvestmentSection from '@/components/home/InvestmentSection';
import OwnersShowcase from '@/components/home/OwnersShowcase';
import VideoSection from '@/components/home/VideoSection';
import { useTheme } from 'next-themes';

import PageHeader from '@/components/layout/PageHeader';

export default function InvestmentPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        badge="Ownership Opportunities"
        title="Secure Your"
        highlightText="Future"
        description="Join us in revolutionizing healthcare and lifestyle in Chattogram with secure, halal, and high-yield investment options."
        langKeyPrefix="pages.investment"
      />
      <InvestmentSection isDarkMode={isDarkMode}>
        <VideoSection isDarkMode={isDarkMode} />
        <OwnersShowcase />
      </InvestmentSection>
    </PageWrapper>
  );
}
