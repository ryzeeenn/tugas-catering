"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("pemesanan");
  const [pemesanan, setPemesanan] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [pengiriman, setPengiriman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Cek apakah sudah login
  useEffect(() => {
    const adminAuth = localStorage.getItem("culinexia_admin_auth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  // Fetch semua data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resPesanan, resPelanggan, resPengiriman] = await Promise.all([
        fetch("/api/pemesanan"),
        fetch("/api/pelanggan"),
        fetch("/api/pengiriman"),
      ]);

      const dataPesanan = await resPesanan.json();
      const dataPelanggan = await resPelanggan.json();
      const dataPengiriman = await resPengiriman.json();

      setPemesanan(dataPesanan);
      setPelanggan(dataPelanggan);
      setPengiriman(dataPengiriman);
    } catch (err) {
      console.error("Error fetching admin ", err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi login
  const handleLogin = (e) => {
    e.preventDefault();
    // GANTI PASSWORD DI SINI!
    if (password === "admin123") {
      localStorage.setItem("culinexia_admin_auth", "true");
      setIsAuthenticated(true);
      setWrongPassword(false);
      fetchData();
    } else {
      setWrongPassword(true);
    }
  };

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("culinexia_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
    router.refresh();
  };

  // Fungsi update status
  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/pemesanan", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          status_pesan: newStatus,
        }),
      });

      if (res.ok) {
        alert("✅ Status berhasil diupdate!");
        fetchData();
      } else {
        const error = await res.json();
        alert("❌ " + error.error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("❌ Terjadi kesalahan saat update status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Tampilkan form login jika belum authenticated
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fdf2f0 0%, #fff5f5 100%)",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
              🔐 Admin Panel
            </h1>
            <p style={{ color: "var(--gray)", fontSize: "0.9rem" }}>
              Culinexia Dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "var(--dark)",
                }}
              >
                Password Admin
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "2px solid var(--gray-light)",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "border-color 0.3s",
                }}
                placeholder="Masukkan password"
                autoFocus
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--gray-light)")
                }
              />
              {wrongPassword && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "10px",
                    background: "#fee2e2",
                    color: "#dc2626",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    textAlign: "center",
                  }}
                >
                  ❌ Password salah!
                </div>
              )}
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.3s",
              }}
            >
              Masuk Dashboard
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <a
              href="/"
              style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
              }}
            >
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan loading
  if (loading) {
    return (
      <div
        style={{ paddingTop: "120px", textAlign: "center", minHeight: "100vh" }}
      >
        <h2>Memuat dashboard...</h2>
      </div>
    );
  }

  // Tampilkan dashboard admin
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h1 className="section-title">Dashboard Admin</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "var(--primary)",
              }}
            >
              {pemesanan.length}
            </div>
            <div style={{ color: "var(--gray)" }}>Total Pemesanan</div>
          </div>
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#10b981",
              }}
            >
              {pelanggan.length}
            </div>
            <div style={{ color: "var(--gray)" }}>Total Pelanggan</div>
          </div>
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#3b82f6",
              }}
            >
              {pengiriman.length}
            </div>
            <div style={{ color: "var(--gray)" }}>Pengiriman Aktif</div>
          </div>
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#f59e0b",
              }}
            >
              Rp{" "}
              {pemesanan
                .reduce((sum, p) => sum + (p.total_bayar || 0), 0)
                .toLocaleString("id-ID")}
            </div>
            <div style={{ color: "var(--gray)" }}>Total Pendapatan</div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "var(--shadow-md)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: "2px solid var(--gray-light)",
            }}
          >
            {["pemesanan", "pelanggan", "pengiriman"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "16px",
                  background:
                    activeTab === tab ? "var(--primary)" : "transparent",
                  color: activeTab === tab ? "white" : "var(--dark)",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.3s ease",
                }}
              >
                {tab} (
                {tab === "pemesanan"
                  ? pemesanan.length
                  : tab === "pelanggan"
                    ? pelanggan.length
                    : pengiriman.length}
                )
              </button>
            ))}
          </div>

          <div style={{ padding: "32px" }}>
            {/* Tab Pemesanan */}
            {activeTab === "pemesanan" && (
              <div>
                <h2 style={{ marginBottom: "20px" }}>Daftar Pemesanan</h2>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr
                        style={{
                          background: "var(--cream)",
                          borderBottom: "2px solid var(--gray-light)",
                        }}
                      >
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          No. Resi
                        </th>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Pelanggan
                        </th>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Total
                        </th>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Status
                        </th>
                        <th style={{ padding: "12px", textAlign: "left" }}>
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pemesanan.length === 0 ? (
                        <tr>
                          <td
                            colSpan="5"
                            style={{
                              padding: "40px",
                              textAlign: "center",
                              color: "var(--gray)",
                            }}
                          >
                            Belum ada pemesanan
                          </td>
                        </tr>
                      ) : (
                        pemesanan.map((p) => (
                          <tr
                            key={p.id}
                            style={{
                              borderBottom: "1px solid var(--gray-light)",
                            }}
                          >
                            <td style={{ padding: "12px" }}>{p.no_resi}</td>
                            <td style={{ padding: "12px" }}>
                              {p.pelanggan?.nama_pelanggan || "-"}
                            </td>
                            <td style={{ padding: "12px" }}>
                              Rp {(p.total_bayar || 0).toLocaleString("id-ID")}
                            </td>
                            <td style={{ padding: "12px" }}>
                              <span
                                style={{
                                  padding: "4px 12px",
                                  background:
                                    p.status_pesan === "Selesai"
                                      ? "#10b981"
                                      : p.status_pesan === "Sedang Diproses"
                                        ? "#f59e0b"
                                        : p.status_pesan === "Dibatalkan"
                                          ? "#ef4444"
                                          : "#3b82f6",
                                  color: "white",
                                  borderRadius: "20px",
                                  fontSize: "0.85rem",
                                }}
                              >
                                {p.status_pesan}
                              </span>
                            </td>
                            <td style={{ padding: "12px" }}>
                              <select
                                value={p.status_pesan}
                                onChange={(e) =>
                                  handleStatusChange(p.id, e.target.value)
                                }
                                disabled={updatingId === p.id}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: "6px",
                                  border: "2px solid var(--gray-light)",
                                  cursor:
                                    updatingId === p.id
                                      ? "not-allowed"
                                      : "pointer",
                                  background:
                                    updatingId === p.id ? "#f3f4f6" : "white",
                                  opacity: updatingId === p.id ? 0.7 : 1,
                                  fontSize: "0.9rem",
                                }}
                              >
                                <option value="Menunggu Konfirmasi">
                                  Menunggu Konfirmasi
                                </option>
                                <option value="Sedang Diproses">
                                  Sedang Diproses
                                </option>
                                <option value="Menunggu Kurir">
                                  Menunggu Kurir
                                </option>
                                <option value="Selesai">Selesai</option>
                                <option value="Dibatalkan">Dibatalkan</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab Pelanggan */}
            {activeTab === "pelanggan" && (
              <div>
                <h2 style={{ marginBottom: "20px" }}>Daftar Pelanggan</h2>
                <div style={{ display: "grid", gap: "16px" }}>
                  {pelanggan.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "var(--gray)",
                        padding: "40px",
                      }}
                    >
                      Belum ada pelanggan
                    </p>
                  ) : (
                    pelanggan.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          padding: "20px",
                          background: "var(--cream)",
                          borderRadius: "12px",
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "12px",
                        }}
                      >
                        <div>
                          <strong style={{ fontSize: "1.1rem" }}>
                            {p.nama_pelanggan}
                          </strong>
                          <p style={{ color: "var(--gray)", marginTop: "4px" }}>
                            {p.email}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Telepon:</strong> {p.telepon || "-"}
                          </p>
                          <p>
                            <strong>Alamat:</strong> {p.alamat1 || "-"}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab Pengiriman */}
            {activeTab === "pengiriman" && (
              <div>
                <h2 style={{ marginBottom: "20px" }}>Daftar Pengiriman</h2>
                <div style={{ display: "grid", gap: "16px" }}>
                  {pengiriman.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "var(--gray)",
                        padding: "40px",
                      }}
                    >
                      Belum ada pengiriman
                    </p>
                  ) : (
                    pengiriman.map((peng) => (
                      <div
                        key={peng.id}
                        style={{
                          padding: "20px",
                          background: "var(--cream)",
                          borderRadius: "12px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "12px",
                          }}
                        >
                          <strong>
                            No. Resi: {peng.pemesanan?.no_resi || "-"}
                          </strong>
                          <span
                            style={{
                              padding: "4px 12px",
                              background:
                                peng.status_kirim === "Tiba Ditujuan"
                                  ? "#10b981"
                                  : "#f59e0b",
                              color: "white",
                              borderRadius: "20px",
                              fontSize: "0.85rem",
                            }}
                          >
                            {peng.status_kirim}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "12px",
                            fontSize: "0.9rem",
                          }}
                        >
                          <div>
                            <p>
                              <strong>Pelanggan:</strong>{" "}
                              {peng.pemesanan?.pelanggan?.nama_pelanggan || "-"}
                            </p>
                            <p>
                              <strong>Telepon:</strong>{" "}
                              {peng.pemesanan?.pelanggan?.telepon || "-"}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Alamat:</strong>
                            </p>
                            <p>{peng.pemesanan?.pelanggan?.alamat1 || "-"}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
