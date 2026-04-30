'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CTASection() {
  const ref = useScrollAnimation();

  return (
    <section className="cta-section" ref={ref}>
      <div className="container">
        <div className="cta-content animate-on-scroll">
          <h2>Siap Memesan Catering?</h2>
          <p>
            Hubungi kami sekarang dan dapatkan penawaran terbaik untuk acara
            spesial Anda. Gratis konsultasi menu!
          </p>
          <div className="cta-buttons">
            <a href="/contact" className="btn-white">
              📞 Hubungi Sekarang
            </a>
            <a href="/menu" className="btn-outline-white">
              📋 Lihat Menu Lengkap
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}