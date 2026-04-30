'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    emoji: '💒',
    title: 'Catering Pernikahan',
    desc: 'Hidangan mewah dan elegan untuk hari spesial Anda dengan menu custom sesuai tema pernikahan.',
  },
  {
    emoji: '🙏',
    title: 'Catering Selamatan',
    desc: 'Paket syukuran, aqiqah, dan acara adat dengan menu tradisional Nusantara yang autentik.',
  },
  {
    emoji: '🎂',
    title: 'Catering Ulang Tahun',
    desc: 'Perayaan spesial dengan menu favorit dan cake untuk ulang tahun anak maupun dewasa.',
  },
  {
    emoji: '💼',
    title: 'Catering Rapat & Meeting',
    desc: 'Solusi makan untuk rapat, seminar, dan training dengan coffee break dan lunch buffet.',
  },
];

export default function Services() {
  const ref = useScrollAnimation();

  return (
    <section className="services-section" ref={ref}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">Layanan Kami</div>
          <h2 className="section-title">Solusi Catering untuk Semua Acara</h2>
          <p className="section-subtitle">
            Apapun acara Anda, Culinexia siap menghadirkan hidangan terbaik
            yang akan membuat tamu Anda terkesan.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card animate-on-scroll delay-${index + 1}`}
            >
              <div className="service-icon">{service.emoji}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}