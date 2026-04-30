'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

const allPackages = [
  { 
    category: 'Pernikahan', 
    emoji: '💒', 
    name: 'Wedding Premium Package', 
    price: '185.000', 
    desc: 'Paket lengkap pernikahan dengan 10 menu utama, 3 dessert, 2 minuman, dan fruit platter.',
    includes: ['10 Menu Utama', '3 Dessert', '2 Minuman', 'Fruit Platter', 'Pramusaji']
  },
  { 
    category: 'Pernikahan', 
    emoji: '👰', 
    name: 'Wedding Simple Package', 
    price: '125.000', 
    desc: 'Paket pernikahan sederhana dengan 6 menu utama dan 1 dessert.',
    includes: ['6 Menu Utama', '1 Dessert', '2 Minuman', 'Rice Box']
  },
  { 
    category: 'Selamatan', 
    emoji: '🙏', 
    name: 'Tasyakuran Lengkap', 
    price: '75.000', 
    desc: 'Paket syukuran dengan 8 menu tradisional Nusantara lengkap.',
    includes: ['8 Menu Tradisional', 'Nasi Putih', 'Kerupuk', 'Sambal', 'Buah']
  },
  { 
    category: 'Selamatan', 
    emoji: '🕌', 
    name: 'Aqiqah Package', 
    price: '95.000', 
    desc: 'Paket aqiqah dengan menu spesial daging kambing olahan.',
    includes: ['Gulai Kambing', 'Sate Kambing', 'Nasi Putih', 'Sayur', 'Sambal', 'Kerupuk']
  },
  { 
    category: 'Ulang Tahun', 
    emoji: '🎂', 
    name: 'Birthday Celebration', 
    price: '95.000', 
    desc: 'Paket ulang tahun dengan 6 menu favorit dan cake ulang tahun.',
    includes: ['6 Menu Favorit', 'Birthday Cake', '2 Minuman', 'Dekorasi Sederhana']
  },
  { 
    category: 'Ulang Tahun', 
    emoji: '🎈', 
    name: 'Kids Birthday Party', 
    price: '85.000', 
    desc: 'Paket ulang tahun anak dengan menu kids-friendly dan games.',
    includes: ['5 Menu Kids', 'Mini Burger', 'French Fries', 'Jus Buah', 'Ice Cream', 'Games']
  },
  { 
    category: 'Studi Tour', 
    emoji: '🚌', 
    name: 'Student Box Meal', 
    price: '45.000', 
    desc: 'Makanan praktis dalam box untuk perjalanan studi tour.',
    includes: ['1 Menu Utama', 'Nasi Putih', 'Sayur', 'Acar', 'Kerupuk', 'Air Mineral']
  },
  { 
    category: 'Studi Tour', 
    emoji: '🎒', 
    name: 'Tour Snack Box', 
    price: '25.000', 
    desc: 'Snack box untuk perjalanan singkat atau istirahat.',
    includes: ['Roti Sandwich', 'Cake Slice', 'Snack', 'Air Mineral']
  },
  { 
    category: 'Rapat', 
    emoji: '💼', 
    name: 'Meeting Full Day', 
    price: '125.000', 
    desc: 'Paket rapat full day dengan 2x coffee break, lunch buffet, dan snack sore.',
    includes: ['Morning Coffee Break', 'Lunch Buffet (5 menu)', 'Afternoon Snack', 'Coffee/Tea']
  },
  { 
    category: 'Rapat', 
    emoji: '📊', 
    name: 'Meeting Half Day', 
    price: '75.000', 
    desc: 'Paket rapat setengah hari dengan 1x coffee break dan lunch.',
    includes: ['Coffee Break', 'Lunch Box (4 menu)', 'Air Mineral', 'Buah Potong']
  },
  { 
    category: 'Event', 
    emoji: '🎉', 
    name: 'Gathering Package', 
    price: '85.000', 
    desc: 'Paket gathering untuk komunitas atau perusahaan.',
    includes: ['7 Menu Buffet', '2 Minuman', 'Dessert', 'Pramusaji']
  },
  { 
    category: 'Event', 
    emoji: '🎪', 
    name: 'Seminar Package', 
    price: '95.000', 
    desc: 'Paket seminar dengan coffee break dan lunch.',
    includes: ['2x Coffee Break', 'Lunch Buffet', 'Snack Box', 'Air Mineral']
  },
];

const categories = ['Semua', 'Pernikahan', 'Selamatan', 'Ulang Tahun', 'Studi Tour', 'Rapat', 'Event'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const ref = useScrollAnimation();

  const filtered = activeCategory === 'Semua'
    ? allPackages
    : allPackages.filter((item) => item.category === activeCategory);

  return (
    <div style={{ paddingTop: '100px' }}>
      <section style={{ padding: '60px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-label">Paket Catering</div>
            <h2 className="section-title">Pilih Paket Untuk Acara Anda</h2>
            <p className="section-subtitle">
              Dari pernikahan hingga rapat kantor, kami menyediakan berbagai paket 
              catering yang bisa disesuaikan dengan kebutuhan dan anggaran Anda.
            </p>
          </div>

          {/* Category Filter */}
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
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: activeCategory === cat ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Package Grid */}
          <div className="menu-grid" ref={ref}>
            {filtered.map((item, i) => (
              <div
                key={item.name}
                className={`menu-card animate-on-scroll delay-${(i % 6) + 1}`}
              >
                <div className="menu-card-image">{item.emoji}</div>
                <div className="menu-card-body">
                  <div className="menu-card-category">{item.category}</div>
                  <h3 className="menu-card-title">{item.name}</h3>
                  <p className="menu-card-desc">{item.desc}</p>
                  
                  {/* What's Included */}
                  <div style={{ 
                    marginBottom: '16px', 
                    padding: '12px', 
                    background: 'var(--white)', 
                    borderRadius: '8px' 
                  }}>
                    <strong style={{ fontSize: '0.8rem', color: 'var(--dark)', display: 'block', marginBottom: '8px' }}>
                      Termasuk:
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.includes.map((inc, idx) => (
                        <span 
                          key={idx}
                          style={{
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            background: 'var(--cream)',
                            borderRadius: '4px',
                            color: 'var(--gray)',
                          }}
                        >
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="menu-card-footer">
                    <div className="menu-card-price">
                      Rp {item.price} <small>/pax</small>
                    </div>
                    <button className="menu-card-btn">+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--gray)' }}>
                Tidak ada paket untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}