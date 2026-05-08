"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo: Hardcoded admin credentials
    // Di production, gunakan Supabase Auth atau JWT
    if (email === "admin@culinexia.id" && password === "password123") {
      localStorage.setItem("culinexia_admin", "true");
      router.push("/admin");
    } else {
      // Cek ke API users (jika sudah ada endpoint login)
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          localStorage.setItem("culinexia_admin", "true");
          router.push("/admin");
        } else {
          setError("Email atau password salah");
        }
      } catch {
        setError("Email atau password salah");
      }
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        background: "var(--cream)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <h1
          className="section-title"
          style={{ marginBottom: "24px", textAlign: "center" }}
        >
          Login Admin
        </h1>
        {error && (
          <div
            style={{
              padding: "12px",
              background: "#fee2e2",
              color: "#dc2626",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div style={{ display: "grid", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid var(--gray-light)",
                  borderRadius: "8px",
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
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid var(--gray-light)",
                  borderRadius: "8px",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px",
                background: loading ? "#999" : "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "0.85rem",
            color: "var(--gray)",
          }}
        >
          Demo: admin@culinexia.id / password123
        </p>
      </div>
    </div>
  );
}
