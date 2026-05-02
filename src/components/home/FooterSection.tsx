'use client'

import React, { useState } from 'react'
import { ChevronUp, Send, Loader2, Phone, Mail, MapPin, Clock, Building2, Facebook, Youtube, Instagram, Linkedin, Github } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { navLinks } from '@/data/home-data'

export default function FooterSection() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)

  const handleSubscribe = async () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) return
    setIsNewsletterSubmitting(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      if (res.ok) {
        toast.success('Thank you for subscribing!')
        setNewsletterEmail('')
      } else if (res.status === 409) {
        toast.info('You are already subscribed!')
      } else {
        toast.error('Failed to subscribe. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again later.')
    } finally {
      setIsNewsletterSubmitting(false)
    }
  }

  return (
    <>

      <footer className="relative overflow-hidden" style={{ background: '#0F172A' }}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0D9488 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, rgba(13,148,136,0.08) 0%, transparent 60%)' }} />
        <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981, #D97706)' }} />
        {/* Back to Top indicator */}
        <div className="relative">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform z-10 border border-white/20"
            style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
            aria-label="Back to Top"
          >
            <ChevronUp className="size-5" />
          </button>
        </div>
        {/* Newsletter section */}
        <div className="relative border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-white mb-2">Stay Updated with Hayat Life Care</h4>
                <p className="text-sm text-gray-400">Get the latest news, investment updates, and health tips delivered to your inbox.</p>
              </div>
              <div className="flex w-full md:w-auto gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/15 text-white placeholder:text-gray-400 h-12 rounded-xl md:w-72"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && newsletterEmail) {
                      await handleSubscribe()
                    }
                  }}
                />
                <Button
                  className="rounded-xl h-12 px-6 text-white font-semibold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  disabled={isNewsletterSubmitting || !newsletterEmail}
                  onClick={handleSubscribe}
                >
                  {isNewsletterSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Logo & description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/images/logo.svg"
                  alt="Hayat Life Care"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                A premium healthcare &amp; lifestyle complex — a one-stop destination for world-class
                medical services, daily essentials, dining, and family entertainment.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/hayatlifecareltd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="Facebook">
                  <Facebook className="size-4 text-gray-500 group-hover:text-teal-400" />
                </a>
                <a href="https://www.youtube.com/@hayatLifecareltd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="YouTube">
                  <Youtube className="size-4 text-gray-500 group-hover:text-teal-400" />
                </a>
                <a href="https://www.instagram.com/hayatlifecareltd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="Instagram">
                  <Instagram className="size-4 text-gray-500 group-hover:text-teal-400" />
                </a>
                <a href="https://www.linkedin.com/company/hayat-life-care/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="LinkedIn">
                  <Linkedin className="size-4 text-gray-500 group-hover:text-teal-400" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.slice(0, 6).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <ChevronUp className="size-3" /> Back to Top
                </button>
              </div>
            </div>

            {/* Medical Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Medical Services</h4>
              <div className="space-y-2">
                {[
                  { name: 'Specialized Hospital', href: '/facilities' },
                  { name: 'Diagnostic Center', href: '/facilities' },
                  { name: "Doctor's Chambers", href: '/facilities' },
                  { name: 'Pharmacy', href: '/facilities' },
                  { name: 'Optical Shop', href: '/facilities' },
                ].map((svc, i) => (
                  <a
                    key={i}
                    href={svc.href}
                    className="block text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 hover:pl-1 transition-all duration-200"
                  >
                    {svc.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Lifestyle & Amenities */}
            <div>
              <h4 className="text-white font-semibold mb-4">Lifestyle & Amenities</h4>
              <div className="space-y-2">
                {[
                  { name: 'Super Shop', href: '/facilities' },
                  { name: 'Restaurant & Cafe', href: '/facilities' },
                  { name: "Kid's Amusement Park", href: '/facilities' },
                  { name: 'ATM Booth', href: '/facilities' },
                  { name: 'Paid Parking', href: '/facilities' },
                ].map((svc, i) => (
                  <a
                    key={i}
                    href={svc.href}
                    className="block text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 hover:pl-1 transition-all duration-200"
                  >
                    {svc.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <Phone className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>
                    <a href="https://wa.me/8801335074940" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors">01335-074940</a>
                    <br/>
                    <a href="https://wa.me/8801335074941" target="_blank" rel="noopener noreferrer" className="hover:text-teal-300 transition-colors">01335-074941</a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>info@hayatlifecare.com</div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>
                    Mishmak Manjuri, Badshah Miah Road, Ameerbag, Chattogram
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>Open All Day</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 pt-5 pb-8 lg:pb-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-2 font-medium">&copy; {new Date().getFullYear()} Hayat Life Care. All Rights Reserved. <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-teal-400 hover:text-teal-300 transition-colors">&uarr; Back to Top</button></div>
            <div className="flex items-center gap-4 lg:mr-12 xl:mr-16">
              <span className="tracking-wider text-gray-500" title="System Version">
                Build v1.0.0
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
