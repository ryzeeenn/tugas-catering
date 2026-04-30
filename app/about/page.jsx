'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const team = [
  { emoji: '👨‍🍳', name: 'Chef Ahmad Rizky', role: 'Head Chef' },
  { emoji: '👩‍🍳', name: 'Chef Sari Dewi', role: 'Pastry Chef' },
  { emoji: '🧑💼', name: 'Rendi Pratama', role: 'Operations Manager' },
  { emoji: '👩‍💼', name: 'Maya Anggraini', role: 'Marketing Director' },
];

const milestones = [
  { year: '2015', title: 'Awal Mula', desc: 'Culinexia didirikan dengan dapur kecil dan mimpi besar.' },
  { year: '2018', title: 'Ekspansi Pertama', desc: 'Membuka cabang di 5 kota besar Indonesia.' },
  { year: '2020', title: 'Go Digital', desc: 'Meluncurkan platform pemesanan online Culinexia.' },
  { year: '2025', title: '15.000+ Pelanggan', desc: 'Menjadi catering online #1 pilihan Indonesia.' },
];

export default function AboutPage() {
  const ref = useScrollAnimation();

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <section style={{ 
        paddingTop: '140px',
        paddingBottom: '80px', 
        background: 'var(--white)', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">Tentang Kami</div>
            <h2 className="section-title">Cerita Culinexia</h2>
            <p className="section-subtitle">
              Perjalanan kami dalam menghadirkan cita rasa terbaik ke setiap
              meja makan Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section - CARD DITURUNKAN LEBIH JAUH */}
      <section style={{ 
        padding: '120px 0 140px', 
        background: 'var(--cream)',
        position: 'relative'
      }} ref={ref}>
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-header animate-on-scroll" style={{ marginBottom: '20px' }}>
            <div className="section-label" style={{ marginBottom: '12px' }}>Sejarah</div>
            <h2 className="section-title" style={{ lineHeight: 1.2 }}>Perjalanan Kami</h2>
          </div>
          
          {/* ⬇️ CARD DITURUNKAN DARI 80px MENJADI 160px ️ */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px',
            marginTop: '160px'  
          }}>
            {milestones.map((m, i) => (
              <div 
                key={i} 
                className={`menu-card animate-on-scroll delay-${i + 1}`} 
                style={{ 
                  padding: '40px 24px', 
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '2.5rem', 
                  fontWeight: 800, 
                  color: 'var(--primary)', 
                  marginBottom: '16px'
                }}>
                  {m.year}
                </div>
                <h3 style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 700, 
                  marginBottom: '12px',
                  color: 'var(--dark)'
                }}>
                  {m.title}
                </h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--gray)', 
                  lineHeight: 1.7
                }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ 
        padding: '100px 0', 
        background: 'var(--white)'
      }}>
        <div className="container">
          <div className="section-header animate-on-scroll" style={{ marginBottom: '70px' }}>
            <div className="section-label" style={{ marginBottom: '16px' }}>Team</div>
            <h2 className="section-title" style={{ lineHeight: 1.2 }}>Tim Kami</h2>
            <p className="section-subtitle" style={{ marginTop: '16px' }}>
              Orang-orang hebat di balik setiap hidangan Culinexia.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '30px'
          }}>
            {team.map((t, i) => (
              <div
                key={i}
                className="animate-on-scroll"
                style={{
                  background: 'var(--cream)',
                  borderRadius: '24px',
                  padding: '40px 24px',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: 'var(--white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: 'var(--shadow-md)',
                  fontSize: '48px'
                }}>
                  {t.emoji}
                </div>

                <h4 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--dark)'
                }}>
                  {t.name}
                </h4>

                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  margin: 0
                }}>
                  {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}