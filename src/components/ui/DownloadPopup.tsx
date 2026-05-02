'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, User, Phone, Loader2, CheckCircle2, Sparkles, Lock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface DownloadPopupProps {
  isOpen: boolean
  onClose: () => void
  fileUrl?: string
  fileName?: string
}

export default function DownloadPopup({ isOpen, onClose, fileUrl = '/Hayat-Life-Care-Brochure.pdf', fileName = 'Hayat-Life-Care-Brochure.pdf' }: DownloadPopupProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})

  const triggerDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [fileUrl, fileName])

  const recordDownload = useCallback(async (skipped: boolean, leadName?: string, leadPhone?: string) => {
    try {
      await fetch('/api/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName || '',
          phone: leadPhone || '',
          type: 'brochure',
          skipped,
        }),
      })
    } catch (err) {
      console.error('Failed to record download:', err)
    }
  }, [])

  const handleSubmit = async () => {
    const newErrors: { name?: string; phone?: string } = {}
    if (!name.trim()) newErrors.name = 'Please enter your name'
    if (!phone.trim()) newErrors.phone = 'Please enter your phone number'
    else if (phone.trim().length < 10) newErrors.phone = 'Please enter a valid phone number'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    await recordDownload(false, name.trim(), phone.trim())
    
    setIsSubmitting(false)
    setIsSuccess(true)
    triggerDownload()

    setTimeout(() => {
      setIsSuccess(false)
      setName('')
      setPhone('')
      onClose()
    }, 2000)
  }

  const handleSkip = async () => {
    await recordDownload(true)
    triggerDownload()
    onClose()
  }

  const handleClose = () => {
    setErrors({})
    setIsSuccess(false)
    setName('')
    setPhone('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Top Decorative Header */}
            <div
              className="relative px-6 pt-8 pb-6 text-center"
              style={{ background: 'linear-gradient(135deg, #0D9488 0%, #10B981 50%, #059669 100%)' }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
                aria-label="Close popup"
              >
                <X className="size-4" />
              </button>

              {/* Floating circles */}
              <div className="absolute top-2 left-6 w-16 h-16 rounded-full bg-white/10 animate-pulse" />
              <div className="absolute bottom-1 right-10 w-10 h-10 rounded-full bg-white/5" />

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 shadow-lg">
                <Download className="size-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Download Brochure</h3>
              <p className="text-white/80 text-sm">Get detailed information about Hayat Life Care</p>
            </div>

            {/* Success State */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Your download has started. We appreciate your interest!</p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-6"
                >
                  {/* Form */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="size-4 text-amber-500" />
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Quick Information</span>
                    </div>

                    {/* Name Input */}
                    <div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <User className="size-4" />
                        </div>
                        <Input
                          placeholder="Your Full Name"
                          value={name}
                          onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })) }}
                          className={`pl-10 h-12 rounded-xl border-2 text-sm transition-colors ${errors.name ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/20' : 'border-gray-200 dark:border-slate-700 focus:border-teal-400'}`}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                    </div>

                    {/* Phone Input */}
                    <div>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          <Phone className="size-4" />
                        </div>
                        <Input
                          placeholder="Phone Number (e.g. 01XXX-XXXXXX)"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: undefined })) }}
                          className={`pl-10 h-12 rounded-xl border-2 text-sm transition-colors ${errors.phone ? 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/20' : 'border-gray-200 dark:border-slate-700 focus:border-teal-400'}`}
                          type="tel"
                          onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="size-4 animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="size-4 mr-2" />
                          Download Now
                        </>
                      )}
                    </Button>

                    {/* Privacy Note - Highlighted */}
                    <div className="flex items-start justify-center gap-1.5 mt-3 px-2">
                      <Lock className="size-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                        <span className="font-semibold text-teal-700 dark:text-teal-300">100% Secure.</span> Your information will only be used by Hayat Life Care for communication purposes.
                      </p>
                    </div>

                    {/* Skip Button - Downplayed */}
                    <button
                      onClick={handleSkip}
                      className="w-full text-center text-[10px] text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors mt-3"
                    >
                      skip & download directly
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
