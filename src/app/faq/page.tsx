"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import FAQSection from '@/components/home/FAQSection';
import { useTheme } from 'next-themes';

import PageHeader from '@/components/layout/PageHeader';

export default function FAQPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        badge="Help & Support"
        title="Common"
        highlightText="Questions"
        description="Find answers to frequently asked questions about our facilities, services, and investment opportunities."
      />
      <FAQSection isDarkMode={isDarkMode} />
    </PageWrapper>
  );
}
