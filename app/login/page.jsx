"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [signUp, setSignUp] = useState({
    nama: "",
    email: "",
    telepon: "",
    alamat: "",
    password: "",
    confirm: "",
  });

  const showMsg = (type, text) => setMessage({ type, text });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/pelanggan");
      const users = await res.json();
      const user = users.find((u) => u.email === signIn.email);

      if (!user) return showMsg("error", "Email tidak terdaftar");
      if (user.password !== signIn.password)
        return showMsg("error", "Password salah");

      localStorage.setItem(
        "culinexia_user",
        JSON.stringify({
          id: user.id,
          email: user.email,
          nama: user.nama_pelanggan,
          level: "pelanggan",
        }),
      );

      showMsg("success", "Login berhasil! Mengalihkan...");
      setTimeout(() => router.push("/"), 1200);
    } catch {
      showMsg("error", "Terjadi kesalahan jaringan");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (signUp.password !== signUp.confirm)
      return showMsg("error", "Password tidak cocok");
    if (signUp.password.length < 6)
      return showMsg("error", "Password minimal 6 karakter");

    try {
      const check = await fetch("/api/pelanggan");
      const users = await check.json();
      if (users.find((u) => u.email === signUp.email))
        return showMsg("error", "Email sudah terdaftar");

      const res = await fetch("/api/pelanggan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_pelanggan: signUp.nama,
          email: signUp.email,
          password: signUp.password,
          telepon: signUp.telepon,
          alamat1: signUp.alamat,
        }),
      });

      if (!res.ok) throw new Error("Registrasi gagal");
      showMsg("success", "Akun berhasil dibuat! Silakan login.");
      setTimeout(() => setIsSignIn(true), 1500);
    } catch (err) {
      showMsg("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    background: "#f8fafc",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #fdf2f0 0%, #fff1eb 50%, #ffe4e6 100%)",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        <div style={{ padding: "32px 32px 16px", textAlign: "center" }}>
          <Link
            href="/"
            style={{ textDecoration: "none", display: "inline-block" }}
          >
            <h1
              style={{
                fontSize: "1.8rem",
                fontWeight: "800",
                margin: 0,
                color: "var(--primary, #d97706)",
              }}
            >
              Culin<span style={{ color: "#1e293b" }}>exia</span>
            </h1>
          </Link>
          <p
            style={{ color: "#64748b", margin: "8px 0 0", fontSize: "0.9rem" }}
          >
            {isSignIn
              ? "Selamat datang kembali 👋"
              : "Buat akun baru dalam hitungan detik ✨"}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            margin: "0 32px",
            borderBottom: "2px solid #f1f5f9",
          }}
        >
          {["Sign In", "Sign Up"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => {
                setIsSignIn(i === 0);
                setMessage({ type: "", text: "" });
              }}
              style={{
                flex: 1,
                padding: "16px",
                background: "none",
                border: "none",
                borderBottom: (i === 0 ? isSignIn : !isSignIn)
                  ? "3px solid var(--primary, #d97706)"
                  : "none",
                color: (i === 0 ? isSignIn : !isSignIn)
                  ? "var(--primary, #d97706)"
                  : "#94a3b8",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ padding: "24px 32px 32px" }}>
          {message.text && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontSize: "0.85rem",
                background: message.type === "error" ? "#fef2f2" : "#f0fdf4",
                color: message.type === "error" ? "#dc2626" : "#16a34a",
                border: `1px solid ${message.type === "error" ? "#fecaca" : "#bbf7d0"}`,
              }}
            >
              {message.type === "error" ? "⚠️ " : "✅ "}
              {message.text}
            </div>
          )}

          {isSignIn && (
            <form
              onSubmit={handleSignIn}
              style={{ display: "grid", gap: "16px" }}
            >
              <input
                type="email"
                placeholder="Email"
                required
                value={signIn.email}
                onChange={(e) =>
                  setSignIn({ ...signIn, email: e.target.value })
                }
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--primary, #d97706)")
                }
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={signIn.password}
                onChange={(e) =>
                  setSignIn({ ...signIn, password: e.target.value })
                }
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--primary, #d97706)")
                }
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px",
                  background: loading ? "#cbd5e1" : "var(--primary, #d97706)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "8px",
                }}
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </form>
          )}

          {!isSignIn && (
            <form
              onSubmit={handleSignUp}
              style={{ display: "grid", gap: "14px" }}
            >
              <input
                type="text"
                placeholder="Nama Lengkap"
                required
                value={signUp.nama}
                onChange={(e) => setSignUp({ ...signUp, nama: e.target.value })}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={signUp.email}
                onChange={(e) =>
                  setSignUp({ ...signUp, email: e.target.value })
                }
                style={inputStyle}
              />
              <input
                type="tel"
                placeholder="No. Telepon"
                required
                value={signUp.telepon}
                onChange={(e) =>
                  setSignUp({ ...signUp, telepon: e.target.value })
                }
                style={inputStyle}
              />
              <textarea
                placeholder="Alamat Lengkap"
                required
                rows="2"
                value={signUp.alamat}
                onChange={(e) =>
                  setSignUp({ ...signUp, alamat: e.target.value })
                }
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={signUp.password}
                  onChange={(e) =>
                    setSignUp({ ...signUp, password: e.target.value })
                  }
                  style={inputStyle}
                />
                <input
                  type="password"
                  placeholder="Konfirmasi"
                  required
                  value={signUp.confirm}
                  onChange={(e) =>
                    setSignUp({ ...signUp, confirm: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "14px",
                  background: loading ? "#cbd5e1" : "var(--primary, #d97706)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  marginTop: "8px",
                }}
              >
                {loading ? "Mendaftar..." : "Buat Akun"}
              </button>
            </form>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontSize: "0.85rem",
              color: "#64748b",
            }}
          >
            {isSignIn ? "Belum punya akun? " : "Sudah punya akun? "}
            <button
              onClick={() => {
                setIsSignIn(!isSignIn);
                setMessage({ type: "", text: "" });
              }}
              style={{
                background: "none",
                border: "none",
                color: "var(--primary, #d97706)",
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {isSignIn ? "Daftar di sini" : "Login di sini"}
            </button>
            <div style={{ marginTop: "12px" }}>
              <Link
                href="/"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                }}
              >
                ← Kembali ke Beranda sebagai Tamu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
