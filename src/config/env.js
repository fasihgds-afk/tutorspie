/**
 * Centralized Environment Configuration
 * Only client-safe values (prefixed with VITE_) are exposed.
 */
export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  SITE_TAG: import.meta.env.VITE_SITE_TAG || "tutorspath",
  SITE_VARIANT: import.meta.env.VITE_SITE_VARIANT || "tutorspie",
  STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
  NODE_ENV: import.meta.env.MODE || "development",
  IS_DEV: import.meta.env.DEV ?? true,
};

export default ENV;
