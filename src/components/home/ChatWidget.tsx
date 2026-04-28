'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, X, Send, Loader2 } from 'lucide-react'

interface ChatWidgetProps {
  chatSessionId: string
  showMobileBar?: boolean
}

export default function ChatWidget({ chatSessionId, showMobileBar }: ChatWidgetProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)

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
      setChatMessages(prev => [...prev, { role: 'assistant', content: data?.data?.reply || data?.reply || 'Sorry, I could not process that.' }])
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <>
      {/* ─── CHAT WIDGET FLOATING BUTTON ─── */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            key="chat-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsChatOpen(true)}
            className={`fixed left-4 sm:left-5 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center text-white cursor-pointer group transition-all duration-300 hover:scale-105 ${showMobileBar ? 'bottom-[72px] lg:bottom-6' : 'bottom-6 lg:bottom-6'}`}
            style={{ background: 'linear-gradient(135deg, #0F766E, #10B981)' }}
            aria-label="Open AI Chat Assistant"
          >
            {/* Animated glowing border effect */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse" />
            
            <Bot className="size-6 sm:size-7 drop-shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Tiny sparkles icon for AI vibe */}
            <motion.div 
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-amber-300 drop-shadow-sm"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="size-3 sm:size-3.5 fill-amber-300" />
            </motion.div>

            {/* Notification Dot */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full animate-bounce" />
            
            <span className="absolute left-[70px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-gray-100 dark:border-slate-700 text-teal-700 dark:text-teal-300 text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none hidden sm:block shadow-lg origin-left scale-95 group-hover:scale-100">
              Hayat AI Assistant
            </span>
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
            className={`fixed left-4 sm:left-5 z-60 w-[340px] sm:w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all duration-300 ${showMobileBar ? 'bottom-[72px] lg:bottom-6' : 'bottom-6 lg:bottom-6'}`}
            style={{ height: '500px' }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 text-white" style={{ background: 'linear-gradient(135deg, #0F766E, #10B981)' }}>
              <div className="flex items-center gap-2">
                <Bot className="size-6" />
                <div>
                  <div className="font-semibold text-sm flex items-center gap-1">Hayat AI <Sparkles className="size-3 fill-amber-300 text-amber-300" /></div>
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
                  <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl rounded-tl-sm p-3 text-sm text-gray-700 dark:text-gray-200 max-w-[85%]">
                    👋 Hello! I&apos;m the Hayat Life Care assistant. How can I help you today?
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { q: 'Tell me about investment', icon: '💰' },
                      { q: 'What services are available?', icon: '🏥' },
                      { q: 'How to book appointment?', icon: '📅' },
                      { q: 'Share price details', icon: '📈' },
                    ].map((item) => (
                      <button
                        key={item.q}
                      onClick={() => { setChatInput(item.q); setTimeout(() => { setChatInput(''); setChatMessages(prev => [...prev, { role: 'user', content: item.q }]); setIsChatLoading(true); fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: item.q, sessionId: chatSessionId }) }).then(r => r.json()).then(data => { setChatMessages(prev => [...prev, { role: 'assistant', content: data?.data?.reply || data?.reply || 'Sorry, I could not process that.' }]); }).catch(() => { setChatMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]); }).finally(() => setIsChatLoading(false)); }, 50); }}
                        className="text-xs px-3 py-1.5 rounded-full border border-teal-200 text-teal-700 dark:text-teal-300 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-300 transition-all duration-200 flex items-center gap-1"
                      >
                        <span>{item.icon}</span> {item.q}
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
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-bl-md'
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
    </>
  )
}
