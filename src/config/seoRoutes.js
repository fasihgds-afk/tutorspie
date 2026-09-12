/**
 * SEO Routes Configuration
 * 
 * Define all your SEO-friendly routes here with their page variant
 * Each route can show either:
 *   - "home" (HomeTutorspie - original design)
 *   - "demo" (HomeDemo - alternative design)
 * 
 * Change the variant based on your manager's mood swings 😉
 */

const seoRoutes = [
  // Main routes
  { path: "/", variant: "home" },           // Main homepage shows original
  
  // Essay routes
//   { path: "/essay-1", variant: "demo" },

  
  // Add more routes as needed...
  // { path: "/your-seo-route", variant: "home" or "demo" },
];

/**
 * Batch update utilities
 * Uncomment the one you need based on manager's decision
 */

// Option 1: Make ALL routes show home
// export const seoRoutes = seoRoutes.map(route => ({ ...route, variant: "home" }));

// Option 2: Make ALL routes show demo
// export const seoRoutes = seoRoutes.map(route => ({ ...route, variant: "demo" }));

// Option 3: Use as configured above (mixed)
export { seoRoutes };

/**
 * Helper function to get variant for a specific path
 */
export function getVariantForPath(path) {
  const route = seoRoutes.find(r => r.path === path);
  return route ? route.variant : "home"; // default to home if not found
}

/**
 * Helper function to get all paths for a specific variant
 */
export function getPathsForVariant(variant) {
  return seoRoutes
    .filter(r => r.variant === variant)
    .map(r => r.path);
}

export default seoRoutes;
