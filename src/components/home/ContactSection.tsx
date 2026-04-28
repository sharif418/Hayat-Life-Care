'use client'

import React, { useState } from 'react'
import { Mail, Clock, PhoneCall, MapPinned, Building, Building2, CalendarCheck, Send, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FadeIn } from '@/components/ui/animations'
import { toast } from 'sonner'

interface ContactSectionProps {
  isDarkMode: boolean
  onBookAppointment: () => void
}

export default function ContactSection({ isDarkMode, onBookAppointment }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  return (
    <section id="contact" className="py-20 md:py-28 pb-8" style={{ background: isDarkMode ? 'linear-gradient(180deg, #0C1222 0%, #111B2E 50%, #0C1222 100%)' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-4">
              <Mail className="size-3" />
              CONTACT US
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
              Get In Touch
            </h2>
            <div className="relative">
              <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <FadeIn direction="right">
            <div className="bg-linear-to-b from-white to-teal-50/30 rounded-2xl border shadow-lg overflow-hidden" style={{ borderTop: '3px solid', borderImage: 'linear-gradient(90deg, #0D9488, #10B981) 1' }}>
              <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Send Us a Message</h3>
              <p className="text-sm text-gray-500 mb-6 flex items-center gap-1"><Clock className="size-3" /> We typically respond within 24 hours</p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  if (isFormSubmitting) return
                  setIsFormSubmitting(true)
                  try {
                    const res = await fetch('/api/inquiries', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        subject: formData.subject,
                        message: formData.message,
                      }),
                    })
                    if (res.ok) {
                      toast.success('Message sent successfully! We will get back to you shortly.')
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
                    } else {
                      toast.error('Failed to send message. Please try again.')
                    }
                  } catch {
                    toast.error('Network error. Please try again later.')
                  } finally {
                    setIsFormSubmitting(false)
                  }
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Name
                    </label>
                    <Input placeholder="Your full name" required value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Email
                    </label>
                    <Input type="email" placeholder="you@example.com" required value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Phone
                    </label>
                    <Input type="tel" placeholder="+880 1XXX-XXXXXX" value={formData.phone} onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))} className="focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Subject
                    </label>
                    <Select value={formData.subject} onValueChange={(v) => setFormData(p => ({ ...p, subject: v }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Investment Inquiry">Investment Inquiry</SelectItem>
                        <SelectItem value="Appointment Booking">Appointment Booking</SelectItem>
                        <SelectItem value="General Information">General Information</SelectItem>
                        <SelectItem value="Partnership Opportunity">Partnership Opportunity</SelectItem>
                        <SelectItem value="Feedback">Feedback</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your inquiry..."
                    className="min-h-[120px] focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isFormSubmitting}
                  className="w-full rounded-xl text-white font-semibold"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                >
                  {isFormSubmitting ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Send className="size-4 mr-2" />}
                  {isFormSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <Clock className="size-3" /> We&apos;ll respond within 24 hours
                </p>
              </form>
              </div>
            </div>
          </FadeIn>

          {/* Contact info + map */}
          <FadeIn direction="left">
            <div className="space-y-5">
              {/* Contact cards */}
              {[
                {
                  icon: PhoneCall,
                  title: 'Phone',
                  details: [{ text: '01335-074940' }, { text: '01335-074941' }],
                  color: '#0D9488',
                },
                {
                  icon: MapPinned,
                  title: 'Office',
                  details: [
                    { text: 'Probortok Circle Mishmak Manjuri,', href: 'https://maps.app.goo.gl/SC7xcBp4kXEyqByw8' },
                    { text: 'Badshah Miah Road, Ameerbag, Chattogram', href: 'https://maps.app.goo.gl/SC7xcBp4kXEyqByw8' }
                  ],
                  color: '#10B981',
                },
                {
                  icon: Building,
                  title: 'Project Site',
                  details: [
                    { text: 'Manashi, O.R. Nizam Road, Chattogram', href: 'https://maps.app.goo.gl/hw3GhvmdACjjoWua7' }
                  ],
                  color: '#D97706',
                },
                {
                  icon: Building2,
                  title: 'Sister Concern',
                  details: [{ text: 'Hayat Holdings' }],
                  color: '#0D9488',
                },
                {
                  icon: Mail,
                  title: 'Email',
                  details: [{ text: 'info@hayatlifecare.com' }],
                  color: '#10B981',
                },
                {
                  icon: Clock,
                  title: 'Operating Hours',
                  details: [{ text: 'Sat–Thu: 9:00 AM – 9:00 PM' }, { text: 'Friday: Closed' }, { text: 'Emergency: 24/7' }],
                  color: '#0D9488',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 shadow-sm border-l-4" style={{ borderLeftColor: item.color }}>
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <item.icon className="size-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
                    {item.details.map((d, j) => (
                      <div key={j} className="text-sm text-gray-600 dark:text-gray-400">
                        {item.title === 'Phone' ? (
                          <a href={`https://wa.me/880${d.text.replace(/-/g, '').replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors flex items-center gap-1.5">
                            {d.text} <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">WhatsApp</span>
                          </a>
                        ) : item.title === 'Email' ? (
                          <a href={`mailto:${d.text}`} className="hover:text-teal-600 transition-colors">{d.text}</a>
                        ) : d.href ? (
                          <a href={d.href} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors underline decoration-dotted underline-offset-2">
                            {d.text}
                          </a>
                        ) : d.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quick appointment button */}
              <Button
                className="w-full rounded-xl text-white font-semibold h-12"
                style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                onClick={onBookAppointment}
              >
                <CalendarCheck className="size-5 mr-2" />
                Book an Appointment
              </Button>

              {/* Maps Section */}
              <div className="rounded-2xl overflow-hidden border shadow-sm bg-white dark:bg-slate-800 p-2">
                <div className="flex gap-2 mb-2">
                  <a 
                    href="https://maps.app.goo.gl/SC7xcBp4kXEyqByw8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium border border-teal-200 bg-teal-50 text-teal-800 hover:bg-teal-100 hover:text-teal-900 transition-colors dark:bg-teal-900/30 dark:border-teal-800 dark:text-teal-200 dark:hover:bg-teal-900/50"
                  >
                    <MapPinned className="size-4" /> View Office Map
                  </a>
                  <a 
                    href="https://maps.app.goo.gl/hw3GhvmdACjjoWua7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-xl text-sm font-medium border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 hover:text-amber-900 transition-colors dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-200 dark:hover:bg-amber-900/50"
                  >
                    <Building className="size-4" /> View Site Map
                  </a>
                </div>
                <div className="h-64 rounded-xl overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=22.3574657,91.8273716&z=16&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hayat Life Care Office Location"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
