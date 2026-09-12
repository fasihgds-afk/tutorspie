import HeroSection from "./sections/hero-section";
import WritersSection from "./sections/writers-section";
import BenefitsSection from "./sections/benefits-section";
import PricingCta from "./sections/pricing-cta";
import OrderProcess from "./sections/order-process";
import OrderCta from "./sections/order-cta";
import TestimonialsSection from "./sections/testimonials-section";
import ComparisonSection from "./sections/comparison-section";
import TrustCta from "./sections/trust-cta";
import FaqSection from "./sections/faq-section";
import ServicesSection from "./sections/services-section";
import DisclaimerBar from "./sections/disclaimer-bar";

export default function HomeSections() {
  return (
    <>
      <HeroSection />
      <WritersSection />
      <BenefitsSection />
      <PricingCta />
      <OrderProcess />
      <OrderCta />
      <TestimonialsSection />
      <ComparisonSection />
      <TrustCta />
      <FaqSection />
      <ServicesSection />
      <DisclaimerBar />
    </>
  );
}
