/**
 * Active Site Configuration
 * This file exports the currently active site variant based on environment variable
 * Use VITE_SITE_VARIANT to switch between different site configurations
 */

import { ENV } from "./env";
import siteConfigs from "./siteConfigs";

// Get active variant from environment (defaults to tutorspie)
const activeVariant = ENV.SITE_VARIANT || "tutorspie";

// Validate that the variant exists
if (!siteConfigs[activeVariant]) {
  console.error(`Invalid site variant: ${activeVariant}. Falling back to tutorspie.`);
}

// Export the active site configuration
export const siteConfig = siteConfigs[activeVariant] || siteConfigs.tutorspie;

// Legacy export for backward compatibility (deprecated - use siteConfig instead)
export const SITE_CONFIG = {
  NAME: siteConfig.name,
  TAG: ENV.SITE_TAG,
  PHONE: siteConfig.contact.phone,
  PHONE_HREF: siteConfig.contact.phoneHref,
  EMAIL: siteConfig.contact.email,
  EMAIL_HREF: siteConfig.contact.emailHref,
  COPYRIGHT: siteConfig.footer.copyright,
  NAV_LINKS: siteConfig.navigation.main,
  FOOTER_LINKS: siteConfig.navigation.footer,
};

export default siteConfig;
