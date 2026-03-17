'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const S = {
  pink:    '#D946A8',
  purple:  '#7C3AED',
  lav:     '#F0EAFF',
  text:    '#1E0B35',
  muted:   '#7B6A8D',
  display: "'Baloo Paaji 2', cursive",
  body:    "'Poppins', sans-serif",
}

const BOT_REPLIES: Record<string, string> = {
  persian:  'Persian butuh grooming <b>1–2x seminggu</b> karena bulunya panjang dan gampang kusut. Meowly punya paket khusus Persian loh! 🐱',
  grooming: 'Harga grooming Meowly mulai dari <b>Rp 75.000</b> untuk kucing kecil hingga <b>Rp 180.000</b> untuk bulu panjang. Mau jadwalin? 💜',
  cattery:  'Layanan cattery Meowly tersedia <b>24 jam</b> dengan pengawasan profesional. Kucing kamu akan dirawat, diberi makan, dan diajak bermain setiap hari 🏠',
  ras:      'Meowly berpengalaman merawat berbagai ras kucing — dari Persian, Maine Coon, Scottish Fold, Siamese, hingga BSH. Mau cek ras kucingmu? Coba fitur <b>Deteksi Ras</b> kami! 🐾',
  default:  'Terima kasih sudah tanya! Untuk informasi lebih lanjut bisa langsung chat tim Meowly via WhatsApp ya. Ada pertanyaan lain soal kucingmu? 🐾',
}

function getReply(msg: string) {
  const m = msg.toLowerCase()
  if (m.includes('persian') || m.includes('maine') || m.includes('scottish') || m.includes('bulu')) return BOT_REPLIES.persian
  if (m.includes('grooming') || m.includes('harga') || m.includes('biaya') || m.includes('mandi') || m.includes('price')) return BOT_REPLIES.grooming
  if (m.includes('cattery') || m.includes('titip') || m.includes('hotel') || m.includes('inap')) return BOT_REPLIES.cattery
  if (m.includes('ras') || m.includes('jenis') || m.includes('breed')) return BOT_REPLIES.ras
  return BOT_REPLIES.default
}

interface Message {
  type: 'bot' | 'user'
  text: string
  html?: boolean
  time: string
}

const SUGGESTS = [
  { icon: '🐱', text: 'Ras Persian butuh perawatan apa?' },
  { icon: '✂️', text: 'Berapa harga grooming?' },
  { icon: '🏠', text: 'Info layanan cattery?' },
  { icon: '🔍', text: 'Cara cek ras kucing?' },
]

export default function ChatPage() {
  const [messages,     setMessages]     = useState<Message[]>([
    { type: 'bot', text: 'Halo! Aku Meowly AI 🐾', time: '09:41', html: false },
    { type: 'bot', text: 'Ada yang bisa aku bantu soal kucing kesayanganmu? Tanya apa saja — soal ras, perawatan, grooming, atau layanan Meowly!', time: '09:41', html: false },
  ])
  const [input,        setInput]        = useState('')
  const [isTyping,     setIsTyping]     = useState(false)
  const [showSuggests, setShowSuggests] = useState(true)
  const bodyRef  = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, isTyping])

  const now = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  const sendMsg = (text?: string) => {
    const val = (text ?? input).trim()
    if (!val) return
    setShowSuggests(false)
    setInput('')
    setMessages(p => [...p, { type: 'user', text: val, time: now(), html: false }])
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(p => [...p, { type: 'bot', text: getReply(val), html: true, time: now() }])
    }, 1400)
    inputRef.current?.focus()
  }

  return (
    <main style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(135deg, #f5eeff 0%, #fce8f6 60%, #fef9f0 100%)',
      fontFamily: S.body,
    }}>
      <style>{`
        .hide-mobile { display: flex; }
        .chat-padding { padding: 24px 24px 0; }

        @media (max-width: 768px) {
          .hide-mobile  { display: none !important; }
          .chat-padding { padding: 0 !important; }
          .chat-area    { border-radius: 0 !important; border-left: none !important; border-right: none !important; border-top: none !important; }
          .topbar-title { font-size: 13px !important; }
          .topbar-sub   { font-size: 10px !important; }
          .msg-area     { padding: 16px 14px 8px !important; }
          .input-area   { padding: 10px 14px !important; }
        }

        .dot-1, .dot-2, .dot-3 {
          animation: typing 1.4s infinite ease-in-out;
        }
        .dot-2 { animation-delay: 0.2s; }
        .dot-3 { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40%            { opacity: 1;   transform: translateY(-4px); }
        }

        .animate-msg-in {
          animation: msgIn 0.25s ease;
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .suggest-btn:hover { background: #e9d5ff !important; }
        .sidebar-btn:hover { background: #e9d5ff !important; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{
        flexShrink: 0,
        background: 'linear-gradient(135deg, #9333ea, #D946A8)',
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(124,58,237,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </Link>
          <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.25)', flexShrink: 0 }}/>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '2px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🐾</div>
          <div>
            <p className="topbar-title" style={{ color: 'white', fontSize: 15, fontWeight: 600, margin: 0 }}>Meowly Catshop AI</p>
            <p className="topbar-sub" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#86efac', display: 'inline-block' }}></span>
              Online — siap menjawab soal kucingmu
            </p>
          </div>
        </div>

        <Link href="/cek-ras" style={{
          background: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none',
          fontSize: 12, fontWeight: 500, padding: '7px 16px', borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span className="hide-mobile">Cek Ras Kucing</span>
        </Link>
      </div>

      {/* ── Main: sidebar + chat ── */}
      <div className="chat-padding" style={{ flex: 1, display: 'flex', overflow: 'hidden', maxWidth: 1200, margin: '0 auto', width: '100%' }}>

        {/* Sidebar — desktop only */}
        <div className="hide-mobile" style={{
          width: 260, flexShrink: 0, marginRight: 24,
          background: 'white', borderRadius: '20px 20px 0 0',
          border: '1px solid #e9d5ff', borderBottom: 'none',
          padding: 24, flexDirection: 'column', gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: S.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Tanya Cepat</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SUGGESTS.map(s => (
                <button key={s.text} onClick={() => sendMsg(s.text)} className="sidebar-btn" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: S.lav, border: '1px solid #e9d5ff', borderRadius: 12,
                  padding: '10px 14px', cursor: 'pointer', textAlign: 'left',
                  fontSize: 12, color: S.text, fontFamily: S.body, transition: 'all 0.15s',
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                  <span style={{ lineHeight: 1.4 }}>{s.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f3e8ff', paddingTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: S.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Layanan Kami</p>
            {[['✂️','Cat Grooming'],['🏠','Cat Hotel'],['🐾','Cattery']].map(([icon, name]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f9f0ff' }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 13, color: S.text }}>{name}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', background: S.lav, borderRadius: 12, padding: 14 }}>
            <p style={{ fontSize: 11, color: S.muted, marginBottom: 8, fontWeight: 500 }}>Butuh bantuan langsung?</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#25D366', color: 'white', textDecoration: 'none',
              fontSize: 12, fontWeight: 500, padding: '8px 12px', borderRadius: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>

        {/* Chat area */}
        <div className="chat-area" style={{
          flex: 1, background: 'white', borderRadius: '20px 20px 0 0',
          border: '1px solid #e9d5ff', borderBottom: 'none',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>

          {/* Messages */}
          <div ref={bodyRef} className="msg-area" style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ textAlign: 'center', fontSize: 11, color: S.muted, marginBottom: 16, background: S.lav, borderRadius: 20, padding: '4px 12px', display: 'inline-block', alignSelf: 'center' }}>Hari ini</p>

            {messages.map((m, i) => (
              <div key={i} className="animate-msg-in" style={{ display: 'flex', flexDirection: 'column', alignItems: m.type === 'user' ? 'flex-end' : 'flex-start', gap: 2, marginBottom: 4 }}>
                {m.type === 'bot' && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: S.lav, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🐾</div>
                    {m.html
                      ? <div style={{ maxWidth: '72%', fontSize: 14, lineHeight: 1.65, padding: '11px 15px', borderRadius: '4px 18px 18px 18px', background: S.lav, color: S.text }} dangerouslySetInnerHTML={{ __html: m.text }} />
                      : <div style={{ maxWidth: '72%', fontSize: 14, lineHeight: 1.65, padding: '11px 15px', borderRadius: '4px 18px 18px 18px', background: S.lav, color: S.text }}>{m.text}</div>
                    }
                  </div>
                )}
                {m.type === 'user' && (
                  <div style={{ maxWidth: '72%', fontSize: 14, lineHeight: 1.65, padding: '11px 15px', borderRadius: '18px 18px 4px 18px', background: S.pink, color: 'white' }}>{m.text}</div>
                )}
                {(i === messages.length - 1 || messages[i + 1]?.type !== m.type) && (
                  <span style={{ fontSize: 10, color: S.muted, padding: m.type === 'bot' ? '0 0 0 40px' : '0 4px' }}>{m.time}</span>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="animate-msg-in" style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: S.lav, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🐾</div>
                <div style={{ background: S.lav, borderRadius: '4px 18px 18px 18px', padding: '14px 18px', display: 'flex', gap: 5, alignItems: 'center' }}>
                  <span className="dot-1" style={{ width: 8, height: 8, borderRadius: '50%', background: '#c084f5', display: 'inline-block' }}></span>
                  <span className="dot-2" style={{ width: 8, height: 8, borderRadius: '50%', background: '#c084f5', display: 'inline-block' }}></span>
                  <span className="dot-3" style={{ width: 8, height: 8, borderRadius: '50%', background: '#c084f5', display: 'inline-block' }}></span>
                </div>
              </div>
            )}

            {showSuggests && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                {SUGGESTS.map(s => (
                  <button key={s.text} onClick={() => sendMsg(s.text)} className="suggest-btn" style={{
                    fontSize: 12, fontWeight: 500, padding: '7px 13px', borderRadius: 20,
                    border: '1px solid #ddd6fe', cursor: 'pointer',
                    background: S.lav, color: S.purple, fontFamily: S.body, transition: 'background 0.15s',
                  }}>
                    {s.icon} {s.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="input-area" style={{ flexShrink: 0, borderTop: '1px solid #f3e8ff', padding: '14px 20px', background: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: S.lav, borderRadius: 28, padding: '8px 8px 8px 18px' }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
                placeholder="Tanya soal kucingmu..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: S.text, fontFamily: S.body }}
              />
              <button onClick={() => sendMsg()} style={{
                width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: input.trim() ? S.pink : '#e9d5ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'all 0.2s',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" stroke="white"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" stroke="none"/>
                </svg>
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: 10, color: S.muted, marginTop: 8 }}>Didukung oleh RAG + Gemini AI · Meowly Catshop</p>
          </div>
        </div>
      </div>
    </main>
  )
}