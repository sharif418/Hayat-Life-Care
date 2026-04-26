"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import InvestmentSection from '@/components/home/InvestmentSection';
import { useTheme } from 'next-themes';

import PageHeader from '@/components/layout/PageHeader';

export default function InvestmentPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        badge="Investment Opportunities"
        title="Secure Your"
        highlightText="Future"
        description="Join us in revolutionizing healthcare and lifestyle in Chattogram with secure, halal, and high-yield investment options."
      />
      <InvestmentSection isDarkMode={isDarkMode} />
    </PageWrapper>
  );
}
