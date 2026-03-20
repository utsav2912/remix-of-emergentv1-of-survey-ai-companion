import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoMarquee from "@/components/landing/LogoMarquee";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import PricingSection from "@/components/landing/PricingSection";
import LandingFooter from "@/components/landing/LandingFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <HeroSection />
      <LogoMarquee />
      <HowItWorks />
      <FeaturesGrid />
      <PricingSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
