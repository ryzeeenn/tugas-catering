"use client";

export default function CheckoutPage() {
  return (
    <div
      style={{
        paddingTop: "120px",
        paddingBottom: "80px",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Halaman Checkout</h1>
      <p>Fitur checkout sedang dalam pengembangan.</p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 24px",
          background: "var(--primary)",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        ← Kembali ke Beranda
      </a>
    </div>
  );
}
