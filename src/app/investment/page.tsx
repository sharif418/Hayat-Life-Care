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
        badge="Ownership Opportunity"
        title="Pathways to"
        highlightText="Prestigious Ownership"
        description="More Than an Investment — A Legacy of Lasting Value. Ownership includes all 11 business wings with proportionate full land ownership. Share price: ৳10 Lacs per share (first phase)."
        langKeyPrefix="pages.investment"
      />
      <InvestmentSection isDarkMode={isDarkMode} />
    </PageWrapper>
  );
}
