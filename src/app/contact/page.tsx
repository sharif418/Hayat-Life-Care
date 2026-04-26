"use client"

import React from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import ContactSection from '@/components/home/ContactSection';
import { useAppointment } from '@/components/providers/AppointmentProvider';
import { useTheme } from 'next-themes';

import PageHeader from '@/components/layout/PageHeader';

export default function ContactPage() {
  const { openAppointmentDialog } = useAppointment();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <PageWrapper>
      <PageHeader 
        badge="Get In Touch"
        title="Contact"
        highlightText="Us"
        description="Reach out to us for any inquiries, appointments, or emergency support. Our dedicated team is ready to assist you 24/7."
      />
      <ContactSection onBookAppointment={openAppointmentDialog} isDarkMode={isDarkMode} />
    </PageWrapper>
  );
}
