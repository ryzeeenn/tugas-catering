"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("pemesanan");
  const [pemesanan, setPemesanan] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [pengiriman, setPengiriman] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pemesananRes, pelangganRes, pengirimanRes] = await Promise.all([
        fetch("/api/pemesanan"),
        fetch("/api/pelanggan"),
        fetch("/api/pengiriman"),
      ]);

      const pemesananData = await pemesananRes.json();
      const pelangganData = await pelangganRes.json();
      const pengirimanData = await pengirimanRes.json();

      setPemesanan(pemesananData);
      setPelanggan(pelangganData);
      setPengiriman(pengirimanData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatusPemesanan = async (id, status) => {
    try {
      const res = await fetch("/api/pemesanan", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status_pesan: status }),
      });

      if (res.ok) {
        alert("Status berhasil diupdate");
        fetchData();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal update status");
    }
  };

  const createPengiriman = async (idPemesanan) => {
    try {
      const res = await fetch("/api/pengiriman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pesan: idPemesanan,
          tgl_kirim: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("Pengiriman berhasil dibuat");
        fetchData();
      }
    } catch (error) {
      console.error("Error creating pengiriman:", error);
      alert("Gagal membuat pengiriman");
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center" }}>
        <h2>Memuat data...</h2>
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
          style={{ marginBottom: "32px", textAlign: "center" }}
        >
          Dashboard Admin
        </h1>

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
                .reduce((sum, p) => sum + p.total_bayar, 0)
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
                {tab} {tab === "pemesanan" && `(${pemesanan.length})`}
                {tab === "pelanggan" && `(${pelanggan.length})`}
                {tab === "pengiriman" && `(${pengiriman.length})`}
              </button>
            ))}
          </div>

          <div style={{ padding: "32px" }}>
            {/* Tab Pemesanan */}
            {activeTab === "pemesanan" && (
              <div>
                <h2 style={{ marginBottom: "20px" }}>Daftar Pemesanan</h2>
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
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
                      {pemesanan.map((p) => (
                        <tr
                          key={p.id}
                          style={{
                            borderBottom: "1px solid var(--gray-light)",
                          }}
                        >
                          <td style={{ padding: "12px" }}>{p.no_resi}</td>
                          <td style={{ padding: "12px" }}>
                            {p.pelanggan?.nama_pelanggan}
                          </td>
                          <td style={{ padding: "12px" }}>
                            Rp {p.total_bayar.toLocaleString("id-ID")}
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
                              onChange={(e) =>
                                updateStatusPemesanan(p.id, e.target.value)
                              }
                              value={p.status_pesan}
                              style={{
                                padding: "8px",
                                borderRadius: "6px",
                                border: "2px solid var(--gray-light)",
                                cursor: "pointer",
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
                            {p.status_pesan === "Sedang Diproses" && (
                              <button
                                onClick={() => createPengiriman(p.id)}
                                style={{
                                  marginLeft: "8px",
                                  padding: "8px 16px",
                                  background: "var(--primary)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "6px",
                                  cursor: "pointer",
                                }}
                              >
                                Kirim
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
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
                  {pelanggan.map((p) => (
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
                          <strong>Telepon:</strong> {p.telepon}
                        </p>
                        <p>
                          <strong>Alamat:</strong> {p.alamat1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Pengiriman */}
            {activeTab === "pengiriman" && (
              <div>
                <h2 style={{ marginBottom: "20px" }}>Daftar Pengiriman</h2>
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
                          marginBottom: "12px",
                        }}
                      >
                        <strong>No. Resi: {peng.pemesanan?.no_resi}</strong>
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
                            {peng.pemesanan?.pelanggan?.nama_pelanggan}
                          </p>
                          <p>
                            <strong>Telepon:</strong>{" "}
                            {peng.pemesanan?.pelanggan?.telepon}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Alamat:</strong>
                          </p>
                          <p>{peng.pemesanan?.pelanggan?.alamat1}</p>
                          {peng.pemesanan?.pelanggan?.alamat2 && (
                            <p>{peng.pemesanan?.pelanggan?.alamat2}</p>
                          )}
                          {peng.pemesanan?.pelanggan?.alamat3 && (
                            <p>{peng.pemesanan?.pelanggan?.alamat3}</p>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          marginTop: "12px",
                          paddingTop: "12px",
                          borderTop: "1px solid var(--gray-light)",
                        }}
                      >
                        <p>
                          <strong>Tgl Kirim:</strong>{" "}
                          {peng.tgl_kirim
                            ? new Date(peng.tgl_kirim).toLocaleDateString(
                                "id-ID",
                              )
                            : "-"}
                        </p>
                        <p>
                          <strong>Tgl Tiba:</strong>{" "}
                          {peng.tgl_tiba
                            ? new Date(peng.tgl_tiba).toLocaleDateString(
                                "id-ID",
                              )
                            : "-"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
