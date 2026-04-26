'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/home/AdminDashboard'

export default function AdminPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* The AdminDashboard component contains its own Dialog for login 
          and full-screen overlay for the dashboard. We just keep it open. */}
      <AdminDashboard 
        isOpen={true} 
        onClose={() => router.push('/')} 
      />
    </div>
  )
}
