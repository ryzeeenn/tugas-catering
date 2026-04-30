import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Culinexia — Aplikasi Catering Online Premium',
  description:
    'Culinexia menghadirkan pengalaman catering terbaik dengan bahan-bahan segar pilihan dan resep autentik untuk setiap acara spesial Anda.',
  keywords: 'catering, catering online, kuliner, makanan, event, pernikahan',
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