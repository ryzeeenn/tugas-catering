'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutSection() {
  const ref = useScrollAnimation();

  return (
    <section className="about-section" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <div className="about-images animate-on-scroll from-left">
            <div className="about-img-main">👨‍🍳</div>
            <div className="about-img-secondary">🧑‍🍳</div>
            <div className="about-experience-badge">
              <div className="number">10+</div>
              <div className="text">Tahun Pengalaman</div>
            </div>
          </div>

          <div className="about-text animate-on-scroll from-right">
            <div className="section-label" style={{ justifyContent: 'flex-start' }}>
              Tentang Kami
            </div>
            <h2>
              Cerita di Balik
              <br />
              Setiap <span>Hidangan</span>
            </h2>
            <p>
              Culinexia didirikan dengan satu misi sederhana: menghadirkan
              makanan berkualitas terbaik ke setiap acara Anda. Dari pernikahan
              hingga pertemuan korporat, kami berkomitmen untuk memberikan
              pengalaman kuliner yang luar biasa.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon">🌿</div>
                <div className="about-feature-text">
                  <h4>Bahan Segar</h4>
                  <p>100% bahan organik dan segar setiap hari</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">👨‍🍳</div>
                <div className="about-feature-text">
                  <h4>Chef Profesional</h4>
                  <p>Tim chef berpengalaman 10+ tahun</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">🚚</div>
                <div className="about-feature-text">
                  <h4>Pengiriman Cepat</h4>
                  <p>Tepat waktu dan terjaga kualitasnya</p>
                </div>
              </div>
              <div className="about-feature">
                <div className="about-feature-icon">💰</div>
                <div className="about-feature-text">
                  <h4>Harga Terjangkau</h4>
                  <p>Kualitas premium, harga bersahabat</p>
                </div>
              </div>
            </div>

            <a href="/about" className="btn-primary">
              Selengkapnya →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}