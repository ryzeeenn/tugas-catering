'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const ref = useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pesan Anda telah terkirim! Tim Culinexia akan segera menghubungi Anda.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">Hubungi Kami</div>
            <h2 className="section-title">Mari Berdiskusi</h2>
            <p className="section-subtitle">
              Punya pertanyaan atau ingin memesan? Jangan ragu untuk menghubungi kami.
            </p>
          </div>

          <div className="about-grid" ref={ref}>
            {/* Contact Info */}
            <div className="animate-on-scroll from-left">
              <div style={{ display: 'grid', gap: '24px' }}>
                {[
                  { emoji: '📍', title: 'Alamat', desc: 'Jl. Kuliner Nusantara No. 42, Jakarta Selatan' },
                  { emoji: '📞', title: 'Telepon', desc: '+62 812-3456-7890' },
                  { emoji: '📧', title: 'Email', desc: 'hello@culinexia.id' },
                  { emoji: '⏰', title: 'Jam Operasional', desc: 'Senin - Minggu, 08:00 - 22:00 WIB' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="about-feature"
                    style={{ padding: '24px' }}
                  >
                    <div className="about-feature-icon" style={{ fontSize: '24px' }}>
                      {item.emoji}
                    </div>
                    <div className="about-feature-text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-on-scroll from-right">
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'var(--cream)',
                  padding: '40px',
                  borderRadius: '24px',
                  display: 'grid',
                  gap: '20px',
                }}
              >
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      border: '2px solid var(--gray-light)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--gray-light)')}
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      border: '2px solid var(--gray-light)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--gray-light)')}
                    placeholder="email@contoh.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      border: '2px solid var(--gray-light)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--gray-light)')}
                    placeholder="+62 xxx-xxxx-xxxx"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                    Pesan
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      border: '2px solid var(--gray-light)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'var(--font-body)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--gray-light)')}
                    placeholder="Ceritakan kebutuhan catering Anda..."
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Kirim Pesan 📨
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}