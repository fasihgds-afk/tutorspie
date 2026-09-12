/**
 * Site Layout Component
 * Automatically renders the correct Header and Footer based on site configuration
 * This prevents if/else statements scattered throughout the application
 */

import { Outlet } from "react-router-dom";
import { siteConfig } from "@/config/siteConfig";
import HeaderTutorspie from "@/components/headers/HeaderTutorspie";
import HeaderDemo from "@/components/headers/HeaderDemo";
import FooterTutorspie from "@/components/footers/FooterTutorspie";
import FooterDemo from "@/components/footers/FooterDemo";

/**
 * Dynamic Header Component
 * Returns the appropriate header based on site variant
 */
function SiteLayoutHeader() {
  switch (siteConfig.variant) {
    case "demo":
      return <HeaderDemo />;
    case "tutorspie":
    default:
      return <HeaderTutorspie />;
  }
}

/**
 * Dynamic Footer Component
 * Returns the appropriate footer based on site variant
 */
function SiteLayoutFooter() {
  switch (siteConfig.variant) {
    case "demo":
      return <FooterDemo />;
    case "tutorspie":
    default:
      return <FooterTutorspie />;
  }
}

/**
 * Main Site Layout
 * Wraps all pages with the appropriate header and footer
 * Pages are rendered via <Outlet /> from React Router
 */
export function SiteLayout() {
  return (
    <>
      <SiteLayoutHeader />
      <main>
        <Outlet />
      </main>
      <SiteLayoutFooter />
    </>
  );
}

export default SiteLayout;
