"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import VideoSection from '@/components/home/VideoSection';
import ShareholdersGallery from '@/components/home/ShareholdersGallery';
import EventsShowcase from '@/components/home/EventsShowcase';
import { useTheme } from 'next-themes';
import PageHeader from '@/components/layout/PageHeader';

export default function GalleryPage() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader
        badge="Gallery"
        title="Explore Our"
        highlightText="Visual Journey"
        description="Watch our videos, meet our esteemed shareholders, and relive the memorable events that define Hayat Life Care."
        langKeyPrefix="pages.gallery"
      />
      <div id="youtube">
        <VideoSection isDarkMode={isDarkMode} hideHeader={true} />
      </div>
      <div id="shareholders">
        <ShareholdersGallery />
      </div>
      <EventsShowcase />
    </PageWrapper>
  );
}
