/**
 * Centralized Pricing Formatter
 */
export function formatCurrency(amount, currency = "USD") {
  const numeric = Number(amount) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

export function formatPriceNumber(amount) {
  const numeric = Number(amount) || 0;
  return numeric.toFixed(2);
}

export function extractOrderPricing(pricing, fallbackFinal = 0) {
  if (!pricing) {
    return {
      originalService: 0,
      service: Number(fallbackFinal) || 0,
      discount: 0,
      addons: 0,
      final: Number(fallbackFinal) || 0,
      currency: "USD",
    };
  }

  // Backend pricing structure:
  // assignmentAmount = base cost after discount (pages * rate * spacing)
  // addOnsAmount = total addon cost
  // calculatedAmount = assignmentAmount + addOnsAmount
  // discountAmount = discount applied
  // finalAmount = calculatedAmount - discountAmount
  
  const service = Number(pricing.assignmentAmount ?? 0);
  const addons = Number(pricing.addOnsAmount || 0);
  
  // Calculate original price (service × 2, assuming 50% discount)
  const originalService = service * 2;
  const discount = originalService - service; // 50% discount amount
  
  const final = Number(pricing.finalAmount ?? 0);
  const currency = (pricing.currency || "usd").toUpperCase();

  return {
    originalService,  // Original price before discount
    service,          // Price after 50% discount
    discount,         // 50% discount amount
    addons,          // Add-ons cost (separate)
    final,           // Total (service + addons)
    currency,
  };
}

export default {
  formatCurrency,
  formatPriceNumber,
  extractOrderPricing,
};
