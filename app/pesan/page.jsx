'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PesanPage() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama_pelanggan: '',
    email: '',
    telepon: '',
    alamat1: '',
    id_jenis_bayar: ''
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch('/api/pakets');
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const addToCart = (paket) => {
    const existingItem = cart.find(item => item.id_paket === paket.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id_paket === paket.id
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.harga_paket }
          : item
      ));
    } else {
      setCart([...cart, {
        id_paket: paket.id,
        nama_paket: paket.nama_paket,
        harga_paket: paket.harga_paket,
        quantity: 1,
        subtotal: paket.harga_paket
      }]);
    }
  };

  const removeFromCart = (paketId) => {
    setCart(cart.filter(item => item.id_paket !== paketId));
  };

  const totalHarga = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (cart.length === 0) {
      alert('Pilih paket dulu!');
      setSubmitting(false);
      return;
    }
    if (!formData.id_jenis_bayar) {
      alert('Pilih metode pembayaran!');
      setSubmitting(false);
      return;
    }

    try {
      // 1. Cek Pelanggan (Cek API Pelanggan semua)
      const checkRes = await fetch('/api/pelanggan');
      const allPelanggan = await checkRes.json();
      
      // Cari berdasarkan email
      const existingUser = allPelanggan.find(p => p.email === formData.email);
      let idPelanggan;

      if (existingUser) {
        idPelanggan = existingUser.id;
        console.log('User ditemukan:', idPelanggan);
      } else {
        // Register User Baru
        const regRes = await fetch('/api/pelanggan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nama_pelanggan: formData.nama_pelanggan,
            email: formData.email,
            password: 'password123', // Default password
            telepon: formData.telepon,
            alamat1: formData.alamat1
          })
        });

        if (!regRes.ok) throw new Error('Gagal daftar akun');
        const regData = await regRes.json();
        idPelanggan = regData.pelanggan.id;
        console.log('User baru dibuat:', idPelanggan);
      }

      // 2. Buat Pemesanan
      const noResi = `ORD-${Date.now()}`;
      
      const orderPayload = {
        id_pelanggan: idPelanggan,
        id_jenis_bayar: parseInt(formData.id_jenis_bayar), // PASTIKAN INTEGER
        no_resi: noResi,
        total_bayar: totalHarga,
        status_pesan: 'Menunggu Konfirmasi',
        detail_pemesanan: cart.map(item => ({
          id_paket: parseInt(item.id_paket), // PASTIKAN INTEGER
          subtotal: parseInt(item.subtotal)
        }))
      };

      console.log('Mengirim Payload:', JSON.stringify(orderPayload));

      const orderRes = await fetch('/api/pemesanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const result = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(result.error || 'Gagal membuat pesanan');
      }

      alert(`Berhasil! Resi: ${noResi}`);
      router.push('/');

    } catch (error) {
      console.error('CRITICAL ERROR:', error);
      alert(`Gagal: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData) return <div style={{ paddingTop: '120px', textAlign: 'center' }}>Memuat paket...</div>;

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: '40px', textAlign: 'center' }}>Pesan Catering</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          
          {/* List Paket */}
          <div>
            <h2 style={{ marginBottom: '20px' }}>Pilih Paket</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {packages.map((paket) => (
                <div key={paket.id} style={{ padding: '20px', border: '2px solid var(--gray-light)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3>{paket.nama_paket}</h3>
                    <p style={{ color: 'var(--primary)', fontWeight: '700' }}>Rp {paket.harga_paket.toLocaleString('id-ID')}</p>
                  </div>
                  <button onClick={() => addToCart(paket)} style={{ padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>+ Tambah</button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Pemesanan */}
          <div>
            <h2 style={{ marginBottom: '20px' }}>Detail Pemesanan</h2>
            
            {/* Cart */}
            <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '16px' }}>Keranjang ({cart.length})</h3>
              {cart.length === 0 ? <p style={{ textAlign: 'center', color: 'var(--gray)' }}>Kosong</p> : (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {cart.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '12px', borderRadius: '8px' }}>
                      <span>{item.nama_paket} (x{item.quantity})</span>
                      <span style={{ fontWeight: '700' }}>Rp {item.subtotal.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--gray-light)', paddingTop: '12px', textAlign: 'right' }}>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>Total: Rp {totalHarga.toLocaleString('id-ID')}</strong>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              <input type="text" placeholder="Nama Lengkap" required value={formData.nama_pelanggan} onChange={(e) => setFormData({...formData, nama_pelanggan: e.target.value})} style={{ padding: '12px', border: '2px solid var(--gray-light)', borderRadius: '8px' }} />
              <input type="email" placeholder="Email (untuk login)" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ padding: '12px', border: '2px solid var(--gray-light)', borderRadius: '8px' }} />
              <input type="tel" placeholder="No. Telepon" required value={formData.telepon} onChange={(e) => setFormData({...formData, telepon: e.target.value})} style={{ padding: '12px', border: '2px solid var(--gray-light)', borderRadius: '8px' }} />
              <textarea placeholder="Alamat Lengkap" required rows="3" value={formData.alamat1} onChange={(e) => setFormData({...formData, alamat1: e.target.value})} style={{ padding: '12px', border: '2px solid var(--gray-light)', borderRadius: '8px', resize: 'vertical' }} />
              
              <select required value={formData.id_jenis_bayar} onChange={(e) => setFormData({...formData, id_jenis_bayar: e.target.value})} style={{ padding: '12px', border: '2px solid var(--gray-light)', borderRadius: '8px' }}>
                <option value="">Pilih Pembayaran</option>
                <option value="1">Transfer BCA</option>
                <option value="2">Transfer Mandiri</option>
                <option value="3">Transfer BNI</option>
                <option value="4">COD (Bayar di Tempat)</option>
              </select>

              <button type="submit" disabled={submitting || cart.length === 0} style={{ padding: '16px', background: (submitting || cart.length === 0) ? '#999' : 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer' }}>
                {submitting ? 'Memproses...' : `Pesan Sekarang`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}