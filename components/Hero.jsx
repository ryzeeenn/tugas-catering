export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-shapes">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Catering Premium #1 Indonesia
            </div>

            <h1 className="hero-title">
              Rasakan Kelezatan
              <br />
              <span className="highlight">Cita Rasa</span>
              <br />
              Istimewa
            </h1>

            <p className="hero-subtitle">
              Culinexia menghadirkan pengalaman catering terbaik dengan
              bahan-bahan segar pilihan dan resep turun-temurun yang
              memanjakan lidah Anda di setiap acara.
            </p>

            <div className="hero-buttons">
              <a href="/menu" className="btn-primary">
                🍽️ Lihat Menu
              </a>
              <a href="/contact" className="btn-secondary">
                📞 Hubungi Kami
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Pelanggan Puas</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">200+</div>
                <div className="stat-label">Menu Pilihan</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Kota Terjangkau</div>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-floating-card">
              <div className="rating">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
              </div>
              <div className="rating-text">4.9/5 Rating</div>
            </div>

            <div className="hero-image-main" />

            <div className="hero-image-overlay">
              <div className="hero-image-overlay-icon">🚚</div>
              <div className="hero-image-overlay-text">
                <strong>Gratis Ongkir</strong>
                <span>Untuk pesanan pertama</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}