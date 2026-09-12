import { useLocation } from "react-router-dom";
import { getVariantForPath } from "@/config/seoRoutes";
import HomeTutorspie from "./HomeTutorspie";
import HomeDemo from "./HomeDemo";

/**
 * SEO Page Component
 * Dynamically renders HomeTutorspie or HomeDemo based on route configuration
 * 
 * This allows you to configure which design shows on each SEO route
 * without touching the routing code - just update seoRoutes.js
 */
export default function SeoPage() {
  const location = useLocation();
  const variant = getVariantForPath(location.pathname);
  
  // Route to the correct page variant
  switch (variant) {
    case "demo":
      return <HomeDemo />;
    case "home":
    default:
      return <HomeTutorspie />;
  }
}
