import { siteConfig } from "@/config/siteConfig";
import HomeTutorspie from "./HomeTutorspie";
import HomeDemo from "./HomeDemo";

/**
 * Main Home Page Component
 * Routes to the appropriate home page based on site configuration
 * This ensures the / route displays the correct content for each site variant
 */
export default function HomePage() {
  switch (siteConfig.variant) {
    case "demo":
      return <HomeDemo />;
    case "tutorspie":
    default:
      return <HomeTutorspie />;
  }
}
