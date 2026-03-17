'use client'

import { useState, useRef, useEffect } from 'react'

const BOT_REPLIES: Record<string, string> = {
  persian:  'Persian butuh grooming <b>1–2x seminggu</b> karena bulunya panjang dan gampang kusut. Meowly punya paket khusus Persian loh! 🐱',
  grooming: 'Harga grooming Meowly mulai dari <b>Rp 75.000</b> untuk kucing kecil hingga <b>Rp 180.000</b> untuk bulu panjang. Mau jadwalin? 💜',
  cattery:  'Layanan cattery Meowly tersedia <b>24 jam</b> dengan pengawasan profesional. Kucing kamu dirawat dan diajak bermain setiap hari 🏠',
  default:  'Terima kasih sudah tanya! Untuk info lebih lanjut bisa langsung chat tim Meowly via WhatsApp ya. Ada pertanyaan lain? 🐾',
}

function getReply(msg: string) {
  const m = msg.toLowerCase()
  if (m.includes('persian') || m.includes('ras') || m.includes('perawatan') || m.includes('bulu')) return BOT_REPLIES.persian
  if (m.includes('grooming') || m.includes('harga') || m.includes('biaya') || m.includes('mandi')) return BOT_REPLIES.grooming
  if (m.includes('cattery') || m.includes('titip') || m.includes('hotel') || m.includes('inap')) return BOT_REPLIES.cattery
  return BOT_REPLIES.default
}

type ChatState = 'closed' | 'half' | 'full'

interface Message {
  type: 'bot' | 'user'
  text: string
  html?: boolean
  time: string
}

const SUGGESTS = [
  '🐱 Ras Persian butuh perawatan apa?',
  '✂️ Harga grooming?',
  '🏠 Info cattery?',
  '🔍 Cara cek ras kucing?',
]

export default function FloatingButtons() {
  const [chatState,    setChatState]    = useState<ChatState>('closed')
  const [messages,     setMessages]     = useState<Message[]>([
    { type: 'bot', text: 'Halo! Aku Meowly AI 🐾', time: '09:41' },
    { type: 'bot', text: 'Ada yang bisa aku bantu soal kucing kesayanganmu? Tanya apa saja — soal ras, perawatan, atau layanan Meowly!', time: '09:41' },
  ])
  const [input,        setInput]        = useState('')
  const [isTyping,     setIsTyping]     = useState(false)
  const [showSuggests, setShowSuggests] = useState(true)
  const [hasNotif,     setHasNotif]     = useState(true)
  const bodyRef  = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, isTyping])

  // lock body scroll when fullscreen
  useEffect(() => {
    document.body.style.overflow = chatState === 'full' ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [chatState])

  const now = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  const sendMsg = (text?: string) => {
    const val = (text ?? input).trim()
    if (!val) return
    setShowSuggests(false)
    setInput('')
    setChatState('full') // ← expand ke fullscreen setelah send
    setMessages(p => [...p, { type: 'user', text: val, time: now() }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(p => [...p, { type: 'bot', text: getReply(val), html: true, time: now() }])
    }, 1400)
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  return (
    <>
    <style>{`

/* ===== SMALL MOBILE (640px) ===== */
@media (max-width: 640px){
  .fullscreen-chat {
    inset: 0 !important;
  }

  .chat-header {
    padding: 0 12px !important;
    height: 56px !important;
    gap: 8px !important;
  }

  .chat-header-avatar {
    width: 36px !important;
    height: 36px !important;
    font-size: 18px !important;
  }

  .chat-header-text h1 {
    font-size: 14px !important;
  }

  .chat-header-text p {
    font-size: 9px !important;
  }

  .chat-header-btn {
    width: 32px !important;
    height: 32px !important;
  }

  .chat-body {
    flex-direction: column !important;
    padding: 0 !important;
    gap: 0 !important;
    max-width: 100vw !important;
  }

  .chat-sidebar {
    display: none !important;
  }

  .chat-area {
    border-radius: 0 !important;
    border: none !important;
  }

  .chat-messages {
    padding: 12px 12px 8px !important;
  }

  .chat-messages-bubble {
    max-width: 85% !important;
    font-size: 13px !important;
    padding: 10px 12px !important;
  }

  .chat-input {
    padding: 8px 12px !important;
    border-top: 1px solid #f3e8ff !important;
  }

  .chat-input-box {
    padding: 6px 6px 6px 16px !important;
  }

  .chat-input-field {
    font-size: 13px !important;
  }

  .suggest-btn {
    font-size: 11px !important;
    padding: 6px 12px !important;
    margin: 2px !important;
  }

  .time-stamp {
    font-size: 9px !important;
  }
}

/* ===== TABLET/MOBILE (768px) ===== */
@media (max-width: 768px){

  /* FULLSCREEN CHAT BODY */
  .chat-body{
    flex-direction: column !important;
    padding: 0 !important;
    gap: 0 !important;
    max-width: 100vw !important;
  }

  /* SIDEBAR HILANG DI HP */
  .chat-sidebar{
    display:none !important;
  }

  /* CHAT AREA FULL WIDTH */
  .chat-area{
    border-radius:0 !important;
    flex: 1 !important;
    border: none !important;
    width: 100% !important;
  }

  /* HEADER PADDING */
  .chat-header{
    padding: 0 16px !important;
    gap: 12px !important;
  }

  .chat-header-text h1 {
    font-size: 15px !important;
  }

  .chat-header-text p {
    font-size: 10px !important;
  }

  /* MESSAGE AREA */
  .chat-messages{
    padding: 16px 12px 12px !important;
  }

  .chat-messages-bubble {
    max-width: 80% !important;
    font-size: 14px !important;
  }

  /* INPUT AREA */
  .chat-input{
    padding: 12px 12px !important;
  }

  .chat-input-box {
    padding: 8px 8px 8px 18px !important;
  }

  .chat-input-field {
    font-size: 14px !important;
  }

  .suggest-btn {
    font-size: 12px !important;
    padding: 8px 14px !important;
  }

  /* HALF PANEL */
  .half-panel{
    width: calc(100vw - 32px) !important;
    right: 16px !important;
    left: 16px !important;
  }

}

`}</style>
      {/* ════════════════════════════════
          FULLSCREEN CHAT (setelah send)
      ════════════════════════════════ */}
      {chatState === 'full' && (
        <div className="fullscreen-chat" style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'linear-gradient(135deg, #f5eeff 0%, #fce8f6 60%, #fef9f0 100%)',
          display: 'flex', flexDirection: 'column',
          animation: 'fadeIn 0.25s ease',
        }}>
          <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(0.97) } to { opacity:1; transform:scale(1) } }`}</style>

          {/* Header */}
          <div className="chat-header" style={{
            flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12,
            padding: '0 32px', height: 68,
            background: 'linear-gradient(135deg, #9333ea, #D946A8)',
            boxShadow: '0 4px 20px rgba(124,58,237,0.2)',
          }}>
            <button onClick={() => setChatState('closed')} style={{
              width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s', flexShrink: 0,
            }} className="chat-header-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>
            <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.25)' }}/>
            <div className="chat-header-avatar" style={{ width: 44, height: 44, borderRadius: '50%', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.4)' }}>🐾</div>
            <div className="chat-header-text">
              <p style={{ color: 'white', fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "'Baloo Paaji 2', cursive" }}>Meowly Catshop AI</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, margin: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#86efac', display: 'inline-block' }}></span>
                Online — siap menjawab soal kucingmu
              </p>
            </div>
            <button onClick={() => setChatState('closed')} style={{
              marginLeft: 'auto', width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }} className="chat-header-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Body — sidebar + messages */}
          <div className="chat-body" style={{ flex: 1, display: 'flex', overflow: 'hidden', padding: '24px 32px 0', gap: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>

            {/* Sidebar */}
            <div className="chat-sidebar" style={{
              width: 280, flexShrink: 0,
              background: 'white', borderRadius: '20px 20px 0 0',
              border: '1px solid #e9d5ff', borderBottom: 'none',
              padding: 24, display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#7B6A8D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Tanya Cepat</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {SUGGESTS.map(s => (
                    <button key={s} onClick={() => sendMsg(s.replace(/^[^\w]+/, ''))} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      background: '#F0EAFF', border: '1px solid #e9d5ff', borderRadius: 12,
                      padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
                      fontSize: 12, color: '#1E0B35', fontFamily: "'Poppins', sans-serif",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#e9d5ff')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#F0EAFF')}
                    >
                      <span style={{ fontSize: 16 }}>{s.slice(0, 2)}</span>
                      <span style={{ lineHeight: 1.4 }}>{s.slice(3)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f3e8ff', paddingTop: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#7B6A8D', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Layanan Kami</p>
                {[['✂️','Cat Grooming'],['🏠','Cat Hotel'],['🐾','Cattery']].map(([icon, name]) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f9f0ff' }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <span style={{ fontSize: 13, color: '#1E0B35', fontFamily: "'Poppins', sans-serif" }}>{name}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', background: '#F0EAFF', borderRadius: 12, padding: 14 }}>
                <p style={{ fontSize: 11, color: '#7B6A8D', marginBottom: 8, fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>Butuh bantuan langsung?</p>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
                  background: '#25D366', color: 'white', textDecoration: 'none',
                  fontSize: 12, fontWeight: 500, padding: '8px 12px', borderRadius: 8,
                  fontFamily: "'Poppins', sans-serif",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>

            {/* Chat area */}
            <div className="chat-area" style={{ flex: 1, background: 'white', borderRadius: '20px 20px 0 0', border: '1px solid #e9d5ff', borderBottom: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div className="chat-messages" ref={bodyRef} style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ textAlign: 'center', fontSize: 11, color: '#7B6A8D', background: '#F0EAFF', borderRadius: 20, padding: '4px 14px', display: 'inline-block', alignSelf: 'center', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Hari ini</p>

                {messages.map((m, i) => (
                  <div key={i} className="animate-msg-in" style={{ display: 'flex', flexDirection: 'column', alignItems: m.type === 'user' ? 'flex-end' : 'flex-start', gap: 3, marginBottom: 4 }}>
                    {m.type === 'bot' ? (
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F0EAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🐾</div>
                        {m.html
                          ? <div className="chat-messages-bubble" style={{ maxWidth: '68%', fontSize: 14, lineHeight: 1.7, padding: '12px 16px', borderRadius: '4px 20px 20px 20px', background: '#F0EAFF', color: '#1E0B35', fontFamily: "'Poppins', sans-serif" }} dangerouslySetInnerHTML={{ __html: m.text }} />
                          : <div className="chat-messages-bubble" style={{ maxWidth: '68%', fontSize: 14, lineHeight: 1.7, padding: '12px 16px', borderRadius: '4px 20px 20px 20px', background: '#F0EAFF', color: '#1E0B35', fontFamily: "'Poppins', sans-serif" }}>{m.text}</div>
                        }
                      </div>
                    ) : (
                      <div className="chat-messages-bubble" style={{ maxWidth: '68%', fontSize: 14, lineHeight: 1.7, padding: '12px 16px', borderRadius: '20px 20px 4px 20px', background: '#D946A8', color: 'white', fontFamily: "'Poppins', sans-serif" }}>{m.text}</div>
                    )}
                    {(i === messages.length - 1 || messages[i + 1]?.type !== m.type) && (
                      <span className="time-stamp" style={{ fontSize: 10, color: '#7B6A8D', padding: m.type === 'bot' ? '0 0 0 46px' : '0 4px', fontFamily: "'Poppins', sans-serif" }}>{m.time}</span>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="animate-msg-in" style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F0EAFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🐾</div>
                    <div style={{ background: '#F0EAFF', borderRadius: '4px 20px 20px 20px', padding: '14px 18px', display: 'flex', gap: 5 }}>
                      <span className="dot-1" style={{ width: 8, height: 8, borderRadius: '50%', background: '#c084f5', display: 'inline-block' }}></span>
                      <span className="dot-2" style={{ width: 8, height: 8, borderRadius: '50%', background: '#c084f5', display: 'inline-block' }}></span>
                      <span className="dot-3" style={{ width: 8, height: 8, borderRadius: '50%', background: '#c084f5', display: 'inline-block' }}></span>
                    </div>
                  </div>
                )}

                {showSuggests && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {SUGGESTS.map(s => (
                      <button key={s} onClick={() => sendMsg(s.replace(/^[^\w]+/, ''))} className="suggest-btn" style={{
                        fontSize: 12, fontWeight: 500, padding: '7px 14px', borderRadius: 20,
                        border: '1px solid #ddd6fe', cursor: 'pointer', background: '#F0EAFF',
                        color: '#7C3AED', fontFamily: "'Poppins', sans-serif", transition: 'background 0.15s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#e9d5ff')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#F0EAFF')}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="chat-input" style={{ flexShrink: 0, borderTop: '1px solid #f3e8ff', padding: '16px 24px', background: 'white' }}>
                <div className="chat-input-box" style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F0EAFF', borderRadius: 32, padding: '8px 8px 8px 22px' }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMsg()}
                    placeholder="Tanya soal kucingmu..."
                    className="chat-input-field"
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: '#1E0B35', fontFamily: "'Poppins', sans-serif" }}
                  />
                  <button onClick={() => sendMsg()} style={{
                    width: 44, height: 44, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: input.trim() ? '#D946A8' : '#e9d5ff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    transition: 'background 0.2s',
                    boxShadow: input.trim() ? '0 4px 12px rgba(217,70,168,0.35)' : 'none',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" stroke="white"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none"/>
                    </svg>
                  </button>
                </div>
                <p style={{ textAlign: 'center', fontSize: 10, color: '#7B6A8D', marginTop: 8, fontFamily: "'Poppins', sans-serif" }}>
                  Didukung oleh RAG + Gemini AI · Meowly Catshop
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════
          HALF PANEL (sebelum send)
      ════════════════════════════════ */}
      {chatState !== 'full' && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>

          {/* Half panel */}
          <div style={{
            width: 310,
            height: chatState === 'half' ? 310 : 0,
            background: 'white', borderRadius: 24, overflow: 'hidden',
            border: chatState === 'half' ? '1px solid #e9d5ff' : 'none',
            boxShadow: chatState === 'half' ? '0 20px 60px rgba(124,58,237,0.18)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.34,1.3,0.64,1)',
            opacity: chatState === 'half' ? 1 : 0,
            transform: chatState === 'half' ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
            pointerEvents: chatState === 'half' ? 'all' : 'none',
            transformOrigin: 'bottom right',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'linear-gradient(135deg, #9333ea, #D946A8)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.4)', flexShrink: 0 }}>🐾</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontSize: 13, fontWeight: 600, margin: 0, fontFamily: "'Poppins', sans-serif" }}>Meowly Catshop AI</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, margin: 0, display: 'flex', alignItems: 'center', gap: 4, marginTop: 1, fontFamily: "'Poppins', sans-serif" }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#86efac', display: 'inline-block' }}></span>
                  Online
                </p>
              </div>
              <button onClick={() => setChatState('closed')} style={{ width: 26, height: 26, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Greeting + suggests */}
            <div style={{ flex: 1, padding: '12px 14px 8px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
              <div style={{ background: '#F0EAFF', borderRadius: '4px 14px 14px 14px', padding: '10px 13px', fontSize: 12, color: '#1E0B35', lineHeight: 1.5, fontFamily: "'Poppins', sans-serif" }}>
                Halo! Ada yang bisa aku bantu soal kucingmu? 🐱
              </div>
              <p style={{ fontSize: 10, color: '#7B6A8D', margin: '2px 0', fontFamily: "'Poppins', sans-serif" }}>Pertanyaan populer:</p>
              {SUGGESTS.slice(0, 3).map(s => (
                <button key={s} onClick={() => sendMsg(s.replace(/^[^\w]+/, ''))} style={{
                  textAlign: 'left', background: '#F0EAFF', border: '1px solid #ddd6fe',
                  borderRadius: 10, padding: '7px 12px', fontSize: 11, fontWeight: 500,
                  color: '#7C3AED', cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#e9d5ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F0EAFF')}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ flexShrink: 0, borderTop: '1px solid #f3e8ff', padding: '8px 12px', background: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F0EAFF', borderRadius: 24, padding: '5px 5px 5px 14px' }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg()}
                  placeholder="Tanya soal kucingmu..."
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 12, color: '#1E0B35', fontFamily: "'Poppins', sans-serif" }}
                />
                <button onClick={() => sendMsg()} style={{
                  width: 32, height: 32, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: input.trim() ? '#D946A8' : '#e9d5ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'background 0.2s',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" stroke="white"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Buttons row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ width: 50, height: 50, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(37,211,102,0.4)', textDecoration: 'none', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>

            <button
              onClick={() => { setHasNotif(false); setChatState(s => s === 'closed' ? 'half' : 'closed') }}
              className={chatState === 'closed' ? 'animate-pulse-ring' : ''}
              style={{ width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #9333ea, #D946A8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(217,70,168,0.45)', transition: 'transform 0.2s', position: 'relative' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {hasNotif && chatState === 'closed' && (
                <span style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, background: '#ef4444', borderRadius: '50%', border: '2px solid white', fontSize: 9, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>1</span>
              )}
              {chatState === 'half'
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              }
            </button>
          </div>
        </div>
      )}
    </>
  )
}
