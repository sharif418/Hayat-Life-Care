"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import ServicesSection from '@/components/home/ServicesSection';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

import PageHeader from '@/components/layout/PageHeader';

const FloorsSection = dynamic(() => import('@/components/home/FloorsSection'));
const DoctorsSection = dynamic(() => import('@/components/home/DoctorsSection'));
const GallerySection = dynamic(() => import('@/components/home/GallerySection'));
const HealthTipsSection = dynamic(() => import('@/components/home/HealthTipsSection'));
const VirtualTourSection = dynamic(() => import('@/components/home/VirtualTourSection'));

export default function FacilitiesPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        badge="A One Stop Service for Healthcare & Daily Essential"
        title="11 Business"
        highlightText="Wings"
        description="Explore our comprehensive healthcare and lifestyle services. Each wing operates independently as a profit centre — giving investors diversified income from a single ownership stake and centralized management."
        langKeyPrefix="pages.facilities"
      />
      <ServicesSection hideHeader isDarkMode={isDarkMode} />
      <FloorsSection isDarkMode={isDarkMode} />
      {/* <VirtualTourSection isDarkMode={isDarkMode} /> */}
      {/* <DoctorsSection isDarkMode={isDarkMode} /> */}
      <GallerySection isDarkMode={isDarkMode} />
      {/* <HealthTipsSection isDarkMode={isDarkMode} /> */}
    </PageWrapper>
  );
}
