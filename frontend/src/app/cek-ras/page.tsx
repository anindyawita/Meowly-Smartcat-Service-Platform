'use client'

import { useState, useRef } from 'react'
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

const MOCK = {
  breed:      'Persian Cat',
  scientific: 'Felis catus — Ras bulu panjang asal Persia',
  confidence: 96,
  traits:     ['Bulu panjang', 'Temperamen kalem', 'Indoor', 'Butuh grooming rutin'],
  service:    'Cat Grooming Premium + Cattery Suite',
}

export default function CekRas() {
  const [file,    setFile]    = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState<typeof MOCK | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: File) => {
    setFile(f); setResult(null)
    const r = new FileReader()
    r.onload = e => setPreview(e.target?.result as string)
    r.readAsDataURL(f)
  }

  const onDetect = () => {
    if (!file) return
    setLoading(true); setResult(null)
    setTimeout(() => { setLoading(false); setResult(MOCK) }, 2000)
  }

  const data = result ?? MOCK

  return (
    <main style={{
      minHeight: '100vh', padding: '80px 16px 40px',
      background: 'linear-gradient(135deg, #f5eeff 0%, #fce8f6 50%, #fef9f0 100%)',
      fontFamily: S.body,
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto 20px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: S.purple, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Kembali ke Beranda
        </Link>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div className="card-pad" style={{ background: 'white', borderRadius: 28, padding: 48, boxShadow: '0 20px 60px rgba(124,58,237,0.1)', border: '1px solid #e9d5ff' }}>
          <div className="detect-grid grid-2" style={{ alignItems: 'center' }}>

            {/* LEFT */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EDE9FE', color: S.purple, fontSize: 11, fontWeight: 500, padding: '4px 12px', borderRadius: 20, marginBottom: 20 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: S.purple, display: 'inline-block' }}></span>
                AI Powered · Computer Vision
              </div>
              <h1 style={{ fontFamily: S.display, fontSize: 36, fontWeight: 800, lineHeight: 1.2, color: S.text, marginBottom: 14 }}>
                Kenali Ras Kucingmu<br />dalam <span style={{ color: S.pink }}>Sekejap</span>
              </h1>
              <p style={{ fontSize: 14, color: S.muted, lineHeight: 1.7, marginBottom: 28 }}>
                Upload foto kucing kamu dan biarkan AI kami mengidentifikasi ras secara otomatis — lalu dapatkan rekomendasi layanan yang tepat.
              </p>

              {/* Upload zone */}
              <div
                onClick={() => inputRef.current?.click()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) handleFile(f) }}
                onDragOver={e => e.preventDefault()}
                style={{ border: '2px dashed #D9B8F4', borderRadius: 16, padding: '24px 20px', textAlign: 'center', cursor: 'pointer', background: S.lav, marginBottom: 14, transition: 'border-color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = S.pink)}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = '#D9B8F4')}
              >
                {preview ? (
                  <img src={preview} alt="preview" style={{ maxHeight: 130, margin: '0 auto', borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                ) : (
                  <>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', boxShadow: '0 4px 12px rgba(124,58,237,0.12)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={S.purple} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: S.text, marginBottom: 4 }}>
                      <span style={{ color: S.purple }}>Klik untuk upload</span> atau drag &amp; drop
                    </p>
                    <p style={{ fontSize: 11, color: S.muted }}>JPG, PNG — Maks. 5MB</p>
                  </>
                )}
              </div>
              <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

              <button onClick={onDetect} disabled={!file || loading} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: !file || loading ? '#e9d5ff' : S.pink,
                color: !file || loading ? S.purple : 'white',
                border: 'none', borderRadius: 14, padding: '14px', fontSize: 14, fontWeight: 500,
                cursor: !file || loading ? 'not-allowed' : 'pointer', fontFamily: S.body,
                boxShadow: !file || loading ? 'none' : '0 8px 24px rgba(217,70,168,0.3)',
                transition: 'all 0.2s',
              }}>
                {loading ? (
                  <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a10 10 0 0110 10"/></svg> Mendeteksi...</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Deteksi Ras Kucing Sekarang</>
                )}
              </button>

              <div className="grid-3" style={{ marginTop: 20 }}>
                {[['96%','Akurasi model'],['30+','Ras kucing'],['<10s','Waktu deteksi']].map(([n,l]) => (
                  <div key={l} style={{ textAlign: 'center', background: S.lav, borderRadius: 12, padding: '12px 8px' }}>
                    <p style={{ fontFamily: S.display, fontSize: 20, fontWeight: 800, color: S.purple }}>{n}</p>
                    <p style={{ fontSize: 12, color: S.muted, marginTop: 2 }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: S.pink, color: 'white', fontSize: 12, fontWeight: 500, padding: '4px 16px', borderRadius: 20, whiteSpace: 'nowrap', zIndex: 2 }}>
                {result ? 'Hasil Deteksi' : 'Contoh Hasil Deteksi'}
              </div>
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #e9d5ff', boxShadow: '0 16px 48px rgba(124,58,237,0.12)', marginTop: 8 }}>
                <div style={{ height: 190, background: 'linear-gradient(135deg,#f0eaff,#fce8f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  {preview
                    ? <img src={preview} alt="kucing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <img src="/Preview Kucing.png" alt="contoh kucing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block' }}/>
                  }
                  <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(255,255,255,0.92)', borderRadius: 20, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: '#15803d', border: '1px solid #d1fae5' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                    {data.confidence}% akurasi
                  </div>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: S.display, fontSize: 22, fontWeight: 700, color: S.text, marginBottom: 4 }}>{data.breed}</h3>
                  <p style={{ fontSize: 12, color: S.muted, marginBottom: 14 }}>{data.scientific}</p>
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: S.muted, marginBottom: 5 }}>
                      <span>Tingkat kepercayaan</span>
                      <span style={{ color: S.purple, fontWeight: 600 }}>{data.confidence}%</span>
                    </div>
                    <div style={{ height: 6, background: S.lav, borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 10, background: 'linear-gradient(90deg,#7C3AED,#D946A8)', width: `${data.confidence}%`, transition: 'width 1s ease' }}></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {data.traits.map(t => (
                      <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: '4px 10px', borderRadius: 20, background: S.lav, color: S.purple, border: '1px solid #ddd6fe' }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ background: 'linear-gradient(135deg,#EDE9FE,#fce8f6)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #e9d5ff' }}>
                    <div style={{ width: 36, height: 36, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>✂️</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 11, color: S.muted }}>Rekomendasi layanan</p>
                      <p style={{ fontSize: 12, fontWeight: 600, color: S.text }}>{data.service}</p>
                    </div>
                    <Link href="/#layanan" style={{ width: 28, height: 28, background: S.pink, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, textDecoration: 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
