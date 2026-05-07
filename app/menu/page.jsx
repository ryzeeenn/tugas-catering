'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

// Data lengkap mensimulasikan hasil query SELECT * FROM pakets
const allPackages = [
  { 
    id: 1,
    nama_paket: 'Wedding Premium Package', 
    jenis: 'Prasmanan',
    kategori: 'Pernikahan', 
    jumlah_pax: 100,
    harga_paket: 185000, 
    deskripsi: 'Paket prasmanan mewah dengan 10 menu utama, 3 dessert, dan dekorasi.',
    emoji: '💒'
  },
  { 
    id: 2,
    nama_paket: 'Wedding Simple Box', 
    jenis: 'Box',
    kategori: 'Pernikahan', 
    jumlah_pax: 50,
    harga_paket: 85000, 
    deskripsi: 'Nasi box elegan untuk tamu undangan pernikahan.',
    emoji: '👰'
  },
  { 
    id: 3,
    nama_paket: 'Tasyakuran Lengkap', 
    jenis: 'Prasmanan',
    kategori: 'Selamatan', 
    jumlah_pax: 50,
    harga_paket: 75000, 
    deskripsi: '8 menu tradisional Nusantara untuk acara syukuran.',
    emoji: '🙏'
  },
  { 
    id: 4,
    nama_paket: 'Aqiqah Package', 
    jenis: 'Prasmanan',
    kategori: 'Selamatan', 
    jumlah_pax: 40,
    harga_paket: 95000, 
    deskripsi: 'Menu spesial daging kambing olahan untuk aqiqah.',
    emoji: '🕌'
  },
  { 
    id: 5,
    nama_paket: 'Birthday Party Package', 
    jenis: 'Prasmanan',
    kategori: 'Ulang Tahun', 
    jumlah_pax: 30,
    harga_paket: 95000, 
    deskripsi: 'Paket pesta lengkap dengan cake dan games.',
    emoji: ''
  },
  { 
    id: 6,
    nama_paket: 'Student Tour Box', 
    jenis: 'Box',
    kategori: 'Studi Tour', 
    jumlah_pax: 40,
    harga_paket: 45000, 
    deskripsi: 'Makanan praktis dalam box untuk perjalanan wisata siswa.',
    emoji: '🚌'
  },
  { 
    id: 7,
    nama_paket: 'Snack Box Meeting', 
    jenis: 'Box',
    kategori: 'Rapat', 
    jumlah_pax: 20,
    harga_paket: 35000, 
    deskripsi: 'Snack box untuk coffee break rapat kantor.',
    emoji: '☕'
  },
  { 
    id: 8,
    nama_paket: 'Corporate Lunch Buffet', 
    jenis: 'Prasmanan',
    kategori: 'Rapat', 
    jumlah_pax: 50,
    harga_paket: 125000, 
    deskripsi: 'Lunch buffet lengkap untuk meeting harian.',
    emoji: '💼'
  },
];

const categories = ['Semua', 'Pernikahan', 'Selamatan', 'Ulang Tahun', 'Studi Tour', 'Rapat'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const ref = useScrollAnimation();

  const filtered = activeCategory === 'Semua'
    ? allPackages
    : allPackages.filter((item) => item.kategori === activeCategory);

  return (
    <div style={{ paddingTop: '100px' }}>
      <section style={{ padding: '60px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Daftar Paket</div>
            <h2 className="section-title">Menu & Paket Catering</h2>
          </div>

          {/* Filter */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '50px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '50px',
                  border: activeCategory === cat ? 'none' : '2px solid var(--gray-light)',
                  background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                  color: activeCategory === cat ? 'var(--white)' : 'var(--dark)',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="menu-grid" ref={ref} style={{ marginTop: '50px' }}>
            {filtered.map((item, i) => (
              <div key={item.id} className={`menu-card animate-on-scroll delay-${(i % 6) + 1}`}>
                <div className="menu-card-image" style={{ fontSize: '60px' }}>
                  {item.emoji}
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-category">{item.kategori} • {item.jenis}</div>
                  <h3 className="menu-card-title">{item.nama_paket}</h3>
                  <p className="menu-card-desc">{item.deskripsi}</p>
                  
                  <div className="menu-card-footer">
                    <div className="menu-card-price">
                      Rp {item.harga_paket.toLocaleString('id-ID')} 
                      <small>/pax (min {item.jumlah_pax})</small>
                    </div>
                    <button className="menu-card-btn">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}