'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
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

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
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
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return { count, ref }
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
  { label: 'Leadership', href: '#leadership' },
  { label: 'Investment', href: '#investment' },
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
]

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
      alert('Settings saved successfully!')
    } catch (err) {
      console.error('Failed to save settings:', err)
      alert('Failed to save settings.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FAFFFE' }}>
      {/* ─── 1. TOP INFO BAR ─── */}
      <div className="w-full py-2 px-4 text-center md:text-left" style={{ background: '#0D9488' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1 text-xs text-white/90">
          <div className="flex items-center gap-2">
            <Phone className="size-3" />
            <span>01332-850348 | 01335-074949</span>
          </div>
          <div className="text-white/80 text-[11px] tracking-wide uppercase">
            Sister Concern of HAYAT HOLDINGS
          </div>
        </div>
      </div>

      {/* ─── 2. NAVBAR ─── */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
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
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="ml-3 rounded-full px-5 font-semibold text-white shadow-lg"
              style={{ background: '#D97706' }}
              asChild
            >
              <a href="#contact">Book a Visit</a>
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
              <SheetContent side="right" className="w-80 bg-white">
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
                      className="px-4 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
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
                      <a href="#contact">Book a Visit</a>
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

      <main className="flex-1">
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
          {/* Gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(13,148,136,0.6) 50%, rgba(16,185,129,0.4) 100%)' }} />
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center"
            style={{ opacity: heroOpacity }}
          >
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8">
                <span className="text-lg">🏥</span>
                One Stop Service for Healthcare &amp; Daily Essentials
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4"
                style={{
                  background: 'linear-gradient(135deg, #0D9488, #10B981, #34D399)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                HAYAT LIFE CARE
              </h1>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="text-xl md:text-2xl text-white/80 italic mb-4 font-light">
                A gathering of endless little moments
              </p>
            </FadeIn>

            <FadeIn delay={0.7}>
              <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                We&apos;re proud to establish Hayat Life Care in one of Chittagong&apos;s most
                trusted healthcare zones — a one-stop destination for world-class medical
                services, daily essentials, dining, and family entertainment.
              </p>
            </FadeIn>

            <FadeIn delay={0.9}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                  asChild
                >
                  <a href="#services">
                    Explore Services <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="rounded-full px-8 text-white font-semibold shadow-xl"
                  style={{ background: '#D97706' }}
                  asChild
                >
                  <a href="#investment">
                    Invest Now <TrendingUp className="ml-2 size-4" />
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
                    className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 md:p-5 text-center"
                  >
                    <div
                      ref={i === 0 ? stat1.ref : i === 1 ? stat2.ref : i === 2 ? stat3.ref : stat4.ref}
                      className="text-3xl md:text-4xl font-black text-white"
                    >
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <div className="text-xs md:text-sm text-white/70 mt-1">{stat.label}</div>
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
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <ChevronDown className="size-5" />
            </motion.div>
          </div>
        </section>

        {/* ─── 4. ABOUT / AT A GLANCE ─── */}
        <section id="about" className="py-20 md:py-28" style={{ background: '#FAFFFE' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  At A Glance
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
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
                      { icon: TrendingUp, label: 'Future', value: '14-18 Floor Expansion Plan' },
                    ].map((item, i) => (
                      <StaggerItem key={i}>
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
                  <p className="text-lg italic font-medium" style={{ color: '#0D9488' }}>
                    &ldquo;One destination. Every need.&rdquo;
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── 5. FLOOR PLAN SECTION ─── */}
        <section id="floors" className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  Floor-wise Facilities
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Explore each floor of Hayat Life Care — from parking to specialized medical institutes.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <Tabs defaultValue="basement" className="w-full">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Vertical floor nav on large screens */}
                  <TabsList className="lg:flex-col lg:h-auto lg:w-52 lg:shrink-0 bg-white border rounded-xl p-2 shadow-sm overflow-x-auto lg:overflow-x-visible">
                    {floors.map((floor) => (
                      <TabsTrigger
                        key={floor.id}
                        value={floor.id}
                        className="lg:w-full lg:justify-start text-xs md:text-sm whitespace-nowrap data-[state=active]:text-white data-[state=active]:shadow-md"
                        style={{
                          // @ts-expect-error CSS custom property
                          '--tw-ring-color': '#0D9488',
                        }}
                      >
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
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  Our 11 Business Wings
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                  Comprehensive services designed to serve every aspect of your health and daily life.
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/30 hover:bg-white/10"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 30px rgba(13,148,136,0.15)' }} />
                    <div className="relative">
                      <div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                        style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.2), rgba(16,185,129,0.2))' }}
                      >
                        <service.icon className="size-6" style={{ color: '#10B981' }} />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
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
        <section id="leadership" className="py-20 md:py-28" style={{ background: '#FAFFFE' }}>
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  Meet the Visionaries
                </h2>
                <p className="text-gray-500 text-lg">Steering Our Journey</p>
                <div className="w-20 h-1 mx-auto rounded-full mt-3" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Chairman */}
              <FadeIn direction="right">
                <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="p-8 text-center">
                    <div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-2xl font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    >
                      CS
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Capt. Md Showkat Hossain Chowdhury
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: '#0D9488' }}>
                      Chairman
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Seasoned Master Mariner and Chairman of Marinus Pvt. Ltd. and Hayat Holdings.
                      With decades of leadership experience in maritime and business sectors, he brings
                      strategic vision and unwavering commitment to Hayat Life Care&apos;s mission.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Managing Director */}
              <FadeIn direction="left">
                <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                  <div className="h-2" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                  <div className="p-8 text-center">
                    <div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-2xl font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    >
                      DA
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Dr. Mohammad Azizul Haque
                    </h3>
                    <p className="text-sm font-semibold mb-4" style={{ color: '#0D9488' }}>
                      Managing Director
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Associate Professor at Chattogram Medical College and Founder Director of
                      multiple hospitals. A distinguished medical professional with a passion for
                      accessible, quality healthcare driving Hayat Life Care&apos;s clinical excellence.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ─── 8. VISION & MISSION ─── */}
        <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border border-white/10" />

          <div className="relative max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  Vision &amp; Mission
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

        {/* ─── 9. INVESTMENT SECTION ─── */}
        <section id="investment" className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  Pathways to Prestige Ownership
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
                <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                  Invest in Chattogram&apos;s premier healthcare &amp; lifestyle complex with guaranteed benefits and transparent returns.
                </p>
              </div>
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
                    className="p-5 bg-white rounded-2xl border shadow-sm text-center hover:shadow-md transition-shadow"
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

        {/* ─── 10. FAQ SECTION ─── */}
        <section id="faq" className="py-20 md:py-28" style={{ background: '#FAFFFE' }}>
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  Frequently Asked Questions
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
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
        <section id="contact" className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <FadeIn>
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  Get In Touch
                </h2>
                <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #10B981)' }} />
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-2 gap-10">
              {/* Contact form */}
              <FadeIn direction="right">
                <div className="bg-white rounded-2xl border shadow-sm p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      alert('Thank you! We will get back to you shortly.')
                    }}
                    className="space-y-4"
                  >
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          Name
                        </label>
                        <Input placeholder="Your full name" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          Email
                        </label>
                        <Input type="email" placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          Phone
                        </label>
                        <Input type="tel" placeholder="+880 1XXX-XXXXXX" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                          Subject
                        </label>
                        <Input placeholder="How can we help?" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Message
                      </label>
                      <Textarea
                        placeholder="Tell us about your inquiry..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl text-white font-semibold"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    >
                      <Send className="size-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
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
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border shadow-sm">
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

      {/* ─── 12. FOOTER ─── */}
      <footer style={{ background: '#0F172A' }}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
              <p className="text-sm text-gray-400 leading-relaxed">
                A premium healthcare &amp; lifestyle complex — a one-stop destination for world-class
                medical services, daily essentials, dining, and family entertainment.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Our Services</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
                {services.map((s, i) => (
                  <a
                    key={i}
                    href="#services"
                    className="block text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {s.title}
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
                  <MapPin className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>
                    Probortok Circle, Badshah Miah Road, Ameerbag, Chattogram
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="size-4 shrink-0 mt-0.5" style={{ color: '#0D9488' }} />
                  <div>Sister Concern of Hayat Holdings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <div>&copy; 2026 Hayat Life Care. All Rights Reserved.</div>
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

      {/* ─── CHAT WIDGET FLOATING BUTTON ─── */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            key="chat-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
            aria-label="Open Chat"
          >
            <MessageCircle className="size-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
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
            className="fixed bottom-6 right-6 z-[60] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 bg-white"
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
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'rgba(13,148,136,0.1)' }}>
                    <MessageCircle className="size-8" style={{ color: '#0D9488' }} />
                  </div>
                  <p className="text-sm text-gray-500">Hi! How can I help you today?</p>
                  <p className="text-xs text-gray-400 mt-1">Ask about our services, investment, or location</p>
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

      {/* Back to top button */}
      {scrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white"
          style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
        >
          <ChevronUp className="size-5" />
        </motion.button>
      )}
    </div>
  )
}
