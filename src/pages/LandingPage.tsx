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
import CertificationSection from "../components/sections/CertificationSection";
import FounderMessageSection from "../components/sections/FounderMessageSection";
import SadakahSection from "../components/sections/SadakahSection";
import PriceBreakdownSection from "../components/sections/PriceBreakdownSection";
import FAQSection from "../components/sections/FAQSection";
import SupportCTASection from "../components/sections/SupportCTASection";
// import FreeBonusScrollSection from "../components/sections/FreeBonusScrollSection";
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
      <CertificationSection />
      {/* <BenefitsSection /> */}
      <ProductDetailsSection />
      <PremiumDatesSection />
      <RealityCheckSection />
      <TransformationChallengeSection />
      <SadakahSection />
      <FounderMessageSection />
      {/* <FreeBonusScrollSection /> */}
      <PriceBreakdownSection />
      <OrderFormSection />
      {/*   <HowItWorksSection />
      <TrustSection />
      <PricingSection />
      <CallToActionSection />
      <Footer /> */}
      <FAQSection />
      <SupportCTASection />
    </PageWrapper>
  );
}
