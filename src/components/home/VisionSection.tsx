'use client'

import React from 'react'
import { Sparkles, Shield, Check } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'

export default function VisionSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-white/10" />
      <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-white/10" />

      <div className="relative max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
              Vision & Mission
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-white/50" />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <FadeIn direction="right">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Sparkles className="size-6" /> Our Vision
              </h3>
              <p className="text-white/90 leading-relaxed text-sm">
                To redefine healthcare as a fully integrated, people-focused ecosystem where patients and families can access expert medical care, international-standard diagnostics, and specialized hospital treatment alongside daily essentials and wellness services—all under one roof.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Shield className="size-6" /> Our Mission
              </h3>
              <p className="text-white/90 leading-relaxed text-sm">
                To design a space and offer services where patients and families can access expert medical care, international-standard diagnostics, specialized hospital treatment, and daily essentials under one roof. Through a holistic approach, we are committed to transforming waiting time during doctor visits into quality family time, while ensuring a seamless, comfortable, and dignified international experience for all, including a dedicated female diagnostic facility.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Message from Founder Directors */}
        <FadeIn>
          <div className="mt-14 max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
              Message From Founder Directors
            </h3>
            <div className="space-y-4 text-white/85 text-sm leading-relaxed">
              <p>
                At Hayat, we believe healthcare should be more than just treatment — it should be a complete experience of care, convenience, and compassion. This belief drives everything we do.
              </p>
              <p>
                We envisioned a space where a patient&apos;s visit doesn&apos;t just mean medical tests and prescriptions. It means a place where their family can enjoy quality time, where daily needs are met without stepping out, and where every service — from diagnostics to dining — is designed with dignity and comfort in mind.
              </p>
              <p>
                Hayat Life Care isn&apos;t just our project — it&apos;s our promise. A promise to deliver international-standard healthcare, create sustainable investment opportunities, and serve the people of Chattogram with purpose and integrity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <p className="text-white font-semibold text-sm">Capt. Md Showkat Hossain Chowdhury</p>
              <p className="text-white/60 text-xs">Chairman, Hayat Life Care Ltd.</p>
              <p className="text-white font-semibold text-sm mt-2">Dr. Mohammad Azizul Haque</p>
              <p className="text-white/60 text-xs">Managing Director, Hayat Life Care Ltd.</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-10 text-center">
            <blockquote className="text-xl md:text-2xl text-white font-light italic leading-relaxed max-w-3xl mx-auto">
              &ldquo;This isn&apos;t just a health facility — it&apos;s a lifestyle destination. Built with
              purpose, driven by innovation and guided by heart —{' '}
              <span className="font-semibold">&lsquo;To Save and Serve The Generation.&rsquo;</span>&rdquo;
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
