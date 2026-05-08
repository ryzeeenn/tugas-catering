import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Culinexia — Aplikasi Catering Online Premium",
  description:
    "Platform catering online terpercaya untuk pernikahan, rapat, selamatan, dan acara spesial Anda.",
  keywords: "catering, catering online, kuliner, pernikahan, rapat, event",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
