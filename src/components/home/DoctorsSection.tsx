'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, Search, Clock, CalendarCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations'
import { doctorsData } from '@/data/home-data'
import { useAppointment } from '@/components/providers/AppointmentProvider'

interface DoctorsSectionProps {
  isDarkMode: boolean
}

export default function DoctorsSection({ isDarkMode }: DoctorsSectionProps) {
  const { openAppointmentDialog } = useAppointment()
  const [doctorSearch, setDoctorSearch] = useState('')
  const [doctorFilter, setDoctorFilter] = useState('All')

  const filteredDoctors = doctorsData
    .filter(d => doctorFilter === 'All' || d.specialty === doctorFilter)
    .filter(d => doctorSearch === '' || d.name.toLowerCase().includes(doctorSearch.toLowerCase()) || d.specialty.toLowerCase().includes(doctorSearch.toLowerCase()))

  return (
    <section id="doctors" className="py-20 md:py-28" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 40%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 40%, #FAFFFE 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Stethoscope className="size-3" />
              OUR SPECIALISTS
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Doctor Directory
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              Meet our team of expert physicians and specialists dedicated to your health.
            </p>
          </div>
        </FadeIn>

        {/* Search & Filter */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search doctors..."
                className="pl-10 h-12 rounded-xl border-gray-200"
                value={doctorSearch}
                onChange={e => setDoctorSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {['All', 'Cardiology', 'Oncology', 'Gynecology', 'General', 'Dental'].map(cat => (
                <Button
                  key={cat}
                  variant={doctorFilter === cat ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full px-4"
                  style={doctorFilter === cat ? { background: 'linear-gradient(135deg, #0D9488, #10B981)', color: 'white' } : {}}
                  onClick={() => setDoctorFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </FadeIn>

        <StaggerContainer key={doctorFilter + doctorSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <StaggerItem key={doc.name}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-md overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300"
              >
                <div className="h-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.06))' }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: 'rgba(13,148,136,0.06)' }} />
                  <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full translate-y-1/2 -translate-x-1/2" style={{ background: 'rgba(16,185,129,0.06)' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    >
                      {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-[10px] font-semibold text-white" style={{ background: '#D97706' }}>
                      {doc.floor}
                    </span>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{doc.name}</h3>
                  <Badge className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 text-xs font-semibold mb-2">{doc.specialty}</Badge>
                  {doc.designation && <p className="text-xs text-gray-500 mb-3">{doc.designation}</p>}
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 mb-4">
                    <Clock className="size-3" />
                    <span>{doc.schedule}</span>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full w-full text-white text-xs"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    onClick={() => openAppointmentDialog(doc.name)}
                  >
                    <CalendarCheck className="size-3.5 mr-1" />
                    Book Appointment
                  </Button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <Stethoscope className="size-12 mx-auto mb-3 opacity-30" />
            <p>No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
