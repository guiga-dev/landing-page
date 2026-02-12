import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { StatsSection } from '../components/StatsSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CTASection } from '../components/CTASection';
import { ScrollLogoSection } from '../components/ScrollLogoSection';
import { Footer } from '../components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030B1A]">
      <Header />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <ScrollLogoSection />
      <Footer />
    </div>
  );
}
