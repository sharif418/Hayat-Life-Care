import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Search, ChevronRight } from 'lucide-react'
import { navLinks } from '@/data/home-data'
import { useLanguage } from '@/i18n/LanguageProvider'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const { t } = useLanguage()

  // Flatten the navLinks for searchable items
  const searchableItems = React.useMemo(() => {
    const items: { label: string; href: string; type: string }[] = []
    navLinks.forEach((link) => {
      items.push({
        label: link.langKey ? t(`nav.${link.langKey}`) : link.label,
        href: link.href,
        type: 'Page'
      })
      if (link.children) {
        link.children.forEach((child) => {
          items.push({
            label: child.langKey ? t(`nav.${child.langKey}`) : child.label,
            href: child.href,
            type: 'Section'
          })
        })
      }
    })
    return items
  }, [t])

  const filteredItems = searchableItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setQuery('')
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800" showCloseButton={false}>
        <DialogHeader className="p-0 border-b border-gray-100 dark:border-slate-800">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 shrink-0" />
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-lg w-full focus:ring-0 p-0"
              placeholder={t('common.search') || "Search pages & sections..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button 
              onClick={onClose}
              className="ml-3 text-xs font-medium text-gray-500 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 px-2 py-1 rounded-md transition-colors"
            >
              ESC
            </button>
          </div>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.length > 0 ? (
            filteredItems.length > 0 ? (
              <div className="space-y-1">
                {filteredItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => {
                      onClose()
                    }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg group transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-0.5">
                        {item.type}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-teal-500 transition-colors" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Search className="w-8 h-8 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No results found for "{query}"
                </p>
              </div>
            )
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Start typing to search our services, facilities, and more.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
