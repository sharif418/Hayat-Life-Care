'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import DownloadPopup from '@/components/ui/DownloadPopup'

interface DownloadContextType {
  openDownloadPopup: () => void
}

const DownloadContext = createContext<DownloadContextType>({
  openDownloadPopup: () => {},
})

export function useDownload() {
  return useContext(DownloadContext)
}

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openDownloadPopup = useCallback(() => {
    setIsPopupOpen(true)
  }, [])

  return (
    <DownloadContext.Provider value={{ openDownloadPopup }}>
      {children}
      <DownloadPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </DownloadContext.Provider>
  )
}
