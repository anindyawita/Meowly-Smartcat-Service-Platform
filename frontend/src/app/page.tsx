'use client'

import Navbar from '@/components/Navbar'
import FloatingButtons from '@/components/FloatingButtons'
import Image from 'next/image'
import Link from 'next/link'

const S = {
  pink:    '#D946A8',
  purple:  '#7C3AED',
  lav:     '#F0EAFF',
  cream:   '#FFF9F6',
  text:    '#1E0B35',
  muted:   '#7B6A8D',
  display: "'Baloo Paaji 2', cursive",
  body:    "'Poppins', sans-serif",
}

const services = [
  { name: 'Cat Grooming', desc: 'Layanan mandi dan perawatan kebersihan kucing'},
  { name: 'Cat Hotel',    desc: 'Penitipan kucing dengan perawatan harian yang terpantau'},
  { name: 'Cattery',      desc: 'Pembiakkan dan adopsi kucing secara profesional'},
]

const stats = [
  { num: '5+',  label: 'Tahun pengalaman' },
  { num: '20+', label: 'Penghargaan Diterima' },
  { num: '1K+', label: 'Pelanggan Puas' },
]

const breeds = [
  { label: "Siamese", img: "/siamese.png" },
  { label: "Persian", img: "/persian.png", featured: true },
  { label: "BSH", img: "/bsh.png" }
]

const gallery = [
  '/gallery-1.png',
  '/gallery-2.png',
  '/gallery-3.png',
  '/gallery-4.png',
]

const testimonials = [
  { name: 'Arin, 20 Tahun',  text: 'Meowly Membantu Saya Mendapatkan Pelayanan Kucing Yang Baik Dan Profesional, Sangat Puas Dengan Service.' },
  { name: 'Aluna, 20 Tahun', text: 'Meowly Membantu Saya Mendapatkan Pelayanan Kucing Yang Baik Dan Profesional, Sangat Puas Dengan Service.' },
  { name: 'Aluna, 20 Tahun', text: 'Meowly Membantu Saya Mendapatkan Pelayanan Kucing Yang Baik Dan Profesional, Sangat Puas Dengan Service.' },
  { name: 'Arin, 20 Tahun',  text: 'Meowly Membantu Saya Mendapatkan Pelayanan Kucing Yang Baik Dan Profesional, Sangat Puas Dengan Service.' },
  { name: 'Arin, 20 Tahun',  text: 'Meowly Membantu Saya Mendapatkan Pelayanan Kucing Yang Baik Dan Profesional, Sangat Puas Dengan Service.' },
  { name: 'Aluna, 20 Tahun', text: 'Meowly Membantu Saya Mendapatkan Pelayanan Kucing Yang Baik Dan Profesional, Sangat Puas Dengan Service.' },
]

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', overflowX: 'hidden', background:  `
      linear-gradient(180deg, 
        #F5E6F0 0%,
        #E8D9F0 20%,
        #E0D5F5 40%,
        #D8D5F0 60%,
        #E0E5F0 80%,
        #E8D9E8 100%
      )`, fontFamily: S.body }}>
<style>{`
  @media (max-width: 640px) {
    #tentang {
      flex-direction: column !important;
      justify-content: flex-start !important;
      align-items: center !important;
      text-align: center !important;
      padding: 80px 16px 30px 16px !important;
      min-height: auto !important;
    }
    #tentang > div:first-child {
      position: relative !important;
      transform: none !important;
      left: 0 !important;
      top: auto !important;
      max-width: 100% !important;
      width: 100% !important;
    }
    #tentang > div:first-child > p:first-child { font-size: 18px !important; margin-bottom: 8px !important; }
    #tentang > div:first-child h1 { font-size: 28px !important; line-height: 1.1 !important; margin-bottom: 12px !important; }
    #tentang > div:first-child > p:nth-of-type(2) { font-size: 14px !important; }
    #tentang > div:first-child a { font-size: 14px !important; padding: 9px 18px !important; }
    #tentang > div:last-child { display: none !important; }
    
    #stats-grid { grid-template-columns: 1fr !important; gap: 16px !important; padding: 0 16px !important; }
    #stats-grid p:first-child { font-size: 32px !important; }
    #stats-grid p:last-child { font-size: 13px !important; }
    
    .kenapa-grid { grid-template-columns: 1fr !important; gap: 24px !important; padding: 0 16px !important; }
    .breed-photos { justify-content: center !important; }
    .kenapa-grid > div:last-child h2 { font-size: 28px !important; margin-bottom: 12px !important; }
    .kenapa-grid > div:last-child p { font-size: 14px !important; }
    
    #layanan-grid { grid-template-columns: 1fr !important; gap: 16px !important; padding: 0 16px !important; }
    #layanan-grid .services-card h3 { font-size: 24px !important; }
    #layanan-grid .services-card p { font-size: 14px !important; }
    
    #gallery-grid { grid-template-columns: 1fr !important; gap: 12px !important; padding: 0 16px !important; }
    #gallery-grid > div { grid-column: auto !important; grid-row: auto !important; height: 180px !important; }
    .quote-strip { grid-template-columns: 1fr !important; gap: 16px !important; padding: 20px 16px !important; }
    .quote-strip p { font-size: 16px !important; }
    
    #testi-grid { grid-template-columns: 1fr !important; gap: 12px !important; padding: 0 16px !important; }
  }
  
  @media (max-width: 768px) {
    #tentang {
      flex-direction: column !important;
      justify-content: flex-start !important;
      align-items: center !important;
      text-align: center !important;
      padding: 100px 20px 40px 20px !important;
      min-height: auto !important;
    }
    #tentang > div:first-child {
      position: relative !important;
      transform: none !important;
      left: 0 !important;
      top: auto !important;
      max-width: 100% !important;
      width: 100% !important;
    }

    #tentang > div:first-child h1 { font-size: 36px !important; }
    #tentang > div:first-child p  { font-size: 15px !important; }
    #tentang > div:last-child {
      position: relative !important;
      width: 100% !important;
      height: 280px !important;
      right: auto !important;
      left: auto !important;
      bottom: auto !important;
      margin-top: 24px;
      overflow: hidden !important;
    }
    #tentang > div:last-child > div {
      position: absolute !important;
      width: 60% !important;
      height: 100% !important;
      right: auto !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
    }
    #stats-grid   { grid-template-columns: 1fr !important; gap: 24px !important; }
    #stats-grid p:first-child { font-size: 36px !important; }
    #stats-grid p:last-child { font-size: 15px !important; }
    .kenapa-grid  { grid-template-columns: 1fr !important; text-align: center; gap: 32px !important; }
    .breed-photos { justify-content: center; }
    #layanan-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
    #layanan-grid .services-card { padding: 24px !important; }
    #layanan-grid .services-card h3 { font-size: 26px !important; }
    #layanan-grid .services-card p { font-size: 15px !important; }
    #gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; gap: 14px !important; }
    #gallery-grid > div { grid-column: auto !important; grid-row: auto !important; height: 200px !important; }
    .quote-strip  { grid-template-columns: 1fr !important; gap: 20px !important; }
    .quote-strip p { font-size: 18px !important; }
    #testi-grid   { grid-template-columns: 1fr !important; gap: 14px !important; }
    #testi-grid > div { padding: 16px 16px !important; }
    .footer-grid  { grid-template-columns: 1fr !important; gap: 24px !important; }
    .nav-links    { display: none !important; }
    .show-mobile  { display: flex !important; }
  }
    .breed-photos {
    overflow-x: auto !important;
    width: 100% !important;
    padding-bottom: 8px !important;
    justify-content: flex-start !important;
    -webkit-overflow-scrolling: touch;
  }
  .breed-photos > div {
    min-width: 100px !important;
    flex-shrink: 0 !important;
  }

  /* Kenapa Meowly - teks tidak terpotong */
  .kenapa-grid > div:last-child {
    width: 100% !important;
    padding: 0 4px !important;
    overflow: visible !important;
  }
  .kenapa-grid > div:last-child h2 {
    font-size: 28px !important;
    white-space: normal !important;
  }
  .kenapa-grid > div:last-child p {
    font-size: 14px !important;
    white-space: normal !important;
  }
}

@media (max-width: 768px) {
  /* Sembunyikan semua gambar kucing di hero mobile */
  #tentang > div:last-child {
    display: none !important;
  }
}
`}</style>
      <Navbar />

      {/* ── HERO ── */}
      <section id="tentang" style={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 85% 25%, rgba(255, 240, 216, 0.4) 0%, transparent 40%),
          linear-gradient(180deg, #FAE8F0 0%, #F5E6F0 100%)
        `,
        display: 'flex', alignItems: 'flex-end',
        paddingTop: 64, position: 'relative', overflow: 'hidden',
      }}>
        {/* Left text */}
        <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 200, zIndex: 2, maxWidth: 800 }}>
          <p style={{ fontSize: 30, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.pink, marginBottom: 10 }}>
            Rawat Kucingmu Dengan Penuh Kasih
          </p>
          <h1 style={{ fontFamily: S.display, fontSize: 64, fontWeight: 800, lineHeight: 1.0, color: S.pink, marginBottom: 16 }}>
            MEOWLY CATSHOP
          </h1>
          <p style={{ fontSize: 20, color: S.muted, lineHeight: 1.7, marginBottom: 32, maxWidth: 450 }}>
            Layanan premium dengan standar kualitas terbaik untuk kucing kesayanganmu.
          </p>
        <Link href="/cek-ras" style={{
  display: 'inline-flex',
  alignItems: 'center',
  background: '#ff4da6',
  color: 'white',
  textDecoration: 'none',
  fontSize: 18,
  fontWeight: 500,
  padding: '11px 24px',
  borderRadius: 50,
  boxShadow: '0 6px 20px rgba(255, 77, 166, 0.35)',
  fontFamily: 'Poppins, sans-serif'
}}>
  Cek Ras Kucing Anda
</Link>
        </div>

        {/* Two cat images — bottom right, overlapping */}
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '55%', height: '85%', zIndex: 1 }}>
          {/* Hero Section 2 — back cat */}
          <div style={{ position: 'absolute', bottom: 0, right: 400, width: '90%', height: '100%' }}>
            <Image
              src="/Hero Section 2.png"
              alt="kucing 2"
              fill
              style={{ objectFit: 'contain', objectPosition: 'bottom' }}
            />
          </div>
          {/* Hero Section 1 — front cat */}
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '65%', height: '95%' }}>
            <Image
              src="/Hero Section 1.png"
              alt="kucing 1"
              fill
              style={{ objectFit: 'contain', objectPosition: 'bottom' }}
            />
          </div>
        </div>
      </section>

<section
  style={{
    padding: '64px 24px 40px',
    background: `
      radial-gradient(circle at 15% 70%, rgba(255, 240, 216, 0.35) 0%, transparent 45%),
      linear-gradient(180deg, #F5E6F0 0%, #F0E5F5 100%)
    `
  }}
>
  <div
    id="stats-grid"
    style={{
      maxWidth: 800,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      textAlign: 'center',
      gap: 20
    }}
  >
    {stats.map(s => (
      <div key={s.num}>
        <p
          style={{
            fontFamily: S.display,
            fontSize: 40,
            fontWeight: 800,
            color: S.text
          }}
        >
          {s.num}
        </p>

        <p
          style={{
            fontSize: 18,
            color: S.muted,
            marginTop: 2
          }}
        >
          {s.label}
        </p>
      </div>
    ))}
  </div>
</section>

      {/* ── KENAPA MEOWLY ── */}
<section style={{
  padding: '64px 40px',
  background: `
    radial-gradient(circle at 75% 15%, rgba(255, 240, 216, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 20% 85%, rgba(255, 240, 216, 0.25) 0%, transparent 45%),
    linear-gradient(180deg, #F0E5F5 0%, #EFE4F5 100%)
  `
}}>

  <div className="kenapa-grid" style={{
    maxWidth: 1100,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 48,
    alignItems: 'center'
  }}>

    {/* Breed photos */}
    <div className="breed-photos" style={{
      display: 'flex',
      gap: 12,
      alignItems: 'flex-end'
    }}>

      {breeds.map((b, i) => (
        <div
          key={b.label}
          style={{
            flex: b.featured ? 1.2 : 1,
            borderRadius: 16,
            overflow: 'hidden',
            border: `2px solid ${b.featured ? '#D946A8' : '#e9d5ff'}`,
            transform: b.featured ? 'scale(1.05)' : 'scale(1)',
            boxShadow: b.featured
              ? '0 8px 24px rgba(217,70,168,0.2)'
              : '0 2px 8px rgba(0,0,0,0.05)',
            zIndex: b.featured ? 2 : 1,
            position: 'relative',
            background: 'white'
          }}
        >

          {/* Cat Image */}
          <div style={{
            height: 160,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fdf4ff'
          }}>

            <Image
              src={b.img}
              alt={b.label}
              width={130}
              height={130}
              style={{
                objectFit: "contain"
              }}
            />

          </div>

          {/* Label */}
          <div style={{
            textAlign: 'center',
            fontSize: 18,
            padding: '6px 8px',
            fontWeight: 600,
            background: b.featured ? '#D946A8' : 'white',
            color: b.featured ? 'white' : '#6b7280',
            fontFamily: 'Poppins, sans-serif'
          }}>
            {b.label}
          </div>

        </div>
      ))}

    </div>


    {/* Text Content */}
    <div>

      <h2 style={{
        fontFamily: "'Baloo Paaji 2', cursive",
        fontSize: 40,
        color: '#D946A8',
        marginBottom: 16
      }}>
        Kenapa Meowly?
      </h2>

      <p style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 16,
        lineHeight: 1.7,
        color: '#374151',
        marginBottom: 18
      }}>
        Meowly berpengalaman dalam merawat berbagai jenis kucing dengan standar perawatan profesional.
      </p>

    </div>

  </div>

</section>


      {/* ── LAYANAN ── */}
      <section id="layanan" style={{ padding: '64px 40px', background: `
        radial-gradient(circle at 90% 30%, rgba(255, 240, 216, 0.35) 0%, transparent 45%),
        radial-gradient(circle at 10% 60%, rgba(255, 240, 216, 0.25) 0%, transparent 50%),
        linear-gradient(180deg, #EFE4F5 0%, #F0E0F0 100%)
      ` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: S.display, fontSize: 44, fontWeight: 800, textAlign: 'center', color: S.text, marginBottom: 40 }}>Layanan</h2>
          <div id="layanan-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {services.map(sv => (
              <div key={sv.name} className="services-card" style={{
                background: 'rgba(255,255,255,0.7)', borderRadius: 20, padding: '28px 24px',
                border: '1.5px solid #f9a8d4',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(217,70,168,0.15)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                <h3 style={{ fontFamily: S.display, fontSize: 30, fontWeight: 700, color: S.pink, marginBottom: 12 }}>{sv.name}</h3>
                <p style={{ fontSize: 18, color: S.muted, lineHeight: 1.65 }}>{sv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERI ── */}
      <section id="galeri" style={{ padding: '64px 40px', background: `
        radial-gradient(circle at 25% 75%, rgba(255, 240, 216, 0.3) 0%, transparent 45%),
        radial-gradient(circle at 80% 20%, rgba(255, 240, 216, 0.35) 0%, transparent 50%),
        linear-gradient(180deg, #F0E0F0 0%, #F5DDF0 100%)
      ` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: S.display, fontSize: 44, fontWeight: 800, textAlign: 'center', color: S.text, marginBottom: 40 }}>Galeri</h2>

          <div id="gallery-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 16, marginBottom: 12 }}>

  <div style={{ gridColumn: '1', gridRow: '1', borderRadius: 16, overflow: 'hidden', height: 220 }}>
    <Image src="/gallery-1.png" alt="Cat Gallery 1" width={300} height={220} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
  </div>

  <div style={{ gridColumn: '2', gridRow: '1 / 3', borderRadius: 16, overflow: 'hidden' }}>
    <Image src="/gallery-2.png" alt="Cat Gallery 2" width={300} height={400} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
  </div>

  <div style={{ gridColumn: '3', gridRow: '1', borderRadius: 16, overflow: 'hidden', height: 220 }}>
    <Image src="/gallery-3.png" alt="Cat Gallery 3" width={300} height={220} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
  </div>

  <div style={{ gridColumn: '1', gridRow: '2', borderRadius: 16, overflow: 'hidden', height: 180 }}>
    <Image src="/gallery-4.png" alt="Cat Gallery 4" width={300} height={180} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
  </div>

  <div style={{ gridColumn: '3', gridRow: '2', borderRadius: 16, overflow: 'hidden', height: 180 }}>
    <Image src="/gallery-1.png" alt="Cat Gallery 5" width={300} height={180} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
  </div>

</div>
          {/* Quote strip */}
<div className="quote-strip" style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 32,
  alignItems: 'center',
  background: 'rgba(255,255,255,0.5)',
  borderRadius: 20,
  padding: '32px 36px',
  marginTop: 60
}}>

  <div style={{
    width: '100%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden'
  }}>
    <Image
      src="/penghargaan.png"
      alt="Penghargaan Meowly"
      width={300}
      height={250}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  </div>

  <p style={{
    fontFamily: 'Poppins, sans-serif',
    fontSize: 22,
    fontWeight: 600,
    color: S.pink,
    fontStyle: 'italic',
    lineHeight: 1.5
  }}>
    "Perawatan kucing dimulai dari rasa aman dan perhatian. Tim Meowly menangani setiap kucing secara profesional."
  </p>

</div>
        </div>
      </section>

 {/* ── TESTIMONI ── */}
      <section id="testimoni" style={{ padding: '64px 40px', background: `
        radial-gradient(circle at 85% 70%, rgba(255, 240, 216, 0.3) 0%, transparent 45%),
        radial-gradient(circle at 15% 25%, rgba(255, 240, 216, 0.35) 0%, transparent 50%),
        linear-gradient(180deg, #F5DDF0 0%, #F8DFF0 100%)
      ` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 18, color: S.text, marginBottom: 4 }}>Apa Kata Mereka Tentang</p>
          <h2 style={{ fontFamily: S.display, fontSize: 44, fontWeight: 800, color: S.pink, marginBottom: 40 }}>LAYANAN MEOWLY</h2>
 
          <div id="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {testimonials.slice(0, 5).map((t, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, padding: '18px 20px', boxShadow: '0 2px 12px rgba(124,58,237,0.06)' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {Array(5).fill(0).map((_, j) => <span key={j} style={{ color: '#facc15', fontSize: 13 }}>★</span>)}
                </div>
                <p style={{ fontWeight: 600, fontSize: 15, color: S.text, marginBottom: 6 }}>{t.name}</p>
                <p style={{ fontSize: 15, color: S.muted, lineHeight: 1.6 }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 

      {/* ── FOOTER ── */}
      <footer id="kontak" style={{ padding: '48px 40px', background: '#1E0B35' }}>
        <div className="footer-grid" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 40 }}>
          <div>
            <h3 style={{ fontFamily: S.display, fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 8, lineHeight: 1.5 }}>
              MEOWLY CATSHOP,<br />CATGROOMING, & CATTERY
            </h3>
            <p style={{ fontSize: 15, color: '#c4b5fd', lineHeight: 1.7 }}>Puri Gununganyar Regency Blok K no.15 Gunung Anyar, Surabaya</p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 14, fontSize: 18 }}>Informasi</h4>
            {['Tentang Kami', 'Info Layanan'].map(l => <p key={l} style={{ fontSize: 15, color: '#c4b5fd', marginBottom: 8 }}>{l}</p>)}
          </div>
          <div>
            <h4 style={{ color: 'white', fontWeight: 600, marginBottom: 14, fontSize: 18 }}>Kontak Kami</h4>
            <p style={{ fontSize: 15, color: '#c4b5fd', marginBottom: 8 }}>+62856-4869-8505</p>
            <p style={{ fontSize: 15, color: '#c4b5fd' }}>@meowly_catshop</p>
          </div>
        </div>
      </footer>

      <FloatingButtons />
    </main>
  )
}
