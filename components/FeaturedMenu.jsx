'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Import client dari lib
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FeaturedMenu() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useScrollAnimation();

  // Fungsi untuk ambil data dari Supabase
  useEffect(() => {
    async function getData() {
      try {
        // Perintah SQL sederhana: SELECT * FROM paket
        const { data, error } = await supabase
          .from('paket')
          .select('*');

        if (error) throw error;
        setPackages(data);
      } catch (error) {
        console.error('Error fetching ', error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) {
    return (
      <section className="featured-menu">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Memuat paket dari database...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-menu" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-label">Paket Catering</div>
          <h2 className="section-title">Pilih Paket Sesuai Acara Anda</h2>
          <p className="section-subtitle">
            Data diambil langsung dari Database Supabase.
          </p>
        </div>

        <div className="menu-grid" style={{ marginTop: '100px' }}>
          {packages.map((item, index) => (
            <div
              key={item.id}
              className={`menu-card animate-on-scroll delay-${index + 1}`}
            >
              <div className="menu-card-image">
                <span className="menu-card-badge">{item.jenis}</span>
                {/* Menentukan Emoji berdasarkan Kategori */}
                <span style={{ fontSize: '60px' }}>
                  {item.kategori === 'Pernikahan' && '💒'}
                  {item.kategori === 'Selamatan' && ''}
                  {item.kategori === 'Ulang Tahun' && '🎂'}
                  {item.kategori === 'Studi Tour' && '🚌'}
                  {item.kategori === 'Rapat' && '💼'}
                  {!['Pernikahan', 'Selamatan', 'Ulang Tahun', 'Studi Tour', 'Rapat'].includes(item.kategori) && '🍽️'}
                </span>
              </div>
              <div className="menu-card-body">
                <div className="menu-card-category">{item.kategori}</div>
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
  );
}