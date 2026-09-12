import HeroSection from "./sections-demo/hero-section";
import WritersSection from "./sections-demo/writers-section";
import BenefitsSection from "./sections-demo/benefits-section";
import PricingCta from "./sections-demo/pricing-cta";
import OrderProcess from "./sections-demo/order-process";
import OrderCta from "./sections-demo/order-cta";
import TestimonialsSection from "./sections-demo/testimonials-section";
import ComparisonSection from "./sections-demo/comparison-section";
import TrustCta from "./sections-demo/trust-cta";
import FaqSection from "./sections-demo/faq-section";
import ServicesSection from "./sections-demo/services-section";
import DisclaimerBar from "./sections-demo/disclaimer-bar";

/**
 * Home Sections for Demo Site Variant
 * Note: HomeHeader and HomeFooter removed because SiteLayout provides header/footer
 */
export default function HomeSectionsDemo() {
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
