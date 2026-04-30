'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const packages = [
  {
    emoji: '💒',
    badge: 'Populer',
    category: 'Paket Pernikahan',
    title: 'Wedding Premium',
    desc: 'Paket lengkap untuk hari spesial Anda. Termasuk 10 menu utama, dessert, dan minuman.',
    price: '185.000',
    unit: '/pax (min. 100)',
  },
  {
    emoji: '',
    badge: 'Best Seller',
    category: 'Paket Selamatan',
    title: 'Tasyakuran Lengkap',
    desc: 'Paket syukuran dengan 8 menu tradisional Nusantara. Cocok untuk 50-200 orang.',
    price: '75.000',
    unit: '/pax (min. 50)',
  },
  {
    emoji: '🎂',
    badge: 'Favorite',
    category: 'Paket Ulang Tahun',
    title: 'Birthday Celebration',
    desc: 'Paket ulang tahun dengan 6 menu favorit, cake, dan dekorasi sederhana.',
    price: '95.000',
    unit: '/pax (min. 30)',
  },
  {
    emoji: '🚌',
    badge: 'Hemat',
    category: 'Paket Studi Tour',
    title: 'Student Box Meal',
    desc: 'Makanan praktis dalam box untuk perjalanan. 1 menu utama + snack + minuman.',
    price: '45.000',
    unit: '/box (min. 40)',
  },
  {
    emoji: '💼',
    badge: 'Korporat',
    category: 'Paket Rapat',
    title: 'Meeting Package',
    desc: 'Paket rapat full day dengan 2x coffee break, lunch buffet, dan snack sore.',
    price: '125.000',
    unit: '/pax (min. 20)',
  },
  {
    emoji: '🎉',
    badge: 'Custom',
    category: 'Paket Event',
    title: 'Gathering Custom',
    desc: 'Paket fleksibel untuk gathering, seminar, atau acara komunitas. Bisa custom menu.',
    price: '85.000',
    unit: '/pax (min. 50)',
  },
];

export default function FeaturedMenu() {
  const sectionRef = useScrollAnimation();

  return (
    <section className="featured-menu" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">Paket Catering</div>
          <h2 className="section-title">Pilih Paket Sesuai Acara Anda</h2>
          <p className="section-subtitle">
            Dari pernikahan hingga rapat kantor, kami punya paket catering yang 
            disesuaikan dengan kebutuhan dan anggaran Anda.
          </p>
        </div>

        {/* ️ PERUBAHAN: Margin Top diperbesar menjadi 100px agar card turun jauh */}
        <div className="menu-grid" style={{ marginTop: '100px' }}>
          {packages.map((item, index) => (
            <div
              key={index}
              className={`menu-card animate-on-scroll delay-${index + 1}`}
            >
              <div className="menu-card-image">
                {item.badge && (
                  <span className="menu-card-badge">{item.badge}</span>
                )}
                {item.emoji}
              </div>
              <div className="menu-card-body">
                <div className="menu-card-category">{item.category}</div>
                <h3 className="menu-card-title">{item.title}</h3>
                <p className="menu-card-desc">{item.desc}</p>
                <div className="menu-card-footer">
                  <div className="menu-card-price">
                    Rp {item.price} <small>{item.unit}</small>
                  </div>
                  <button className="menu-card-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}