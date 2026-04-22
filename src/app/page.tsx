'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Phone,
  Menu,
  ChevronDown,
  Check,
  MapPin,
  Mail,
  Building2,
  Car,
  CreditCard,
  Pill,
  Glasses,
  ShoppingBag,
  Coffee,
  CupSoda,
  UtensilsCrossed,
  Baby,
  Stethoscope,
  Microscope,
  ArrowRight,
  Star,
  Shield,
  Users,
  Heart,
  Award,
  TrendingUp,
  Clock,
  FileCheck,
  HandCoins,
  UserCheck,
  Sparkles,
  Send,
  PhoneCall,
  MapPinned,
  Building,
  ChevronUp,
  MessageCircle,
  MessageSquare,
  Facebook,
  Youtube,
  Settings,
  X,
  LayoutDashboard,
  Inbox,
  Wrench,
  HelpCircle,
  UserPlus,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  LogOut,
  MousePointer,
  CalendarCheck,
  Search,
  Globe,
  Instagram,
  Linkedin,
  BookOpen,
  Lightbulb,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Ship,
} from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/* ─────────────────────── helpers ─────────────────────── */

function formatNumber(num: string | number): string {
  if (typeof num === 'string') return num
  return num.toLocaleString()
}

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        setDone(true)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return { count: inView ? count : ('' as string | number), ref, done }
}

function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) {
  const dirs = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }
  return (
    <motion.div
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerContainer({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────── data ─────────────────────── */

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Floors', href: '#floors' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Wellness', href: '#health-tips' },
  { label: 'Investment', href: '#investment' },
  { label: 'Compare', href: '#comparison-table' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const floors = [
  {
    id: 'basement',
    label: 'Basement',
    image: '/images/interior-lobby.png',
    description:
      'Secure and spacious parking facility with state-of-the-art surveillance and valet service for your convenience.',
    facilities: ['150+ Car Parking', 'CCTV Surveillance', 'Valet Service', '24/7 Security'],
  },
  {
    id: 'level1',
    label: 'Level 1',
    image: '/images/super-shop.png',
    description:
      'Ground floor retail hub providing essential daily needs — from groceries to pharmaceuticals, all under one roof.',
    facilities: [
      'Super Shop',
      'Pharmacy',
      'Optical Shop',
      'Coffee Shop',
      'ATM Booth',
    ],
  },
  {
    id: 'level2',
    label: 'Level 2',
    image: '/images/restaurant.png',
    description:
      'Food, refreshment, and family entertainment zone designed for relaxation and joy.',
    facilities: ['Restaurant', 'Juice Bar', "Children Amusement Park"],
  },
  {
    id: 'level3',
    label: 'Level 3',
    image: '/images/medical-lab.png',
    description:
      'Comprehensive pathology and diagnostic laboratory equipped with advanced testing capabilities.',
    facilities: [
      'Pathology',
      'Microbiology',
      'Immunology & Serology',
      'Biochemistry',
      'Hematology',
    ],
  },
  {
    id: 'level4',
    label: 'Level 4',
    image: '/images/doctor-chamber.png',
    description:
      'Advanced imaging and specialist consultation center with cutting-edge diagnostic technology.',
    facilities: [
      "Doctor's Chamber",
      'MRI',
      'ECG',
      'USG',
      'X-Ray',
      'CT Scan',
    ],
  },
  {
    id: 'level5',
    label: 'Level 5',
    image: '/images/doctor-chamber.png',
    description:
      'Specialized consultation floor with essential diagnostic support for focused medical care.',
    facilities: ["Doctor's Chamber", 'ECG', 'USG'],
  },
  {
    id: 'level6',
    label: 'Level 6',
    image: '/images/medical-lab.png',
    description:
      'Cutting-edge oncology and AI-powered diagnostics for next-generation healthcare.',
    facilities: [
      "Doctor's Chamber",
      'Cancer Institute',
      'AI-Powered Diagnostics',
    ],
  },
  {
    id: 'level7',
    label: 'Level 7',
    image: '/images/doctor-chamber.png',
    description:
      'Dedicated fertility institute offering world-class reproductive care and counseling.',
    facilities: ["Doctor's Chamber", 'Fertility Institute'],
  },
  {
    id: 'level8',
    label: 'Level 8',
    image: '/images/doctor-chamber.png',
    description:
      'Top-floor specialist center for ophthalmology, dental surgery, and administrative operations.',
    facilities: [
      "Doctor's Chamber",
      'Ophthalmology',
      'Dental/Oral & Maxillofacial Surgery',
      'Administrative Office',
    ],
  },
]

const services = [
  {
    icon: Car,
    title: 'Car Parking',
    desc: '150+ paid parking with CCTV surveillance & valet service',
  },
  {
    icon: CreditCard,
    title: 'ATM Booth',
    desc: 'On-site ATM for secure cash access & payments',
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    desc: 'Authentic medicines from authorized manufacturers',
  },
  {
    icon: Glasses,
    title: 'Optical Shop',
    desc: 'Prescription glasses, frames & contact lenses',
  },
  {
    icon: ShoppingBag,
    title: 'Super Shop',
    desc: 'Largest supershop in the complex',
  },
  {
    icon: Coffee,
    title: 'Coffee Shop',
    desc: 'Fresh brews & light snacks',
  },
  {
    icon: CupSoda,
    title: 'Juice Bar',
    desc: 'Fresh, nutrient-rich juices & smoothies',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurant',
    desc: 'Nutritious meals with special diet options',
  },
  {
    icon: Baby,
    title: 'Children Amusement Park',
    desc: 'Indoor play zone for kids',
  },
  {
    icon: Stethoscope,
    title: "Doctor's Chamber",
    desc: 'Private chambers across specialities',
  },
  {
    icon: Microscope,
    title: 'Diagnostic Center',
    desc: 'AI-powered advanced diagnostics',
  },
]

const benefitCodes = [
  { code: 'B-1', title: 'Lifetime Financial Benefit', icon: TrendingUp },
  { code: 'B-2', title: 'Caring for Him/Herself', icon: Heart },
  { code: 'B-3', title: 'Partner Health Access', icon: UserCheck },
  { code: 'B-4', title: 'Family Health Access', icon: Users },
  { code: 'B-5', title: 'Family Health Access Including Parents', icon: Shield },
  { code: 'B-6', title: 'Family Health Access Including Parents-in-law', icon: Award },
  { code: 'B-7', title: 'VIP Access to All Facilities', icon: Star },
  { code: 'B-8', title: 'Social Recognition & Share Certification', icon: FileCheck },
]

const faqs = [
  {
    q: 'What is Hayat Life Care?',
    a: 'Hayat Life Care is a premium healthcare and lifestyle complex in Chattogram, Bangladesh — a one-stop destination for healthcare services, daily essentials, dining, and entertainment under one roof. It is a sister concern of Hayat Holdings.',
  },
  {
    q: 'Where is it located?',
    a: 'Hayat Life Care is located at Manashi, O.R. Nizam Road, Chattogram — one of the most trusted healthcare zones in the city, near Chittagong Medical College Hospital.',
  },
  {
    q: 'What is the land area and structure?',
    a: 'The complex spans 55 Katha of land with an 8-storied building plus 2 basements. Future plans include expansion to 14-18 floors.',
  },
  {
    q: 'Why invest in Hayat Life Care?',
    a: 'Hayat Life Care offers a unique investment opportunity in Chattogram\'s healthcare sector. With 11 business wings, a prime location, and no bank loans, your investment is secure with transparent profit distribution and a buyback guarantee after 3 years at 5% higher price.',
  },
  {
    q: 'Will there be a hospital?',
    a: 'Yes, future expansion plans include a specialized hospital focusing on Cancer, Heart, Kidney, and Gyne & Obs departments — making it a comprehensive healthcare destination.',
  },
  {
    q: 'Who will operate the company?',
    a: 'The company is operated under the leadership of Chairman Capt. Md Showkat Hossain Chowdhury and Managing Director Dr. Mohammad Azizul Haque, both highly experienced professionals in their respective fields.',
  },
  {
    q: 'How will profit be distributed?',
    a: 'Profit will be distributed transparently among shareholders based on the benefit codes (B-1 to B-8). Financial statements will be audited and shared regularly with all investors.',
  },
  {
    q: 'What are the profit expectations?',
    a: 'Profit expectations are based on the revenue generated from all 11 business wings. As the complex becomes fully operational, returns are expected to grow significantly. Detailed projections are available upon request.',
  },
  {
    q: 'How is transparency ensured?',
    a: 'Transparency is maintained through regular audits, open financial reporting, shareholder meetings, and an administrative office on Level 8 for direct investor engagement.',
  },
  {
    q: 'Is there a buyback policy?',
    a: 'Yes! After 3 years, shares can be bought back at 5% higher than the purchase price, providing a guaranteed exit option for investors.',
  },
  {
    q: 'How to book a space?',
    a: 'You can book a space by contacting our office at 01332-850348 or 01335-074949, or by visiting our office at Probortok Circle, Badshah Miah Road, Ameerbag, Chattogram.',
  },
  {
    q: 'What documents are required?',
    a: 'Required documents include valid national ID, passport-size photographs, and completed application form. Our team will guide you through the entire process.',
  },
  {
    q: 'What is the expected handover date?',
    a: 'The project is progressing on schedule. Please contact our office for the most up-to-date timeline and handover information.',
  },
  {
    q: 'Will any bank loan be taken?',
    a: 'No. Hayat Life Care will not take any bank loan. The project is entirely funded by shareholder investments, ensuring no debt burden on the company.',
  },
  {
    q: 'What is the maximum number of shares?',
    a: 'A total of 4,950 shares are available, each priced at 10 Lacs BDT. This limited number ensures exclusivity and higher per-share value.',
  },
  {
    q: 'Can I sell my shares/directorship?',
    a: 'Yes, shareholders can sell their shares with prior written approval from Hayat Life Care management. A royalty fee of 10% of profit is payable to Hayat Life Care before transaction completion. Original investment amount plus 90% of profit goes to the seller.',
  },
  {
    q: 'What is the share structure?',
    a: '1st Phase: 2,500 shares at 10 Lacs each = 250 Crores. 2nd Phase: 500 shares at 15 Lacs each = 75 Crores. 3rd Phase: 1,000 shares at 20 Lacs each = 200 Crores. Total shares will not exceed 4,950.',
  },
  {
    q: 'Do I need to pay extra for the hospital?',
    a: 'No. Your payment is fixed as per the current slot at 10 Lacs per share. No additional payment will be required for the hospital establishment.',
  },
  {
    q: 'What are the payment options?',
    a: 'Option 1: 50% down payment, 25% within 30 days, 25% within 60-90 days. Option 2 (Directors only): 35% down payment, 30% within 30 days, 35% within 60-90 days.',
  },
  {
    q: 'Is it a registered company?',
    a: 'Yes. Hayat Life Care Ltd is a registered company with the Joint Stock.',
  },
]

const translations: Record<string, Record<string, string>> = {
  bengali: {
    'HAYAT LIFE CARE': 'হায়াত লাইফ কেয়ার',
    'CHATTOGRAM': 'চট্টগ্রাম',
    'Your Trusted Partner in Health, Wellness & Daily Essentials': 'স্বাস্থ্য, সুস্থতা ও দৈনন্দিন প্রয়োজনে আপনার বিশ্বস্ত সঙ্গী',
    'At A Glance': 'এক নজরে',
    'Our 11 Business Wings': 'আমাদের ১১টি বিজনেস উইং',
    'Floor-wise Facilities': 'তলা অনুযায়ী সুবিধা',
    'Meet the Visionaries': 'দূরদর্শী নেতাদের সাথে পরিচিত হন',
    'Why Choose Hayat Life Care?': 'হায়াত লাইফ কেয়ার কেন বেছে নেবেন?',
    'Our Facilities': 'আমাদের সুবিধাসমূহ',
    'Vision & Mission': 'লক্ষ্য ও উদ্দেশ্য',
    'What People Say': 'মানুষ কি বলে',
    'Health Tips & Insights': 'স্বাস্থ্য পরামর্শ ও তথ্য',
    'Pathways to Prestige Ownership': 'প্রেস্টিজ মালিকানার পথ',
    'Frequently Asked Questions': 'সচরাচর জিজ্ঞাসা',
    'Get In Touch': 'যোগাযোগ করুন',
    'Doctor Directory': 'ডাক্তার ডিরেক্টরি',
    'Project Timeline': 'প্রজেক্ট টাইমলাইন',
    'Book a Visit': 'ভিজিট বুক করুন',
    'Explore Services': 'সেবা দেখুন',
    'Invest Now': 'ইনভেস্ট করুন',
    'Send Message': 'মেসেজ পাঠান',
    'One Stop Service for Healthcare & Daily Essentials': 'স্বাস্থ্যসেবা ও দৈনন্দিন প্রয়োজনের জন্য একটি সেবা কেন্দ্র',
    '24/7 Hotline': '২৪/৭ হটলাইন',
    'WhatsApp': 'হোয়াটসঅ্যাপ',
    'Home': 'হোম',
    'About': 'সম্পর্কে',
    'Services': 'সেবাসমূহ',
    'Floors': 'তলা',
    'Doctors': 'ডাক্তার',
    'Timeline': 'সময়রেখা',
    'Gallery': 'গ্যালারি',
    'Wellness': 'সুস্থতা',
    'Investment': 'বিনিয়োগ',
    'FAQ': 'সাধারণ প্রশ্ন',
    'Contact': 'যোগাযোগ',
    'Reviews': 'রিভিউ',
    'Building Progress': 'নির্মাণ অগ্রগতি',
    'Our Partners & Affiliations': 'আমাদের অংশীদার ও সহযোগী প্রতিষ্ঠান',
    'Ready to Learn More?': 'আরও জানতে চান?',
    'Download Brochure': 'ব্রোশার ডাউনলোড',
    'Call Us Now': 'এখনই কল করুন',
    'OUR SPECIALISTS': 'আমাদের বিশেষজ্ঞ',
    'CONSTRUCTION UPDATE': 'নির্মাণ আপডেট',
    'TRUSTED PARTNERS': 'বিশ্বস্ত অংশীদার',
    'HEALTH & WELLNESS': 'স্বাস্থ্য ও সুস্থতা',
    'GOT QUESTIONS?': 'প্রশ্ন আছে?',
    'CONTACT US': 'যোগাযোগ করুন',
    'LEADERSHIP': 'নেতৃত্ব',
    'COMPREHENSIVE CARE': 'সামগ্রিক সেবা',
    'OUR JOURNEY': 'আমাদের যাত্রা',
    'WHY CHOOSE US': 'কেন আমাদের বেছে নেবেন',
    'WORLD-CLASS FACILITIES': 'বিশ্বমানের সুবিধা',
    'TESTIMONIALS': 'প্রশংসাপত্র',
    'INVESTMENT OPPORTUNITY': 'বিনিয়োগের সুযোগ',
    'How We Compare': 'আমাদের তুলনা',
    'THE HAYAT DIFFERENCE': 'হায়াতের পার্থক্য',
    'Compare': 'তুলনা',
    'Stay Updated with Hayat Life Care': 'হায়াত লাইফ কেয়ারের সাথে আপডেট থাকুন',
  },
}

/* ─────────────────────── main page ─────────────────────── */

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Page-level scroll progress bar
  const { scrollYProgress: pageScrollProgress } = useScroll()

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowMobileBar(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const stat1 = useCounter(11, 1800)
  const stat2 = useCounter(55, 2000)
  const stat3 = useCounter(8, 1500)
  const stat4 = useCounter(150, 2200)

  // ─── Admin & Chat State ───
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminTab, setAdminTab] = useState('dashboard')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [chatSessionId] = useState(() => crypto.randomUUID())
  const [isChatLoading, setIsChatLoading] = useState(false)

  const [inquiries, setInquiries] = useState<any[]>([])
  const [adminServices, setAdminServices] = useState<any[]>([])
  const [adminFaqs, setAdminFaqs] = useState<any[]>([])
  const [leaders, setLeaders] = useState<any[]>([])
  const [siteSettings, setSiteSettings] = useState<Record<string, any[]>>({})

  // New item forms
  const [newService, setNewService] = useState({ title: '', slug: '', description: '', icon: '', floor: '', category: '' })
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'general' })
  const [newLeader, setNewLeader] = useState({ name: '', designation: '', bio: '' })

  // Investment calculator state
  const [investShares, setInvestShares] = useState(1)
  const [investRate, setInvestRate] = useState(10)

  // Doctor directory state
  const [doctorSearch, setDoctorSearch] = useState('')
  const [doctorFilter, setDoctorFilter] = useState('All')
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false)
  const [appointmentDoctor, setAppointmentDoctor] = useState('')
  const [appointmentForm, setAppointmentForm] = useState({ name: '', phone: '', date: '', time: '', message: '' })
  const [isAppointmentSubmitting, setIsAppointmentSubmitting] = useState(false)

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)

  // Language toggle state
  const [isBengali, setIsBengali] = useState(false)

  // Translation helper
  const t = useCallback((key: string) => {
    if (isBengali && translations.bengali[key]) return translations.bengali[key]
    return key
  }, [isBengali])

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  // Typing animation state
  const [typedText, setTypedText] = useState('')
  const fullText = isBengali ? translations.bengali['Your Trusted Partner in Health, Wellness & Daily Essentials'] || 'Your Trusted Partner in Health, Wellness & Daily Essentials' : 'Your Trusted Partner in Health, Wellness & Daily Essentials'
  const [showMobileBar, setShowMobileBar] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!isPageLoaded) return
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 40)
    return () => clearInterval(timer)
  }, [isPageLoaded, fullText])

  // Smooth scroll for all anchor links
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.hash && target.hash.startsWith('#')) {
        const el = document.querySelector(target.hash)
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Gallery lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const lightboxImages = [
    { src: '/images/hero-building.png', alt: 'Hayat Life Care Exterior' },
    { src: '/images/interior-lobby.png', alt: 'Grand Lobby & Reception' },
    { src: '/images/medical-lab.png', alt: 'Advanced Diagnostic Lab' },
    { src: '/images/doctor-chamber.png', alt: 'Doctor Consultation Chamber' },
    { src: '/images/super-shop.png', alt: 'Super Shop' },
    { src: '/images/restaurant.png', alt: 'Restaurant & Dining' },
    { src: '/images/children-park.png', alt: 'Children Amusement Park' },
    { src: '/images/about-aerial.png', alt: 'Aerial View - O.R. Nizam Road' },
  ]

  const doctorsData = [
    { name: 'Dr. Mohammad Azizul Haque', specialty: 'General', designation: 'Associate Professor, CMCH', floor: 'Level 5', schedule: 'Sat-Thu, 5PM-9PM' },
    { name: 'Dr. Fatima Begum', specialty: 'Gynecology', designation: 'Senior Consultant', floor: 'Level 7', schedule: 'Sat-Wed, 10AM-2PM' },
    { name: 'Dr. Rashid Ahmed', specialty: 'Cardiology', designation: 'Professor & Head', floor: 'Level 4', schedule: 'Sun-Thu, 4PM-8PM' },
    { name: 'Dr. Nasreen Akter', specialty: 'Oncology', designation: 'Consultant Oncologist', floor: 'Level 6', schedule: 'Sat-Tue, 9AM-1PM' },
    { name: 'Dr. Kamal Hossain', specialty: 'Dental', designation: 'Dental Surgeon', floor: 'Level 8', schedule: 'Sat-Thu, 10AM-6PM' },
    { name: 'Dr. Sharmin Sultana', specialty: 'Gynecology', designation: 'Fertility Specialist', floor: 'Level 7', schedule: 'Sun-Thu, 3PM-7PM' },
    { name: 'Dr. Imran Khan', specialty: 'Cardiology', designation: 'Interventional Cardiologist', floor: 'Level 4', schedule: 'Sat-Wed, 5PM-9PM' },
    { name: 'Dr. Tahmina Chowdhury', specialty: 'Oncology', designation: 'Radiation Oncologist', floor: 'Level 6', schedule: 'Mon-Fri, 9AM-3PM' },
    { name: 'Dr. Rezaul Karim', specialty: 'General', designation: 'General Physician', floor: 'Level 5', schedule: 'Sat-Thu, 10AM-5PM' },
  ]

  // Admin data fetching
  const fetchAdminData = useCallback(async () => {
    try {
      const [inqRes, svcRes, faqRes, ldrRes, setRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/services'),
        fetch('/api/faqs'),
        fetch('/api/leaders'),
        fetch('/api/site-settings'),
      ])
      const inqData = await inqRes.json()
      const svcData = await svcRes.json()
      const faqData = await faqRes.json()
      const ldrData = await ldrRes.json()
      const setData = await setRes.json()
      if (inqData.data) setInquiries(inqData.data)
      if (svcData.data) setAdminServices(svcData.data)
      if (faqData.data) setAdminFaqs(faqData.data)
      if (ldrData.data) setLeaders(ldrData.data)
      if (setData.data) setSiteSettings(setData.data)
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
    }
  }, [])

  const handleAdminLogin = async () => {
    setLoginError('')
    setIsLoginLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      })
      const data = await res.json()
      if (data.success) {
        setIsLoggedIn(true)
        fetchAdminData()
      } else {
        setLoginError(data.error || 'Invalid credentials')
      }
    } catch {
      setLoginError('Login failed. Please try again.')
    } finally {
      setIsLoginLoading(false)
    }
  }

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatLoading) return
    const userMsg = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsChatLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId: chatSessionId }),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.data.reply }])
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not process your request. Please try again.' }])
      }
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again later.' }])
    } finally {
      setIsChatLoading(false)
    }
  }

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq))
    } catch (err) {
      console.error('Failed to update inquiry:', err)
    }
  }

  const deleteService = async (id: string) => {
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' })
      setAdminServices(prev => prev.filter(s => s.id !== id))
    } catch (err) {
      console.error('Failed to delete service:', err)
    }
  }

  const deleteFaq = async (id: string) => {
    try {
      await fetch(`/api/faqs/${id}`, { method: 'DELETE' })
      setAdminFaqs(prev => prev.filter(f => f.id !== id))
    } catch (err) {
      console.error('Failed to delete FAQ:', err)
    }
  }

  const addService = async () => {
    if (!newService.title || !newService.slug || !newService.description) return
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setAdminServices(prev => [...prev, data.data])
        setNewService({ title: '', slug: '', description: '', icon: '', floor: '', category: '' })
      }
    } catch (err) {
      console.error('Failed to add service:', err)
    }
  }

  const addFaq = async () => {
    if (!newFaq.question || !newFaq.answer) return
    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFaq),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setAdminFaqs(prev => [...prev, data.data])
        setNewFaq({ question: '', answer: '', category: 'general' })
      }
    } catch (err) {
      console.error('Failed to add FAQ:', err)
    }
  }

  const addLeader = async () => {
    if (!newLeader.name || !newLeader.designation || !newLeader.bio) return
    try {
      const res = await fetch('/api/leaders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeader),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setLeaders(prev => [...prev, data.data])
        setNewLeader({ name: '', designation: '', bio: '' })
      }
    } catch (err) {
      console.error('Failed to add leader:', err)
    }
  }

  const saveSettings = async () => {
    try {
      const allSettings: Array<{ key: string; value: string }> = []
      Object.values(siteSettings).forEach(group => {
        group.forEach((s: any) => allSettings.push({ key: s.key, value: s.value }))
      })
      await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: allSettings }),
      })
      toast.success('Settings saved successfully!')
    } catch (err) {
      console.error('Failed to save settings:', err)
      toast.error('Failed to save settings.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-white dark:bg-slate-950 dark:text-gray-100 transition-colors duration-300" style={{ background: isDarkMode ? '#0F172A' : '#FAFFFE' }}>
      <Toaster position="top-center" richColors />
      {/* Page loading overlay */}
      <AnimatePresence>
        {!isPageLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0F172A, #0D9488)' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* ─── SCROLL PROGRESS BAR ─── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          height: '3px',
          opacity: useTransform(pageScrollProgress, [0, 0.01], [0, 1]),
        }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: pageScrollProgress,
            background: 'linear-gradient(90deg, #0D9488, #10B981)',
          }}
        />
      </motion.div>

      {/* ─── 1. TOP INFO BAR ─── */}
      <div className="w-full py-2 px-4 text-center md:text-left" style={{ background: isDarkMode ? '#064E3B' : '#0D9488' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1 text-xs text-white/90">
          <div className="flex items-center gap-2">
            <Phone className="size-3" />
            <span>01332-850348 | 01335-074949</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:info@hayatlifecare.com" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail className="size-3" />
              <span className="hidden sm:inline">info@hayatlifecare.com</span>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="size-3.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="size-3.5" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="size-3.5" />
            </a>
            <span className="text-white/40 hidden sm:inline">|</span>
            {/* Language Toggle */}
            <button
              onClick={() => setIsBengali(!isBengali)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="size-3" />
              <span className="text-[11px] font-medium">{isBengali ? 'EN' : 'বাংলা'}</span>
            </button>
            <span className="text-white/40 hidden sm:inline">|</span>
            <div className="text-white/80 text-[11px] tracking-wide uppercase hidden sm:block">
              Sister Concern of HAYAT HOLDINGS
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. NAVBAR ─── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
              <Building2 className="size-5 text-white" />
            </div>
            <div>
              <div className="text-lg md:text-xl font-bold leading-tight" style={{ color: '#0D9488' }}>
                HAYAT LIFE CARE
              </div>
              <div className="text-[10px] tracking-widest uppercase text-gray-500">
                Chattogram
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? scrolled
                      ? isDarkMode ? 'text-teal-400 bg-teal-900/30 font-semibold' : 'text-teal-700 bg-teal-50 font-semibold'
                      : 'text-white bg-white/20 font-semibold'
                    : scrolled
                      ? isDarkMode ? 'text-gray-300 hover:text-teal-400 hover:bg-teal-900/30' : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="ml-2 rounded-full px-3 font-semibold shadow-lg h-9 w-9 p-0"
              style={{ background: scrolled ? '#1e293b' : 'rgba(255,255,255,0.15)', color: 'white' }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </Button>
            <Button
              className="ml-3 rounded-full px-5 font-semibold text-white shadow-lg"
              style={{ background: '#D97706' }}
              asChild
            >
              <a href="#contact">{t('Book a Visit')}</a>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={scrolled ? 'text-gray-700' : 'text-white'}
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white dark:bg-slate-900">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <span className="text-lg font-bold" style={{ color: '#0D9488' }}>
                      HAYAT LIFE CARE
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-4 mt-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-teal-600 hover:bg-teal-50 dark:hover:text-teal-400 dark:hover:bg-teal-900/30 rounded-lg transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      className="w-full rounded-full font-semibold text-white"
                      style={{ background: '#D97706' }}
                      asChild
                    >
                      <a href="#contact">{t('Book a Visit')}</a>
                    </Button>
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-teal-50">
                    <div className="flex items-center gap-2 text-teal-700 text-sm font-medium">
                      <Phone className="size-4" />
                      01332-850348
                    </div>
                    <div className="flex items-center gap-2 text-teal-700 text-sm font-medium mt-2">
                      <Phone className="size-4" />
                      01335-074949
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ─── EMERGENCY CONTACT STRIP ─── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(90deg, #DC2626, #D97706, #DC2626)' }}>
        <div className="absolute inset-0 animate-pulse opacity-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white text-sm font-medium">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex items-center gap-2"
          >
            <Phone className="size-4" />
            <span className="font-bold text-xs sm:text-sm">24/7 Hotline:</span>
          </motion.div>
          <a href="tel:01332-850348" className="hover:underline font-bold text-xs sm:text-sm">01332-850348</a>
          <span className="text-white/30">•</span>
          <a href="tel:01335-074949" className="hover:underline font-bold text-xs sm:text-sm">01335-074949</a>
          <span className="text-white/30 hidden sm:inline">•</span>
          <a href="https://wa.me/8801617977232" className="hidden sm:flex items-center gap-1.5 hover:underline text-xs sm:text-sm bg-white/10 px-3 py-1 rounded-full" target="_blank" rel="noopener noreferrer">
            <MessageSquare className="size-3.5" /> WhatsApp
          </a>
        </div>
      </div>

      {/* ─── INFO TICKER ─── */}
      <div className="relative overflow-hidden py-2 border-y border-white/5" style={{ background: '#0F172A' }}>
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(90deg, #0F172A, transparent)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(270deg, #0F172A, transparent)' }} />
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                <Stethoscope className="size-3 text-emerald-400" />
                <span className="text-white/80">AI-Powered Diagnostics</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                <Building2 className="size-3 text-emerald-400" />
                <span className="text-white/80">11 Business Wings</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                <MapPin className="size-3 text-teal-400" />
                <span className="text-white/80">55 Katha · O.R. Nizam Road</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                <Shield className="size-3 text-teal-400" />
                <span className="text-white/80">Zero Bank Loan</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <TrendingUp className="size-3 text-emerald-400" />
                <span className="text-white/80">Investment:</span> <span className="text-emerald-400 font-bold">৳10 Lacs/Share</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="text-white/60 text-xs font-medium flex items-center gap-2">
                <Heart className="size-3 text-rose-400" />
                <span className="text-white/80">Specialized Hospital Coming Soon</span>
              </span>
              <span className="text-white/20">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Hospital',
              name: 'Hayat Life Care',
              description: 'One Stop Service for Healthcare & Daily Essentials in Chattogram',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Chattogram',
                addressRegion: 'Chattogram',
                addressCountry: 'BD'
              },
              telephone: '+8801332850348',
              url: 'https://hayatlifecare.com'
            })
          }}
        />
        {/* ─── 3. HERO SECTION ─── */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background image */}
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <Image
              src="/images/hero-building.png"
              alt="Hayat Life Care Building"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(13,148,136,0.6) 50%, rgba(16,185,129,0.4) 100%)',
                'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(13,148,136,0.55) 50%, rgba(16,185,129,0.45) 100%)',
                'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(13,148,136,0.6) 50%, rgba(16,185,129,0.4) 100%)',
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

          {/* Floating medical crosses / particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { x: '10%', y: '20%', size: 18, delay: 0, duration: 6 },
              { x: '80%', y: '15%', size: 14, delay: 1, duration: 7 },
              { x: '25%', y: '70%', size: 12, delay: 2, duration: 8 },
              { x: '70%', y: '60%', size: 16, delay: 0.5, duration: 5 },
              { x: '50%', y: '40%', size: 10, delay: 1.5, duration: 9 },
              { x: '90%', y: '80%', size: 13, delay: 3, duration: 6 },
              { x: '15%', y: '50%', size: 11, delay: 2.5, duration: 7 },
              { x: '60%', y: '25%', size: 15, delay: 0.8, duration: 8 },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="absolute text-white/10"
                style={{ left: p.x, top: p.y, fontSize: p.size }}
                animate={{ y: [0, -20, 0], rotate: [0, 180, 360], opacity: [0.08, 0.15, 0.08] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              >
                ✚
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center"
            style={{ opacity: heroOpacity }}
          >
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-lg border border-white/40 text-white text-sm md:text-base font-medium mb-8 animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.2), rgba(16,185,129,0.1))', boxShadow: '0 0 30px rgba(13,148,136,0.4), 0 0 40px rgba(13,148,136,0.1)' }}>
                <Sparkles className="size-4" />
                One Stop Service for Healthcare &amp; Daily Essentials
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <span className="absolute inset-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white/10 blur-sm" aria-hidden="true">
                HAYAT LIFE CARE
              </span>
              <h1
                className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 40%, #CCFBF1 80%, #99F6E4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(13,148,136,0.3), 0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                {t('HAYAT LIFE CARE')}
              </h1>
              <div className="text-xl md:text-2xl tracking-[0.4em] text-white/90 font-light mt-2">
                {t('CHATTOGRAM')}
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-xl md:text-2xl text-white/90 italic mb-4 font-medium">
                {typedText}<span className="animate-pulse">|</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="text-lg md:text-xl text-white drop-shadow-md max-w-2xl mx-auto mb-10 leading-relaxed">
                We&apos;re proud to establish Hayat Life Care in one of Chittagong&apos;s most
                trusted healthcare zones — a one-stop destination for world-class medical
                services, daily essentials, dining, and family entertainment.
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  asChild
                >
                  <a href="#services">
                    {t('Explore Services')} <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: '#D97706' }}
                  asChild
                >
                  <a href="#investment">
                    {t('Invest Now')} <TrendingUp className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </FadeIn>

            {/* Glassmorphism stat cards */}
            <FadeIn delay={1.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
                {[
                  { label: 'Business Wings', value: stat1.count, suffix: '' },
                  { label: 'Katha Land', value: stat2.count, suffix: '' },
                  { label: 'Floors', value: stat3.count, suffix: '+' },
                  { label: 'Parking', value: stat4.count, suffix: '+' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 md:p-5 text-center transition-all duration-300 hover:bg-white/15 hover:border-white/30"
                    style={{ boxShadow: '0 0 15px rgba(13,148,136,0.1)' }}
                  >
                    <div
                      ref={i === 0 ? stat1.ref : i === 1 ? stat2.ref : i === 2 ? stat3.ref : stat4.ref}
                      className="text-3xl md:text-4xl font-black text-white"
                    >
                      {formatNumber(stat.value as string | number)}
                      {stat.suffix}
                    </div>
                    <div className="text-xs md:text-sm text-white/70 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Trust badges */}
            <FadeIn delay={1.3}>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {[
                  { icon: Shield, text: 'Registered Company' },
                  { icon: Award, text: 'No Bank Loan' },
                  { icon: Users, text: '4,950 Shares' },
                  { icon: Clock, text: 'Dec 2028 Operation' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs backdrop-blur-sm border border-white/10">
                    <badge.icon className="size-3.5" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {[
                  { icon: FileCheck, text: 'RJSC Registered' },
                  { icon: Building2, text: 'CDA Approved' },
                  { icon: Shield, text: 'Govt. Audited' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/12 text-white/75 text-[11px] backdrop-blur-sm border border-white/15">
                    <badge.icon className="size-3" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <div className="w-7 h-11 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-2 h-2 rounded-full bg-white/80"
                />
              </div>
              <span className="text-[11px] tracking-[0.2em] uppercase">Scroll Down</span>
            </motion.div>
          </div>
        </section>

        {/* Wave divider */}
        <div className="relative -mt-1">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#FAFFFE"/>
          </svg>
        </div>

        {/* ─── 4. ABOUT / AT A GLANCE ─── */}
        <section id="about" className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#FAFFFE' }}>
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full opacity-5 animate-float-slow" style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
          <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-5 animate-float-slow" style={{ background: 'radial-gradient(circle, #10B981, transparent)', animationDelay: '2s' }} />
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('At A Glance')}
                </h2>
                <div className="relative">
                  <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                </div>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <FadeIn direction="right">
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                  <Image
                    src="/images/about-aerial.png"
                    alt="Hayat Life Care Aerial View"
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 px-4 py-2 text-white text-sm font-medium">
                    55 Katha Complex • O.R. Nizam Road
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div>
                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: MapPin, label: 'Location', value: 'O.R. Nizam Road, Chattogram' },
                      { icon: Building2, label: 'Land Area', value: '55 Katha' },
                      { icon: Building, label: 'Structure', value: '8 Storied + 2 Basement' },
                      { icon: Car, label: 'Parking', value: '150+ Paid Car Parking' },
                      { icon: Sparkles, label: 'Business Wings', value: '11 Comprehensive Wings' },
                      { icon: TrendingUp, label: 'Future', value: '14-18 Floor Expansion' },
                    ].map((item, i) => (
                      <StaggerItem key={i}>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300">
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0"
                            style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}
                          >
                            <item.icon className="size-5" style={{ color: '#0D9488' }} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 font-medium">{item.label}</div>
                            <div className="text-sm font-semibold text-gray-800">{item.value}</div>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    Hayat Life Care is not just a building — it&apos;s a vision realized. Strategically
                    located near Chittagong Medical College Hospital, it brings together healthcare,
                    daily essentials, dining, and entertainment into a single, world-class complex.
                  </p>
                  <p className="text-xl italic font-bold mt-4 px-4 py-2 rounded-xl inline-block" style={{ color: '#0D9488', background: 'rgba(13,148,136,0.08)' }}>
                    &ldquo;One destination. Every need.&rdquo;
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />

        {/* ─── STATS COUNTER SECTION ─── */}
        <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #10B981 100%)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          {/* Radial gradient overlay for depth */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(13,148,136,0.15) 0%, transparent 70%)' }} />
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { x: '15%', y: '30%', size: 6, delay: 0, duration: 8 },
              { x: '75%', y: '20%', size: 8, delay: 1, duration: 10 },
              { x: '45%', y: '70%', size: 5, delay: 2, duration: 7 },
              { x: '85%', y: '60%', size: 7, delay: 0.5, duration: 9 },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
                animate={{ y: [0, -15, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
              {/* Connecting dotted lines between stat cards on desktop */}
              <div className="hidden md:block absolute top-1/2 left-[22%] right-[22%] border-t-2 border-dotted border-white/20 -translate-y-1/2" />
              <FadeIn delay={0}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <Sparkles className="size-7 text-white/90" />
                  </div>
                  <div ref={stat1.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat1.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                    {stat1.count}+
                  </div>
                  <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Business Wings</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="size-7 text-white/90" />
                  </div>
                  <div ref={stat2.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat2.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                    {stat2.count}
                  </div>
                  <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Katha Land Area</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <Building2 className="size-7 text-white/90" />
                  </div>
                  <div ref={stat3.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat3.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                    {stat3.count}+
                  </div>
                  <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Floors</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.45}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-4 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <Users className="size-7 text-white/90" />
                  </div>
                  <div ref={stat4.ref} className={`text-4xl md:text-5xl font-black text-white mb-2 ${stat4.done ? 'animate-count-glow' : ''}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
                    4,950
                  </div>
                  <div className="text-sm text-white/70 font-medium uppercase tracking-wider">Max Shares</div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── 5. FLOOR PLAN SECTION ─── */}
        <section id="floors" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Floor-wise Facilities')}
                </h2>
                <div className="relative">
                  <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                </div>
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Explore each floor of Hayat Life Care — from parking to specialized medical institutes.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <Tabs defaultValue="basement" className="w-full">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Vertical floor nav on large screens */}
                  <TabsList className="lg:flex-col lg:h-auto lg:w-52 lg:shrink-0 bg-white border rounded-xl p-2 shadow-sm overflow-x-auto lg:overflow-x-visible scrollbar-hide scroll-smooth">
                    {floors.map((floor) => (
                      <TabsTrigger
                        key={floor.id}
                        value={floor.id}
                        className="lg:w-full lg:justify-start text-[10px] md:text-xs lg:text-sm whitespace-nowrap min-w-fit data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-emerald-600 data-[state=active]:font-bold"
                        style={{
                          // @ts-expect-error CSS custom property
                          '--tw-ring-color': '#0D9488',
                        }}
                      >
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 shrink-0 ${
                          floor.id === 'basement' ? 'bg-gray-400' :
                          ['level1', 'level2'].includes(floor.id) ? 'bg-amber-400' :
                          ['level3', 'level4', 'level5'].includes(floor.id) ? 'bg-teal-400' :
                          'bg-emerald-400'
                        }`} />
                        {floor.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Floor content */}
                  <div className="flex-1 min-w-0">
                    {floors.map((floor) => (
                      <TabsContent key={floor.id} value={floor.id}>
                        <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl border shadow-sm overflow-hidden">
                          <div className="relative h-64 md:h-auto">
                            <Image
                              src={floor.image}
                              alt={`${floor.label} - Hayat Life Care`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6 md:p-8 flex flex-col justify-center">
                            <h3
                              className="text-2xl font-bold mb-2"
                              style={{ color: '#0D9488' }}
                            >
                              {floor.label}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                              {floor.description}
                            </p>
                            <div className="space-y-3">
                              {floor.facilities.map((fac, j) => (
                                <div key={j} className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(13,148,136,0.1)' }}>
                                    <Check className="size-3.5" style={{ color: '#0D9488' }} />
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">
                                    {fac}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    ))}
                  </div>
                </div>
              </Tabs>
            </FadeIn>
          </div>
        </section>

        {/* ─── TIMELINE SECTION ─── */}
        <section id="timeline" className="py-20 md:py-28" style={{ background: '#FAFFFE' }}>
          <div className="max-w-5xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Clock className="size-3" />
                  OUR JOURNEY
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Project Timeline')}
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Our Journey to Excellence
                </p>
              </div>
            </FadeIn>

            <div className="relative">
              {/* Vertical center line */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(180deg, #0D9488, #10B981)' }} />

              {[
                { date: '2024 Q4', title: 'Project Conceptualization & Planning', desc: 'Vision born to create Chattogram\'s most comprehensive healthcare destination' },
                { date: '2025 Q1', title: 'Company Registration & Land Acquisition', desc: 'Registered company with Joint Stock, 55 Katha land acquired at O.R. Nizam Road' },
                { date: '2025 Q2', title: 'Architectural Design & CDA Approval', desc: 'Building plan designed for 14-18 floors with state-of-the-art facilities' },
                { date: '2025 Q3', title: 'Construction Begins', desc: 'Foundation work starts with 2 basements and 8+ floors' },
                { date: '2027 Q4', title: 'Revenue Generation Begins', desc: '10 of 11 business wings operational within 8 months of construction start' },
                { date: '2028 Q4', title: 'Full-Scale Operations', desc: 'Complete operation of all 8 floors with 11 business wings' },
                { date: '2030 Q2', title: 'Specialized Hospital Opening', desc: 'Hospital wing operational - Cancer, Heart, Kidney, Gyne & Obs' },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'right' : 'left'}>
                  <div className={`relative flex items-start mb-10 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Date badge - hidden on mobile, shown on desktop */}
                    <div className={`hidden md:flex w-1/2 ${i % 2 === 0 ? 'justify-end pr-10' : 'justify-start pl-10'}`}>
                      <div className="px-4 py-2 rounded-full text-white text-sm font-semibold" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                        {item.date}
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white z-10" style={{ background: '#0D9488', boxShadow: '0 0 12px rgba(13,148,136,0.5)' }} />

                    {/* Content card */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
                      {/* Date badge for mobile */}
                      <div className="md:hidden mb-2">
                        <span className="px-3 py-1 rounded-full text-white text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                          {item.date}
                        </span>
                      </div>
                      <div className="bg-white rounded-2xl border shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:border-teal-200 border-l-4" style={{ borderLeftColor: '#0D9488' }}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONSTRUCTION PROGRESS ─── */}
        <section id="progress" className="py-16" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
          <div className="max-w-5xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <TrendingUp className="size-3" />
                  CONSTRUCTION UPDATE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Building Progress
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-white rounded-2xl border shadow-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Overall Completion</h3>
                  <span className="text-2xl font-black" style={{ color: '#0D9488' }}>35%</span>
                </div>
                <div className="h-4 rounded-full bg-gray-100 overflow-hidden mb-8">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '35%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { phase: 'Land Acquisition', status: 'completed', percent: 100 },
                    { phase: 'Design & Approval', status: 'completed', percent: 100 },
                    { phase: 'Foundation Work', status: 'in-progress', percent: 60 },
                    { phase: 'Structural Construction', status: 'upcoming', percent: 15 },
                    { phase: 'Interior Finishing', status: 'upcoming', percent: 0 },
                    { phase: 'Equipment Installation', status: 'upcoming', percent: 0 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: item.status === 'completed' ? 'rgba(16,185,129,0.05)' : item.status === 'in-progress' ? 'rgba(13,148,136,0.05)' : 'rgba(107,114,128,0.03)' }}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        item.status === 'completed' ? 'bg-emerald-100' :
                        item.status === 'in-progress' ? 'bg-teal-100 animate-pulse' :
                        'bg-gray-100'
                      }`}>
                        {item.status === 'completed' ? (
                          <Check className="size-4 text-emerald-600" />
                        ) : item.status === 'in-progress' ? (
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0D9488' }} />
                        ) : (
                          <Clock className="size-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800">{item.phase}</div>
                        <div className="h-1.5 rounded-full bg-gray-100 mt-1.5 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: item.status === 'completed' ? '#10B981' : item.status === 'in-progress' ? '#0D9488' : '#D1D5DB' }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                      <span className={`text-xs font-bold shrink-0 ${
                        item.status === 'completed' ? 'text-emerald-600' :
                        item.status === 'in-progress' ? 'text-teal-600' :
                        'text-gray-400'
                      }`}>{item.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── BEFORE/AFTER COMPARISON ─── */}
        <section id="comparison" className="py-16" style={{ background: '#FAFFFE' }}>
          <div className="max-w-5xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Building2 className="size-3" />
                  OUR VISION
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  From Vision to Reality
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  See how Hayat Life Care is transforming Chattogram&apos;s healthcare landscape
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Current/Construction Phase */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg group">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold">
                    UNDER CONSTRUCTION
                  </div>
                  <Image
                    src="/images/hero-building.png"
                    alt="Hayat Life Care Construction"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-5 bg-white">
                    <h3 className="font-bold text-gray-900 mb-2">Current Progress</h3>
                    <p className="text-sm text-gray-600">Foundation and structural work underway. 35% complete as of 2025.</p>
                    <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '35%', background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                    </div>
                  </div>
                </div>

                {/* Future/Vision Phase */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-teal-200 shadow-lg group">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                    COMPLETED VISION
                  </div>
                  <Image
                    src="/images/about-aerial.png"
                    alt="Hayat Life Care Future Vision"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-5 bg-white">
                    <h3 className="font-bold text-gray-900 mb-2">Future Vision (2028)</h3>
                    <p className="text-sm text-gray-600">Complete 8+ floor complex with 11 business wings and specialized hospital.</p>
                    <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── 6. SERVICES / 11 BUSINESS WINGS ─── */}
        <section id="services" className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#0F172A' }}>
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #0D9488, transparent)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #10B981, transparent)' }} />

          <div className="relative max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-4">
                  <Sparkles className="size-3" />
                  COMPREHENSIVE CARE
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {t('Our 11 Business Wings')}
                </h2>
                <div className="relative">
                  <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                </div>
                <p className="mt-4 text-gray-300 max-w-xl mx-auto">
                  Comprehensive services designed to serve every aspect of your health and daily life.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/30 hover:bg-white/10 border-l-4"
                    style={{ borderLeftColor: '#0D9488' }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 40px rgba(13,148,136,0.2), 0 8px 30px rgba(0,0,0,0.3)' }} />
                    <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)' }} />
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                          style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.25), rgba(16,185,129,0.25))' }}
                        >
                          <service.icon className="size-6" style={{ color: '#34D399' }} />
                        </div>
                        <span className="text-3xl font-black text-white/10">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── 7. LEADERSHIP SECTION ─── */}
        <section id="leadership" className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#FAFFFE' }}>
          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#0D9488 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="relative max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Users className="size-3" />
                  LEADERSHIP
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Meet the Visionaries')}
                </h2>
                <p className="text-gray-500 text-lg">Steering Our Journey</p>
                <div className="w-20 h-1 mx-auto rounded-full mt-3" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Chairman */}
              <FadeIn direction="right">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-teal-200"
                >
                  <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="p-10 text-center">
                    <div className="relative inline-block mb-6">
                      <div
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold text-white ring-4 ring-teal-100 group-hover:ring-teal-200 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                      >
                        CS
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                        <Star className="size-4 text-white fill-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Capt. Md Showkat Hossain Chowdhury
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: '#0D9488' }}>
                      Chairman
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      Seasoned Master Mariner and Chairman of Marinus Pvt. Ltd. and Hayat Holdings.
                      With decades of leadership experience in maritime and business sectors, he brings
                      strategic vision and unwavering commitment to Hayat Life Care&apos;s mission.
                    </p>
                    <div className="flex justify-center gap-3">
                      <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-teal-100 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                        <Linkedin className="size-4 text-gray-500 hover:text-teal-600" />
                      </a>
                      <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-teal-100 flex items-center justify-center transition-colors" aria-label="Facebook">
                        <Facebook className="size-4 text-gray-500 hover:text-teal-600" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>

              {/* Managing Director */}
              <FadeIn direction="left">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-teal-200"
                >
                  <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="p-10 text-center">
                    <div className="relative inline-block mb-6">
                      <div
                        className="inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold text-white ring-4 ring-teal-100 group-hover:ring-teal-200 transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                      >
                        DA
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                        <Stethoscope className="size-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Dr. Mohammad Azizul Haque
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: '#0D9488' }}>
                      Managing Director
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      Associate Professor at Chattogram Medical College and Founder Director of
                      multiple hospitals. A distinguished medical professional with a passion for
                      accessible, quality healthcare driving Hayat Life Care&apos;s clinical excellence.
                    </p>
                    <div className="flex justify-center gap-3">
                      <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-teal-100 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                        <Linkedin className="size-4 text-gray-500 hover:text-teal-600" />
                      </a>
                      <a href="#" className="w-9 h-9 rounded-full bg-gray-100 hover:bg-teal-100 flex items-center justify-center transition-colors" aria-label="Facebook">
                        <Facebook className="size-4 text-gray-500 hover:text-teal-600" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── TRUST / WHY CHOOSE US SECTION ─── */}
        <section id="trust" className="py-20 md:py-28" style={{ background: '#F8FAFC' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Award className="size-3" />
                  WHY CHOOSE US
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Why Choose Hayat Life Care?')}
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Award, title: 'Largest in Chattogram', desc: 'The biggest diagnostic and doctor consultation center in the region' },
                { icon: MapPin, title: 'Prime Location', desc: 'Near Chittagong Medical College Hospital, the most trusted healthcare zone' },
                { icon: Shield, title: 'No Bank Loan', desc: 'Entirely funded by shareholder investments - zero debt burden' },
                { icon: Heart, title: 'Family-Focused', desc: 'Converting waiting time into quality family time with entertainment facilities' },
                { icon: TrendingUp, title: 'Buyback Guarantee', desc: 'After 3 years at 5% higher price - secure exit option' },
                { icon: FileCheck, title: 'Transparent Operations', desc: 'Govt. approved third-party audit, regular financial reporting' },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300"
                  >
                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-shadow duration-300 group-hover:shadow-md"
                      style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}
                    >
                      <item.icon className="size-7" style={{ color: '#0D9488' }} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── COMPARISON SECTION ─── */}
        <section id="comparison-table" className="py-20 md:py-28" style={{ background: '#FAFFFE' }}>
          <div className="max-w-5xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Sparkles className="size-3" />
                  THE HAYAT DIFFERENCE
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  How We Compare
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  See what sets Hayat Life Care apart from traditional healthcare facilities
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white rounded-2xl border shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                        <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                        <th className="px-6 py-4 text-center text-white font-semibold">Hayat Life Care</th>
                        <th className="px-6 py-4 text-center text-white/80 font-semibold">Traditional Hospitals</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { feature: 'Healthcare + Daily Essentials', us: true, them: false },
                        { feature: '11 Business Wings Under One Roof', us: true, them: false },
                        { feature: 'No Bank Loan / Zero Debt', us: true, them: false },
                        { feature: 'Buyback Guarantee (+5%)', us: true, them: false },
                        { feature: 'Family Entertainment Zone', us: true, them: false },
                        { feature: 'AI-Powered Diagnostics', us: true, them: false },
                        { feature: 'Restaurant & Juice Bar On-Site', us: true, them: false },
                        { feature: 'Super Shop & Pharmacy', us: true, them: false },
                        { feature: 'Children Amusement Park', us: true, them: false },
                        { feature: 'Transparent Profit Sharing', us: true, them: false },
                      ].map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-teal-50/30' : 'bg-white'}>
                          <td className="px-6 py-3.5 font-medium text-gray-800">{row.feature}</td>
                          <td className="px-6 py-3.5 text-center">
                            <Check className="size-5 mx-auto text-green-500" />
                          </td>
                          <td className="px-6 py-3.5 text-center">
                            <X className="size-5 mx-auto text-red-400" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── PARTNERS & AFFILIATIONS ─── */}
        <section id="partners" className="py-16" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Award className="size-3" />
                  TRUSTED PARTNERS
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Our Partners & Affiliations
                </h2>
                <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </FadeIn>
            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                {[
                  { name: 'Hayat Holdings', desc: 'Parent Company', icon: Building2 },
                  { name: 'Marinus Pvt. Ltd.', desc: 'Maritime & Logistics', icon: Ship },
                  { name: 'CMCH', desc: 'Medical College Hospital', icon: Stethoscope },
                  { name: 'RJSC', desc: 'Registered with Joint Stock', icon: FileCheck },
                  { name: 'CDA Approved', desc: 'Chittagong Development Authority', icon: Shield },
                ].map((partner, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="group flex flex-col items-center gap-3 p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 min-w-[160px]"
                    style={{ boxShadow: '0 0 0 rgba(13,148,136,0)' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(13,148,136,0.1), 0 8px 25px rgba(0,0,0,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 rgba(13,148,136,0)')}
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                      <partner.icon className="size-7 text-white" />
                    </div>
                    <div className="text-sm font-bold text-gray-900 text-center">{partner.name}</div>
                    <div className="text-xs text-gray-700 text-center leading-snug">{partner.desc}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── DOCTOR DIRECTORY SECTION ─── */}
        <section id="doctors" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 40%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Stethoscope className="size-3" />
                  OUR SPECIALISTS
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Doctor Directory')}
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
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

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctorsData
                .filter(d => doctorFilter === 'All' || d.specialty === doctorFilter)
                .filter(d => doctorSearch === '' || d.name.toLowerCase().includes(doctorSearch.toLowerCase()) || d.specialty.toLowerCase().includes(doctorSearch.toLowerCase()))
                .map((doc, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden hover:shadow-xl hover:border-teal-200 transition-all duration-300"
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
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{doc.name}</h3>
                      <p className="text-sm font-medium mb-2" style={{ color: '#0D9488' }}>{doc.specialty}</p>
                      {doc.designation && <p className="text-xs text-gray-500 mb-3">{doc.designation}</p>}
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4">
                        <Clock className="size-3" />
                        <span>{doc.schedule}</span>
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full w-full text-white text-xs"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                        onClick={() => {
                          setAppointmentDoctor(doc.name)
                          setIsAppointmentOpen(true)
                        }}
                      >
                        <CalendarCheck className="size-3.5 mr-1" />
                        Book Appointment
                      </Button>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {doctorsData.filter(d => doctorFilter === 'All' || d.specialty === doctorFilter).filter(d => doctorSearch === '' || d.name.toLowerCase().includes(doctorSearch.toLowerCase()) || d.specialty.toLowerCase().includes(doctorSearch.toLowerCase())).length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <Stethoscope className="size-12 mx-auto mb-3 opacity-30" />
                <p>No doctors found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Section divider */}
        <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />

        {/* ─── GALLERY SECTION ─── */}
        <section id="gallery" className="py-20 md:py-28" style={{ background: '#FAFFFE' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Building2 className="size-3" />
                  WORLD-CLASS FACILITIES
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Our Facilities')}
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Explore our world-class facilities designed for comfort, care, and convenience. Click any image to view full size.
                </p>
                <div className="flex justify-center mt-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-medium">
                    <ZoomIn className="size-3" />
                    8 Photos · Click to enlarge
                  </span>
                </div>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { src: '/images/hero-building.png', alt: 'Hayat Life Care Exterior', span: 'col-span-2 row-span-2', idx: 0 },
                { src: '/images/interior-lobby.png', alt: 'Grand Lobby & Reception', idx: 1 },
                { src: '/images/medical-lab.png', alt: 'Advanced Diagnostic Lab', idx: 2 },
                { src: '/images/doctor-chamber.png', alt: 'Doctor Consultation Chamber', idx: 3 },
                { src: '/images/super-shop.png', alt: 'Super Shop', idx: 4 },
                { src: '/images/restaurant.png', alt: 'Restaurant & Dining', idx: 5 },
                { src: '/images/children-park.png', alt: 'Children Amusement Park', idx: 6 },
                { src: '/images/about-aerial.png', alt: 'Aerial View - O.R. Nizam Road', span: 'col-span-2', idx: 7 },
              ].map((img, i) => (
                <StaggerItem key={i} className={img.span || ''}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative group rounded-2xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer aspect-video"
                    onClick={() => setLightboxIndex(img.idx)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <ZoomIn className="size-4 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      {img.alt}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── VIRTUAL BUILDING TOUR ─── */}
        <section id="virtual-tour" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Building2 className="size-3" />
                  EXPLORE OUR BUILDING
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  Virtual Building Tour
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Click on any floor to explore the facilities available at each level
                </p>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="flex flex-col-reverse lg:flex-row gap-8 items-center">
                {/* Building visualization */}
                <div className="w-full lg:w-1/2">
                  <div className="relative mx-auto" style={{ maxWidth: '400px' }}>
                    {/* Building structure */}
                    <div className="space-y-1.5">
                      {[
                        { label: 'L8', color: '#0D9488', active: true },
                        { label: 'L7', color: '#0F766E', active: true },
                        { label: 'L6', color: '#115E59', active: true },
                        { label: 'L5', color: '#134E4A', active: true },
                        { label: 'L4', color: '#0D9488', active: true },
                        { label: 'L3', color: '#0F766E', active: true },
                        { label: 'L2', color: '#115E59', active: true },
                        { label: 'L1', color: '#134E4A', active: true },
                        { label: 'B1/B2', color: '#1E293B', active: true },
                      ].map((floor, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.04, x: 12 }}
                          className="w-full py-3 px-6 rounded-lg text-white text-sm font-semibold flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:brightness-110 border border-white/10 hover:border-white/25"
                          style={{ background: floor.color }}
                          onClick={() => {
                            const floorsSection = document.getElementById('floors');
                            if (floorsSection) floorsSection.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <span>{floor.label}</span>
                          <ArrowRight className="size-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      ))}
                    </div>
                    {/* Building base */}
                    <div className="mt-2 py-3 rounded-b-2xl text-center text-xs text-gray-500 font-medium" style={{ background: '#F1F5F9' }}>
                      55 Katha · O.R. Nizam Road · Chattogram
                    </div>
                  </div>
                </div>
                {/* Info panel */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-white rounded-2xl border shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">8+ Floors of Excellence</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Hayat Life Care is designed as a vertical healthcare city, with each floor dedicated to specific services. From secure basement parking to specialized medical institutes on the upper floors, every level is purpose-built for your convenience and care.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Car, label: 'Basement Parking', count: '150+' },
                        { icon: ShoppingBag, label: 'Retail & Shopping', count: '5 Wings' },
                        { icon: UtensilsCrossed, label: 'Food & Dining', count: '3 Wings' },
                        { icon: Stethoscope, label: 'Medical Services', count: '3 Floors' },
                        { icon: Microscope, label: 'Diagnostics', count: 'AI-Powered' },
                        { icon: Baby, label: 'Family Fun', count: 'Play Zone' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-teal-200 hover:shadow-sm transition-all duration-200">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0" style={{ background: 'rgba(13,148,136,0.12)' }}>
                            <item.icon className="size-4" style={{ color: '#0D9488' }} />
                          </div>
                          <div>
                            <div className="text-xs text-gray-600 font-medium">{item.label}</div>
                            <div className="text-sm font-bold text-gray-900">{item.count}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── GALLERY LIGHTBOX ─── */}
        <AnimatePresence>
          {lightboxIndex >= 0 && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center"
              onClick={() => setLightboxIndex(-1)}
            >
              {/* Image counter top center */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold text-white" style={{ background: 'rgba(13,148,136,0.8)' }}>
                  {lightboxIndex + 1} / {lightboxImages.length}
                </span>
              </div>
              <button
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                onClick={() => setLightboxIndex(-1)}
                aria-label="Close lightbox"
              >
                <X className="size-6" />
              </button>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10 shadow-lg hover:scale-110"
                style={{ background: 'rgba(13,148,136,0.7)' }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length) }}
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10 shadow-lg hover:scale-110"
                style={{ background: 'rgba(13,148,136,0.7)' }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % lightboxImages.length) }}
                aria-label="Next image"
              >
                <ChevronRight className="size-6" />
              </button>
              <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4" onClick={e => e.stopPropagation()}>
                <Image
                  src={lightboxImages[lightboxIndex]?.src || ''}
                  alt={lightboxImages[lightboxIndex]?.alt || ''}
                  fill
                  className="object-contain"
                />
              </div>
              {/* Caption bar */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <div className="px-5 py-2.5 rounded-xl backdrop-blur-md text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
                  <div className="text-sm font-semibold">{lightboxImages[lightboxIndex]?.alt}</div>
                  <div className="text-[11px] text-white/50 mt-0.5">Use ← → arrow keys to navigate · ESC to close</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── 8. VISION & MISSION ─── */}
        <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-white/10" />

          <div className="relative max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {t('Vision & Mission')}
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
                  <p className="text-white/90 leading-relaxed">
                    To become Chattogram&apos;s most trusted and comprehensive healthcare &amp; lifestyle
                    destination — where cutting-edge medical services meet everyday convenience, all
                    under one roof. We envision a future where every family has access to world-class
                    healthcare without leaving the city.
                  </p>
                </div>
              </FadeIn>

              <FadeIn direction="left">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <Shield className="size-6" /> Our Mission
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Deliver integrated healthcare services across all major specialties',
                      'Provide daily essentials and lifestyle amenities for convenience',
                      'Ensure transparent, investor-friendly operations with no debt',
                      'Build a sustainable, profitable model for all shareholders',
                      'Expand into specialized hospital services in the future',
                    ].map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 shrink-0 mt-0.5">
                          <Check className="size-3.5 text-white" />
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn>
              <div className="mt-14 text-center">
                <blockquote className="text-xl md:text-2xl text-white font-light italic leading-relaxed max-w-3xl mx-auto">
                  &ldquo;This isn&apos;t just a health facility — it&apos;s a lifestyle destination. Built with
                  purpose, driven by innovation and guided by heart —{' '}
                  <span className="font-semibold">&lsquo;To Save and Serve The Generation.&rsquo;</span>&rdquo;
                </blockquote>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── TESTIMONIALS SECTION ─── */}
        <section id="testimonials" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 40%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Star className="size-3" />
                  TESTIMONIALS
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('What People Say')}
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'Ahmed Rahman',
                  role: 'Business Owner, Chattogram',
                  text: 'Hayat Life Care is exactly what Chattogram needed. Having all healthcare services under one roof with daily essentials is a game-changer for busy families like mine.',
                  initials: 'AR',
                },
                {
                  name: 'Dr. Fatima Begum',
                  role: 'Senior Consultant, CMCH',
                  text: 'As a medical professional, I appreciate the vision behind this project. The combination of advanced diagnostics with lifestyle facilities will transform patient experience in our city.',
                  initials: 'FB',
                },
                {
                  name: 'Mohammad Karim',
                  role: 'Investor & Shareholder',
                  text: 'The transparent operations, no-bank-loan policy, and buyback guarantee gave me the confidence to invest. This project has real potential for sustainable returns.',
                  initials: 'MK',
                },
              ].map((testimonial, i) => (
                <StaggerItem key={i}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 h-full flex flex-col">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 italic relative pl-6">
                      <span className="absolute left-0 top-0 text-3xl leading-none" style={{ color: '#0D9488', opacity: 0.3 }}>&ldquo;</span>
                      {testimonial.text}
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                      >
                        {testimonial.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{testimonial.name}</div>
                        <div className="text-xs text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ─── HEALTH TIPS & BLOG SECTION ─── */}
        <section id="health-tips" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Lightbulb className="size-3" />
                  HEALTH & WELLNESS
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Health Tips & Insights')}
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Stay informed with expert health advice and wellness guidance from our medical team.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  category: 'Cardiology',
                  title: '5 Habits for a Healthy Heart',
                  excerpt: 'Simple lifestyle changes that can significantly reduce your risk of heart disease. From diet modifications to daily exercise routines recommended by our cardiologists.',
                  color: '#EF4444',
                },
                {
                  icon: Shield,
                  category: 'Preventive Care',
                  title: 'Why Annual Health Checkups Matter',
                  excerpt: 'Regular health screenings can detect potential issues early when they are most treatable. Learn which tests you should prioritize based on your age and family history.',
                  color: '#0D9488',
                },
                {
                  icon: Sparkles,
                  category: 'Wellness',
                  title: 'Managing Stress in Daily Life',
                  excerpt: 'Chronic stress affects both mental and physical health. Discover evidence-based techniques from our specialists for maintaining balance and well-being.',
                  color: '#D97706',
                },
                {
                  icon: Baby,
                  category: 'Pediatrics',
                  title: 'Childhood Nutrition Essentials',
                  excerpt: 'Proper nutrition during childhood sets the foundation for lifelong health. Our pediatricians share guidelines for balanced meals and healthy eating habits.',
                  color: '#8B5CF6',
                },
                {
                  icon: Microscope,
                  category: 'Diagnostics',
                  title: 'Understanding Your Lab Results',
                  excerpt: 'Lab reports can be confusing. Our diagnostic experts break down the key numbers and what they mean for your health in simple, understandable terms.',
                  color: '#06B6D4',
                },
                {
                  icon: Users,
                  category: 'Family Health',
                  title: 'Creating a Family Health Plan',
                  excerpt: 'A proactive approach to family wellness involves regular checkups, emergency preparedness, and open communication about health concerns across generations.',
                  color: '#10B981',
                },
              ].map((tip, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all duration-300"
                  >
                    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${tip.color}, ${tip.color}88)` }} />
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-xl"
                          style={{ background: `${tip.color}15` }}
                        >
                          <tip.icon className="size-5" style={{ color: tip.color }} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: `${tip.color}10`, color: tip.color }}>
                          {tip.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {tip.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-bold" style={{ color: tip.color }}>
                        <BookOpen className="size-4" />
                        Read More
                        <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Section divider */}
        <div className="w-full py-1" style={{ background: 'linear-gradient(90deg, transparent, #0D948820, #10B98120, transparent)' }} />

        {/* ─── 9. INVESTMENT SECTION ─── */}
        <section id="investment" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <TrendingUp className="size-3" />
                  INVESTMENT OPPORTUNITY
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Pathways to Prestige Ownership')}
                </h2>
                <div className="relative">
                  <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                </div>
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Invest in Chattogram&apos;s premier healthcare &amp; lifestyle complex with guaranteed benefits and transparent returns.
                </p>
              </div>
            </FadeIn>

            {/* Share Price Widget */}
            <FadeIn delay={0.2}>
              <div className="max-w-lg mx-auto mb-8">
                <div className="bg-white rounded-2xl border shadow-lg overflow-hidden">
                  <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                          <TrendingUp className="size-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">HLC Share Price</div>
                          <div className="text-[11px] text-gray-500">1st Phase</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black" style={{ color: '#0D9488' }}>৳10 <span className="text-sm font-medium text-gray-500">Lacs</span></div>
                        <div className="flex items-center justify-end gap-1 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-emerald-600 font-semibold">Live</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                        <div className="text-[10px] text-gray-500 mb-0.5">Phase 1</div>
                        <div className="text-sm font-bold text-gray-900">৳10L</div>
                        <div className="text-[10px] text-emerald-600">2,500 shares</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                        <div className="text-[10px] text-gray-500 mb-0.5">Phase 2</div>
                        <div className="text-sm font-bold text-gray-900">৳15L</div>
                        <div className="text-[10px] text-amber-600">500 shares</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                        <div className="text-[10px] text-gray-500 mb-0.5">Phase 3</div>
                        <div className="text-sm font-bold text-gray-900">৳20L</div>
                        <div className="text-[10px] text-rose-600">1,000 shares</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Investment intro */}
            <FadeIn>
              <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Hayat Life Care offers a unique opportunity to invest in Chattogram&apos;s healthcare future. With 11 revenue-generating business wings, zero bank loans, and a guaranteed buyback policy, your investment is secured by real assets and transparent operations.
              </p>
            </FadeIn>

            {/* Key investment info */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <FadeIn delay={0.1}>
                <div className="text-center p-6 bg-white rounded-2xl border shadow-sm">
                  <HandCoins className="size-8 mx-auto mb-3" style={{ color: '#D97706' }} />
                  <div className="text-sm text-gray-500 mb-1">Share Price</div>
                  <div className="text-2xl font-bold text-gray-900">10 Lacs BDT</div>
                  <div className="text-xs text-gray-400 mt-1">Per Share</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="text-center p-6 bg-white rounded-2xl border shadow-sm">
                  <Users className="size-8 mx-auto mb-3" style={{ color: '#0D9488' }} />
                  <div className="text-sm text-gray-500 mb-1">Total Shares</div>
                  <div className="text-2xl font-bold text-gray-900">4,950</div>
                  <div className="text-xs text-gray-400 mt-1">Maximum Available</div>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="text-center p-6 bg-white rounded-2xl border shadow-sm">
                  <Shield className="size-8 mx-auto mb-3" style={{ color: '#10B981' }} />
                  <div className="text-sm text-gray-500 mb-1">Buyback Policy</div>
                  <div className="text-2xl font-bold text-gray-900">+5% After 3 Yrs</div>
                  <div className="text-xs text-gray-400 mt-1">Guaranteed Exit</div>
                </div>
              </FadeIn>
            </div>

            {/* Payment options */}
            <FadeIn>
              <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="p-6 bg-white rounded-2xl border shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="size-5" style={{ color: '#0D9488' }} />
                    Payment Option A
                  </h4>
                  <div className="space-y-2">
                    {[
                      '50% Down Payment',
                      '25% Within 30 Days',
                      '25% Within 60-90 Days',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(13,148,136,0.1)' }}>
                          <Check className="size-3.5" style={{ color: '#0D9488' }} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-white rounded-2xl border shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="size-5" style={{ color: '#D97706' }} />
                    Payment Option B{' '}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Directors Only</span>
                  </h4>
                  <div className="space-y-2">
                    {[
                      '35% Down Payment',
                      '30% Within 30 Days',
                      '35% Within 60-90 Days',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'rgba(217,119,6,0.1)' }}>
                          <Check className="size-3.5" style={{ color: '#D97706' }} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Benefit codes */}
            <FadeIn>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
                Shareholder Benefit Codes
              </h3>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
              {benefitCodes.map((benefit) => (
                <StaggerItem key={benefit.code}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="p-5 bg-white rounded-2xl border shadow-sm text-center hover:shadow-lg hover:border-teal-200 transition-all duration-300"
                  >
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                      style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.1), rgba(16,185,129,0.1))' }}
                    >
                      <benefit.icon className="size-5" style={{ color: '#0D9488' }} />
                    </div>
                    <div className="text-xs font-bold mb-1 px-2 py-0.5 rounded-full inline-block" style={{ background: 'rgba(13,148,136,0.1)', color: '#0D9488' }}>
                      {benefit.code}
                    </div>
                    <div className="text-sm font-medium text-gray-800 mt-2">
                      {benefit.title}
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Investment Calculator */}
            <FadeIn>
              <div className="mt-12 max-w-2xl mx-auto bg-white rounded-2xl border shadow-lg overflow-hidden">
                <div className="p-6 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <HandCoins className="size-5" />
                    Investment ROI Calculator
                  </h4>
                  <p className="text-sm text-white/80 mt-1">Estimate your potential returns</p>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Number of Shares</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={investShares}
                        onChange={e => { const v = parseInt(e.target.value); setInvestShares(isNaN(v) ? 1 : Math.min(10, Math.max(1, v))) }}
                        className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Expected Profit Rate (%)</label>
                      <input
                        type="number"
                        min="5"
                        max="20"
                        step="0.5"
                        value={investRate}
                        onChange={e => { const v = parseFloat(e.target.value); setInvestRate(isNaN(v) ? 10 : Math.min(20, Math.max(5, v))) }}
                        className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Investment', value: `৳${(investShares * 10).toFixed(0)}L`, color: '#0D9488', percent: (investShares / 10) * 100 },
                      { label: 'Annual Return', value: `৳${(investShares * 10 * investRate / 100).toFixed(1)}L`, color: '#10B981', percent: Math.min((investShares * investRate / 200) * 100, 100) },
                      { label: '3-Year Return', value: `৳${(investShares * 10 * investRate / 100 * 3).toFixed(1)}L`, color: '#D97706', percent: Math.min((investShares * investRate * 3 / 200) * 100, 100) },
                      { label: 'Buyback Value', value: `৳${(investShares * 10.5).toFixed(1)}L`, color: '#0D9488', percent: (investShares * 10.5 / 105) * 100 },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl text-center relative overflow-hidden" style={{ background: `${item.color}08` }}>
                        <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                        <div className="text-lg font-bold mb-2" style={{ color: item.color }}>{item.value}</div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: item.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(item.percent, 5)}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3 text-center">* Based on projected profit rate. Actual returns may vary. Buyback after 3 years at 5% premium.</p>
                </div>
              </div>
            </FadeIn>

            {/* Key highlights */}
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="grid sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { icon: Shield, text: 'No bank loan will be taken' },
                    { icon: TrendingUp, text: 'Buyback at 5% higher after 3 years' },
                    { icon: Users, text: 'Maximum 4,950 shares' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border shadow-sm">
                      <item.icon className="size-5 shrink-0" style={{ color: '#0D9488' }} />
                      <span className="text-sm font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="rounded-full px-10 text-white font-semibold shadow-xl text-lg h-14"
                    style={{ background: '#D97706' }}
                    asChild
                  >
                    <a href="#contact">
                      Book a Space <ArrowRight className="ml-2 size-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── DOWNLOAD BROCHURE CTA ─── */}
        <section className="relative py-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0D9488 50%, #10B981 100%)' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Learn More?
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
                Download our comprehensive brochure for detailed information about investment opportunities, floor plans, and business wing details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl"
                  style={{ background: '#D97706' }}
                  asChild
                >
                  <a href="#contact">
                    <BookOpen className="size-5 mr-2" />
                    Download Brochure
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25"
                  asChild
                >
                  <a href="tel:01332-850348">
                    <Phone className="size-5 mr-2" />
                    Call Us Now
                  </a>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ─── 10. FAQ SECTION ─── */}
        <section id="faq" className="py-20 md:py-28" style={{ background: '#FAFFFE' }}>
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <HelpCircle className="size-3" />
                  GOT QUESTIONS?
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Frequently Asked Questions')}
                </h2>
                <div className="relative">
                  <div className="w-24 h-1.5 mx-auto rounded-full shadow-[0_0_12px_rgba(13,148,136,0.5)]" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="w-16 h-4 mx-auto -mt-2 rounded-full blur-md opacity-40" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white rounded-xl border shadow-sm px-6 overflow-hidden"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-teal-600 hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          </div>
        </section>

        {/* ─── 11. CONTACT SECTION ─── */}
        <section id="contact" className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FAFFFE 0%, #F0FDFA 50%, #FAFFFE 100%)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-4">
                  <Mail className="size-3" />
                  CONTACT US
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {t('Get In Touch')}
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
                <div className="bg-gradient-to-b from-white to-teal-50/30 rounded-2xl border shadow-lg overflow-hidden" style={{ borderTop: '3px solid', borderImage: 'linear-gradient(90deg, #0D9488, #10B981) 1' }}>
                  <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
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
                      {isFormSubmitting ? 'Sending...' : t('Send Message')}
                    </Button>
                    <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                      <Clock className="size-3" /> We'll respond within 24 hours
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
                      details: ['01332-850348', '01335-074949'],
                      color: '#0D9488',
                    },
                    {
                      icon: MapPinned,
                      title: 'Office',
                      details: ['Probortok Circle Mishmak Manjuri,', 'Badshah Miah Road, Ameerbag, Chattogram'],
                      color: '#10B981',
                    },
                    {
                      icon: Building,
                      title: 'Project Site',
                      details: ['Manashi, O.R. Nizam Road, Chattogram'],
                      color: '#D97706',
                    },
                    {
                      icon: Building2,
                      title: 'Sister Concern',
                      details: ['Hayat Holdings'],
                      color: '#0D9488',
                    },
                    {
                      icon: Mail,
                      title: 'Email',
                      details: ['info@hayatlifecare.com'],
                      color: '#10B981',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border shadow-sm border-l-4" style={{ borderLeftColor: item.color }}>
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
                        style={{ background: `${item.color}15` }}
                      >
                        <item.icon className="size-5" style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{item.title}</div>
                        {item.details.map((d, j) => (
                          <div key={j} className="text-sm text-gray-600">
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Quick appointment button */}
                  <Button
                    className="w-full rounded-xl text-white font-semibold h-12"
                    style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    onClick={() => {
                      setAppointmentDoctor('')
                      setIsAppointmentOpen(true)
                    }}
                  >
                    <CalendarCheck className="size-5 mr-2" />
                    Book an Appointment
                  </Button>

                  {/* Map */}
                  <div className="rounded-2xl overflow-hidden border shadow-sm h-64">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.7!2d91.8!3d22.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sO.R.+Nizam+Road%2C+Chattogram!5e0!3m2!1sen!2sbd!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Hayat Life Care Location"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* Wave divider before footer */}
      <div className="relative -mt-1">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 0V20C240 50 480 50 720 20C960 -10 1200 -10 1440 20V0H0Z" fill="#0F172A"/>
        </svg>
      </div>

      {/* ─── 12. FOOTER ─── */}
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
                      setIsNewsletterSubmitting(true)
                      await new Promise(r => setTimeout(r, 1000))
                      toast.success('Thank you for subscribing!')
                      setNewsletterEmail('')
                      setIsNewsletterSubmitting(false)
                    }
                  }}
                />
                <Button
                  className="rounded-xl h-12 px-6 text-white font-semibold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  disabled={isNewsletterSubmitting || !newsletterEmail}
                  onClick={async () => {
                    setIsNewsletterSubmitting(true)
                    await new Promise(r => setTimeout(r, 1000))
                    toast.success('Thank you for subscribing!')
                    setNewsletterEmail('')
                    setIsNewsletterSubmitting(false)
                  }}
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
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                  <Building2 className="size-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">HAYAT LIFE CARE</div>
                  <div className="text-[10px] tracking-widest uppercase text-gray-500">Chattogram</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-5">
                A premium healthcare &amp; lifestyle complex — a one-stop destination for world-class
                medical services, daily essentials, dining, and family entertainment.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="Facebook">
                  <Facebook className="size-4 text-gray-500 group-hover:text-teal-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="YouTube">
                  <Youtube className="size-4 text-gray-500 group-hover:text-teal-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="Instagram">
                  <Instagram className="size-4 text-gray-500 group-hover:text-teal-400" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-teal-500/20 flex items-center justify-center transition-all duration-200 hover:scale-110 group" aria-label="LinkedIn">
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
                    className="block text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                <a href="#home" className="text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 transition-all duration-200 flex items-center gap-2">
                  <ChevronUp className="size-3" /> Back to Top
                </a>
              </div>
            </div>

            {/* Services List */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <div className="space-y-2 max-h-56 overflow-y-auto dark-scrollbar">
                {['Car Parking', 'ATM Booth', 'Pharmacy', 'Optical Shop', 'Super Shop', 'Coffee Shop', 'Juice Bar', 'Restaurant', 'Children Park', "Doctor's Chamber", 'Diagnostic Center'].map((svc, i) => (
                  <a
                    key={i}
                    href="#services"
                    className="block text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 transition-all duration-200"
                  >
                    {svc}
                  </a>
                ))}
              </div>
            </div>

            {/* More Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">More Links</h4>
              <div className="space-y-2">
                {navLinks.slice(6).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-400 hover:text-teal-300 hover:translate-x-1 transition-all duration-200"
                  >
                    {link.label}
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
                    <div>01332-850348</div>
                    <div>01335-074949</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>info@hayatlifecare.com</div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>
                    Probortok Circle, Badshah Miah Road, Ameerbag, Chattogram
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>Sister Concern of Hayat Holdings</div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>Sat-Thu: 9AM - 9PM<br/>Friday: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-2 font-medium">&copy; {new Date().getFullYear()} Hayat Life Care. All Rights Reserved. <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-teal-400 hover:text-teal-300 transition-colors">&uarr; Back to Top</button></div>
            <div className="flex items-center gap-4">
              <span>A sister concern of Hayat Holdings</span>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-1 text-gray-600 hover:text-teal-400 transition-colors"
                aria-label="Admin Panel"
              >
                <Settings className="size-3" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── WHATSAPP FLOATING BUTTON ─── */}
      <a
        href="https://wa.me/8801617977232"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 group"
        style={{ background: '#25D366' }}
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare className="size-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" style={{ boxShadow: '0 0 6px rgba(37,211,102,0.5)' }} />
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">WhatsApp</span>
      </a>

      {/* ─── CHAT WIDGET FLOATING BUTTON ─── */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            key="chat-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-20 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center text-white cursor-pointer group"
            style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
            aria-label="Open AI Chat Assistant"
          >
            <MessageCircle className="size-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
            <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">AI Chat</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── CHAT WIDGET DIALOG ─── */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            key="chat-dialog"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-4 sm:right-6 z-[60] w-[340px] sm:w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white"
            style={{ height: '500px' }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
              <div className="flex items-center gap-2">
                <MessageCircle className="size-5" />
                <div>
                  <div className="font-semibold text-sm">Hayat Life Care Assistant</div>
                  <div className="text-[11px] text-white/70">Ask us anything</div>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Close Chat"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ height: '370px', scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}>
              {chatMessages.length === 0 && (
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 text-sm text-gray-700 max-w-[85%]">
                    👋 Hello! I'm the Hayat Life Care assistant. How can I help you today?
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Tell me about investment', 'What services are available?', 'How to book appointment?'].map((q) => (
                      <button
                        key={q}
                        onClick={() => { setChatInput(q); }}
                        className="text-xs px-3 py-1.5 rounded-full border border-teal-200 text-teal-700 hover:bg-teal-50 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                    style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #0D9488, #10B981)' } : {}}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-2xl rounded-bl-md text-sm flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Chat input */}
            <div className="border-t px-3 py-2 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend() }}
                placeholder="Type a message..."
                className="flex-1 text-sm border-none outline-none bg-transparent placeholder:text-gray-400"
                disabled={isChatLoading}
              />
              <button
                onClick={handleChatSend}
                disabled={isChatLoading || !chatInput.trim()}
                className="p-2 rounded-full transition-colors disabled:opacity-40"
                style={{ color: '#0D9488' }}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── APPOINTMENT BOOKING DIALOG ─── */}
      <Dialog open={isAppointmentOpen} onOpenChange={setIsAppointmentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CalendarCheck className="size-5" style={{ color: '#0D9488' }} />
              Book Appointment
            </DialogTitle>
            <DialogDescription>
              {appointmentDoctor ? `Schedule an appointment with ${appointmentDoctor}` : 'Schedule your appointment at Hayat Life Care'}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (isAppointmentSubmitting) return
              setIsAppointmentSubmitting(true)
              try {
                const res = await fetch('/api/inquiries', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: appointmentForm.name,
                    phone: appointmentForm.phone,
                    subject: `Appointment Request - ${appointmentDoctor || 'General'}`,
                    message: `Date: ${appointmentForm.date}, Time: ${appointmentForm.time}. ${appointmentForm.message}`,
                  }),
                })
                if (res.ok) {
                  toast.success('Appointment request submitted! We will confirm your booking shortly.')
                  setAppointmentForm({ name: '', phone: '', date: '', time: '', message: '' })
                  setIsAppointmentOpen(false)
                } else {
                  toast.error('Failed to submit. Please try again.')
                }
              } catch {
                toast.error('Network error. Please try again later.')
              } finally {
                setIsAppointmentSubmitting(false)
              }
            }}
            className="space-y-4 pt-2"
          >
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</Label>
              <Input
                placeholder="Your full name"
                required
                value={appointmentForm.name}
                onChange={e => setAppointmentForm(p => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</Label>
              <Input
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                required
                value={appointmentForm.phone}
                onChange={e => setAppointmentForm(p => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Date *</Label>
                <Input
                  type="date"
                  required
                  value={appointmentForm.date}
                  onChange={e => setAppointmentForm(p => ({ ...p, date: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Time *</Label>
                <Select value={appointmentForm.time} onValueChange={v => setAppointmentForm(p => ({ ...p, time: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                    <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                    <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                    <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                    <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                    <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                    <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                    <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Additional Notes</Label>
              <Textarea
                placeholder="Any specific concerns or questions..."
                className="min-h-[80px]"
                value={appointmentForm.message}
                onChange={e => setAppointmentForm(p => ({ ...p, message: e.target.value }))}
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white font-semibold"
              style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
              disabled={isAppointmentSubmitting}
            >
              {isAppointmentSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <CalendarCheck className="size-4 mr-2" />}
              {isAppointmentSubmitting ? 'Booking...' : 'Confirm Appointment'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─── ADMIN LOGIN DIALOG ─── */}
      <Dialog open={isAdminOpen && !isLoggedIn} onOpenChange={(open) => { if (!open) setIsAdminOpen(false) }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="size-5" style={{ color: '#0D9488' }} />
              Admin Login
            </DialogTitle>
            <DialogDescription>Enter your credentials to access the admin dashboard.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg">
                {loginError}
              </div>
            )}
            <div>
              <Label htmlFor="admin-email" className="text-sm font-medium text-gray-700 mb-1 block">Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@hayatlifecare.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAdminLogin() }}
              />
            </div>
            <div>
              <Label htmlFor="admin-password" className="text-sm font-medium text-gray-700 mb-1 block">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAdminLogin() }}
              />
            </div>
            <Button
              onClick={handleAdminLogin}
              disabled={isLoginLoading}
              className="w-full text-white font-semibold"
              style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
            >
              {isLoginLoading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {isLoginLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── ADMIN DASHBOARD FULL-SCREEN OVERLAY ─── */}
      <AnimatePresence>
        {isAdminOpen && isLoggedIn && (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-white overflow-hidden"
          >
            {/* Admin Header */}
            <div className="h-14 flex items-center justify-between px-6 text-white" style={{ background: '#0F172A' }}>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                  <Building2 className="size-4 text-white" />
                </div>
                <span className="font-bold text-lg">Hayat Life Care Admin</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 hidden sm:block">admin@hayatlifecare.com</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setIsAdminOpen(false); setIsLoggedIn(false); setAdminEmail(''); setAdminPassword('') }}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="size-4 mr-1" /> Exit
                </Button>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close Admin"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
              {/* Sidebar */}
              <div className="w-56 shrink-0 border-r bg-gray-50 overflow-y-auto hidden md:block">
                <nav className="p-3 space-y-1">
                  {[
                    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                    { id: 'inquiries', icon: Inbox, label: 'Inquiries' },
                    { id: 'services', icon: Wrench, label: 'Services' },
                    { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
                    { id: 'leaders', icon: UserPlus, label: 'Leaders' },
                    { id: 'settings', icon: Settings, label: 'Settings' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setAdminTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        adminTab === tab.id
                          ? 'text-white shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      style={adminTab === tab.id ? { background: 'linear-gradient(135deg, #0D9488, #10B981)' } : {}}
                    >
                      <tab.icon className="size-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Mobile tab bar */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 border-t bg-white flex overflow-x-auto z-10">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'inquiries', icon: Inbox, label: 'Inquiries' },
                  { id: 'services', icon: Wrench, label: 'Services' },
                  { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
                  { id: 'leaders', icon: UserPlus, label: 'Leaders' },
                  { id: 'settings', icon: Settings, label: 'Settings' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setAdminTab(tab.id)}
                    className={`flex-1 flex flex-col items-center gap-1 px-2 py-2 text-[10px] font-medium min-w-[60px] ${
                      adminTab === tab.id ? 'text-teal-600' : 'text-gray-400'
                    }`}
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 pb-20 md:pb-6">
                {/* ── Dashboard Tab ── */}
                {adminTab === 'dashboard' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Inquiries</div>
                        <div className="text-2xl font-bold text-gray-900">{inquiries.length}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">New: {inquiries.filter(i => i.status === 'new').length}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px]">Read: {inquiries.filter(i => i.status === 'read').length}</Badge>
                          <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">Replied: {inquiries.filter(i => i.status === 'replied').length}</Badge>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Services</div>
                        <div className="text-2xl font-bold text-gray-900">{adminServices.length}</div>
                        <div className="text-xs text-teal-600 mt-2">{adminServices.filter(s => s.active).length} active</div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total FAQs</div>
                        <div className="text-2xl font-bold text-gray-900">{adminFaqs.length}</div>
                        <div className="text-xs text-teal-600 mt-2">{adminFaqs.filter(f => f.active).length} active</div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Leaders</div>
                        <div className="text-2xl font-bold text-gray-900">{leaders.length}</div>
                        <div className="text-xs text-teal-600 mt-2">Team members</div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Subject</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiries.slice(0, 5).map((inq) => (
                              <tr key={inq.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{inq.name}</td>
                                <td className="px-4 py-3 text-gray-600">{inq.subject || '—'}</td>
                                <td className="px-4 py-3">
                                  <Badge className={`border-0 text-[10px] ${
                                    inq.status === 'new' ? 'bg-red-100 text-red-700' :
                                    inq.status === 'read' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {inq.status}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-gray-500">{new Date(inq.createdAt).toLocaleDateString()}</td>
                              </tr>
                            ))}
                            {inquiries.length === 0 && (
                              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No inquiries yet</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Inquiries Tab ── */}
                {adminTab === 'inquiries' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">All Inquiries</h2>
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Subject</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inquiries.map((inq) => (
                              <tr key={inq.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{inq.name}</td>
                                <td className="px-4 py-3 text-gray-600">{inq.phone}</td>
                                <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{inq.subject || '—'}</td>
                                <td className="px-4 py-3">
                                  <Select value={inq.status} onValueChange={(val) => updateInquiryStatus(inq.id, val)}>
                                    <SelectTrigger className="w-28 h-7 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="read">Read</SelectItem>
                                      <SelectItem value="replied">Replied</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(inq.createdAt).toLocaleDateString()}</td>
                              </tr>
                            ))}
                            {inquiries.length === 0 && (
                              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No inquiries yet</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Services Tab ── */}
                {adminTab === 'services' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Services</h2>

                    {/* Add Service Form */}
                    <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="size-4" style={{ color: '#0D9488' }} /> Add New Service
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Input placeholder="Title" value={newService.title} onChange={(e) => setNewService(p => ({ ...p, title: e.target.value }))} />
                        <Input placeholder="Slug (e.g. car-parking)" value={newService.slug} onChange={(e) => setNewService(p => ({ ...p, slug: e.target.value }))} />
                        <Input placeholder="Icon name" value={newService.icon} onChange={(e) => setNewService(p => ({ ...p, icon: e.target.value }))} />
                        <Input placeholder="Floor" value={newService.floor} onChange={(e) => setNewService(p => ({ ...p, floor: e.target.value }))} />
                        <Input placeholder="Category" value={newService.category} onChange={(e) => setNewService(p => ({ ...p, category: e.target.value }))} />
                        <div className="sm:col-span-2">
                          <Input placeholder="Description" value={newService.description} onChange={(e) => setNewService(p => ({ ...p, description: e.target.value }))} />
                        </div>
                      </div>
                      <Button onClick={addService} className="mt-3 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                        <Plus className="size-4 mr-1" /> Add Service
                      </Button>
                    </div>

                    {/* Services List */}
                    <div className="space-y-3">
                      {adminServices.map((svc) => (
                        <div key={svc.id} className="bg-white rounded-xl border shadow-sm p-4 flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900">{svc.title}</div>
                            <div className="text-sm text-gray-500 truncate">{svc.description}</div>
                            <div className="flex gap-2 mt-1">
                              {svc.floor && <Badge className="border-0 bg-teal-50 text-teal-700 text-[10px]">{svc.floor}</Badge>}
                              {svc.category && <Badge className="border-0 bg-gray-100 text-gray-600 text-[10px]">{svc.category}</Badge>}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => deleteService(svc.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                      {adminServices.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No services found</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── FAQs Tab ── */}
                {adminTab === 'faqs' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage FAQs</h2>

                    {/* Add FAQ Form */}
                    <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="size-4" style={{ color: '#0D9488' }} /> Add New FAQ
                      </h3>
                      <div className="space-y-3">
                        <Input placeholder="Question" value={newFaq.question} onChange={(e) => setNewFaq(p => ({ ...p, question: e.target.value }))} />
                        <Textarea placeholder="Answer" value={newFaq.answer} onChange={(e) => setNewFaq(p => ({ ...p, answer: e.target.value }))} className="min-h-[80px]" />
                        <div className="flex gap-3 items-center">
                          <Input placeholder="Category" value={newFaq.category} onChange={(e) => setNewFaq(p => ({ ...p, category: e.target.value }))} className="max-w-[200px]" />
                          <Button onClick={addFaq} className="text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                            <Plus className="size-4 mr-1" /> Add FAQ
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* FAQs List */}
                    <div className="space-y-3">
                      {adminFaqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-xl border shadow-sm p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm">{faq.question}</div>
                              <div className="text-sm text-gray-500 mt-1 line-clamp-2">{faq.answer}</div>
                              <Badge className="border-0 bg-gray-100 text-gray-600 text-[10px] mt-2">{faq.category}</Badge>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => deleteFaq(faq.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {adminFaqs.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No FAQs found</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Leaders Tab ── */}
                {adminTab === 'leaders' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Leaders</h2>

                    {/* Add Leader Form */}
                    <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="size-4" style={{ color: '#0D9488' }} /> Add New Leader
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Input placeholder="Name" value={newLeader.name} onChange={(e) => setNewLeader(p => ({ ...p, name: e.target.value }))} />
                        <Input placeholder="Designation" value={newLeader.designation} onChange={(e) => setNewLeader(p => ({ ...p, designation: e.target.value }))} />
                      </div>
                      <Textarea placeholder="Bio" value={newLeader.bio} onChange={(e) => setNewLeader(p => ({ ...p, bio: e.target.value }))} className="mt-3 min-h-[80px]" />
                      <Button onClick={addLeader} className="mt-3 text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                        <Plus className="size-4 mr-1" /> Add Leader
                      </Button>
                    </div>

                    {/* Leaders List */}
                    <div className="space-y-3">
                      {leaders.map((ldr) => (
                        <div key={ldr.id} className="bg-white rounded-xl border shadow-sm p-4 flex items-start gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                            {ldr.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900">{ldr.name}</div>
                            <div className="text-sm" style={{ color: '#0D9488' }}>{ldr.designation}</div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">{ldr.bio}</div>
                          </div>
                        </div>
                      ))}
                      {leaders.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No leaders found</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Settings Tab ── */}
                {adminTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h2>
                    <div className="space-y-6">
                      {Object.entries(siteSettings).map(([group, settings]) => (
                        <div key={group} className="bg-white rounded-xl border shadow-sm p-5">
                          <h3 className="font-semibold text-gray-900 mb-4 capitalize flex items-center gap-2">
                            {group === 'general' && <Building2 className="size-4" style={{ color: '#0D9488' }} />}
                            {group === 'contact' && <Phone className="size-4" style={{ color: '#0D9488' }} />}
                            {group === 'social' && <Users className="size-4" style={{ color: '#0D9488' }} />}
                            {group === 'investment' && <TrendingUp className="size-4" style={{ color: '#0D9488' }} />}
                            {group} Settings
                          </h3>
                          <div className="space-y-3">
                            {(settings as any[]).map((s: any) => (
                              <div key={s.id || s.key}>
                                <Label className="text-xs text-gray-500 mb-1 block">{s.label || s.key}</Label>
                                <Input
                                  value={s.value}
                                  onChange={(e) => {
                                    setSiteSettings(prev => ({
                                      ...prev,
                                      [group]: (prev[group] || []).map((item: any) =>
                                        item.key === s.key ? { ...item, value: e.target.value } : item
                                      ),
                                    }))
                                  }}
                                  className="text-sm"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Button
                        onClick={saveSettings}
                        className="text-white font-semibold"
                        style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                      >
                        <Settings className="size-4 mr-2" /> Save All Settings
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Quick Contact Bar */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <a href="tel:01332-850348" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#0D9488' }}>
                <Phone className="size-4" /> Call Now
              </a>
              <a href="https://wa.me/8801617977232" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#25D366' }}>
                <MessageSquare className="size-4" /> WhatsApp
              </a>
              <a href="#contact" className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#D97706' }}>
                <Mail className="size-4" /> Enquiry
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top button */}
      {scrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-36 right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-xl flex items-center justify-center text-white bg-white/80 backdrop-blur-sm border border-gray-200/50 group"
          style={{ color: '#0D9488' }}
          aria-label="Scroll back to top"
        >
          <ChevronUp className="size-5" />
          <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Back to Top</span>
        </motion.button>
      )}
    </div>
  )
}
