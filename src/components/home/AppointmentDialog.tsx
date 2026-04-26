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

interface AppointmentDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  doctorName: string
}

export default function AppointmentDialog({ isOpen, onOpenChange, doctorName }: AppointmentDialogProps) {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarCheck className="size-5" style={{ color: '#0D9488' }} />
            Book Appointment
          </DialogTitle>
          <DialogDescription>
            {doctorName ? `Schedule an appointment with ${doctorName}` : 'Schedule your appointment at Hayat Life Care'}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            if (isSubmitting) return
            if (!form.name || !form.phone || !form.date) {
              toast.error('Please fill in all required fields')
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
                toast.success('Appointment booked successfully! We will confirm shortly.')
                setForm({ name: '', phone: '', date: '', time: '', message: '' })
                onOpenChange(false)
              } else {
                toast.error('Failed to book appointment. Please try again.')
              }
            } catch {
              toast.error('Network error. Please try again later.')
            } finally {
              setIsSubmitting(false)
            }
          }}
          className="space-y-4 pt-2"
        >
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">Full Name *</Label>
            <Input
              placeholder="Your full name"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number *</Label>
            <Input
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              required
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Date *</Label>
              <Input
                type="date"
                required
                value={form.date}
                onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Preferred Time *</Label>
              <Select value={form.time} onValueChange={v => setForm(p => ({ ...p, time: v }))}>
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
            {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
