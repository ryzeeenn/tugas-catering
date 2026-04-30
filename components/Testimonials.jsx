'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    avatar: '👩',
    name: 'Sarah Amelia',
    role: 'Event Organizer',
    stars: 5,
    text: 'Culinexia selalu menjadi pilihan utama kami untuk setiap event klien. Kualitas makanan konsisten dan pelayanan sangat profesional. Highly recommended!',
  },
  {
    avatar: '👨',
    name: 'Budi Santoso',
    role: 'CEO PT Maju Bersama',
    stars: 5,
    text: 'Kami sudah berlangganan catering Culinexia untuk kantor selama 2 tahun. Karyawan selalu puas dan tidak pernah ada keluhan. Terima kasih Culinexia!',
  },
  {
    avatar: '👩‍💼',
    name: 'Diana Putri',
    role: 'Pengantin Baru',
    stars: 5,
    text: 'Catering pernikahan kami dari Culinexia dan semua tamu memuji makanannya! Pelayanannya juga sangat ramah dan responsif. Pengalaman yang luar biasa!',
  },
];

export default function Testimonials() {
  const ref = useScrollAnimation();

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">Testimoni</div>
          <h2 className="section-title">Apa Kata Mereka?</h2>
          <p className="section-subtitle">
            Ribuan pelanggan telah mempercayakan acara mereka kepada Culinexia.
            Berikut beberapa cerita dari mereka.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card animate-on-scroll delay-${index + 1}`}
            >
              <div className="testimonial-stars">
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}