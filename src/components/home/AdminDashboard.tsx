'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, LayoutDashboard, Inbox, Building2, HelpCircle, UserPlus, Settings,
  Loader2, LogOut, Trash2, Plus, ArrowRight, Save, Wrench, Users, Phone, TrendingUp,
  Download, Eye, BarChart3, UserCheck, SkipForward, CalendarCheck, PlayCircle, Pencil,
  Star, MessageSquareQuote, ImagePlus, Upload
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface AdminDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminTab, setAdminTab] = useState('dashboard')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  // ─── Restore session from localStorage on mount ───
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem('hlc_admin_session')
      if (savedSession) {
        const session = JSON.parse(savedSession)
        if (session?.isLoggedIn) {
          setIsLoggedIn(true)
          setAdminEmail(session.email || '')
        }
      }
    } catch {
      // ignore corrupted localStorage
    }
  }, [])

  const [inquiries, setInquiries] = useState<any[]>([])
  const [adminServices, setAdminServices] = useState<any[]>([])
  const [adminFaqs, setAdminFaqs] = useState<any[]>([])
  const [leaders, setLeaders] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [adminVideos, setAdminVideos] = useState<any[]>([])
  const [siteSettings, setSiteSettings] = useState<Record<string, any[]>>({})

  // Analytics state
  const [downloadLeads, setDownloadLeads] = useState<any[]>([])
  const [downloadStats, setDownloadStats] = useState({ totalDownloads: 0, leadsCount: 0, skippedCount: 0 })
  const [visitStats, setVisitStats] = useState({
    totalPageViews: 0, totalUniqueVisitors: 0,
    todayPageViews: 0, todayUniqueVisitors: 0,
    weekPageViews: 0, weekUniqueVisitors: 0,
    monthPageViews: 0, monthUniqueVisitors: 0,
  })
  const [recentVisits, setRecentVisits] = useState<any[]>([])

  // New item forms
  const [newService, setNewService] = useState({ title: '', slug: '', description: '', icon: '', floor: '', category: '' })
  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: 'general' })
  const [newLeader, setNewLeader] = useState({ name: '', designation: '', bio: '' })
  const [newVideo, setNewVideo] = useState({ title: '', youtubeId: '', description: '' })
  const [featuredVideoId, setFeaturedVideoId] = useState('')
  const [savingFeatured, setSavingFeatured] = useState(false)

  // Password change
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Editing state
  const [editingVideo, setEditingVideo] = useState<string | null>(null)
  const [editVideoForm, setEditVideoForm] = useState({ title: '', youtubeId: '', description: '' })
  const [editingFaq, setEditingFaq] = useState<string | null>(null)
  const [editFaqForm, setEditFaqForm] = useState({ question: '', answer: '', category: '' })

  const fetchAdminData = useCallback(async () => {
    try {
      const [inqRes, svcRes, faqRes, ldrRes, setRes, dlRes, visitRes, apptRes, vidRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/services'),
        fetch('/api/faqs'),
        fetch('/api/leaders'),
        fetch('/api/site-settings'),
        fetch('/api/downloads'),
        fetch('/api/visits'),
        fetch('/api/appointments'),
        fetch('/api/videos', { headers: { 'x-admin-auth': 'true' } }),
      ])
      const inqData = await inqRes.json()
      const svcData = await svcRes.json()
      const faqData = await faqRes.json()
      const ldrData = await ldrRes.json()
      const setData = await setRes.json()
      const dlData = await dlRes.json()
      const visitData = await visitRes.json()
      const apptData = await apptRes.json()
      const vidData = await vidRes.json()
      if (inqData.data) setInquiries(inqData.data)
      if (svcData.data) setAdminServices(svcData.data)
      if (faqData.data) setAdminFaqs(faqData.data)
      if (ldrData.data) setLeaders(ldrData.data)
      if (setData.data) {
        setSiteSettings(setData.data)
        // Extract featured video ID from site settings
        for (const group of Object.values(setData.data) as any[][]) {
          const fvSetting = group.find((s: any) => s.key === 'featured_video_id')
          if (fvSetting && fvSetting.value) {
            setFeaturedVideoId(fvSetting.value)
            break
          }
        }
      }
      if (dlData.data) {
        setDownloadLeads(dlData.data.leads || [])
        setDownloadStats(dlData.data.stats || { totalDownloads: 0, leadsCount: 0, skippedCount: 0 })
      }
      if (visitData.data) {
        setVisitStats(visitData.data.stats || {})
        setRecentVisits(visitData.data.recentVisits || [])
      }
      if (apptData.data) setAppointments(apptData.data)
      if (vidData.data) setAdminVideos(vidData.data)
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
    }
  }, [])

  // ─── Fetch admin data when logged in ───
  useEffect(() => {
    if (isLoggedIn) {
      fetchAdminData()
    }
  }, [isLoggedIn, fetchAdminData])

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
        localStorage.setItem('hlc_admin_session', JSON.stringify({ isLoggedIn: true, email: adminEmail }))
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
      toast.success('FAQ deleted')
    } catch (err) {
      console.error('Failed to delete FAQ:', err)
      toast.error('Failed to delete FAQ')
    }
  }

  const updateFaq = async (id: string) => {
    if (!editFaqForm.question || !editFaqForm.answer) { toast.error('Question and Answer are required'); return }
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFaqForm),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setAdminFaqs(prev => prev.map(f => f.id === id ? data.data : f))
        setEditingFaq(null)
        toast.success('FAQ updated!')
      }
    } catch (err) {
      console.error('Failed to update FAQ:', err)
      toast.error('Failed to update FAQ')
    }
  }

  const updateVideo = async (id: string) => {
    if (!editVideoForm.title || !editVideoForm.youtubeId) { toast.error('Title and YouTube ID are required'); return }
    try {
      const res = await fetch(`/api/videos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editVideoForm),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setAdminVideos(prev => prev.map(v => v.id === id ? data.data : v))
        setEditingVideo(null)
        toast.success('Video updated!')
      }
    } catch (err) {
      console.error('Failed to update video:', err)
      toast.error('Failed to update video')
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
    if (!newFaq.question || !newFaq.answer) { toast.error('Question and Answer are required'); return }
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
        toast.success('FAQ added successfully!')
      } else {
        toast.error(data.error || 'Failed to add FAQ')
      }
    } catch (err) {
      console.error('Failed to add FAQ:', err)
      toast.error('Network error. Please try again.')
    }
  }

  const addVideo = async () => {
    if (!newVideo.title || !newVideo.youtubeId) { toast.error('Title and YouTube ID are required'); return }
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideo),
      })
      const data = await res.json()
      if (data.success && data.data) {
        setAdminVideos(prev => [...prev, data.data])
        setNewVideo({ title: '', youtubeId: '', description: '' })
        toast.success('Video added successfully!')
      } else {
        toast.error(data.error || 'Failed to add video')
      }
    } catch (err) {
      console.error('Failed to add video:', err)
      toast.error('Network error. Please try again.')
    }
  }

  const deleteVideo = async (id: string) => {
    try {
      await fetch(`/api/videos/${id}`, { method: 'DELETE' })
      setAdminVideos(prev => prev.filter(v => v.id !== id))
      toast.success('Video deleted')
    } catch (err) {
      console.error('Failed to delete video:', err)
    }
  }

  const toggleVideoActive = async (id: string, active: boolean) => {
    try {
      await fetch(`/api/videos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      })
      setAdminVideos(prev => prev.map(v => v.id === id ? { ...v, active: !active } : v))
    } catch (err) {
      console.error('Failed to toggle video:', err)
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
    <>
      {/* ─── ADMIN LOGIN DIALOG ─── */}
      <Dialog open={isOpen && !isLoggedIn} onOpenChange={(open) => { if (!open) onClose() }}>
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
        {isOpen && isLoggedIn && (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-70 bg-white overflow-hidden"
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
                  onClick={() => { localStorage.removeItem('hlc_admin_session'); onClose(); setIsLoggedIn(false); setAdminEmail(''); setAdminPassword('') }}
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                >
                  <LogOut className="size-4 mr-1" /> Exit
                </Button>
                <button
                  onClick={() => onClose()}
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
                    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                    { id: 'inquiries', icon: Inbox, label: 'Inquiries' },
                    { id: 'appointments', icon: CalendarCheck, label: 'Appointments' },
                    { id: 'videos', icon: PlayCircle, label: 'Videos' },
                    { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
                    { id: 'testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
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
                  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
                  { id: 'inquiries', icon: Inbox, label: 'Inquiries' },
                  { id: 'appointments', icon: CalendarCheck, label: 'Appointments' },
                  { id: 'videos', icon: PlayCircle, label: 'Videos' },
                  { id: 'faqs', icon: HelpCircle, label: 'FAQs' },
                  { id: 'testimonials', icon: MessageSquareQuote, label: 'Testimonials' },
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Inquiries</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{inquiries.length}</div>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">New: {inquiries.filter(i => i.status === 'new').length}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px]">Read: {inquiries.filter(i => i.status === 'read').length}</Badge>
                          <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">Replied: {inquiries.filter(i => i.status === 'replied').length}</Badge>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total Services</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{adminServices.length}</div>
                        <div className="text-xs text-teal-600 mt-2">{adminServices.filter(s => s.active).length} active</div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Total FAQs</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{adminFaqs.length}</div>
                        <div className="text-xs text-teal-600 mt-2">{adminFaqs.filter(f => f.active).length} active</div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Leaders</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{leaders.length}</div>
                        <div className="text-xs text-teal-600 mt-2">Team members</div>
                      </div>
                    </div>

                    {/* Analytics Quick View */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl p-5 shadow-sm text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <Eye className="size-4 opacity-80" />
                          <span className="text-sm opacity-90">Site Visitors</span>
                        </div>
                        <div className="text-2xl font-bold">{visitStats.totalUniqueVisitors}</div>
                        <div className="text-xs opacity-75 mt-1">Today: {visitStats.todayUniqueVisitors}</div>
                      </div>
                      <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl p-5 shadow-sm text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <Download className="size-4 opacity-80" />
                          <span className="text-sm opacity-90">Downloads</span>
                        </div>
                        <div className="text-2xl font-bold">{downloadStats.totalDownloads}</div>
                        <div className="text-xs opacity-75 mt-1">With lead: {downloadStats.leadsCount}</div>
                      </div>
                      <div className="bg-linear-to-br from-amber-500 to-orange-600 rounded-xl p-5 shadow-sm text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <UserCheck className="size-4 opacity-80" />
                          <span className="text-sm opacity-90">Leads Captured</span>
                        </div>
                        <div className="text-2xl font-bold">{downloadLeads.length}</div>
                        <div className="text-xs opacity-75 mt-1">From brochure downloads</div>
                      </div>
                      <div className="bg-linear-to-br from-rose-500 to-pink-600 rounded-xl p-5 shadow-sm text-white">
                        <div className="flex items-center gap-2 mb-1">
                          <BarChart3 className="size-4 opacity-80" />
                          <span className="text-sm opacity-90">Page Views</span>
                        </div>
                        <div className="text-2xl font-bold">{visitStats.totalPageViews}</div>
                        <div className="text-xs opacity-75 mt-1">Today: {visitStats.todayPageViews}</div>
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

                {/* ── Analytics Tab ── */}
                {adminTab === 'analytics' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Lead Management</h2>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                            <Eye className="size-4 text-indigo-600" />
                          </div>
                          <span className="text-sm text-gray-500">Total Visitors</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{visitStats.totalUniqueVisitors}</div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge className="bg-indigo-50 text-indigo-700 border-0 text-[10px]">Today: {visitStats.todayUniqueVisitors}</Badge>
                          <Badge className="bg-blue-50 text-blue-700 border-0 text-[10px]">Week: {visitStats.weekUniqueVisitors}</Badge>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                            <BarChart3 className="size-4 text-teal-600" />
                          </div>
                          <span className="text-sm text-gray-500">Page Views</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{visitStats.totalPageViews}</div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge className="bg-teal-50 text-teal-700 border-0 text-[10px]">Today: {visitStats.todayPageViews}</Badge>
                          <Badge className="bg-emerald-50 text-emerald-700 border-0 text-[10px]">Month: {visitStats.monthPageViews}</Badge>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <Download className="size-4 text-emerald-600" />
                          </div>
                          <span className="text-sm text-gray-500">Total Downloads</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{downloadStats.totalDownloads}</div>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <Badge className="bg-emerald-50 text-emerald-700 border-0 text-[10px]">With Info: {downloadStats.leadsCount}</Badge>
                          <Badge className="bg-orange-50 text-orange-700 border-0 text-[10px]">Skipped: {downloadStats.skippedCount}</Badge>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl border p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                            <UserCheck className="size-4 text-amber-600" />
                          </div>
                          <span className="text-sm text-gray-500">Leads Captured</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{downloadLeads.length}</div>
                        <div className="text-xs text-gray-500 mt-2">Conversion: {downloadStats.totalDownloads > 0 ? ((downloadStats.leadsCount / downloadStats.totalDownloads) * 100).toFixed(1) : 0}%</div>
                      </div>
                    </div>

                    {/* Download Leads Table */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <UserCheck className="size-5" style={{ color: '#0D9488' }} />
                      Download Leads (Name & Phone)
                    </h3>
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left px-4 py-3 font-medium text-gray-600">#</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Source</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {downloadLeads.map((lead, i) => (
                              <tr key={lead.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                                <td className="px-4 py-3 font-medium text-gray-900">{lead.name}</td>
                                <td className="px-4 py-3">
                                  <a href={`tel:${lead.phone}`} className="text-teal-600 hover:underline flex items-center gap-1">
                                    <Phone className="size-3" />
                                    {lead.phone}
                                  </a>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge className="bg-teal-50 text-teal-700 border-0 text-[10px] capitalize">{lead.source}</Badge>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(lead.createdAt).toLocaleString()}</td>
                              </tr>
                            ))}
                            {downloadLeads.length === 0 && (
                              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No leads captured yet. They will appear here when visitors fill the download form.</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Recent Site Visits */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Eye className="size-5" style={{ color: '#6366F1' }} />
                      Recent Site Visits
                    </h3>
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b bg-gray-50">
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Page</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Visitor</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                              <th className="text-left px-4 py-3 font-medium text-gray-600">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentVisits.slice(0, 20).map((visit) => (
                              <tr key={visit.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-900">{visit.page}</td>
                                <td className="px-4 py-3 text-gray-500 text-xs font-mono">{visit.visitorId?.slice(0, 12)}...</td>
                                <td className="px-4 py-3">
                                  <Badge className={`border-0 text-[10px] ${visit.isUnique ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {visit.isUnique ? 'New Visitor' : 'Returning'}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 text-gray-500 text-xs">{new Date(visit.createdAt).toLocaleString()}</td>
                              </tr>
                            ))}
                            {recentVisits.length === 0 && (
                              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400">No visits recorded yet</td></tr>
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

                {/* ── Videos Tab ── */}
                {adminTab === 'videos' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage YouTube Videos</h2>

                    {/* ═══ Featured / Spotlight Video ═══ */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                        <span className="text-lg">⭐</span> Featured Spotlight Video
                      </h3>
                      <p className="text-xs text-gray-500 mb-4">This video auto-plays when visitors scroll to the video section. Set a YouTube Video ID below.</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
                        <div className="flex-1 w-full">
                          <label className="text-xs font-semibold text-gray-600 block mb-1">YouTube Video ID</label>
                          <Input
                            placeholder="e.g. dQw4w9WgXcQ"
                            value={featuredVideoId}
                            onChange={(e) => setFeaturedVideoId(e.target.value)}
                            className="bg-white"
                          />
                        </div>
                        <Button
                          onClick={async () => {
                            setSavingFeatured(true)
                            try {
                              await fetch('/api/site-settings', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  settings: [{ key: 'featured_video_id', value: featuredVideoId.trim() }],
                                }),
                              })
                              toast.success(featuredVideoId.trim() ? 'Featured video saved!' : 'Featured video removed!')
                            } catch {
                              toast.error('Failed to save featured video')
                            }
                            setSavingFeatured(false)
                          }}
                          disabled={savingFeatured}
                          className="text-white shrink-0"
                          style={{ background: 'linear-gradient(135deg, #D97706, #B45309)' }}
                          size="sm"
                        >
                          {savingFeatured ? 'Saving...' : '💾 Save Featured'}
                        </Button>
                      </div>
                      {featuredVideoId.trim() && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="shrink-0 w-28 h-16 rounded-lg overflow-hidden bg-gray-100 relative">
                            <img
                              src={`https://img.youtube.com/vi/${featuredVideoId.trim()}/mqdefault.jpg`}
                              alt="Featured preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <PlayCircle className="size-6 text-white/90" />
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-700">Preview: youtube.com/watch?v={featuredVideoId.trim()}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5">This video will auto-play (muted) when users scroll to the video section</div>
                          </div>
                        </div>
                      )}
                      {!featuredVideoId.trim() && (
                        <p className="text-[10px] text-amber-600 mt-2">💡 Leave empty to hide the featured video spotlight.</p>
                      )}
                    </div>

                    {/* Add Video Form */}
                    <div className="bg-white rounded-xl border shadow-sm p-5 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Plus className="size-4" style={{ color: '#0D9488' }} /> Add New Video
                      </h3>
                      <div className="space-y-3">
                        <Input placeholder="Video Title" value={newVideo.title} onChange={(e) => setNewVideo(p => ({ ...p, title: e.target.value }))} />
                        <Input placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)" value={newVideo.youtubeId} onChange={(e) => setNewVideo(p => ({ ...p, youtubeId: e.target.value }))} />
                        <Input placeholder="Description (optional)" value={newVideo.description} onChange={(e) => setNewVideo(p => ({ ...p, description: e.target.value }))} />
                        <div className="flex items-center gap-3">
                          <Button onClick={addVideo} className="text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                            <Plus className="size-4 mr-1" /> Add Video
                          </Button>
                          {newVideo.youtubeId && (
                            <span className="text-xs text-gray-400">Preview: youtube.com/watch?v={newVideo.youtubeId}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Videos List */}
                    <div className="space-y-3">
                      {adminVideos.map((vid) => (
                        <div key={vid.id} className="bg-white rounded-xl border shadow-sm p-4">
                          {editingVideo === vid.id ? (
                            /* ── Edit Mode ── */
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Pencil className="size-4" style={{ color: '#0D9488' }} />
                                <span className="font-semibold text-gray-900 text-sm">Edit Video</span>
                              </div>
                              <Input placeholder="Video Title" value={editVideoForm.title} onChange={(e) => setEditVideoForm(p => ({ ...p, title: e.target.value }))} />
                              <Input placeholder="YouTube Video ID" value={editVideoForm.youtubeId} onChange={(e) => setEditVideoForm(p => ({ ...p, youtubeId: e.target.value }))} />
                              <Input placeholder="Description (optional)" value={editVideoForm.description} onChange={(e) => setEditVideoForm(p => ({ ...p, description: e.target.value }))} />
                              {editVideoForm.youtubeId && (
                                <div className="flex items-center gap-3">
                                  <div className="shrink-0 w-24 h-14 rounded-lg overflow-hidden bg-gray-100">
                                    <img src={`https://img.youtube.com/vi/${editVideoForm.youtubeId}/mqdefault.jpg`} alt="Preview" className="w-full h-full object-cover" />
                                  </div>
                                  <span className="text-xs text-gray-400">Preview thumbnail</span>
                                </div>
                              )}
                              <div className="flex gap-2">
                                <Button onClick={() => updateVideo(vid.id)} className="text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                                  <Save className="size-4 mr-1" /> Save Changes
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setEditingVideo(null)}>Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            /* ── View Mode ── */
                            <div className="flex items-start gap-4">
                              {/* Thumbnail */}
                              <div className="shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
                                <img
                                  src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                                  alt={vid.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <PlayCircle className="size-8 text-white/90" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900 truncate">{vid.title}</span>
                                  <Badge className={vid.active ? 'bg-green-100 text-green-700 border-0' : 'bg-red-100 text-red-700 border-0'}>
                                    {vid.active ? 'Active' : 'Hidden'}
                                  </Badge>
                                </div>
                                {vid.description && <div className="text-sm text-gray-500 line-clamp-1">{vid.description}</div>}
                                <div className="text-xs text-gray-400 mt-1">ID: {vid.youtubeId}</div>
                              </div>
                              <div className="flex gap-1 shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => {
                                    setEditingVideo(vid.id)
                                    setEditVideoForm({ title: vid.title, youtubeId: vid.youtubeId, description: vid.description || '' })
                                  }}
                                >
                                  <Pencil className="size-3 mr-1" /> Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => toggleVideoActive(vid.id, vid.active)}
                                >
                                  {vid.active ? 'Hide' : 'Show'}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteVideo(vid.id)} className="text-gray-400 hover:text-red-500">
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {adminVideos.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                          <PlayCircle className="size-12 mx-auto mb-3 opacity-30" />
                          <p>No videos yet</p>
                          <p className="text-xs mt-1">Add YouTube video IDs to display on the website</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Appointments Tab ── */}
                {adminTab === 'appointments' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
                      <Badge className="bg-amber-100 text-amber-700">{appointments.length} Total</Badge>
                    </div>
                    <div className="space-y-3">
                      {appointments.map((appt) => {
                        const dateParts = appt.message?.match(/Date: ([^,]+)/)
                        const timeParts = appt.message?.match(/Time: ([^,]+)/)
                        const notesParts = appt.message?.match(/Notes: (.+)/)
                        const doctorName = appt.subject?.replace('Appointment: ', '') || 'General'
                        return (
                          <div key={appt.id} className="bg-white rounded-xl border shadow-sm p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900">{appt.name}</span>
                                  <Badge className={appt.status === 'new' ? 'bg-green-100 text-green-700' : appt.status === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}>
                                    {appt.status}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-500 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <CalendarCheck className="size-3.5" style={{ color: '#0D9488' }} />
                                    <span>{dateParts?.[1] || 'N/A'} at {timeParts?.[1] || 'N/A'}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="size-3.5" style={{ color: '#0D9488' }} />
                                    <span>Doctor: {doctorName}</span>
                                  </div>
                                  {appt.phone && (
                                    <div className="flex items-center gap-2">
                                      <Phone className="size-3.5" style={{ color: '#0D9488' }} />
                                      <a href={`tel:${appt.phone}`} className="hover:text-teal-600">{appt.phone}</a>
                                    </div>
                                  )}
                                  {notesParts?.[1] && (
                                    <div className="text-xs text-gray-400 mt-1 italic">Notes: {notesParts[1]}</div>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1">
                                {appt.status === 'new' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs"
                                    onClick={async () => {
                                      await fetch(`/api/inquiries/${appt.id}`, {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ status: 'read' }),
                                      })
                                      fetchAdminData()
                                    }}
                                  >
                                    Mark Read
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs text-green-600"
                                  onClick={async () => {
                                    await fetch(`/api/inquiries/${appt.id}`, {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ status: 'replied' }),
                                    })
                                    fetchAdminData()
                                  }}
                                >
                                  Confirmed
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      {appointments.length === 0 && (
                        <div className="text-center py-12 text-gray-400">
                          <CalendarCheck className="size-12 mx-auto mb-3 opacity-30" />
                          <p>No appointments yet</p>
                          <p className="text-xs mt-1">Appointments booked via "Book a Visit" will appear here</p>
                        </div>
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
                          {editingFaq === faq.id ? (
                            /* ── Edit Mode ── */
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Pencil className="size-4" style={{ color: '#0D9488' }} />
                                <span className="font-semibold text-gray-900 text-sm">Edit FAQ</span>
                              </div>
                              <Input placeholder="Question" value={editFaqForm.question} onChange={(e) => setEditFaqForm(p => ({ ...p, question: e.target.value }))} />
                              <Textarea placeholder="Answer" value={editFaqForm.answer} onChange={(e) => setEditFaqForm(p => ({ ...p, answer: e.target.value }))} className="min-h-[80px]" />
                              <Input placeholder="Category" value={editFaqForm.category} onChange={(e) => setEditFaqForm(p => ({ ...p, category: e.target.value }))} className="max-w-[200px]" />
                              <div className="flex gap-2">
                                <Button onClick={() => updateFaq(faq.id)} className="text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }} size="sm">
                                  <Save className="size-4 mr-1" /> Save Changes
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setEditingFaq(null)}>Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            /* ── View Mode ── */
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 text-sm">{faq.question}</div>
                                <div className="text-sm text-gray-500 mt-1 line-clamp-2">{faq.answer}</div>
                                <Badge className="border-0 bg-gray-100 text-gray-600 text-[10px] mt-2">{faq.category}</Badge>
                              </div>
                              <div className="flex gap-1 shrink-0">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => {
                                    setEditingFaq(faq.id)
                                    setEditFaqForm({ question: faq.question, answer: faq.answer, category: faq.category || 'general' })
                                  }}
                                >
                                  <Pencil className="size-3 mr-1" /> Edit
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteFaq(faq.id)} className="text-gray-400 hover:text-red-500">
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {adminFaqs.length === 0 && (
                        <div className="text-center py-8 text-gray-400">No FAQs found</div>
                      )}
                    </div>
                  </div>
                )}

                {/* ── Testimonials Tab ── */}
                {adminTab === 'testimonials' && <TestimonialsManager />}

                {/* ── Settings Tab ── */}
                {adminTab === 'settings' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                    
                    {/* Change Password */}
                    <div className="bg-white rounded-xl border shadow-sm p-6 max-w-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Change Password</h3>
                      <p className="text-sm text-gray-500 mb-5">Update your admin password for security</p>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault()
                          if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                            toast.error('New passwords do not match')
                            return
                          }
                          if (passwordForm.newPassword.length < 6) {
                            toast.error('Password must be at least 6 characters')
                            return
                          }
                          setIsChangingPassword(true)
                          try {
                            const res = await fetch('/api/admin/change-password', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                email: adminEmail,
                                currentPassword: passwordForm.currentPassword,
                                newPassword: passwordForm.newPassword,
                              }),
                            })
                            const data = await res.json()
                            if (res.ok) {
                              toast.success('Password changed successfully!')
                              setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                            } else {
                              toast.error(data.error || 'Failed to change password')
                            }
                          } catch {
                            toast.error('Network error. Please try again.')
                          } finally {
                            setIsChangingPassword(false)
                          }
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <Label className="mb-1">Current Password</Label>
                          <Input
                            type="password"
                            required
                            value={passwordForm.currentPassword}
                            onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                            placeholder="Enter current password"
                          />
                        </div>
                        <div>
                          <Label className="mb-1">New Password</Label>
                          <Input
                            type="password"
                            required
                            minLength={6}
                            value={passwordForm.newPassword}
                            onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                            placeholder="Enter new password (min 6 chars)"
                          />
                        </div>
                        <div>
                          <Label className="mb-1">Confirm New Password</Label>
                          <Input
                            type="password"
                            required
                            value={passwordForm.confirmPassword}
                            onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                            placeholder="Confirm new password"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isChangingPassword}
                          className="w-full text-white rounded-xl"
                          style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                        >
                          {isChangingPassword ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />}
                          {isChangingPassword ? 'Changing...' : 'Change Password'}
                        </Button>
                      </form>
                    </div>
                  </div>
                )}


              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Testimonials Manager Sub-Component ──
function TestimonialsManager() {
  interface TestimonialItem {
    id: string; name: string; designation: string; text: string;
    photo: string | null; rating: number; order: number; active: boolean;
  }

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', designation: '', text: '', photo: '', rating: 5, order: 0, active: true })

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch('/api/testimonials?all=true')
      const data = await res.json()
      setTestimonials(data.data || [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchTestimonials() }, [fetchTestimonials])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 500 * 1024) { toast.error('Photo must be under 500KB'); return }
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, photo: reader.result as string }))
    reader.readAsDataURL(file)
  }

  const resetForm = () => {
    setForm({ name: '', designation: '', text: '', photo: '', rating: 5, order: 0, active: true })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSave = async () => {
    if (!form.name || !form.designation || !form.text) { toast.error('Name, designation, and text are required'); return }
    setSaving(true)
    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Save failed')
      toast.success(editingId ? 'Testimonial updated!' : 'Testimonial added!')
      resetForm()
      fetchTestimonials()
    } catch { toast.error('Failed to save') } finally { setSaving(false) }
  }

  const handleEdit = (t: TestimonialItem) => {
    setForm({ name: t.name, designation: t.designation, text: t.text, photo: t.photo || '', rating: t.rating, order: t.order, active: t.active })
    setEditingId(t.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      toast.success('Deleted!')
      fetchTestimonials()
    } catch { toast.error('Failed to delete') }
  }

  const handleToggle = async (t: TestimonialItem) => {
    try {
      await fetch(`/api/testimonials/${t.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ active: !t.active }) })
      toast.success(t.active ? 'Hidden from site' : 'Shown on site')
      fetchTestimonials()
    } catch { toast.error('Failed to update') }
  }

  if (loading) return <div className="text-center py-8"><Loader2 className="size-6 animate-spin text-teal-500 mx-auto" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Testimonials</h2>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
        >
          <Plus className="size-4" /> Add New
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-gray-800">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">Name *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Ahmed Rahman" />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">Designation *</Label>
              <Input value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))} placeholder="e.g. Business Owner, Chattogram" />
            </div>
          </div>
          <div className="mb-4">
            <Label className="text-sm font-medium text-gray-700 mb-1">Testimonial Text *</Label>
            <Textarea value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} placeholder="What they said..." rows={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">Rating (1-5 Stars)</Label>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(s => (
                  <button key={s} type="button" onClick={() => setForm(f => ({ ...f, rating: s }))}>
                    <Star className={`size-6 cursor-pointer transition-colors ${s <= form.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">Display Order</Label>
              <Input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1">Photo</Label>
              <div className="flex items-center gap-3 mt-1">
                {form.photo ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-teal-200">
                    <img src={form.photo} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <ImagePlus className="size-4 text-gray-400" />
                  </div>
                )}
                <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer text-xs font-medium text-gray-600 transition-colors">
                  <Upload className="size-3" /> Upload
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                </label>
                {form.photo && (
                  <button onClick={() => setForm(f => ({ ...f, photo: '' }))} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Active (visible on site)</span>
            </label>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-700 text-white">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              <span className="ml-2">{editingId ? 'Update' : 'Save'}</span>
            </Button>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {testimonials.length > 0 ? testimonials.map(t => (
          <div key={t.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${t.active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
            {t.photo ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-teal-100">
                <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                {t.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">{t.name}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{t.designation}</span>
                {!t.active && <Badge variant="secondary" className="text-[10px]">Hidden</Badge>}
              </div>
              <div className="flex items-center gap-0.5 mb-1.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`size-3 ${j < t.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <p className="text-sm text-gray-600 italic line-clamp-2">&ldquo;{t.text}&rdquo;</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => handleToggle(t)} className={`p-1.5 rounded-lg text-xs ${t.active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`} title={t.active ? 'Hide' : 'Show'}>
                <Eye className="size-3.5" />
              </button>
              <button onClick={() => handleEdit(t)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="Edit">
                <Pencil className="size-3.5" />
              </button>
              <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100" title="Delete">
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-gray-400">No testimonials found. Add your first one!</div>
        )}
      </div>
    </div>
  )
}
