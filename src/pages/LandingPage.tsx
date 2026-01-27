// src/pages/LandingPage.tsx
// import BenefitsSection from "../components/sections/BenefitsSection";
// import FreeBonusScrollSection from "../components/sections/FreeBonusScrollSection";
// import HowItWorksSection from "../components/sections/HowItWorksSection";
// import TrustSection from "../components/sections/TrustSection";
// import PricingSection from "../components/sections/PricingSection";
// import CallToActionSection from "../components/sections/CallToActionSection";
// import Footer from "../components/sections/Footer";

// Layout
import PageWrapper from "../components/layout/PageWrapper";
import TopCountdown from "../components/layout/TopCountdown";

// Hero & Trust
import HeroSection from "../components/sections/HeroSection";
import CertificationSection from "../components/sections/CertificationSection";

// Product & Value
import ProductDetailsSection from "../components/sections/ProductDetailsSection";
import PremiumDatesSection from "../components/sections/PremiumDatesSection";

// Problem → Motivation
import RealityCheckSection from "../components/sections/RealityCheckSection";
import TransformationChallengeSection from "../components/sections/TransformationChallengeSection";

// Emotion & Authority
import PromotionSection from "../components/sections/PromotionSection";
import SadakahSection from "../components/sections/SadakahSection";
import FounderMessageSection from "../components/sections/FounderMessageSection";

// Scarcity & Pricing
import LimitedBatchSection from "../components/sections/LimitedBatchSection";
import PriceBreakdownSection from "../components/sections/PriceBreakdownSection";

// Conversion
import OrderFormSection from "../components/sections/OrderFormSection";

// Support
import FAQSection from "../components/sections/FAQSection";
import SupportCTASection from "../components/sections/SupportCTASection";

export default function LandingPage() {
  return (
    <PageWrapper>
      {/* Urgency */}
      <TopCountdown />

      {/* Primary Hook */}
      <HeroSection />

      {/* Trust Signals */}
      <CertificationSection />

      {/* What You Get */}
      <ProductDetailsSection />
      <PremiumDatesSection />

      {/* Problem Awareness */}
      <RealityCheckSection />

      {/* Motivation & Reward */}
      <TransformationChallengeSection />

      {/* PromotionSection Part with Button */}
      <PromotionSection />

      {/* Emotional & Islamic Value */}
      <SadakahSection />

      {/* Price Justification */}
      <PriceBreakdownSection />

      {/* Scarcity */}
      <LimitedBatchSection />

      {/* Brand Authority */}
      <FounderMessageSection />

      {/* Conversion Point */}
      <OrderFormSection />

      {/* Objection Handling */}
      <FAQSection />

      {/* Final Support */}
      <SupportCTASection />
    </PageWrapper>
  );
}
