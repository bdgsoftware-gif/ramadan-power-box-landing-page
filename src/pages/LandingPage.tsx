// src/pages/LandingPage.tsx
import PageWrapper from "../components/layout/PageWrapper";
import TopCountdown from "../components/layout/TopCountdown";
import HeroSection from "../components/sections/HeroSection";
// import BenefitsSection from "../components/sections/BenefitsSection";
import ProductDetailsSection from "../components/sections/ProductDetailsSection";
import PremiumDatesSection from "../components/sections/PremiumDatesSection";
import RealityCheckSection from "../components/sections/RealityCheckSection";
import TransformationChallengeSection from "../components/sections/TransformationChallengeSection";
import OrderFormSection from "../components/sections/OrderFormSection";
// import HowItWorksSection from "../components/sections/HowItWorksSection";
// import TrustSection from "../components/sections/TrustSection";
// import PricingSection from "../components/sections/PricingSection";
// import CallToActionSection from "../components/sections/CallToActionSection";
// import Footer from "../components/sections/Footer";

export default function LandingPage() {
  return (
    <PageWrapper>
      <TopCountdown />
      <HeroSection />
      {/* <BenefitsSection /> */}
      <ProductDetailsSection />
      <PremiumDatesSection />
      <RealityCheckSection />
      <TransformationChallengeSection />
      <OrderFormSection />
      {/*   <HowItWorksSection />
      <TrustSection />
      <PricingSection />
      <CallToActionSection />
      <Footer /> */}
    </PageWrapper>
  );
}
