'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

// Dynamic import to prevent SSR prerendering issues with AdminDashboard
const AdminDashboard = dynamic(() => import('@/components/home/AdminDashboard'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full" />
    </div>
  ),
})

export default function AdminPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard 
        isOpen={true} 
        onClose={() => router.push('/')} 
      />
    </div>
  )
}
