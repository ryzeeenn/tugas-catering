"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <li>
            <Link href="/admin" onClick={() => setMobileOpen(false)}>
              Admin
            </Link>
          </li>
          <li>
            <Link
              href="/pesan"
              className="navbar-cta"
              onClick={() => setMobileOpen(false)}
            >
              Pesan Sekarang
            </Link>
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
