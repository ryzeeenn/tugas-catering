"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Force dynamic rendering to avoid build-time errors
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [pemesanan, setPemesanan] = useState(null);
  const [detailPemesanan, setDetailPemesanan] = useState([]);
  const [metodePembayaran, setMetodePembayaran] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = searchParams.get("id");
    if (!id) {
      alert("ID pemesanan tidak ditemukan");
      router.push("/");
      return;
    }
    fetchData(id);
  }, [searchParams, router]);

  const fetchData = async (id) => {
    try {
      const [resPesanan, resPembayaran] = await Promise.all([
        fetch("/api/pemesanan"),
        fetch("/api/pembayaran"),
      ]);

      const allPemesanan = await resPesanan.json();
      const found = allPemesanan.find((p) => p.id.toString() === id);

      if (!found) throw new Error("Pemesanan tidak ditemukan");

      setPemesanan(found);
      setDetailPemesanan(found.detail_pemesanan || []);
      setMetodePembayaran(await resPembayaran.json());
    } catch (err) {
      console.error(err);
      alert("Gagal memuat data checkout");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleBayar = async (idMetodeBayar) => {
    setProcessing(true);
    try {
      const res = await fetch("/api/pembayaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pemesanan: pemesanan.id,
          id_jenis_bayar: idMetodeBayar,
        }),
      });

      if (res.ok) {
        alert("✅ Pembayaran berhasil dikonfirmasi! Pesanan sedang diproses.");
        router.push("/");
      } else {
        throw new Error("Gagal konfirmasi pembayaran");
      }
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  // Show loading until mounted on client
  if (!mounted || loading) {
    return (
      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Memuat data checkout...</h2>
          <p style={{ color: "var(--gray)", marginTop: "8px" }}>
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    );
  }

  if (!pemesanan) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center" }}>
        <h2>Data tidak ditemukan</h2>
        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        background: "var(--cream)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h1
          className="section-title"
          style={{ marginBottom: "40px", textAlign: "center" }}
        >
          Checkout & Pembayaran
        </h1>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Info Pesanan */}
          <div
            style={{
              background: "white",
              padding: "32px",
              borderRadius: "16px",
              marginBottom: "24px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                paddingBottom: "16px",
                borderBottom: "2px solid var(--gray-light)",
              }}
            >
              Detail Pemesanan
            </h2>
            <div
              style={{
                marginBottom: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <p>
                <strong>No. Resi:</strong> {pemesanan.no_resi}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  style={{
                    padding: "4px 12px",
                    background:
                      pemesanan.status_pesan === "Selesai"
                        ? "#10b981"
                        : "#3b82f6",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    marginLeft: "8px",
                  }}
                >
                  {pemesanan.status_pesan}
                </span>
              </p>
              <p>
                <strong>Pelanggan:</strong>{" "}
                {pemesanan.pelanggan?.nama_pelanggan}
              </p>
              <p>
                <strong>Total:</strong>{" "}
                <strong style={{ color: "var(--primary)" }}>
                  Rp {pemesanan.total_bayar?.toLocaleString("id-ID")}
                </strong>
              </p>
            </div>

            <h3 style={{ marginBottom: "12px" }}>Paket yang Dipesan</h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {detailPemesanan.map((d, i) => (
                <div
                  key={i}
                  style={{
                    padding: "16px",
                    background: "var(--cream)",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <strong>{d.paket?.nama_paket}</strong>
                    <p style={{ fontSize: "0.9rem", color: "var(--gray)" }}>
                      {d.paket?.jenis}
                    </p>
                  </div>
                  <strong style={{ color: "var(--primary)" }}>
                    Rp {d.subtotal?.toLocaleString("id-ID")}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div
            style={{
              background: "white",
              padding: "32px",
              borderRadius: "16px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
                paddingBottom: "16px",
                borderBottom: "2px solid var(--gray-light)",
              }}
            >
              Pilih Metode Pembayaran
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {metodePembayaran.map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: "20px",
                    border: "2px solid var(--gray-light)",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    opacity:
                      processing ||
                      pemesanan.status_pesan !== "Menunggu Konfirmasi"
                        ? 0.6
                        : 1,
                  }}
                  onClick={() =>
                    !processing &&
                    pemesanan.status_pesan === "Menunggu Konfirmasi" &&
                    handleBayar(m.id)
                  }
                  onMouseEnter={(e) => {
                    if (
                      !processing &&
                      pemesanan.status_pesan === "Menunggu Konfirmasi"
                    ) {
                      e.currentTarget.style.borderColor = "var(--primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--gray-light)";
                  }}
                >
                  <div>
                    <h3>{m.metode_pembayaran}</h3>
                    {m.detail_jenis_pembayaran?.[0] && (
                      <p style={{ fontSize: "0.9rem", color: "var(--gray)" }}>
                        No. Rek: {m.detail_jenis_pembayaran[0].no_rek}
                      </p>
                    )}
                  </div>
                  <button
                    disabled={
                      processing ||
                      pemesanan.status_pesan !== "Menunggu Konfirmasi"
                    }
                    style={{
                      padding: "12px 24px",
                      background:
                        pemesanan.status_pesan !== "Menunggu Konfirmasi"
                          ? "#999"
                          : processing
                            ? "#ccc"
                            : "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor:
                        pemesanan.status_pesan !== "Menunggu Konfirmasi" ||
                        processing
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    {processing
                      ? "Memproses..."
                      : pemesanan.status_pesan !== "Menunggu Konfirmasi"
                        ? "Sudah Dibayar"
                        : "Bayar Sekarang"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
