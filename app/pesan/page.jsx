"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PesanPage() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama_pelanggan: "",
    email: "",
    telepon: "",
    alamat1: "",
    alamat2: "",
    alamat3: "",
    id_jenis_bayar: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/pakets");
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoadingData(false);
    }
  };

  const addToCart = (paket) => {
    const existingItem = cart.find((item) => item.id_paket === paket.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id_paket === paket.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.harga_paket,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          id_paket: paket.id,
          nama_paket: paket.nama_paket,
          harga_paket: paket.harga_paket,
          quantity: 1,
          subtotal: paket.harga_paket,
        },
      ]);
    }
  };

  const removeFromCart = (paketId) => {
    setCart(cart.filter((item) => item.id_paket !== paketId));
  };

  const totalHarga = cart.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Validasi
    if (cart.length === 0) {
      alert("⚠️ Silakan pilih minimal 1 paket terlebih dahulu!");
      setSubmitting(false);
      return;
    }
    if (!formData.id_jenis_bayar) {
      alert("⚠️ Silakan pilih metode pembayaran!");
      setSubmitting(false);
      return;
    }

    try {
      console.log(" Mengirim data pemesanan...", {
        cart,
        formData,
        totalHarga,
      });

      // 1. Cek apakah pelanggan sudah ada berdasarkan email
      const checkRes = await fetch("/api/pelanggan");
      const allPelanggan = await checkRes.json();
      let existingPel = allPelanggan.find((p) => p.email === formData.email);

      let idPelanggan;
      if (existingPel) {
        idPelanggan = existingPel.id;
        console.log("✅ Pelanggan sudah ada, ID:", idPelanggan);
      } else {
        // Register pelanggan baru
        const regRes = await fetch("/api/pelanggan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama_pelanggan: formData.nama_pelanggan,
            email: formData.email,
            password: "password123", // Default untuk demo
            telepon: formData.telepon,
            alamat1: formData.alamat1,
            alamat2: formData.alamat2 || null,
            alamat3: formData.alamat3 || null,
          }),
        });

        if (!regRes.ok) {
          const errData = await regRes.json();
          throw new Error(errData.error || "Gagal mendaftarkan pelanggan");
        }

        const regData = await regRes.json();
        idPelanggan = regData.pelanggan.id;
        console.log("✅ Pelanggan baru terdaftar, ID:", idPelanggan);
      }

      // 2. Buat pemesanan
      const noResi = `ORD-${Date.now()}`;
      const orderRes = await fetch("/api/pemesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pelanggan: idPelanggan,
          id_jenis_bayar: parseInt(formData.id_jenis_bayar),
          no_resi: noResi,
          total_bayar: totalHarga,
          status_pesan: "Menunggu Konfirmasi",
          detail_pemesanan: cart.map((item) => ({
            id_paket: item.id_paket,
            subtotal: item.subtotal,
          })),
        }),
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        throw new Error(errData.error || "Gagal membuat pemesanan");
      }

      alert(`✅ Pemesanan berhasil!\nNomor Resi: ${noResi}`);
      router.push("/");
    } catch (error) {
      console.error("❌ Error Detail:", error);
      alert(` Gagal: ${error.message}\n\nCek Console (F12) untuk detail.`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center" }}>
        <h2>Memuat paket...</h2>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "120px", paddingBottom: "80px" }}>
      <div className="container">
        <h1
          className="section-title"
          style={{ marginBottom: "40px", textAlign: "center" }}
        >
          Pesan Catering
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {/* Daftar Paket */}
          <div>
            <h2 style={{ marginBottom: "20px" }}>Pilih Paket</h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {packages.map((paket) => (
                <div
                  key={paket.id}
                  style={{
                    padding: "20px",
                    border: "2px solid var(--gray-light)",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => addToCart(paket)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--gray-light)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "8px" }}>{paket.nama_paket}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--gray)" }}>
                      {paket.deskripsi}
                    </p>
                    <p
                      style={{
                        marginTop: "8px",
                        fontWeight: "700",
                        color: "var(--primary)",
                      }}
                    >
                      Rp {paket.harga_paket.toLocaleString("id-ID")} /pax
                    </p>
                  </div>
                  <button
                    style={{
                      padding: "10px 20px",
                      background: "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    + Tambah
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Pemesanan & Cart */}
          <div>
            <h2 style={{ marginBottom: "20px" }}>Detail Pemesanan</h2>

            {/* Cart Items */}
            <div
              style={{
                background: "var(--cream)",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ marginBottom: "16px" }}>
                Paket Dipilih ({cart.length})
              </h3>
              {cart.length === 0 ? (
                <p style={{ color: "var(--gray)", textAlign: "center" }}>
                  Belum ada paket yang dipilih
                </p>
              ) : (
                <div style={{ display: "grid", gap: "12px" }}>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px",
                        background: "white",
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <strong>{item.nama_paket}</strong>
                        <p
                          style={{ fontSize: "0.85rem", color: "var(--gray)" }}
                        >
                          {item.quantity}x Rp{" "}
                          {item.harga_paket.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <span
                          style={{ fontWeight: "700", color: "var(--primary)" }}
                        >
                          Rp {item.subtotal.toLocaleString("id-ID")}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id_paket)}
                          style={{
                            padding: "6px 12px",
                            background: "#ef4444",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                  <div
                    style={{
                      borderTop: "2px solid var(--gray-light)",
                      paddingTop: "12px",
                      marginTop: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <strong>Total:</strong>
                    <strong
                      style={{ fontSize: "1.3rem", color: "var(--primary)" }}
                    >
                      Rp {totalHarga.toLocaleString("id-ID")}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            {/* Form Data Pelanggan */}
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama_pelanggan}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nama_pelanggan: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid var(--gray-light)",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid var(--gray-light)",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    No. Telepon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telepon}
                    onChange={(e) =>
                      setFormData({ ...formData, telepon: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid var(--gray-light)",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Alamat Lengkap *
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.alamat1}
                    onChange={(e) =>
                      setFormData({ ...formData, alamat1: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid var(--gray-light)",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "600",
                    }}
                  >
                    Metode Pembayaran *
                  </label>
                  <select
                    required
                    value={formData.id_jenis_bayar}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        id_jenis_bayar: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "2px solid var(--gray-light)",
                      borderRadius: "8px",
                      fontSize: "1rem",
                    }}
                  >
                    <option value="">Pilih Pembayaran</option>
                    <option value="1">Transfer Bank BCA</option>
                    <option value="2">Transfer Bank Mandiri</option>
                    <option value="3">Transfer Bank BNI</option>
                    <option value="4">COD (Bayar di Tempat)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting || cart.length === 0}
                  style={{
                    padding: "16px",
                    background:
                      submitting || cart.length === 0
                        ? "#999"
                        : "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor:
                      submitting || cart.length === 0
                        ? "not-allowed"
                        : "pointer",
                    marginTop: "20px",
                  }}
                >
                  {submitting
                    ? "Memproses..."
                    : `Pesan Sekarang - Rp ${totalHarga.toLocaleString("id-ID")}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
