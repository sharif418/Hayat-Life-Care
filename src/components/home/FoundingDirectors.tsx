'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, ChevronDown, X, ExternalLink, Users } from 'lucide-react'
import { FadeIn } from '@/components/ui/animations'
import { useLanguage } from '@/i18n/LanguageProvider'

// ── Director Data ──────────────────────────────────────────────────
interface Director {
  id: string
  name: string
  designation: string
  shortTitle: string
  photo: string
  briefBio: string
  fullBio: string[]
  hayatRole: string
}

const DIRECTORS: Director[] = [
  // ── Top Leadership (Chairman + MD) ──
  {
    id: 'chairman',
    name: 'Capt. Md Showkat Hossain Chowdhury',
    designation: 'Chairman',
    shortTitle: 'Visionary Leader & Maritime Expert',
    photo: '/images/directors/chairman.jpg',
    briefBio: 'A distinguished leader with decades of experience in strategic leadership, organizational development, and institutional governance across maritime and corporate sectors.',
    fullBio: [
      'Capt. Md Showkat Hossain Chowdhury is a distinguished leader with decades of experience in strategic leadership, organizational development, and institutional governance. His visionary approach and commitment to excellence have been instrumental in shaping the direction of multiple organizations.',
      'With a strong background in the maritime industry and corporate leadership, he brings a unique blend of discipline, strategic thinking, and operational expertise to every initiative he leads.',
    ],
    hayatRole: 'As the Chairman of Hayat Life Care, Capt. Showkat Hossain Chowdhury provides the overarching vision and strategic direction for the organization, guiding it toward becoming a premier healthcare destination in Chattogram and beyond.',
  },
  {
    id: 'md',
    name: 'Dr. Mohammad Azizul Haque',
    designation: 'Managing Director',
    shortTitle: 'Healthcare Visionary & Medical Professional',
    photo: '/images/directors/md-sir.jpg',
    briefBio: 'A renowned medical professional and healthcare entrepreneur with extensive experience in hospital management, clinical excellence, and healthcare innovation.',
    fullBio: [
      'Dr. Mohammad Azizul Haque is a renowned medical professional and healthcare entrepreneur with extensive experience in hospital management, clinical excellence, and healthcare innovation. His deep understanding of the healthcare landscape in Bangladesh has been pivotal in shaping modern healthcare delivery systems.',
      'With a passion for accessible and quality healthcare, Dr. Haque has dedicated his career to building institutions that prioritize patient care, medical excellence, and community well-being.',
    ],
    hayatRole: 'As the Managing Director of Hayat Life Care, Dr. Haque leads the operational and strategic execution of the organization\'s mission to deliver world-class, patient-centered healthcare services to the people of Chattogram.',
  },
  // ── Founding Directors (First 4 visible) ──
  {
    id: 'shishir',
    name: 'Md. Helal Uddin Kawsar (Shishir)',
    designation: 'Founding Director & Chief Operating Officer (COO)',
    shortTitle: 'Hospital Management Professional & Consultant',
    photo: '/images/directors/shishir.jpg',
    briefBio: 'Seasoned Hospital Management Professional & Consultant with MBA in Marketing and MPH in Health Policy & Administration, with over 11 years of healthcare experience.',
    fullBio: [
      'Md. Helal Uddin Kawsar (Shishir) is a seasoned Hospital Management Professional & Consultant, holding an MBA in Marketing and an MPH in Health Policy & Administration, with over 11 years of experience in healthcare administration, hospital operations, HR & administration, strategic planning, and business development.',
      'He has held senior leadership roles in reputed healthcare institutions including Bangladesh Eye Hospital, Khidmah Hospital Ltd., Hikmah Eye Hospital Ltd., Al-Manar Hospital Ltd., and Bangladesh Specialized Hospital.',
      'He later transitioned into entrepreneurship and became the Founding Managing Director of EyeReach Eye Hospital Limited. He specializes in strategic planning, operational management, compliance, team leadership, and institutional capacity building.',
    ],
    hayatRole: 'As the Founding Director of Hayat Life Care, Mr. Kawsar is committed to utilizing his vast experience to develop a modern, patient-centered, and sustainable healthcare system in Bangladesh, driven by innovation and excellence.',
  },
  {
    id: 'liton',
    name: 'Ashekunnabi Mahmudur Rahman Mazumder (Liton)',
    designation: 'Founding Director & Director of International Affairs',
    shortTitle: 'Healthcare Entrepreneur & CEO, Orbit Eye Hospital',
    photo: '/images/directors/liton.jpg',
    briefBio: 'Distinguished healthcare entrepreneur, corporate leader, and business strategist. MD & CEO of Orbit Eye Hospital Ltd. and Founder & CEO of World Class Air Ambulance.',
    fullBio: [
      'Ashekunnabi Mahmudur Rahman Mazumder (Liton) is a distinguished healthcare entrepreneur, corporate leader, and business strategist with diversified experience across healthcare, banking, retail, media, and medical services. He currently serves as the Managing Director & CEO of Orbit Eye Hospital Ltd. and the Founder & CEO of World Class Air Ambulance.',
      'He is also the Owner & CEO of EXPERIAN, a trading and supply company specializing in medical and general goods for both government and private sectors. In addition, he is serving as the Vice President of Bangladesh Medical Tourism Association.',
      'Earlier in his career, he held managerial positions at a multinational bank and served as the Founding General Manager of a national daily newspaper. He also manages franchise operations of renowned retail chains including Shwapno and Lazz Pharma.',
      'With nearly a decade of successful business leadership experience, Mr. Liton has established a strong reputation for operational excellence, strategic growth, and service-oriented management.',
    ],
    hayatRole: 'As the Founding Director of Hayat Life Care, Mr. Liton is committed to contributing his diversified business experience and strategic leadership toward developing a modern, sustainable, and patient-centered healthcare platform in Bangladesh.',
  },
  {
    id: 'capt-atique',
    name: 'Capt. Atique UA Khan',
    designation: 'Founding Director & Marketing Advisor',
    shortTitle: 'Master Mariner, Writer & Social Activist',
    photo: '/images/directors/capt-atique.jpg',
    briefBio: 'Highly experienced Master Mariner, writer, columnist, and social activist with strong expertise in leadership, strategic planning, and risk management.',
    fullBio: [
      'Capt. Atique UA Khan is a highly experienced Master Mariner, writer, columnist, and social activist with strong expertise in leadership, strategic planning, and risk management gained through his distinguished maritime career. He also contributes to organizational development and strategic direction across various institutions.',
      'He serves as an Adviser to several organizations, including the Bangladesh Kindergarten Association, Durbar Bangladesh Foundation, and Shikkha Foundation. He is also the Founding Chairman of Angeekar Bangladesh Charity Foundation, reflecting his strong commitment to social development and humanitarian initiatives.',
    ],
    hayatRole: 'With his extensive leadership experience and dedication to community service, Capt. Khan is expected to play a valuable role in guiding the strategic growth and vision of Hayat Life Care, supporting its mission to enhance quality healthcare services for the people of Chattogram.',
  },
  {
    id: 'bakkar',
    name: 'Md Abu Bakkar Siddiki',
    designation: 'Founding Director & DMD',
    shortTitle: 'Member, Chamber of Commerce Chattogram',
    photo: '/images/directors/bakkar.jpg',
    briefBio: 'Dedicated professional and dynamic entrepreneur with extensive business experience, particularly in the automobile industry. Strong analytical thinking from Mathematics background.',
    fullBio: [
      'Md. Abu Bakkar Siddiki is a dedicated professional and dynamic entrepreneur with extensive business experience, particularly in the automobile industry. With a strong entrepreneurial mindset and practical expertise in both local and international markets, he has successfully developed and managed diversified business ventures.',
      'Academically, he studied Mathematics and completed his Master\'s degree, which has strengthened his analytical thinking and problem-solving abilities in business and organizational management.',
    ],
    hayatRole: 'As a key member of Hayat Life Care, he brings business insight, operational experience, and a progressive vision toward building a modern, efficient, and service-oriented healthcare platform in Bangladesh.',
  },
  // ── Hidden behind "More Directors" ──
  {
    id: 'sayed-noor',
    name: 'Mir Mohammad Sayed Noor',
    designation: 'Founding Director & Finance Director',
    shortTitle: 'Banker, Entrepreneur & Chief Editor, NCC Bangla',
    photo: '/images/directors/sayed-noor.jpg',
    briefBio: 'Experienced banker and entrepreneur, retired as Senior AVP and Branch Head. Chief Editor of NCC Bangla with strong connections in salt and shrimp industries.',
    fullBio: [
      'Mir Mohammad Sayed Noor is an experienced banker and entrepreneur, who retired as Senior Assistant Vice President and Branch Head after a successful career in the banking sector. He is actively involved in various organizations and maintains strong connections within the salt and shrimp industries.',
      'He also serves as the Chief Editor of NCC Bangla.',
    ],
    hayatRole: 'With his extensive experience in banking, business, and organizational leadership, he brings valuable insight into financial management and institutional development. As a member of Hayat Life Care, he is expected to contribute to the organization\'s strategic growth and vision.',
  },
  {
    id: 'dr-naser',
    name: 'Dr. Md Abu Naser',
    designation: 'Founding Director & Vice Chairman',
    shortTitle: 'Surgeon & Founding MD, National Hospital Chattogram',
    photo: '/images/directors/dr-naser.jpg',
    briefBio: 'Renowned surgeon, healthcare entrepreneur, and medical leader. Founding Managing Director of National Hospital Chattogram and Sigma Lab Ltd., established in 1998.',
    fullBio: [
      'Dr. Abu Naser is a renowned surgeon, healthcare entrepreneur, and medical leader, and the Founding Managing Director of National Hospital Chattogram and Sigma Lab Ltd., established in 1998. He is currently serving as Executive Director and has played a pioneering role in the development of super-specialized healthcare services in Chattogram.',
      'He has also contributed to the Bangladesh Medical Association at various leadership levels.',
    ],
    hayatRole: 'As the Vice Chairman of Hayat Life Care, Dr. Abu Naser brings decades of clinical and administrative experience, guiding the organization toward excellence in healthcare delivery. His leadership is instrumental in shaping a new horizon of advanced and super-specialized healthcare services for the people of Chattogram.',
  },
  {
    id: 'iqbal',
    name: 'Md. Iqbal Hosain',
    designation: 'Founding Director',
    shortTitle: 'Entrepreneur & Business Leader',
    photo: '/images/directors/iqbal.jpg',
    briefBio: 'A dedicated entrepreneur and business leader with significant experience in strategic planning, business development, and organizational management across diverse industries.',
    fullBio: [
      'Md. Iqbal Hosain is a dedicated entrepreneur and business leader with significant experience in strategic planning, business development, and organizational management. His practical expertise across diverse business sectors has earned him a strong reputation for operational efficiency and sustainable growth.',
      'With a forward-thinking approach and commitment to community development, he has consistently contributed to building successful business enterprises that create lasting value.',
    ],
    hayatRole: 'As a Founding Director of Hayat Life Care, Md. Iqbal Hosain brings valuable business acumen and entrepreneurial insight, contributing to the organization\'s mission of creating a world-class healthcare and lifestyle destination in Chattogram.',
  },
]

// ── Profile Modal ──────────────────────────────────────────────────
function ProfileModal({ director, onClose }: { director: Director; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-gray-100 dark:border-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
        >
          <X className="size-4 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Header with Photo */}
        <div className="relative p-6 pb-0 flex items-start gap-5">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-teal-100 shadow-lg">
            <Image
              src={director.photo}
              alt={director.name}
              width={120}
              height={120}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="pt-1 pr-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {director.name}
            </h3>
            <p className="text-[13px] md:text-sm font-bold text-amber-600 dark:text-amber-400 mt-1.5 uppercase tracking-wide leading-snug">
              {director.designation.includes(' & ') ? (
                <>
                  {director.designation.split(' & ')[0]} &<br />
                  {director.designation.split(' & ')[1]}
                </>
              ) : (
                director.designation
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-medium border-l-2 border-gray-200 dark:border-gray-700 pl-2">{director.shortTitle}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 my-5">
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #0D948840, transparent)' }} />
        </div>

        {/* Full Bio */}
        <div className="px-6 pb-3 space-y-4">
          {director.fullBio.map((para, i) => (
            <p key={i} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Hayat Role */}
        <div className="mx-6 mb-6 p-4 rounded-2xl border border-teal-100 dark:border-teal-900/50" style={{ background: 'rgba(13,148,136,0.04)' }}>
          <p className="text-sm text-teal-800 dark:text-teal-300 leading-relaxed font-medium italic">
            {director.hayatRole}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Director Card (Flip) ───────────────────────────────────────────
function DirectorCard({ director, index, isLarge }: { director: Director; index: number; isLarge?: boolean }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const cardHeight = isLarge ? '380px' : '320px'

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group cursor-pointer"
        style={{ perspective: '1200px' }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="relative w-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: cardHeight,
          }}
        >
          {/* ── FRONT ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
              <Image
                src={director.photo}
                alt={director.name}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.95) 0%, rgba(15,23,42,0.5) 50%, transparent 100%)' }} />
              
              {/* Name overlay on bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                <h3 className="text-[15px] lg:text-[16px] font-bold text-white leading-tight drop-shadow-md mb-1.5">
                  {director.name}
                </h3>
                <p className="text-[10px] lg:text-[11px] font-bold tracking-wider uppercase leading-[1.35] text-amber-400 drop-shadow-sm">
                  {director.designation.includes(' & ') ? (
                    <>
                      {director.designation.split(' & ')[0]} &<br />
                      <span className="text-amber-200">{director.designation.split(' & ')[1]}</span>
                    </>
                  ) : (
                    director.designation
                  )}
                </p>
              </div>

              {/* Flip hint */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg border border-teal-200 dark:border-teal-800 flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 50%, #F0FDFA 100%)',
            }}
          >
            <div className="flex flex-col h-full p-5">
              {/* Small photo + name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-teal-200 shadow-sm">
                  <Image
                    src={director.photo}
                    alt={director.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">{director.name}</h4>
                  <span className="text-[11px] font-semibold text-teal-700">{director.designation}</span>
                  {director.shortTitle && (
                    <p className="text-[10px] text-gray-500 mt-0.5 font-medium">{director.shortTitle}</p>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px mb-3 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #0D948840, transparent)' }} />

              {/* Brief bio */}
              <p className="text-xs text-gray-600 dark:text-gray-800 leading-relaxed flex-1">
                {director.briefBio}
              </p>

              {/* View Full Profile Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowModal(true)
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
              >
                <ExternalLink className="size-3.5" />
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && <ProfileModal director={director} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}

// ── Main Section ───────────────────────────────────────────────────
interface FoundingDirectorsProps {
  isDarkMode?: boolean
}

export default function FoundingDirectors({ isDarkMode }: FoundingDirectorsProps) {
  const [showSection1, setShowSection1] = useState(false)
  const [showSection2, setShowSection2] = useState(false)
  const { t } = useLanguage()

  const topLeadership = DIRECTORS.slice(0, 2)      // Chairman + MD
  const foundingDirectors = DIRECTORS.slice(2, 6)   // 4 visible founding directors
  const moreSection1 = DIRECTORS.slice(6, 7)        // RJSC No 1: Sayed Noor
  const moreSection2 = DIRECTORS.slice(7)            // Others: Dr. Naser + Iqbal

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      id="leadership"
      style={{ background: isDarkMode ? '#0C1222' : 'linear-gradient(180deg, #FAFFFE 0%, #F0FAF7 40%, #E8F5F0 70%, #F0FAF7 100%)' }}
    >
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-15 pointer-events-none blur-3xl">
        <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #0D9488, #10B981, transparent)' }} />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 opacity-15 pointer-events-none blur-3xl">
        <div className="w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, #6366F1, #0D9488, transparent)' }} />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-6 shadow-sm">
              <Crown className="size-4" />
              <span>{t('leadership.badge') || 'OUR LEADERSHIP'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              {t('leadership.title') || 'Meet the Visionaries'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
              {t('leadership.steeringJourney') || 'Steering Our Journey'}
            </p>
            <div className="w-20 h-1 mx-auto rounded-full mt-4" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
          </div>
        </FadeIn>

        {/* ── Top Leadership (Chairman + MD) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto mb-14">
          {topLeadership.map((director, i) => (
            <DirectorCard key={director.id} director={director} index={i} isLarge />
          ))}
        </div>

        {/* ── Founding Directors Sub-header ── */}
        <FadeIn>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <Users className="size-3.5" />
              <span>FOUNDING DIRECTORS</span>
            </div>
          </div>
        </FadeIn>

        {/* ── Founding Directors Grid (4 visible) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {foundingDirectors.map((director, i) => (
            <DirectorCard key={director.id} director={director} index={i} />
          ))}
        </div>

        {/* ── Sub-Section 1: RJSC No 1 (Sayed Noor) ── */}
        {moreSection1.length > 0 && (
          <div className="mt-12">
            <FadeIn>
              <div className="text-center mb-8">
                <button
                  onClick={() => setShowSection1(!showSection1)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border"
                  style={{
                    background: showSection1 ? 'linear-gradient(135deg, #0D9488, #10B981)' : 'white',
                    color: showSection1 ? 'white' : '#0D9488',
                    borderColor: showSection1 ? 'transparent' : '#0D948830',
                  }}
                >
                  <Users className="size-4" />
                  {showSection1 ? 'Show Less' : 'More Founding Directors'}
                  <motion.div
                    animate={{ rotate: showSection1 ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="size-4" />
                  </motion.div>
                </button>
              </div>
            </FadeIn>

            <AnimatePresence>
              {showSection1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 max-w-xs mx-auto">
                    {moreSection1.map((director, i) => (
                      <DirectorCard key={director.id} director={director} index={i} />
                    ))}
                  </div>

                  {/* ── Sub-Section 2: Others (Dr. Naser + Iqbal) ── */}
                  {moreSection2.length > 0 && (
                    <div className="mt-12">
                      <FadeIn>
                        <div className="text-center mb-8">
                          <button
                            onClick={() => setShowSection2(!showSection2)}
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 border"
                            style={{
                              background: showSection2 ? 'linear-gradient(135deg, #0D9488, #10B981)' : 'white',
                              color: showSection2 ? 'white' : '#0D9488',
                              borderColor: showSection2 ? 'transparent' : '#0D948830',
                            }}
                          >
                            <Users className="size-4" />
                            {showSection2 ? 'Show Less' : 'More Founding Directors'}
                            <motion.div
                              animate={{ rotate: showSection2 ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="size-4" />
                            </motion.div>
                          </button>
                        </div>
                      </FadeIn>

                      <AnimatePresence>
                        {showSection2 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                              {moreSection2.map((director, i) => (
                                <DirectorCard key={director.id} director={director} index={i} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
