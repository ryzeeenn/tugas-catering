"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("pemesanan");
  const [pemesanan, setPemesanan] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [pengiriman, setPengiriman] = useState([]);
  const [loading, setLoading] = useState(true);

  // Proteksi: Cek auth saat component mount
  useEffect(() => {
    const auth = localStorage.getItem("culinexia_admin");
    if (auth !== "true") {
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const [resPesanan, resPelanggan, resPengiriman] = await Promise.all([
        fetch("/api/pemesanan"),
        fetch("/api/pelanggan"),
        fetch("/api/pengiriman"),
      ]);
      setPemesanan(await resPesanan.json());
      setPelanggan(await resPelanggan.json());
      setPengiriman(await resPengiriman.json());
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("culinexia_admin");
    router.replace("/admin/login");
  };

  if (!isAuthenticated) return null;
  if (loading)
    return (
      <div style={{ paddingTop: "120px", textAlign: "center" }}>
        <h2>Memuat dashboard...</h2>
      </div>
    );

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

        {/* Stats */}
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
            <div style={{ color: "var(--gray)" }}>Pelanggan</div>
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
            <div style={{ color: "var(--gray)" }}>Pengiriman</div>
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
                      </tr>
                    </thead>
                    <tbody>
                      {pemesanan.map((p) => (
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
                            Rp {p.total_bayar?.toLocaleString("id-ID")}
                          </td>
                          <td style={{ padding: "12px" }}>
                            <span
                              style={{
                                padding: "4px 12px",
                                background:
                                  p.status_pesan === "Selesai"
                                    ? "#10b981"
                                    : "#f59e0b",
                                color: "white",
                                borderRadius: "20px",
                                fontSize: "0.85rem",
                              }}
                            >
                              {p.status_pesan}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === "pelanggan" && (
              <div style={{ display: "grid", gap: "16px" }}>
                {pelanggan.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: "20px",
                      background: "var(--cream)",
                      borderRadius: "12px",
                    }}
                  >
                    <strong>{p.nama_pelanggan}</strong>
                    <p style={{ color: "var(--gray)", marginTop: "4px" }}>
                      {p.email} • {p.telepon}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "pengiriman" && (
              <div style={{ display: "grid", gap: "16px" }}>
                {pengiriman.map((peng) => (
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
                        marginBottom: "8px",
                      }}
                    >
                      <strong>Resi: {peng.pemesanan?.no_resi}</strong>
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
                    <p style={{ fontSize: "0.9rem", color: "var(--gray)" }}>
                      Alamat: {peng.pemesanan?.pelanggan?.alamat1}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
