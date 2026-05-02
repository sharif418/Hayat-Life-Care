'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, X, Send, Loader2, MessageCircle, ChevronDown, RotateCcw, Heart } from 'lucide-react'

interface ChatWidgetProps {
  chatSessionId: string
  showMobileBar?: boolean
}

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatWidget({ chatSessionId, showMobileBar }: ChatWidgetProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, isChatLoading])

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isChatOpen])

  // Detect scroll position for "scroll to bottom" button
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 80)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async (message: string) => {
    if (!message.trim() || isChatLoading) return
    const userMsg = message.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: new Date() }])
    setIsChatLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId: chatSessionId }),
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: data?.data?.reply || data?.reply || 'Sorry, I could not process that.',
        timestamp: new Date()
      }])
    } catch {
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date()
      }])
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleChatSend = () => sendMessage(chatInput)

  const handleReset = () => {
    setChatMessages([])
    setChatInput('')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  // Format message content with markdown-like features
  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\|(.*?)\|/g, '<br/>• $1')
      .replace(/\n/g, '<br />')
  }

  const quickActions = [
    { q: 'What is Hayat Life Care?', icon: '🏢', label: 'About HLC' },
    { q: 'Tell me about investment', icon: '💰', label: 'Investment' },
    { q: 'What services are available?', icon: '🏥', label: 'Services' },
    { q: 'Share price details', icon: '📈', label: 'Share Price' },
    { q: 'Who are the Founding Directors?', icon: '👥', label: 'Directors' },
    { q: 'What is unique about this project?', icon: '✨', label: 'Uniqueness' },
  ]

  return (
    <>
      {/* ─── FLOATING CHAT BUTTON ─── */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            key="chat-btn"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setIsChatOpen(true)}
            className={`fixed left-4 sm:left-5 z-50 w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full shadow-[0_4px_25px_rgba(13,148,136,0.4)] hover:shadow-[0_6px_35px_rgba(16,185,129,0.6)] flex items-center justify-center text-white cursor-pointer group transition-all duration-300 hover:scale-110 ${showMobileBar ? 'bottom-[72px] lg:bottom-12' : 'bottom-6 lg:bottom-12'}`}
            style={{ background: 'linear-gradient(135deg, #0F766E 0%, #10B981 50%, #059669 100%)' }}
            aria-label="Open AI Chat Assistant"
          >
            {/* Ripple ring */}
            <span className="absolute inset-0 rounded-full border-2 border-emerald-300/30 animate-ping" />
            <span className="absolute inset-0 rounded-full border border-white/20" />
            
            <MessageCircle className="size-6 sm:size-7 drop-shadow-md relative z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* AI sparkle */}
            <motion.div 
              className="absolute -top-0.5 -right-0.5 bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="size-3 text-white fill-white" />
            </motion.div>

            {/* Tooltip */}
            <span className="absolute left-[75px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-teal-700 dark:text-teal-300 text-xs font-semibold px-3.5 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none hidden sm:flex items-center gap-1.5 shadow-xl origin-left scale-90 group-hover:scale-100">
              <Bot className="size-3.5" />
              Ask Hayat AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── CHAT DIALOG ─── */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            key="chat-dialog"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`fixed left-4 sm:left-5 z-60 w-[360px] sm:w-[400px] max-w-[calc(100vw-2rem)] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-200/60 dark:border-slate-700 flex flex-col ${showMobileBar ? 'bottom-[72px] lg:bottom-12' : 'bottom-6 lg:bottom-12'}`}
            style={{ height: '560px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fffe 100%)' }}
          >
            {/* ── Header ── */}
            <div className="relative px-5 py-4 text-white" style={{ background: 'linear-gradient(135deg, #0F766E 0%, #059669 50%, #10B981 100%)' }}>
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[15px] flex items-center gap-1.5">
                      Hayat AI
                      <Sparkles className="size-3.5 fill-amber-300 text-amber-300" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                      Always here to help
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {chatMessages.length > 0 && (
                    <button
                      onClick={handleReset}
                      className="p-2 rounded-xl hover:bg-white/15 transition-colors"
                      aria-label="Reset Chat"
                      title="Start new conversation"
                    >
                      <RotateCcw className="size-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/15 transition-colors"
                    aria-label="Close Chat"
                  >
                    <X className="size-4.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Messages Area ── */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 relative dark:bg-slate-800"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db transparent' }}
            >
              {/* Welcome Screen */}
              {chatMessages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Welcome card */}
                  <div className="relative bg-gradient-to-br from-teal-50 to-emerald-50/50 dark:from-slate-700 dark:to-slate-700/50 rounded-2xl p-4 border border-teal-100/60 dark:border-slate-600">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                        <Heart className="size-4 text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-gray-800 dark:text-white mb-1">Welcome to Hayat Life Care! 👋</p>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">
                          I can help you with investment details, services, floor plans, share pricing, and more. Ask me anything!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick action grid */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2.5 px-1">Popular Questions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((item) => (
                        <motion.button
                          key={item.q}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => sendMessage(item.q)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-100 dark:border-slate-600 bg-white dark:bg-slate-700/50 hover:border-teal-300 dark:hover:border-teal-600 hover:bg-teal-50/50 dark:hover:bg-teal-900/20 transition-all duration-200 text-left group"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-300 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors leading-tight">{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Chat Messages */}
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mb-4" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                      <Bot className="size-3.5 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div
                      className={`px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === 'user'
                          ? 'text-white rounded-2xl rounded-br-md shadow-sm'
                          : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-2xl rounded-bl-md shadow-sm border border-gray-100/60 dark:border-slate-600'
                      }`}
                      style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #0D9488, #10B981)' } : {}}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                    <span className={`text-[9px] text-gray-400 dark:text-gray-500 mt-1 px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isChatLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #0D9488, #10B981)' }}>
                    <Bot className="size-3.5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-700 border border-gray-100/60 dark:border-slate-600 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <motion.span className="w-2 h-2 rounded-full bg-teal-500" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                      <motion.span className="w-2 h-2 rounded-full bg-teal-400" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                      <motion.span className="w-2 h-2 rounded-full bg-teal-300" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[70px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-lg border border-gray-200 dark:border-slate-600 flex items-center justify-center z-10 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                >
                  <ChevronDown className="size-4 text-gray-500 dark:text-gray-400" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Input Area ── */}
            <div className="border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-700/50 rounded-2xl px-4 py-2.5 border border-gray-100 dark:border-slate-600 focus-within:border-teal-300 dark:focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-100 dark:focus-within:ring-teal-900/30 transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend() }}
                  placeholder="Ask anything about Hayat Life Care..."
                  className="flex-1 text-[13px] border-none outline-none bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-700 dark:text-gray-200"
                  disabled={isChatLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleChatSend}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  style={{ background: chatInput.trim() ? 'linear-gradient(135deg, #0D9488, #10B981)' : '#d1d5db' }}
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </motion.button>
              </div>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 text-center mt-2">
                Powered by Hayat Life Care • Responses from our FAQ database
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
