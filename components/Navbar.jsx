"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const checkAuth = () => {
      const stored = localStorage.getItem("culinexia_user");
      setUser(stored ? JSON.parse(stored) : null);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("culinexia_user");
    setUser(null);
    router.refresh();
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          Culin<span>exia</span>
        </Link>

        <ul className={`navbar-links ${mobileOpen ? "active" : ""}`}>
          <li>
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/menu" onClick={() => setMobileOpen(false)}>
              Menu
            </Link>
          </li>
          <li>
            <Link href="/pesan" onClick={() => setMobileOpen(false)}>
              Pesan
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setMobileOpen(false)}>
              Tentang
            </Link>
          </li>

          {/* Tombol Login/Logout di paling kanan */}
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="navbar-cta"
                style={{ background: "#ef4444" }}
              >
                Log
              </button>
            ) : (
              <Link
                href="/login"
                className="navbar-cta"
                onClick={() => setMobileOpen(false)}
              >
                Log
              </Link>
            )}
          </li>
        </ul>

        <div
          className={`mobile-toggle ${mobileOpen ? "active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>
  );
}
