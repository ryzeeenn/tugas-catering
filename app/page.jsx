import Hero from '@/components/Hero';
import FeaturedMenu from '@/components/FeaturedMenu';
import AboutSection from '@/components/AboutSection';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <AboutSection />
      <Services />
      <Testimonials />
      <CTASection />
    </>
  );
}