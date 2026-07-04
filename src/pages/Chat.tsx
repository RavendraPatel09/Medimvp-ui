import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Smile, Image as ImageIcon, MoreVertical, Phone, Video, Search } from 'lucide-react'
import { CONVERSATIONS } from '../data/mockData'
import type { Conversation, ChatMessage } from '../data/mockData'
import { Avatar } from '../components/ui/Avatar'
import { messageBubble } from '../lib/animations'
import { timeAgo, cn } from '../lib/utils'

export default function Chat() {
  const [activeConv, setActiveConv] = useState<Conversation>(CONVERSATIONS[0])
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [search, setSearch] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const filtered = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(search.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [activeConv.messages])

  const handleSend = () => {
    if (!message.trim()) return

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'You',
      content: message,
      type: 'text',
      seen: false,
      timestamp: new Date().toISOString(),
    }

    // Update local state for immediate feedback
    const updatedConv = { ...activeConv, messages: [...activeConv.messages, newMsg] }
    setActiveConv(updatedConv)
    
    // Update conversations list order
    setConversations((prev) => {
      const idx = prev.findIndex((c) => c.id === updatedConv.id)
      const list = [...prev]
      list.splice(idx, 1)
      return [updatedConv, ...list]
    })

    setMessage('')

    // Simulate reply
    setIsTyping(true)
    clearTimeout(typingTimerRef.current)
    typingTimerRef.current = setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: Date.now().toString(),
        senderId: activeConv.participantId,
        senderName: activeConv.participantName,
        content: 'Thanks for reaching out! Let me check the stock and get back to you shortly.',
        type: 'text',
        seen: false,
        timestamp: new Date().toISOString(),
      }
      setActiveConv((prev) => ({ ...prev, messages: [...prev.messages, replyMsg] }))
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="h-[calc(100vh-64px)] max-w-[1600px] mx-auto p-4 md:p-6 flex gap-4 md:gap-6">
      
      {/* Sidebar List */}
      <div className="w-80 glass-card rounded-3xl flex flex-col overflow-hidden hidden md:flex shrink-0">
        <div className="p-4 border-b border-white/5">
          <h2 className="text-xl font-bold font-display text-white/95 mb-4">Messages</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-base-800 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white/90 outline-none focus:border-cyan-400/50 focus:shadow-[0_0_0_4px_rgba(0,217,255,0.1)] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
          {filtered.map((conv) => {
            const lastMsg = conv.messages[conv.messages.length - 1]
            const isActive = activeConv.id === conv.id
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv)}
                className={cn(
                  'w-full p-4 flex items-start gap-3 transition-colors text-left relative',
                  isActive ? 'bg-white/5' : 'hover:bg-white/5'
                )}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-glow-cyan" />}
                <Avatar src={conv.participantAvatar} name={conv.participantName} online={conv.unreadCount === 0} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <p className={cn("text-sm font-bold truncate", isActive ? "text-cyan-400" : "text-white/90")}>{conv.participantName}</p>
                    <span className="text-[10px] text-white/30 shrink-0">{timeAgo(lastMsg.timestamp)}</span>
                  </div>
                  <p className={cn("text-xs truncate", conv.unreadCount > 0 ? "text-white/90 font-medium" : "text-white/40")}>
                    {lastMsg.senderId === 'me' ? 'You: ' : ''}{lastMsg.content}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-rose-500 text-[10px] font-bold flex items-center justify-center shrink-0 shadow-glow-rose mt-1">
                    {conv.unreadCount}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 glass-card rounded-3xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <Avatar src={activeConv.participantAvatar} name={activeConv.participantName} online />
            <div>
              <p className="text-sm font-bold text-white/95">{activeConv.participantName}</p>
              <p className="text-[10px] font-medium text-emerald-400 tracking-wider">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-white/40 hover:text-cyan-400 transition-colors"><Phone size={18} /></button>
            <button className="p-2 text-white/40 hover:text-cyan-400 transition-colors"><Video size={18} /></button>
            <button className="p-2 text-white/40 hover:text-white transition-colors ml-2"><MoreVertical size={18} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {activeConv.messages.map((msg, i) => {
              const isMe = msg.senderId === 'me'
              const showAvatar = i === 0 || activeConv.messages[i - 1].senderId !== msg.senderId
              
              return (
                <motion.div
                  key={msg.id}
                  variants={messageBubble}
                  initial="initial"
                  animate="animate"
                  className={cn("flex gap-3", isMe ? "flex-row-reverse" : "flex-row")}
                >
                  {showAvatar ? (
                    <Avatar 
                      src={isMe ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=me' : activeConv.participantAvatar} 
                      name={isMe ? 'Me' : activeConv.participantName} 
                      size="sm"
                      className="mt-auto"
                    />
                  ) : <div className="w-8 shrink-0" />}
                  
                  <div className={cn("flex flex-col max-w-[70%]", isMe ? "items-end" : "items-start")}>
                    <div className={cn(
                      "px-4 py-2.5 rounded-2xl text-sm font-medium",
                      isMe 
                        ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-white rounded-br-sm border border-cyan-400/20 shadow-[0_0_15px_rgba(0,217,255,0.1)]" 
                        : "glass-sm text-white/90 rounded-bl-sm border border-white/10"
                    )}>
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-white/30 mt-1.5 px-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </motion.div>
              )
            })}
            {isTyping && (
              <motion.div variants={messageBubble} initial="initial" animate="animate" className="flex gap-3">
                <Avatar src={activeConv.participantAvatar} name={activeConv.participantName} size="sm" className="mt-auto" />
                <div className="glass-sm px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10 flex gap-1 items-center h-10">
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                  <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="flex items-end gap-2 bg-base-900 border border-white/10 rounded-2xl p-2 focus-within:border-cyan-400/30 focus-within:shadow-[0_0_15px_rgba(0,217,255,0.1)] transition-all">
            <button className="p-2 text-white/40 hover:text-cyan-400 transition-colors shrink-0">
              <ImageIcon size={20} />
            </button>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[40px] text-sm text-white/90 py-2 scrollbar-hide"
              rows={1}
            />
            <button className="p-2 text-white/40 hover:text-violet-400 transition-colors shrink-0">
              <Smile size={20} />
            </button>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-xl text-white shadow-glow-cyan shrink-0 disabled:opacity-50 disabled:shadow-none hover:scale-105 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
