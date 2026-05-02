'use client'

import React, { useState } from 'react'
import { CalendarCheck, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useLanguage } from '@/i18n/LanguageProvider'

interface AppointmentDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  doctorName: string
}

export default function AppointmentDialog({ isOpen, onOpenChange, doctorName }: AppointmentDialogProps) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useLanguage()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarCheck className="size-5" style={{ color: '#0D9488' }} />
            {t('appointment.title')}
          </DialogTitle>
          <DialogDescription>
            {doctorName ? `${t('appointment.descDoctor')} ${doctorName}` : t('appointment.descDefault')}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (isSubmitting) return
            if (!form.name || !form.phone || !form.date) {
              toast.error(t('appointment.fillRequired'))
              return
            }
            setIsSubmitting(true)
            try {
              const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: form.name,
                  phone: form.phone,
                  date: form.date,
                  time: form.time,
                  doctor: doctorName,
                  message: form.message,
                }),
              })
              if (res.ok) {
                toast.success(t('appointment.successMsg'))
                setForm({ name: '', phone: '', date: '', time: '', message: '' })
                onOpenChange(false)
              } else {
                toast.error(t('appointment.errorMsg'))
              }
            } catch {
              toast.error(t('appointment.networkError'))
            } finally {
              setIsSubmitting(false)
            }
          }}
          className="space-y-4 pt-2"
        >
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">{t('appointment.fullName')}</Label>
            <Input
              placeholder={t('appointment.namePlaceholder')}
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">{t('appointment.phoneNumber')}</Label>
            <Input
              type="tel"
              placeholder={t('appointment.phonePlaceholder')}
              required
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">{t('appointment.preferredDate')}</Label>
              <Input
                type="date"
                required
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">{t('appointment.preferredTime')}</Label>
              <Select value={form.time} onValueChange={v => setForm(p => ({ ...p, time: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t('appointment.selectTime')} />
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
            <Label className="text-sm font-medium text-gray-700 mb-1 block">{t('appointment.additionalNotes')}</Label>
            <Textarea
              placeholder={t('appointment.notesPlaceholder')}
              className="min-h-[80px]"
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            />
          </div>
          <Button
            type="submit"
            className="w-full text-white font-semibold"
            style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin mr-2" /> : <CalendarCheck className="size-4 mr-2" />}
            {isSubmitting ? 'Booking...' : t('appointment.confirm')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
