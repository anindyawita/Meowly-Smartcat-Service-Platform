'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from "next/image";

const navItems = [
  { label: 'Layanan',      href: '#layanan' },
  { label: 'Galeri',       href: '#galeri' },
  { label: 'Testimoni',    href: '#testimoni' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [active,     setActive]     = useState('')
  const [menuOpen,   setMenuOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const handleNav = (href: string) => {
    setActive(href)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .logo-img { width: 120px !important; }
          .nav-container { padding: 0 16px !important; }
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 20px rgba(124,58,237,0.08)' : 'none',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 24px',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
  <Image 
    src="/Logo.png"
    alt="Meowly Logo"
    width={200}
    height={100}
    style={{
      width: '160px',
      height: 'auto',
      maxWidth: '100%'
    }}
  />
</Link>

          {/* Desktop nav */}
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', borderRadius: 50, padding: '6px 10px', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 2px 12px rgba(124,58,237,0.08)' }}>
            {navItems.map(item => (
              <button key={item.href} onClick={() => handleNav(item.href)} style={{
                padding: '6px 14px', borderRadius: 50, border: 'none', cursor: 'pointer',
                fontSize: 16, fontFamily: "'Poppins', sans-serif", fontWeight: 500,
                background: active === item.href ? '#D946A8' : 'transparent',
                color: active === item.href ? 'white' : '#7B6A8D',
                transition: 'all 0.2s',
              }}>
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/cek-ras" className="hide-mobile" style={{
              background: '#D946A8', color: 'white', textDecoration: 'none',
              fontSize: 15, fontWeight: 500, fontFamily: "'Poppins', sans-serif",
              padding: '9px 20px', borderRadius: 50,
              boxShadow: '0 4px 16px rgba(217,70,168,0.3)',
              whiteSpace: 'nowrap'
            }}>
              Cek Ras Kucing
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, alignItems: 'center', justifyContent: 'center' }}
              className="show-mobile"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E0B35" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49,
          background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)',
          padding: '16px 24px 24px', borderBottom: '1px solid #f3e8ff',
          boxShadow: '0 8px 32px rgba(124,58,237,0.1)',
        }}>
          {navItems.map(item => (
            <button key={item.href} onClick={() => handleNav(item.href)} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontSize: 15, fontFamily: "'Poppins', sans-serif", fontWeight: 500,
              background: active === item.href ? '#fce8f6' : 'transparent',
              color: active === item.href ? '#D946A8' : '#1E0B35',
              marginBottom: 4,
            }}>
              {item.label}
            </button>
          ))}
          <Link href="/cek-ras" onClick={() => setMenuOpen(false)} style={{
            display: 'block', textAlign: 'center', marginTop: 12,
            background: '#D946A8', color: 'white', textDecoration: 'none',
            fontSize: 14, fontWeight: 500, padding: '12px', borderRadius: 12,
          }}>
            Cek Ras Kucing
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
