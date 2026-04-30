'use client';  // ← WAJIB ADA DI BARIS 1
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="navbar-logo">
              Culin<span>exia</span>
            </Link>
            <p>
              Culinexia adalah platform catering online terpercaya yang
              menghadirkan pengalaman kuliner terbaik untuk setiap acara
              spesial Anda.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link">📘</a>
              <a href="#" className="footer-social-link">📸</a>
              <a href="#" className="footer-social-link">🐦</a>
              <a href="#" className="footer-social-link">▶️</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Menu</h4>
            <ul>
              <li><Link href="#">Nusantara</Link></li>
              <li><Link href="#">Western</Link></li>
              <li><Link href="#">Asian</Link></li>
              <li><Link href="#">Dessert</Link></li>
              <li><Link href="#">Minuman</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Perusahaan</h4>
            <ul>
              <li><Link href="/about">Tentang Kami</Link></li>
              <li><Link href="#">Karir</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="/contact">Kontak</Link></li>
              <li><Link href="#">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-newsletter">
            <h4>Newsletter</h4>
            <p>
              Dapatkan info promo dan menu terbaru langsung di inbox Anda.
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}  // ← Event handler butuh 'use client'
            >
              <input
                type="email"
                placeholder="Email Anda..."
                required
              />
              <button type="submit">Kirim</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Culinexia. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}